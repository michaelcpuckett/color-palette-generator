"use client";

import { ColorPickerForm } from "@/components/ColorPickerForm";
import { ExampleUi } from "@/components/ExampleUi";
import { SwatchPalette } from "@/components/SwatchPalette";
import {
  harmonies,
  IHarmonyType,
  ILchArgs,
  ISwatchPalette,
  primaryHarmonyType,
} from "@/types";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [chromaValue, setChromaValue] = useState(0.18);
  const [hueAngle, setHueAngle] = useState(180);
  const [enabledHarmonyTypes, setEnabledHarmonyTypes] = useState<
    IHarmonyType[]
  >([]);
  const enabledHarmonies = Array.from(
    new Set(
      [primaryHarmonyType, ...enabledHarmonyTypes]
        .map((harmonyType) => {
          return harmonies.filter(({ types }) => types.includes(harmonyType));
        })
        .flat()
    )
  );

  const swatchPalettes: ISwatchPalette[] = enabledHarmonies.map((harmony) => {
    const localHueAngle = hueAngle + harmony.angleOffset;
    const valueWhite: ILchArgs = [1, 0, localHueAngle];
    const value100: ILchArgs = [0.9, chromaValue, localHueAngle];
    const value200: ILchArgs = [0.8, chromaValue, localHueAngle];
    const value300: ILchArgs = [0.7, chromaValue, localHueAngle];
    const value400: ILchArgs = [0.6, chromaValue, localHueAngle];
    const value500: ILchArgs = [0.5, chromaValue, localHueAngle];
    const value600: ILchArgs = [0.4, chromaValue, localHueAngle];
    const value700: ILchArgs = [0.3, chromaValue, localHueAngle];
    const value800: ILchArgs = [0.2, chromaValue, localHueAngle];
    const value900: ILchArgs = [0.1, chromaValue, localHueAngle];
    const valueBlack: ILchArgs = [0, 0, localHueAngle];
    const palette: Record<string, ILchArgs> = {
      valueWhite,
      value100,
      value200,
      value300,
      value400,
      value500,
      value600,
      value700,
      value800,
      value900,
      valueBlack,
    };

    const oklchStyles = Object.fromEntries(
      Object.entries(palette).map(([label, [l, c, h]]) => {
        const [, name] = label.split("value");

        return [
          `--swatch--dynamic--${name.toLowerCase()}`,
          `oklch(${l} ${c} ${h})`,
        ];
      })
    );

    return {
      ...harmony,
      oklchStyles,
    };
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>CSS Color Palette Generator</h1>
        <ColorPickerForm
          setChromaValue={setChromaValue}
          chromaValue={chromaValue}
          setHueAngle={setHueAngle}
          hueAngle={hueAngle}
          setEnabledHarmonyTypes={setEnabledHarmonyTypes}
          enabledHarmonyTypes={enabledHarmonyTypes}
        />
        <h2>Swatch Palettes</h2>
        {swatchPalettes.map((swatchPalette) => (
          <SwatchPalette
            key={swatchPalette.label}
            swatchPalette={swatchPalette}
          ></SwatchPalette>
        ))}
        <h2>Example UI</h2>
        {swatchPalettes.map((swatchPalette) => (
          <ExampleUi
            key={swatchPalette.label}
            swatchPalette={swatchPalette}
          ></ExampleUi>
        ))}
      </main>
    </div>
  );
}
