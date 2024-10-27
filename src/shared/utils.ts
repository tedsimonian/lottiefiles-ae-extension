/**
 * Combine classes into a single string
 * @param classes - An array of class names
 * @returns A single string of class names
 */
export const cn = (...classes: (string | undefined | null)[]) => {
  // Filter out undefined, or null values
  return classes.filter(Boolean).join(" ");
};

/**
 * Calculate the contrast ratio between two colors
 * @param color1 - First color in RGB format
 * @param color2 - Second color in RGB format
 * @returns The contrast ratio between the two colors
 */
const getContrastRatio = (color1: number[], color2: number[]): number => {
  // Calculate the luminance for both colors
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);

  // Determine the brightest and darkest luminance values
  const brightest = Math.max(luminance1, luminance2);
  const darkest = Math.min(luminance1, luminance2);

  // Constants for contrast ratio calculation
  const LUMINANCE_OFFSET = 0.05;

  // Calculate and return the contrast ratio
  // Adding LUMINANCE_OFFSET to both numerator and denominator to avoid division by zero
  // and to account for the standard relative luminance calculation
  return (brightest + LUMINANCE_OFFSET) / (darkest + LUMINANCE_OFFSET);
};

/**
 * Calculate the relative luminance of a color
 * @param rgb - Color in RGB format
 * @returns The relative luminance of the color
 */
const getLuminance = (rgb: number[]): number => {
  // Convert RGB values to linear values using the sRGB color space formula
  const linearValues = rgb.map((v) => {
    const MAX_RGB_VALUE = 255;
    const LOW_VALUE_THRESHOLD = 0.03928;
    const LOW_VALUE_DIVISOR = 12.92;
    const HIGH_VALUE_OFFSET = 0.055;
    const HIGH_VALUE_DIVISOR = 1.055;
    const GAMMA_CORRECTION = 2.4;

    // Normalize the RGB value to a range of 0-1
    v /= MAX_RGB_VALUE;
    // Apply the sRGB to linear RGB conversion formula
    // For low values (<=LOW_VALUE_THRESHOLD), use a simple linear transformation
    // For higher values, use a power function to account for gamma correction
    return v <= LOW_VALUE_THRESHOLD
      ? v / LOW_VALUE_DIVISOR
      : Math.pow(
          (v + HIGH_VALUE_OFFSET) / HIGH_VALUE_DIVISOR,
          GAMMA_CORRECTION
        );
  });

  // Calculate the relative luminance using the weighted sum of linear RGB values
  // Weights are based on human perception of different colors:
  // Red: 0.2126, Green: 0.7152, Blue: 0.0722
  const redWeight = 0.2126;
  const greenWeight = 0.7152;
  const blueWeight = 0.0722;

  return (
    linearValues[0] * redWeight +
    linearValues[1] * greenWeight +
    linearValues[2] * blueWeight
  );
};

/**
 * Convert a hex color to RGB format
 * @param hex - Color in hex format
 * @returns The color in RGB format
 */
const hexToRgb = (hex: string): number[] => {
  // Regular expression to match shorthand hex color codes (e.g., #RGB)
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  // Convert shorthand hex to full hex (e.g., #RGB to #RRGGBB)
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);

  // Regular expression to match full hex color codes (e.g., #RRGGBB)
  const fullHexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

  // Execute the regex to extract RGB components
  const result = fullHexRegex.exec(hex);

  // Base for parsing hexadecimal
  const HEX_BASE = 16;

  // Default RGB values if parsing fails
  const DEFAULT_RGB = [0, 0, 0];

  return result
    ? [
        parseInt(result[1], HEX_BASE),
        parseInt(result[2], HEX_BASE),
        parseInt(result[3], HEX_BASE),
      ]
    : DEFAULT_RGB;
};

/**
 * Get a readable text color based on the background color
 * @param backgroundColor - Background color in hex format
 * @returns A readable text color (either black or white in tailwind format)
 */
export const getReadableTextColor = (backgroundColor: string): string => {
  // Convert the background color from hex to RGB
  const rgb = hexToRgb(backgroundColor);

  // Define RGB values for white and black
  const WHITE_RGB = [255, 255, 255];
  const BLACK_RGB = [0, 0, 0];

  // Calculate contrast ratios for white and black text against the background
  const whiteContrast = getContrastRatio(rgb, WHITE_RGB);
  const blackContrast = getContrastRatio(rgb, BLACK_RGB);

  // Return the Tailwind class for the color with better contrast
  // If white has higher contrast, use white text; otherwise, use black text
  return whiteContrast > blackContrast ? "text-white" : "text-black";
};
