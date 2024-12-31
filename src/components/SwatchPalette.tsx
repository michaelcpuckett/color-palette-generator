import { ISwatchPalette } from "@/types";
import { Fragment } from "react";
import styles from "./SwatchPalette.module.css";

const lightnessValues = Array.from({ length: 20 }, (_, i) => i * 50);

export function SwatchPalette({
  swatchPalette: { label, style, angleOffset },
}: {
  swatchPalette: ISwatchPalette;
}) {
  return (
    <Fragment>
      <h3>
        {label} - {angleOffset}°
      </h3>
      <div className={styles.swatches} style={style}>
        {lightnessValues.map((lightnessValue) => (
          <div
            key={lightnessValue}
            className={`swatch swatch--${lightnessValue}`}
          >
            <div
              style={{
                backgroundColor: `var(--swatch--dynamic--${lightnessValue})`,
              }}
            />
            <small>{lightnessValue}</small>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
