export const oklchColorSpace = "oklch" as const;
export const hslColorSpace = "hsl" as const;

export type IColorSpace = typeof oklchColorSpace | typeof hslColorSpace;

export const analgousHarmonyType = "analogous" as const;
export const tetradicHarmonyType = "tetradic" as const;
export const triadicHarmonyType = "triadic" as const;
export const splitHarmonyType = "split" as const;
export const complementaryHarmonyType = "complementary" as const;
export const primaryHarmonyType = "primary" as const;

export const harmonyTypes = [
  analgousHarmonyType,
  tetradicHarmonyType,
  triadicHarmonyType,
  splitHarmonyType,
  complementaryHarmonyType,
  primaryHarmonyType,
];

export type IHarmonyType =
  | typeof analgousHarmonyType
  | typeof tetradicHarmonyType
  | typeof triadicHarmonyType
  | typeof splitHarmonyType
  | typeof complementaryHarmonyType
  | typeof primaryHarmonyType;

export type IHarmony = {
  types: IHarmonyType[];
  cssIdentifier: string;
  label: string;
  angleOffset: number;
};

export type ISwatchPalette = IHarmony & {
  style: Record<string, string>;
};

export type IColorSet = [number, number, number];

export const harmonies: Array<IHarmony> = [
  {
    types: [primaryHarmonyType],
    cssIdentifier: "primary",
    label: "Primary",
    angleOffset: 0,
  },
  {
    types: [analgousHarmonyType],
    cssIdentifier: "analogous-1",
    label: "Analogous 1",
    angleOffset: 30,
  },
  {
    types: [analgousHarmonyType],
    cssIdentifier: "analogous-2",
    label: "Analogous 2",
    angleOffset: 60,
  },
  {
    types: [analgousHarmonyType, tetradicHarmonyType],
    cssIdentifier: "analogous-3\\tetradic-1",
    label: "Analogous 3 / Tetradic 1",
    angleOffset: 90,
  },
  {
    types: [triadicHarmonyType],
    cssIdentifier: "triadic-1",
    label: "Triadic 1",
    angleOffset: 120,
  },
  {
    types: [splitHarmonyType],
    cssIdentifier: "split-1",
    label: "Split Complementary 1",
    angleOffset: 150,
  },
  {
    types: [complementaryHarmonyType, tetradicHarmonyType],
    cssIdentifier: "complementary\\tetradic-2",
    angleOffset: 180,
    label: "Complementary / Tetradic 2",
  },
  {
    types: [splitHarmonyType],
    cssIdentifier: "split-2",
    label: "Split Complementary 2",
    angleOffset: 210,
  },
  {
    types: [triadicHarmonyType],
    cssIdentifier: "triadic-2",
    label: "Triadic 2",
    angleOffset: 240,
  },
  {
    types: [tetradicHarmonyType],
    cssIdentifier: "tetradic-3",
    angleOffset: 270,
    label: "Tetradic 3",
  },
  {
    types: [analgousHarmonyType],
    cssIdentifier: "analogous-negative-3",
    angleOffset: 270,
    label: "Analogous -3",
  },
  {
    types: [analgousHarmonyType],
    cssIdentifier: "analogous-negative-2",
    angleOffset: 300,
    label: "Analogous -2",
  },
  {
    types: [analgousHarmonyType],
    cssIdentifier: "analogous-negative-1",
    angleOffset: 330,
    label: "Analogous -1",
  },
] as const;
