import {
  generateUUID,
  getLottieLayerType,
  convertToAnimatedValue,
  LottieLayerType,
  LottieAnimationType,
  extractTransformProperties,
  extractShapes,
  extractRectangle,
  extractFill,
  extractStroke,
  convertCompositionToLottieJSONPayload,
  getAllCompositionsInProject,
  extractPath,
  extractTransform,
  extractShapeGroup,
  convertLayerToLottie,
} from "../jsx/aeft/aeft";
import { createAEMock } from "../__mocks__/afterEffects";

// Mock AE layer classes
class ShapeLayer {}
class TextLayer {}
class AVLayer {}
class CompItem {}

beforeAll(() => {
  (global as any).app = createAEMock();
  (global as any).ShapeLayer = ShapeLayer;
  (global as any).TextLayer = TextLayer;
  (global as any).AVLayer = AVLayer;
  (global as any).CompItem = CompItem;
});

afterAll(() => {
  delete (global as any).app;
  delete (global as any).ShapeLayer;
  delete (global as any).TextLayer;
  delete (global as any).AVLayer;
  delete (global as any).CompItem;
});

describe("generateUUID", () => {
  it("should generate a 25-character string", () => {
    const uuid = generateUUID();
    expect(uuid.length).toBe(25);
  });

  it('should start with "c"', () => {
    const uuid = generateUUID();
    expect(uuid.charAt(0)).toBe("c");
  });

  it("should only contain lowercase letters and numbers", () => {
    const uuid = generateUUID();
    expect(uuid).toMatch(/^c[a-z0-9]{24}$/);
  });

  it("should generate unique values", () => {
    const uuids = new Set();
    for (let i = 0; i < 1000; i++) {
      uuids.add(generateUUID());
    }
    expect(uuids.size).toBe(1000);
  });
});

describe("getLottieLayerType", () => {
  it("should return SHAPE type for ShapeLayer", () => {
    const mockShapeLayer = new ShapeLayer();
    const result = getLottieLayerType(mockShapeLayer as any);
    expect(result).toBe(LottieLayerType.SHAPE);
  });

  it("should return TEXT type for TextLayer", () => {
    const mockTextLayer = new TextLayer();
    const result = getLottieLayerType(mockTextLayer as any);
    expect(result).toBe(LottieLayerType.TEXT);
  });

  it("should return IMAGE type for other layer types", () => {
    const mockLayer = new AVLayer();
    const result = getLottieLayerType(mockLayer as any);
    expect(result).toBe(LottieLayerType.IMAGE);
  });
});

describe("convertToAnimatedValue", () => {
  it("should handle static properties", () => {
    const mockProperty = {
      isTimeVarying: false,
      value: 100,
    };

    const result = convertToAnimatedValue(mockProperty as any);
    expect(result).toEqual({
      a: LottieAnimationType.STATIC,
      k: 100,
    });
  });

  it("should handle animated properties", () => {
    const mockProperty = {
      isTimeVarying: true,
      valueAtTime: (time: number) => 200,
    };

    const result = convertToAnimatedValue(mockProperty as any);
    expect(result).toEqual({
      a: LottieAnimationType.ANIMATED,
      k: 200,
    });
  });
});

describe("After Effects Integration", () => {
  // Add more integration tests here if needed
  // Note: Most AE-specific functions would need to be tested in the actual AE environment
  it("should be properly mocked", () => {
    expect(global.app.project.numItems).toBe(2);
  });
});

describe("extractTransformProperties", () => {
  it("should extract all transform properties", () => {
    const mockLayer = {
      transform: {
        anchorPoint: { isTimeVarying: false, value: [0, 0, 0] },
        position: { isTimeVarying: false, value: [100, 100, 0] },
        scale: { isTimeVarying: false, value: [100, 100, 100] },
        rotation: { isTimeVarying: false, value: 0 },
        opacity: { isTimeVarying: false, value: 100 },
      },
    };

    const result = extractTransformProperties(mockLayer as any);

    expect(result).toEqual({
      a: { a: LottieAnimationType.STATIC, k: [0, 0, 0] },
      p: { a: LottieAnimationType.STATIC, k: [100, 100, 0] },
      s: { a: LottieAnimationType.STATIC, k: [100, 100, 100] },
      r: { a: LottieAnimationType.STATIC, k: 0 },
      o: { a: LottieAnimationType.STATIC, k: 100 },
    });
  });
});

