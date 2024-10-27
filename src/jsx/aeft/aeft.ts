import {
  AdobeProperty,
  AnimatedValue,
  Composition,
  FillShape,
  JSON,
  Layer,
  Lottie3DLayer,
  LottieAnimation,
  LottieAnimationType,
  LottieAutoOrient,
  LottieLayerType,
  LottieShapeType,
  PathShape,
  RectangleShape,
  Shape,
  StrokeShape,
  TransformProperties,
  TransformShape,
} from "../global";

/**
 * Generates a UUID-like string for use in After Effects.
 * The UUID always starts with 'c' and is followed by 24 random alphanumeric characters.
 * @returns {string} A 25-character UUID-like string
 */
const generateUUID = (): string => {
  const CHAR_SET = "abcdefghijklmnopqrstuvwxyz0123456789";
  const UUID_LENGTH = 25;
  const UUID_PREFIX = "c";
  const RANDOM_CHAR_COUNT = UUID_LENGTH - UUID_PREFIX.length;

  let result = UUID_PREFIX;

  for (let i = 0; i < RANDOM_CHAR_COUNT; i++) {
    const randomIndex = Math.floor(Math.random() * CHAR_SET.length);
    result += CHAR_SET.charAt(randomIndex);
  }

  return result;
};

/**
 * Get all compositions in the current project
 * @returns An array of compositions
 */
export const getAllCompositionsInProject = (): Composition[] => {
  let comps: Composition[] = [];
  for (let i = 1; i < app.project.numItems + 1; i++) {
    const item = app.project.items[i];
    if (item instanceof CompItem) {
      comps.push({ id: item.id, name: item.name });
    }
  }

  return comps;
};

/**
 * Convert a composition to a Lottie JSON payload
 * @param compId - The id of the composition
 * @returns A Lottie JSON payload
 */
export const convertCompositionToLottieJSONPayload = (
  compId: number
): LottieAnimation => {
  const comp = app.project.itemByID(compId) as CompItem;

  const LOTTIE_VERSION = "5.7.1";
  const INITIAL_IN_POINT = 0;

  const lottie: LottieAnimation = {
    v: LOTTIE_VERSION,
    fr: comp.frameRate,
    ip: INITIAL_IN_POINT,
    op: comp.duration * comp.frameRate, // Calculate out-point based on composition duration
    w: comp.width,
    h: comp.height,
    nm: comp.name,
    mn: "{" + generateUUID() + "}",
    assets: [],
    layers: [],
  };

  // Convert layers in reverse order to match Lottie's layer handling
  // Lottie renders layers from bottom to top, opposite of After Effects
  for (let i = comp.numLayers; i >= 1; i--) {
    const layer = comp.layer(i);
    const lottieLayer = convertLayerToLottie(layer);
    lottie.layers.push(lottieLayer);
  }

  return lottie;
};

/**
 * Converts an After Effects layer to a Lottie layer format
 * @param layer - The After Effects layer to convert
 * @returns A Lottie layer object
 */
const convertLayerToLottie = (layer: globalThis.Layer): Layer => {
  const INDEX_OFFSET = 1; // Offset for layer index
  const DEFAULT_STRETCH = 1; // Default stretch value

  const lottieLayer: Layer = {
    ddd: Lottie3DLayer.NO, // 3D layer flag (0 for 2D)
    ind: layer.index - INDEX_OFFSET, // Adjust index to be zero-based
    ty: getLottieLayerType(layer),
    nm: layer.name,
    mn: "{" + generateUUID() + "}",
    sr: DEFAULT_STRETCH,
    ks: extractTransformProperties(layer), // Extract transform properties
    ao: layer.autoOrient ? LottieAutoOrient.YES : LottieAutoOrient.NO, // Set auto-orient flag
    ip: layer.inPoint * layer.containingComp.frameRate, // Convert in-point to frames
    op: layer.outPoint * layer.containingComp.frameRate, // Convert out-point to frames
    st: layer.startTime * layer.containingComp.frameRate, // Convert start time to frames
    shapes: [],
  };

  if (layer instanceof ShapeLayer) {
    lottieLayer.shapes = extractShapes(layer);
  }

  return lottieLayer;
};

