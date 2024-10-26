//@ts-ignore
declare var JSON: {
  stringify(object: object): string;
  parse(string: string): object;
};

export type Composition = {
  id: number;
  name: string;
};

export type LottieAnimation = {
  v: string; // Version
  ip: number; // In-point of the animation
  op: number; // Out-point of the animation
  nm: string; // Name
  mn?: string; // Marker name, optional
  fr: number; // Frame rate
  w: number; // Width
  h: number; // Height
  assets: Asset[]; // Assets array
  layers: Layer[]; // Layers array
  meta?: Meta; // Metadata, optional
};

// Since I'm not using all Asset, I am not defining all the properties
export type Asset = {
  id: string;
};

export type Layer = {
  ddd?: 0 | 1; // 3D layer (0: no, 1: yes)
  ty: number; // Layer type
  ind: number; // Layer index
  st: number; // Start time
  ip: number; // In-point of the layer
  op: number; // Out-point of the layer
  nm: string; // Name
  mn?: string; // Marker name, optional
  ks: TransformProperties; // Transform properties
  shapes: Shape[]; // Shape array
  sr?: number; // Stretch, optional
  tt?: number; // Track matte type, optional
  ao?: 0 | 1; // Auto-orient along path (0: no, 1: yes)
};

export type TransformProperties = {
  a: AnimatedValue<number[]>; // Anchor point
  p: AnimatedValue<number[]>; // Position
  s: AnimatedValue<number[]>; // Scale
  r?: AnimatedValue<number>; // Rotation
  o?: AnimatedValue<number>; // Opacity
  sk?: AnimatedValue<number>; // Skew
  sa?: AnimatedValue<number>; // Skew axis
};

export type AnimatedValue<T> = {
  a: 0 | 1; // Animation toggle (0: static, 1: animated)
  k: T; // Keyframe or static value
  ix?: number; // Index
};

// I am only using RectangleShape for now, we can define other shapes here
export type Shape =
  | EllipseShape
  | RectangleShape
  | FillShape
  | StrokeShape
  | GroupShape
  | PathShape
  | TransformShape;

export type EllipseShape = {
  ty: "el"; // Shape type (Ellipse)
  nm: string; // Name
  p: AnimatedValue<number[]>; // Position
  s: AnimatedValue<number[]>; // Size
  d?: 1; // Direction
};

export type RectangleShape = {
  ty: "rc"; // Shape type (Rectangle)
  nm: string; // Name
  p: AnimatedValue<number[]>; // Position
  s: AnimatedValue<number[]>; // Size
  r: AnimatedValue<number>; // Corner radius
};

export type FillShape = {
  ty: "fl"; // Shape type (Fill)
  nm: string; // Name
  o: AnimatedValue<number>; // Opacity
  c: AnimatedValue<number[]>; // Color (RGBA)
  r?: 1; // Rule (optional)
};

export type StrokeShape = {
  ty: "st"; // Shape type (Stroke)
  nm: string; // Name
  o: AnimatedValue<number>; // Opacity
  w: AnimatedValue<number>; // Stroke width
  c: AnimatedValue<number[]>; // Color (RGBA)
  lc?: 1 | 2 | 3; // Line cap (1: butt, 2: round, 3: projecting)
  lj?: 1 | 2 | 3; // Line join (1: miter, 2: round, 3: bevel)
  ml?: number; // Miter limit
  d?: Dash[]; // Dash pattern
};

export type Dash = {
  n: "o" | "d" | "g"; // Name (offset, dash, gap)
  v: AnimatedValue<number>; // Value
};

export type GroupShape = {
  ty: "gr"; // Shape type (Group)
  nm: string; // Name
  it: Shape[]; // Items within the group
  np: number; // Number of properties
  cix?: number; // Containing index
};

export type PathShape = {
  ty: "sh"; // Shape type (Path)
  nm: string; // Name
  ks: AnimatedValue<number[]>; // Keyframe values
  c?: boolean; // Closed (optional)
};

export type TransformShape = {
  ty: "tr"; // Transform type
  a: AnimatedValue<number[]>; // Anchor point
  p: AnimatedValue<number[]>; // Position
  s: AnimatedValue<number[]>; // Scale
  r: AnimatedValue<number>; // Rotation
  o: AnimatedValue<number>; // Opacity
  sk?: AnimatedValue<number>; // Skew (optional)
  sa?: AnimatedValue<number>; // Skew axis (optional)
};

export type Meta = {
  g: string; // Generator name
  a?: string; // Author (optional)
  k?: string; // Keywords (optional)
  d?: string; // Description (optional)
  v?: string; // Version (optional)
};
