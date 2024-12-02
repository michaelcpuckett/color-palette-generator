"use client";

import { ColorPickerForm } from "@/components/ColorPickerForm";
import { ExampleUi } from "@/components/ExampleUi";
import { SwatchPalette } from "@/components/SwatchPalette";
import { harmonies, IHarmonyType, ILchArgs, ISwatchPalette } from "@/types";
import Color from "colorjs.io";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [chromaValue, setChromaValue] = useState(0.18);
  const [hueAngle, setHueAngle] = useState(180);
  const [enabledHarmonyTypes, setEnabledHarmonyTypes] = useState<
    IHarmonyType[]
  >([]);

  const enabledHarmonies = harmonies.filter((harmony) => {
    for (const harmonyType of harmony.types) {
      if (enabledHarmonyTypes.includes(harmonyType)) {
        return true;
      }
    }

    return harmony.types.includes("primary");
  });

  const swatchPalettes: ISwatchPalette[] = enabledHarmonies.map((harmony) => {
    const localHueAngle = hueAngle + harmony.angleOffset;
    const valueWhite: ILchArgs = [1, 0, localHueAngle];
    const value100: ILchArgs = [0.95, chromaValue, localHueAngle];
    const value200: ILchArgs = [0.85, chromaValue, localHueAngle];
    const value300: ILchArgs = [0.75, chromaValue, localHueAngle];
    const value400: ILchArgs = [0.65, chromaValue, localHueAngle];
    const value500: ILchArgs = [0.55, chromaValue, localHueAngle];
    const value600: ILchArgs = [0.45, chromaValue, localHueAngle];
    const value700: ILchArgs = [0.35, chromaValue, localHueAngle];
    const value800: ILchArgs = [0.25, chromaValue, localHueAngle];
    const value900: ILchArgs = [0.15, chromaValue, localHueAngle];
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

  const textareaStyles = swatchPalettes
    .map((swatchPalette) =>
      Object.entries(swatchPalette.oklchStyles)
        .slice(1, 10)
        .map(([key, value]) => {
          const colorJsValue = new Color(value);
          const { r, g, b } = colorJsValue.to("srgb");
          const fallbackValue = `rgb(${Math.max(
            0,
            Math.round(r * 255)
          )}, ${Math.max(0, Math.round(g * 255))}, ${Math.max(
            0,
            Math.round(b * 255)
          )})`;
          return `--swatch--${swatchPalette.cssIdentifier}--${
            key.split("--")[3]
          }: ${fallbackValue};\n--swatch--${swatchPalette.cssIdentifier}--${
            key.split("--")[3]
          }: ${value};\n\n`;
        })
    )
    .flat()
    .join("");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>OKLCH Color Palette Generator</h1>
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
        <hr />
        <h2>Example UI</h2>
        {swatchPalettes.map((swatchPalette) => (
          <ExampleUi
            key={swatchPalette.label}
            swatchPalette={swatchPalette}
          ></ExampleUi>
        ))}
        <hr />
        <h2>CSS Output</h2>
        <textarea readOnly value={textareaStyles} />
      </main>
    </div>
  );
}
