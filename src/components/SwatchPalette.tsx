import { ISwatchPalette } from "@/types";
import { Fragment } from "react";
import styles from "./SwatchPalette.module.css";

export function SwatchPalette({
  swatchPalette: { label, style },
}: {
  swatchPalette: ISwatchPalette;
}) {
  return (
    <Fragment>
      <h3>{label}</h3>
      <div className={styles.swatches} style={style}>
        <div className="swatch swatch--white">
          <small>White</small>
        </div>
        <div className="swatch swatch--100">
          <small>100</small>
        </div>
        <div className="swatch swatch--200">
          <small>200</small>
        </div>
        <div className="swatch swatch--300">
          <small>300</small>
        </div>
        <div className="swatch swatch--400">
          <small>400</small>
        </div>
        <div className="swatch swatch--500">
          <small>500</small>
        </div>
        <div className="swatch swatch--600">
          <small>600</small>
        </div>
        <div className="swatch swatch--700">
          <small>700</small>
        </div>
        <div className="swatch swatch--800">
          <small>800</small>
        </div>
        <div className="swatch swatch--900">
          <small>900</small>
        </div>
        <div className="swatch swatch--black">
          <small>Black</small>
        </div>
      </div>
    </Fragment>
  );
}
