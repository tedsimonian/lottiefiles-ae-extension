/**
 * Extracts the type of an item in an array.
 * @template T The type of the array
 */
export type ArrayItem<T> = T extends (infer U)[] ? U : never;
