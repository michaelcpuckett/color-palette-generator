"use client";

import { ColorPickerForm } from "@/components/ColorPickerForm";
import { SwatchPalette } from "@/components/SwatchPalette";
import {
  harmonies,
  IColorProfile,
  IColorSet,
  IHarmonyType,
  ISwatchPalette,
} from "@/types";
import Color from "colorjs.io";
import { Fragment, useState } from "react";
import styles from "./page.module.css";

function getOklchStyles(
  chromaValue: number,
  localHueAngle: number,
  colorProfile: IColorProfile
) {
  const maxLightness = 0.975;
  const minLightness = 0.175;
  const numSwatches = 20;
  const lightnessStep = (maxLightness - minLightness) / (numSwatches - 1);

  const palette: Record<string, IColorSet> = Object.fromEntries(
    Array.from({ length: numSwatches }, (_, i) => {
      const paletteIndex = (numSwatches - (i + 1)) * 50;
      const lightness = minLightness + i * lightnessStep;

      return [`value${paletteIndex}`, [lightness, chromaValue, localHueAngle]];
    })
  );

  return Object.fromEntries(
    Object.entries(palette).map(([label, [l, c, h]]) => {
      const [, name] = label.split("value");
      const value = `oklch(${l} ${c} ${h})`;

      const profileValue = new Color(value).to(colorProfile).toString();

      return [`--swatch--dynamic--${name.toLowerCase()}`, profileValue];
    })
  );
}

function getFallbackStyles(style: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(style).map(([key, value]) => {
      const [, , , swatchValue] = key.split("--");
      const customProperty = `--swatch--dynamic--${swatchValue}`;

      const fallbackValue = new Color(value)
        .to("srgb")
        .toString({ format: "hex" });

      return [customProperty, fallbackValue];
    })
  );
}

export default function Home() {
  const [colorProfile, setColorProfile] = useState<IColorProfile>("p3");
  const [hueAngle, setHueAngle] = useState(0);
  const [chromaValue, setChromaValue] = useState(0.1);
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
    const style = getOklchStyles(chromaValue, localHueAngle, colorProfile);

    return {
      ...harmony,
      fallbackStyle: getFallbackStyles(style),
      style,
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

        return `${customProperty}: ${fallbackValue};\n${
          colorProfile === "p3"
            ? `\n@supports (color: color(display-p3 0 0 1)) {\n  ${customProperty}: ${value};\n}\n\n`
            : ""
        }`;
      })
    )
    .flat()
    .join("")
    .trim();

  return (
    <Fragment>
      <header>
        <h1>Color Palette Generator</h1>
        <details>
          <summary>About</summary>
          <div>
            <p>
              This tool creates color palettes using the OKLab color space. The
              primary palette is defined in cylindrical (LCH) terms by
              specifying a Hue angle and Chroma value. Lightness values are
              evenly distributed across 20 swatches.
            </p>
            <p>
              Color harmonies are based on the primary palette. The tool
              generates complementary, split-complementary, triadic, tetradic,
              and analogous palettes. Each harmony is defined by an angle offset
              from the primary palette.
            </p>
            <p>
              The tool generates CSS custom properties for each color in the
              palette, so you can easily use the colors in web projects. The
              tool also generates fallback colors in sRGB for browsers that do
              not support the OKlab color space. The fallback colors are
              included in the CSS output.
            </p>
            <p>
              See the code on{" "}
              <a href="https://github.com/michaelcpuckett/oklab-color-palette-generator">
                Github
              </a>
              .
            </p>
            <h2>Useful MDN Links</h2>
            <ul>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Glossary/Color_space"
                  target="_blank"
                >
                  Color Spaces
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch"
                  target="_blank"
                >
                  oklch() CSS Function
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color"
                  target="_blank"
                >
                  color() CSS Function
                </a>
              </li>
            </ul>
          </div>
        </details>
      </header>
      <main className={styles.page}>
        <h2>Configuration</h2>
        <ColorPickerForm
          setColorProfile={setColorProfile}
          colorProfile={colorProfile}
          setChromaValue={setChromaValue}
          chromaValue={chromaValue}
          setHueAngle={setHueAngle}
          hueAngle={hueAngle}
          setEnabledHarmonyTypes={setEnabledHarmonyTypes}
          enabledHarmonyTypes={enabledHarmonyTypes}
        />
        <details aria-labelledby="summary--css-output">
          <summary id="summary--css-output">CSS Output</summary>
          <textarea readOnly value={textareaStyles} />
        </details>
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
