import {
  cn,
  getContrastRatio,
  getLuminance,
  getReadableTextColor,
  hexToRgb,
  copyToClipboard,
} from "../shared/utils";

describe("cn (classNames utility)", () => {
  it("should combine multiple classes", () => {
    expect(cn("class1", "class2", "class3")).toBe("class1 class2 class3");
  });

  it("should filter out falsy values", () => {
    expect(cn("class1", null, "class2", undefined, "class3")).toBe(
      "class1 class2 class3"
    );
  });

  it("should return empty string for no classes", () => {
    expect(cn()).toBe("");
  });

  it("should handle empty strings", () => {
    expect(cn("class1", "", "class2")).toBe("class1 class2");
  });
});

describe("getReadableTextColor", () => {
  it("should return white text for dark backgrounds", () => {
    expect(getReadableTextColor("#000000")).toBe("text-white");
    expect(getReadableTextColor("#1a1a1a")).toBe("text-white");
    expect(getReadableTextColor("#2c3e50")).toBe("text-white");
  });

  it("should return black text for light backgrounds", () => {
    expect(getReadableTextColor("#ffffff")).toBe("text-black");
    expect(getReadableTextColor("#f0f0f0")).toBe("text-black");
    expect(getReadableTextColor("#e74c3c")).toBe("text-black");
  });

  it("should handle 3-digit hex codes", () => {
    expect(getReadableTextColor("#000")).toBe("text-white");
    expect(getReadableTextColor("#fff")).toBe("text-black");
  });

  it("should handle invalid hex codes by defaulting to white text", () => {
    expect(getReadableTextColor("invalid")).toBe("text-white");
  });

  it("should handle hex codes with or without # prefix", () => {
    expect(getReadableTextColor("ffffff")).toBe("text-black");
    expect(getReadableTextColor("#ffffff")).toBe("text-black");
  });

  it("should handle uppercase hex codes", () => {
    expect(getReadableTextColor("#FFFFFF")).toBe("text-black");
    expect(getReadableTextColor("#000000")).toBe("text-white");
  });
});

describe("hexToRgb", () => {
  it("should convert 6-digit hex codes correctly", () => {
    expect(hexToRgb("#ff0000")).toEqual([255, 0, 0]);
    expect(hexToRgb("#00ff00")).toEqual([0, 255, 0]);
    expect(hexToRgb("#0000ff")).toEqual([0, 0, 255]);
  });

  it("should convert 3-digit hex codes correctly", () => {
    expect(hexToRgb("#f00")).toEqual([255, 0, 0]);
    expect(hexToRgb("#0f0")).toEqual([0, 255, 0]);
    expect(hexToRgb("#00f")).toEqual([0, 0, 255]);
  });

  it("should handle hex codes without # prefix", () => {
    expect(hexToRgb("ff0000")).toEqual([255, 0, 0]);
    expect(hexToRgb("f00")).toEqual([255, 0, 0]);
  });

  it("should return default RGB for invalid hex codes", () => {
    expect(hexToRgb("invalid")).toEqual([0, 0, 0]);
    expect(hexToRgb("#12")).toEqual([0, 0, 0]);
    expect(hexToRgb("#1234")).toEqual([0, 0, 0]);
  });
});

describe("getLuminance", () => {
  it("should calculate luminance correctly for primary colors", () => {
    expect(getLuminance([255, 0, 0])).toBeCloseTo(0.2126, 4); // Red
    expect(getLuminance([0, 255, 0])).toBeCloseTo(0.7152, 4); // Green
    expect(getLuminance([0, 0, 255])).toBeCloseTo(0.0722, 4); // Blue
  });

  it("should calculate luminance correctly for white and black", () => {
    expect(getLuminance([0, 0, 0])).toBe(0); // Black
    expect(getLuminance([255, 255, 255])).toBe(1); // White
  });

  it("should handle mid-range values correctly", () => {
    expect(getLuminance([128, 128, 128])).toBeCloseTo(0.2159, 4); // Gray
  });

  it("should handle values below the low threshold", () => {
    expect(getLuminance([10, 10, 10])).toBeCloseTo(0.003035, 4);
  });
});

describe("getContrastRatio", () => {
  it("should calculate maximum contrast for black and white", () => {
    const white = [255, 255, 255];
    const black = [0, 0, 0];
    expect(getContrastRatio(white, black)).toBeCloseTo(21, 0);
  });

  it("should calculate minimum contrast for same colors", () => {
    const gray = [128, 128, 128];
    expect(getContrastRatio(gray, gray)).toBe(1);
  });

  it("should be symmetric (order of colors should not matter)", () => {
    const color1 = [255, 0, 0];
    const color2 = [0, 255, 0];
    const ratio1 = getContrastRatio(color1, color2);
    const ratio2 = getContrastRatio(color2, color1);
    expect(ratio1).toBe(ratio2);
  });

  it("should handle mid-range contrasts", () => {
    const lightGray = [192, 192, 192];
    const darkGray = [64, 64, 64];
    expect(getContrastRatio(lightGray, darkGray)).toBeGreaterThan(1);
    expect(getContrastRatio(lightGray, darkGray)).toBeLessThan(21);
  });
});

describe("copyToClipboard", () => {
  beforeEach(() => {
    // Mock execCommand
    document.execCommand = jest.fn().mockReturnValue(true);
    // Create a temporary textarea if it doesn't exist
    if (!document.body) {
      document.body = document.createElement("body");
    }
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should copy text to the clipboard", () => {
    copyToClipboard("test");
    expect(document.execCommand).toHaveBeenCalledWith("copy");
  });
});
