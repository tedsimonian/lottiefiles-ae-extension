import {
  AnimatedValue,
  Composition,
  FillShape,
  JSON,
  Layer,
  LottieAnimation,
  Shape,
  StrokeShape,
  TransformProperties,
} from "../global";

const generateUUID = (): string => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const length = 25;
  let result = "c";
  for (let i = 0; i < length - 1; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

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

export const convertCompositionToLottieJSONPayload = (
  compId: number
): LottieAnimation => {
  const comp = app.project.itemByID(compId) as CompItem;

  const lottie: LottieAnimation = {
    v: "5.7.1",
    fr: comp.frameRate,
    ip: 0,
    op: comp.duration * comp.frameRate,
    w: comp.width,
    h: comp.height,
    nm: comp.name,
    mn: "{" + generateUUID() + "}",
    assets: [],
    layers: [],
  };

  // we need to convert layers in reverse order because of the way lottie handles layers
  for (let i = comp.numLayers; i >= 1; i--) {
    const layer = comp.layer(i);
    const lottieLayer = convertLayerToLottie(layer);
    lottie.layers.push(lottieLayer);
  }

  return lottie;
};

const convertLayerToLottie = (layer: globalThis.Layer): Layer => {
  const lottieLayer: Layer = {
    ddd: 0,
    ind: layer.index - 1,
    ty: getLottieLayerType(layer),
    nm: layer.name,
    mn: "{" + generateUUID() + "}",
    sr: 1,
    ks: extractTransformProperties(layer),
    ao: layer.autoOrient ? 1 : 0,
    ip: layer.inPoint * layer.containingComp.frameRate,
    op: layer.outPoint * layer.containingComp.frameRate,
    st: layer.startTime * layer.containingComp.frameRate,
    shapes: [],
  };

  if (layer instanceof ShapeLayer) {
    lottieLayer.shapes = extractShapes(layer);
  }

  return lottieLayer;
};

const getLottieLayerType = (layer: globalThis.Layer): number => {
  if (layer instanceof ShapeLayer) return 4;
  if (layer instanceof TextLayer) return 5;
  return 2; // Default to image layer
};

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

const convertToAnimatedValue = <T>(property: Property): AnimatedValue<T> => {
  if (property.isTimeVarying) {
    return {
      a: 1,
      k: property.valueAtTime(0, true) as T,
    };
  } else {
    return {
      a: 0,
      k: property.value as T,
    };
  }
};

const extractShapes = (layer: ShapeLayer): Shape[] => {
  const shapes: Shape[] = [];
  const contents = layer.property("Contents") as PropertyGroup;

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

const extractShapeGroup = (shapeGroup: PropertyGroup): Shape => {
  const shapeItems: any[] = [];

  const contents = shapeGroup.property("ADBE Vectors Group") as PropertyGroup;
  if (!contents) {
    return {
      ty: "gr",
      np: shapeGroup.numProperties,
      nm: shapeGroup.name,
      it: shapeItems,
    };
  }

  for (let i = 1; i <= contents.numProperties; i++) {
    const property = contents.property(i);
    if (property) {
      switch (property.matchName) {
        case "ADBE Vector Shape - Rect":
          shapeItems.push(extractRectangle(property as PropertyGroup));
          break;
        case "ADBE Vector Graphic - Fill":
          shapeItems.push(extractFill(property as PropertyGroup));
          break;
        case "ADBE Vector Shape - Group":
          shapeItems.push(extractPath(property.property("Path") as Property));
          break;
        case "ADBE Vector Graphic - Stroke":
          shapeItems.push(extractStroke(property as PropertyGroup));
          break;
        case "ADBE Vector Transform Group":
          shapeItems.push(extractTransform(property as PropertyGroup));
          break;
      }
    }
  }

  return {
    ty: "gr",
    nm: shapeGroup.name,
    np: shapeGroup.numProperties,
    it: shapeItems,
  };
};

const extractRectangle = (rectProperty: PropertyGroup): any => {
  return {
    ty: "rc",
    nm: rectProperty.name,
    p: convertToAnimatedValue(rectProperty.property("Position") as Property),
    s: convertToAnimatedValue(rectProperty.property("Size") as Property),
    r: convertToAnimatedValue(rectProperty.property("Roundness") as Property),
  };
};

const extractPath = (pathProperty: Property): any => {
  return {
    ty: "sh",
    nm: pathProperty.name,
    ks: convertToAnimatedValue(pathProperty),
  };
};

const extractFill = (fillProperty: PropertyGroup): FillShape => {
  return {
    ty: "fl",
    nm: fillProperty.name,
    o: convertToAnimatedValue(fillProperty.property("Opacity") as Property),
    c: convertToAnimatedValue(fillProperty.property("Color") as Property),
  };
};

const extractStroke = (strokeProperty: PropertyGroup): StrokeShape => {
  return {
    ty: "st",
    nm: strokeProperty.name,
    o: convertToAnimatedValue(strokeProperty.property("Opacity") as Property),
    w: convertToAnimatedValue(
      strokeProperty.property("Stroke Width") as Property
    ),
    c: convertToAnimatedValue(strokeProperty.property("Color") as Property),
    lc: (strokeProperty.property("Line Cap") as Property).value,
    lj: (strokeProperty.property("Line Join") as Property).value,
  };
};

const extractTransform = (transformProperty: PropertyGroup): any => {
  return {
    ty: "tr",
    p: convertToAnimatedValue(
      transformProperty.property("Position") as Property
    ),
    a: convertToAnimatedValue(
      transformProperty.property("Anchor Point") as Property
    ),
    s: convertToAnimatedValue(transformProperty.property("Scale") as Property),
    r: convertToAnimatedValue(
      transformProperty.property("Rotation") as Property
    ),
    o: convertToAnimatedValue(
      transformProperty.property("Opacity") as Property
    ),
  };
};
