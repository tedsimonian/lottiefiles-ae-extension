/**
 * Combine classes into a single string
 * @param classes - An array of class names
 * @returns A single string of class names
 */
export const cn = (...classes: (string | undefined | null)[]) => {
  return classes.filter(Boolean).join(" ");
};
