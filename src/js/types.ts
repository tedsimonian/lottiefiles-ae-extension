import { LottieAnimation } from "../jsx/global";

/**
 * Extracts the type of an item in an array.
 * @template T The type of the array
 */
export type ArrayItem<T> = T extends (infer U)[] ? U : never;

export type ClientComposition = {
  id: number;
  name: string;
  checked: boolean;
  lottieJSON: LottieAnimation | null;
};