/**
 * Determines the Lottie layer type based on the After Effects layer type
 * @param layer - The After Effects layer to analyze
 * @returns The corresponding Lottie layer type as a number
 */
const getLottieLayerType = (layer: globalThis.Layer): number => {
  if (layer instanceof ShapeLayer) return LottieLayerType.SHAPE;
  if (layer instanceof TextLayer) return LottieLayerType.TEXT;

  return LottieLayerType.IMAGE;
};

/**
 * Extracts the transform properties from an After Effects layer
 * @param layer - The After Effects layer to analyze
 * @returns The transform properties as an object
 */
const extractTransformProperties = (
  layer: globalThis.Layer
): TransformProperties => {
  const transform = layer.transform;
  return {
    a: convertToAnimatedValue(transform.anchorPoint),
    p: convertToAnimatedValue(transform.position),
    s: convertToAnimatedValue(transform.scale),
    r: convertToAnimatedValue(transform.rotation),
    o: convertToAnimatedValue(transform.opacity),
  };
};

/**
 * Converts an After Effects property to an animated value for lottie
 * @param property - The After Effects property to convert
 * @returns An animated value object for lottie
 */
const convertToAnimatedValue = <T>(property: Property): AnimatedValue<T> => {
  const INITIAL_TIME = 0;

  if (property.isTimeVarying) {
    // If the property changes over time, return an animated value
    return {
      a: LottieAnimationType.ANIMATED, // 'a' represents whether the property is animated (1) or static (0)
      k: property.valueAtTime(INITIAL_TIME, true) as T, // 'k' holds the keyframe value at the initial time
    };
  } else {
    // If the property doesn't change over time, return a static value
    return {
      a: LottieAnimationType.STATIC, // Static property
      k: property.value as T, // 'k' holds the constant value of the property
    };
  }
};

/**
 * Extracts the shapes from an After Effects shape layer
 * @param layer - The After Effects shape layer to analyze
 * @returns An array of shape objects
 */
const extractShapes = (layer: ShapeLayer): Shape[] => {
  const shapes: Shape[] = [];
  const contents = layer.property(AdobeProperty.CONTENTS) as PropertyGroup;

  if (!contents) {
    return shapes;
  }

  for (let i = 1; i <= contents.numProperties; i++) {
    const shapeGroup = contents.property(i) as PropertyGroup;
    if (shapeGroup) {
      shapes.push(extractShapeGroup(shapeGroup));
    }
  }

  return shapes;
};

/**
 * Extracts the shapes from an After Effects shape group
 * @param shapeGroup - The After Effects shape group to analyze
 * @returns A shape object
 */
const extractShapeGroup = (shapeGroup: PropertyGroup): Shape => {
  const shapeItems: Shape[] = [];

  const contents = shapeGroup.property(
    AdobeProperty.VECTOR_GROUP
  ) as PropertyGroup;

  if (!contents) {
    return {
      ty: LottieShapeType.GROUP,
      np: shapeGroup.numProperties,
      nm: shapeGroup.name,
      it: shapeItems,
    };
  }

  for (let i = 1; i <= contents.numProperties; i++) {
    const property = contents.property(i);
    if (property) {
      switch (property.matchName) {
        case AdobeProperty.RECTANGLE:
          shapeItems.push(extractRectangle(property as PropertyGroup));
          break;
        case AdobeProperty.FILL:
          shapeItems.push(extractFill(property as PropertyGroup));
          break;
        case AdobeProperty.GROUP:
          shapeItems.push(
            extractPath(property.property(AdobeProperty.PATH) as Property)
          );
          break;
        case AdobeProperty.STROKE:
          shapeItems.push(extractStroke(property as PropertyGroup));
          break;
        case AdobeProperty.TRANSFORM:
          shapeItems.push(extractTransform(property as PropertyGroup));
          break;
      }
    }
  }

  return {
    ty: LottieShapeType.GROUP,
    nm: shapeGroup.name,
    np: shapeGroup.numProperties,
    it: shapeItems,
  };
};

