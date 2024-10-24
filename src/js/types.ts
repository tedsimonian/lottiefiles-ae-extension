/**
 * Extracts the type of an item in an array.
 * @template T The type of the array
 */
export type ArrayItem<T> = T extends (infer U)[] ? U : never;

export type Composition = {
  id: number;
  name: string;
};

export type CompositionRenderItem = Composition & {
  checked: boolean;
  status: "idle" | "rendering" | "completed";
  progress: number;
};
