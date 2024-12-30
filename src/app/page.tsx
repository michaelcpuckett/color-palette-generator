"use client";

import { ColorPickerForm } from "@/components/ColorPickerForm";
import { SwatchPalette } from "@/components/SwatchPalette";
import {
  harmonies,
  IColorSet,
  IColorSpace,
  IHarmonyType,
  ISwatchPalette,
} from "@/types";
import Color from "colorjs.io";
import { Fragment, useState } from "react";
import styles from "./page.module.css";

function getHslStyles(saturationPercentage: number, localHueAngle: number) {
  const value100: IColorSet = [localHueAngle, saturationPercentage, 90];
  const value200: IColorSet = [localHueAngle, saturationPercentage, 80];
  const value300: IColorSet = [localHueAngle, saturationPercentage, 70];
  const value400: IColorSet = [localHueAngle, saturationPercentage, 60];
  const value500: IColorSet = [localHueAngle, saturationPercentage, 50];
  const value600: IColorSet = [localHueAngle, saturationPercentage, 40];
  const value700: IColorSet = [localHueAngle, saturationPercentage, 30];
  const value800: IColorSet = [localHueAngle, saturationPercentage, 20];
  const value900: IColorSet = [localHueAngle, saturationPercentage, 10];
  const palette: Record<string, IColorSet> = {
    value100,
    value200,
    value300,
    value400,
    value500,
    value600,
    value700,
    value800,
    value900,
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
  const maxLightness = 1;
  const minLightness = 0.1;
  const numSwatches = 8;
  const lightnessStep = (maxLightness - minLightness) / numSwatches;
  const value100: IColorSet = [
    Math.round(lightnessStep * 9 * 10) / 10,
    chromaValue,
    localHueAngle,
  ];
  const value200: IColorSet = [
    Math.round(lightnessStep * 8 * 10) / 10,
    chromaValue,
    localHueAngle,
  ];
  const value300: IColorSet = [
    Math.round(lightnessStep * 7 * 10) / 10,
    chromaValue,
    localHueAngle,
  ];
  const value400: IColorSet = [
    Math.round(lightnessStep * 6 * 10) / 10,
    chromaValue,
    localHueAngle,
  ];
  const value500: IColorSet = [
    Math.round(lightnessStep * 5 * 10) / 10,
    chromaValue,
    localHueAngle,
  ];
  const value600: IColorSet = [
    Math.round(lightnessStep * 4 * 10) / 10,
    chromaValue,
    localHueAngle,
  ];
  const value700: IColorSet = [
    Math.round(lightnessStep * 3 * 10) / 10,
    chromaValue,
    localHueAngle,
  ];
  const value800: IColorSet = [
    Math.round(lightnessStep * 2 * 10) / 10,
    chromaValue,
    localHueAngle,
  ];
  const value900: IColorSet = [
    Math.round(lightnessStep * 1 * 10) / 10,
    chromaValue,
    localHueAngle,
  ];
  const palette: Record<string, IColorSet> = {
    value100,
    value200,
    value300,
    value400,
    value500,
    value600,
    value700,
    value800,
    value900,
  };

  return Object.fromEntries(
    Object.entries(palette).map(([label, [l, c, h]]) => {
      const [, name] = label.split("value");
      const value = `oklch(${l} ${c} ${h})`;
      return [`--swatch--dynamic--${name.toLowerCase()}`, value];
    })
  );
}

export default function Home() {
  const [colorSpace, setColorSpace] = useState<IColorSpace>("oklch");
  const [hueAngle, setHueAngle] = useState(180);
  const [chromaValue, setChromaValue] = useState(0.1);
  const [saturationPercentage, setSaturationPercentage] = useState(75);
  const [enabledHarmonyTypes, setEnabledHarmonyTypes] = useState<
    IHarmonyType[]
  >(["complementary", "split", "triadic", "tetradic", "analogous"]);

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
      Object.entries(swatchPalette.style).map(([key, value]) => {
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
    <Fragment>
      <header>
        <h1>Color Palette Generator</h1>
        <a href="https://github.com/michaelcpuckett/oklab-color-palette-generator">
          Github
        </a>
      </header>
      <main className={styles.page}>
        <div>
          <details open aria-labelledby="summary--configuration">
            <summary id="summary--configuration">Configuration</summary>
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
            </div>
          </details>
          <details aria-labelledby="summary--css-output">
            <summary id="summary--css-output">CSS Output</summary>
            <textarea readOnly value={textareaStyles} />
          </details>
        </div>
        <div className="main">
          <h2>Swatch Palettes</h2>
          {swatchPalettes.map((swatchPalette) => (
            <SwatchPalette
              key={swatchPalette.label}
              swatchPalette={swatchPalette}
            ></SwatchPalette>
          ))}
        </div>
      </main>
    </Fragment>
  );
}
