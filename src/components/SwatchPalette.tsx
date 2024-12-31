import { ISwatchPalette } from "@/types";
import { Fragment } from "react";
import styles from "./SwatchPalette.module.css";

export function SwatchPalette({
  numSwatches,
  swatchPalette: { label, style, angleOffset },
}: {
  numSwatches: number;
  swatchPalette: ISwatchPalette;
}) {
  const lightnessValues = Array.from(
    { length: numSwatches },
    (_, i) => i * Math.floor(1000 / (numSwatches - 1))
  );

  return (
    <Fragment>
      <h3>
        {label} - {angleOffset}°
      </h3>
      <ul role="list" className={styles.swatches} style={style}>
        {lightnessValues.map((lightnessValue) => (
          <li
            key={lightnessValue}
            className={`swatch swatch--${lightnessValue}`}
          >
            <div
              style={{
                backgroundColor: `var(--swatch--dynamic--${lightnessValue})`,
              }}
            />
            <small>
              <span className="visually-hidden">Swatch </span>
              {lightnessValue}
            </small>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}
