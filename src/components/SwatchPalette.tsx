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
      <ul className={styles.swatches} style={style}>
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