describe("extractShapes", () => {
  it("should return empty array if no contents", () => {
    const mockLayer = {
      property: () => null,
    };

    const result = extractShapes(mockLayer as any);
    expect(result).toEqual([]);
  });

  it("should extract shapes from layer contents", () => {
    const mockShapeGroup = {
      numProperties: 1,
      property: (i: number) => ({
        name: "Shape Group 1",
        numProperties: 2,
        property: () => ({
          matchName: "ADBE Vector Shape - Rect",
          name: "Rectangle",
          property: (prop: string) => ({
            isTimeVarying: false,
            value: prop === "Position" ? [0, 0] : [100, 100],
          }),
        }),
      }),
    };

    const mockLayer = {
      property: () => mockShapeGroup,
    };

    const result = extractShapes(mockLayer as any);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].ty).toBe("gr");
  });
});

describe("extractRectangle", () => {
  it("should extract rectangle properties", () => {
    const mockRectProperty = {
      name: "Rectangle 1",
      property: (prop: string) => ({
        isTimeVarying: false,
        value: prop === "Position" ? [0, 0] : prop === "Size" ? [100, 100] : 0,
      }),
    };

    const result = extractRectangle(mockRectProperty as any);

    expect(result).toEqual({
      ty: "rc",
      nm: "Rectangle 1",
      p: { a: LottieAnimationType.STATIC, k: [0, 0] },
      s: { a: LottieAnimationType.STATIC, k: [100, 100] },
      r: { a: LottieAnimationType.STATIC, k: 0 },
    });
  });
});

describe("extractFill", () => {
  it("should extract fill properties", () => {
    const mockFillProperty = {
      name: "Fill 1",
      property: (prop: string) => ({
        isTimeVarying: false,
        value: prop === "Color" ? [1, 0, 0, 1] : 100,
      }),
    };

    const result = extractFill(mockFillProperty as any);

    expect(result).toEqual({
      ty: "fl",
      nm: "Fill 1",
      o: { a: LottieAnimationType.STATIC, k: 100 },
      c: { a: LottieAnimationType.STATIC, k: [1, 0, 0, 1] },
    });
  });
});

describe("extractStroke", () => {
  it("should extract stroke properties", () => {
    const mockStrokeProperty = {
      name: "Stroke 1",
      property: (prop: string) => ({
        isTimeVarying: false,
        value:
          prop === "Color"
            ? [0, 0, 0, 1]
            : prop === "Line Cap" || prop === "Line Join"
            ? 1
            : 5,
      }),
    };

    const result = extractStroke(mockStrokeProperty as any);

    expect(result).toEqual({
      ty: "st",
      nm: "Stroke 1",
      o: { a: LottieAnimationType.STATIC, k: 5 },
      w: { a: LottieAnimationType.STATIC, k: 5 },
      c: { a: LottieAnimationType.STATIC, k: [0, 0, 0, 1] },
      lc: 1,
      lj: 1,
    });
  });
});

describe("convertCompositionToLottieJSONPayload", () => {
  it("should convert composition to Lottie format", () => {
    const mockComp = {
      frameRate: 30,
      duration: 5,
      width: 1920,
      height: 1080,
      name: "Test Comp",
      numLayers: 1,
      layer: () => ({
        index: 1,
        name: "Layer 1",
        autoOrient: false,
        inPoint: 0,
        outPoint: 5,
        startTime: 0,
        containingComp: { frameRate: 30 }, // Add this
        transform: {
          anchorPoint: {
            isTimeVarying: false,
            value: [0, 0, 0] as [number, number, number],
          },
          position: {
            isTimeVarying: false,
            value: [0, 0, 0] as [number, number, number],
          },
          scale: {
            isTimeVarying: false,
            value: [100, 100, 100] as [number, number, number],
          },
          rotation: { isTimeVarying: false, value: 0 },
          opacity: { isTimeVarying: false, value: 100 },
        },
      }),
      id: 1,
    };

    (global as any).app.project.itemByID = () => mockComp;

    const result = convertCompositionToLottieJSONPayload(1);

    expect(result.v).toBe("5.7.1");
    expect(result.fr).toBe(30);
    expect(result.w).toBe(1920);
    expect(result.h).toBe(1080);
    expect(result.nm).toBe("Test Comp");
    expect(result.layers.length).toBe(1);
  });
});

describe("getAllCompositionsInProject", () => {
  it("should return all compositions in project", () => {
    const mockComp1 = new CompItem();
    const mockComp2 = new CompItem();
    Object.assign(mockComp1, { id: 1, name: "Comp 1" });
    Object.assign(mockComp2, { id: 2, name: "Comp 2" });

    // Create a proper ItemCollection mock
    const mockItemCollection = {
      [1]: mockComp1,
      [2]: mockComp2,
    };

    const mockApp = {
      project: {
        numItems: 2,
        items: mockItemCollection,
      },
    };

    (global as any).app = mockApp;

    const result = getAllCompositionsInProject();

    expect(result).toEqual([
      { id: 1, name: "Comp 1" },
      { id: 2, name: "Comp 2" },
    ]);
  });
});

