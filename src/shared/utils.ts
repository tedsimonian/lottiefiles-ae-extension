/**
 * Combine classes into a single string
 * @param classes - An array of class names
 * @returns A single string of class names
 */
export const cn = (...classes: (string | undefined | null)[]) => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Calculate the contrast ratio between two colors
 * @param color1 - First color in RGB format
 * @param color2 - Second color in RGB format
 * @returns The contrast ratio between the two colors
 */
const getContrastRatio = (color1: number[], color2: number[]): number => {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  const brightest = Math.max(luminance1, luminance2);
  const darkest = Math.min(luminance1, luminance2);
  return (brightest + 0.05) / (darkest + 0.05);
};

/**
 * Calculate the relative luminance of a color
 * @param rgb - Color in RGB format
 * @returns The relative luminance of the color
 */
const getLuminance = (rgb: number[]): number => {
  const a = rgb.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

/**
 * Convert a hex color to RGB format
 * @param hex - Color in hex format
 * @returns The color in RGB format
 */
const hexToRgb = (hex: string): number[] => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
};

/**
 * Get a readable text color based on the background color
 * @param backgroundColor - Background color in hex format
 * @returns A readable text color (either black or white in tailwind format)
 */
export const getReadableTextColor = (backgroundColor: string): string => {
  const rgb = hexToRgb(backgroundColor);
  const whiteContrast = getContrastRatio(rgb, [255, 255, 255]);
  const blackContrast = getContrastRatio(rgb, [0, 0, 0]);

  return whiteContrast > blackContrast ? "text-white" : "text-black";
};
