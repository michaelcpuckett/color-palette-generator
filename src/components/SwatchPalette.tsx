import { ISwatchPalette } from "@/types";
import { Fragment } from "react";
import styles from "./SwatchPalette.module.css";

const lightnessValues = [
  0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750,
  800, 850, 900, 950,
];

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