describe("extractPath", () => {
  it("should extract path properties", () => {
    const mockPathProperty = {
      name: "Path 1",
      value: [
        [100, 100],
        [200, 200],
      ],
      isTimeVarying: false,
    };

    const result = extractPath(mockPathProperty as any);

    expect(result).toEqual({
      ty: "sh",
      nm: "Path 1",
      ks: {
        a: LottieAnimationType.STATIC,
        k: [
          [100, 100],
          [200, 200],
        ],
      },
    });
  });
});

describe("extractTransform", () => {
  it("should extract transform properties", () => {
    const mockTransformProperty = {
      name: "Transform",
      property: (prop: string) => ({
        isTimeVarying: false,
        value:
          prop === "Position" || prop === "Anchor Point" || prop === "Scale"
            ? [0, 0, 0]
            : 100,
      }),
    };

    const result = extractTransform(mockTransformProperty as any);

    expect(result).toEqual({
      ty: "tr",
      p: { a: LottieAnimationType.STATIC, k: [0, 0, 0] },
      a: { a: LottieAnimationType.STATIC, k: [0, 0, 0] },
      s: { a: LottieAnimationType.STATIC, k: [0, 0, 0] },
      r: { a: LottieAnimationType.STATIC, k: 100 },
      o: { a: LottieAnimationType.STATIC, k: 100 },
    });
  });
});

describe("extractShapeGroup", () => {
  it("should handle empty shape groups", () => {
    const mockShapeGroup = {
      name: "Group 1",
      numProperties: 0,
      property: () => null,
    };

    const result = extractShapeGroup(mockShapeGroup as any);

    expect(result).toEqual({
      ty: "gr",
      nm: "Group 1",
      np: 0,
      it: [],
    });
  });

  it("should extract shapes from group", () => {
    const mockShapeGroup = {
      name: "Group 1",
      numProperties: 1,
      property: () => ({
        numProperties: 1,
        property: (i: number) => ({
          matchName: "ADBE Vector Shape - Rect",
          name: "Rectangle",
          property: (prop: string) => ({
            isTimeVarying: false,
            value: prop === "Position" ? [0, 0] : [100, 100],
          }),
        }),
      }),
    };

    const result = extractShapeGroup(mockShapeGroup as any);

    expect(result).toEqual({
      ty: "gr",
      nm: "Group 1",
      np: 1,
      it: expect.any(Array),
    });
  });
});

describe("convertLayerToLottie", () => {
  it("should convert layer to Lottie format", () => {
    const mockLayer = {
      index: 2,
      name: "Test Layer",
      autoOrient: false,
      inPoint: 0,
      outPoint: 5,
      startTime: 0,
      containingComp: {
        frameRate: 30,
      },
      transform: {
        anchorPoint: { isTimeVarying: false, value: [0, 0, 0] },
        position: { isTimeVarying: false, value: [0, 0, 0] },
        scale: { isTimeVarying: false, value: [100, 100, 100] },
        rotation: { isTimeVarying: false, value: 0 },
        opacity: { isTimeVarying: false, value: 100 },
      },
    };

    const result = convertLayerToLottie(mockLayer as any);

    expect(result).toMatchObject({
      ddd: 0,
      ind: 1,
      nm: "Test Layer",
      ao: 0,
      ip: 0,
      op: 150,
      st: 0,
      shapes: [],
    });
  });

  it("should handle shape layers", () => {
    const mockShapeLayer = {
      index: 2,
      name: "Shape Layer",
      autoOrient: false,
      inPoint: 0,
      outPoint: 5,
      startTime: 0,
      containingComp: {
        frameRate: 30,
      },
      transform: {
        anchorPoint: { isTimeVarying: false, value: [0, 0, 0] },
        position: { isTimeVarying: false, value: [0, 0, 0] },
        scale: { isTimeVarying: false, value: [100, 100, 100] },
        rotation: { isTimeVarying: false, value: 0 },
        opacity: { isTimeVarying: false, value: 100 },
      },
      property: () => ({
        numProperties: 0,
      }),
    };

    Object.setPrototypeOf(mockShapeLayer, ShapeLayer.prototype);

    const result = convertLayerToLottie(mockShapeLayer as any);

    expect(result.ty).toBe(LottieLayerType.SHAPE);
    expect(Array.isArray(result.shapes)).toBe(true);
  });
});