/**
 * Extracts the rectangle shape from an After Effects rectangle property
 * @param rectProperty - The After Effects rectangle property to analyze
 * @returns A rectangle shape object
 */
const extractRectangle = (rectProperty: PropertyGroup): RectangleShape => {
  return {
    ty: LottieShapeType.RECTANGLE,
    nm: rectProperty.name,
    p: convertToAnimatedValue(
      rectProperty.property(AdobeProperty.POSITION) as Property
    ),
    s: convertToAnimatedValue(
      rectProperty.property(AdobeProperty.SIZE) as Property
    ),
    r: convertToAnimatedValue(
      rectProperty.property(AdobeProperty.ROUNDNESS) as Property
    ),
  };
};

/**
 * Extracts the path shape from an After Effects path property
 * @param pathProperty - The After Effects path property to analyze
 * @returns A path shape object
 */
const extractPath = (pathProperty: Property): PathShape => {
  return {
    ty: LottieShapeType.PATH,
    nm: pathProperty.name,
    ks: convertToAnimatedValue(pathProperty),
  };
};

/**
 * Extracts the fill shape from an After Effects fill property
 * @param fillProperty - The After Effects fill property to analyze
 * @returns A fill shape object
 */
const extractFill = (fillProperty: PropertyGroup): FillShape => {
  return {
    ty: LottieShapeType.FILL,
    nm: fillProperty.name,
    o: convertToAnimatedValue(
      fillProperty.property(AdobeProperty.OPACITY) as Property
    ),
    c: convertToAnimatedValue(
      fillProperty.property(AdobeProperty.COLOR) as Property
    ),
  };
};

/**
 * Extracts the stroke shape from an After Effects stroke property
 * @param strokeProperty - The After Effects stroke property to analyze
 * @returns A stroke shape object
 */
const extractStroke = (strokeProperty: PropertyGroup): StrokeShape => {
  return {
    ty: LottieShapeType.STROKE,
    nm: strokeProperty.name,
    o: convertToAnimatedValue(
      strokeProperty.property(AdobeProperty.OPACITY) as Property
    ),
    w: convertToAnimatedValue(
      strokeProperty.property(AdobeProperty.STROKE_WIDTH) as Property
    ),
    c: convertToAnimatedValue(
      strokeProperty.property(AdobeProperty.COLOR) as Property
    ),
    lc: (strokeProperty.property(AdobeProperty.LINE_CAP) as Property).value,
    lj: (strokeProperty.property(AdobeProperty.LINE_JOIN) as Property).value,
  };
};

/**
 * Extracts the transform shape from an After Effects transform property
 * @param transformProperty - The After Effects transform property to analyze
 * @returns A transform shape object
 */
const extractTransform = (transformProperty: PropertyGroup): TransformShape => {
  return {
    ty: LottieShapeType.TRANSFORM,
    p: convertToAnimatedValue(
      transformProperty.property(AdobeProperty.POSITION) as Property
    ),
    a: convertToAnimatedValue(
      transformProperty.property(AdobeProperty.ANCHOR_POINT) as Property
    ),
    s: convertToAnimatedValue(
      transformProperty.property(AdobeProperty.SCALE) as Property
    ),
    r: convertToAnimatedValue(
      transformProperty.property(AdobeProperty.ROTATION) as Property
    ),
    o: convertToAnimatedValue(
      transformProperty.property(AdobeProperty.OPACITY) as Property
    ),
  };
};
