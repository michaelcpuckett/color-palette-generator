"use client";

import { ColorPickerForm } from "@/components/ColorPickerForm";
import { ExampleUi } from "@/components/ExampleUi";
import { SwatchPalette } from "@/components/SwatchPalette";
import {
  harmonies,
  IColorSet,
  IColorSpace,
  IHarmonyType,
  ISwatchPalette,
} from "@/types";
import Color from "colorjs.io";
import { useState } from "react";
import styles from "./page.module.css";

function getHslStyles(saturationPercentage: number, localHueAngle: number) {
  const valueWhite: IColorSet = [localHueAngle, saturationPercentage, 100];
  const value100: IColorSet = [localHueAngle, saturationPercentage, 90];
  const value200: IColorSet = [localHueAngle, saturationPercentage, 80];
  const value300: IColorSet = [localHueAngle, saturationPercentage, 70];
  const value400: IColorSet = [localHueAngle, saturationPercentage, 60];
  const value500: IColorSet = [localHueAngle, saturationPercentage, 50];
  const value600: IColorSet = [localHueAngle, saturationPercentage, 40];
  const value700: IColorSet = [localHueAngle, saturationPercentage, 30];
  const value800: IColorSet = [localHueAngle, saturationPercentage, 20];
  const value900: IColorSet = [localHueAngle, saturationPercentage, 10];
  const valueBlack: IColorSet = [localHueAngle, saturationPercentage, 0];
  const palette: Record<string, IColorSet> = {
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

  return Object.fromEntries(
    Object.entries(palette).map(([label, [h, s, l]]) => {
      const [, name] = label.split("value");

      return [
        `--swatch--dynamic--${name.toLowerCase()}`,
        `hsl(${h}deg, ${s}%, ${l}%)`,
      ];
    })
  );
}

function getOklchStyles(chromaValue: number, localHueAngle: number) {
  const valueWhite: IColorSet = [1, 0, localHueAngle];
  const value100: IColorSet = [0.95, chromaValue, localHueAngle];
  const value200: IColorSet = [0.85, chromaValue, localHueAngle];
  const value300: IColorSet = [0.75, chromaValue, localHueAngle];
  const value400: IColorSet = [0.65, chromaValue, localHueAngle];
  const value500: IColorSet = [0.55, chromaValue, localHueAngle];
  const value600: IColorSet = [0.45, chromaValue, localHueAngle];
  const value700: IColorSet = [0.35, chromaValue, localHueAngle];
  const value800: IColorSet = [0.25, chromaValue, localHueAngle];
  const value900: IColorSet = [0.15, chromaValue, localHueAngle];
  const valueBlack: IColorSet = [0, 0, localHueAngle];
  const palette: Record<string, IColorSet> = {
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

  return Object.fromEntries(
    Object.entries(palette).map(([label, [l, c, h]]) => {
      const [, name] = label.split("value");

      return [
        `--swatch--dynamic--${name.toLowerCase()}`,
        `oklch(${l} ${c} ${h})`,
      ];
    })
  );
}

export default function Home() {
  const [colorSpace, setColorSpace] = useState<IColorSpace>("oklch");
  const [hueAngle, setHueAngle] = useState(180);
  const [chromaValue, setChromaValue] = useState(0.18);
  const [saturationPercentage, setSaturationPercentage] = useState(75);
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

    return {
      ...harmony,
      style:
        colorSpace === "oklch"
          ? getOklchStyles(chromaValue, localHueAngle)
          : getHslStyles(saturationPercentage, localHueAngle),
    };
  });

  const textareaStyles = swatchPalettes
    .map((swatchPalette) =>
      Object.entries(swatchPalette.style)
        .slice(1, 10)
        .map(([key, value]) => {
          const [, , , swatchValue] = key.split("--");
          const customProperty = `--swatch--${swatchPalette.cssIdentifier}--${swatchValue}`;
          const fallbackValue = new Color(value)
            .to("srgb")
            .toString({ format: "hex" });

          return `${customProperty}: ${fallbackValue};\n${customProperty}: ${value};\n\n`;
        })
    )
    .flat()
    .join("")
    .trim();

  return (
    <div className={styles.page}>
      <header>
        <h1>OKLCH/HSL Color Palette Generator</h1>
        <a href="https://github.com/michaelcpuckett/oklab-color-palette-generator">
          Github
        </a>
      </header>
      <div>
        <h2>Configuration</h2>
        <ColorPickerForm
          setColorSpace={setColorSpace}
          colorSpace={colorSpace}
          setSaturationPercentage={setSaturationPercentage}
          saturationPercentage={saturationPercentage}
          setChromaValue={setChromaValue}
          chromaValue={chromaValue}
          setHueAngle={setHueAngle}
          hueAngle={hueAngle}
          setEnabledHarmonyTypes={setEnabledHarmonyTypes}
          enabledHarmonyTypes={enabledHarmonyTypes}
        />
        <hr />
        <h2>CSS Output</h2>
        <textarea readOnly value={textareaStyles} />
      </div>
      <main className={styles.main}>
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
      </main>
    </div>
  );
}
