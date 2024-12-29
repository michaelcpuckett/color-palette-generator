import { ISwatchPalette } from "@/types";
import { Fragment } from "react";
import styles from "./SwatchPalette.module.css";

const lightnessValues = [100, 200, 300, 400, 500, 600, 700, 800, 900];

export function SwatchPalette({
  swatchPalette: { label, style },
}: {
  swatchPalette: ISwatchPalette;
}) {
  return (
    <Fragment>
      <h3>{label}</h3>
      <div className={styles.swatches} style={style}>
        {lightnessValues.map((lightnessValue) => (
          <div
            key={lightnessValue}
            className={`swatch swatch--${lightnessValue}`}
          >
            <small>{lightnessValue}</small>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
