import { ISwatchPalette } from "@/types";
import { Fragment } from "react";
import styles from "./ExampleUi.module.css";

export function ExampleUi({
  swatchPalette: { label, oklchStyles },
}: {
  swatchPalette: ISwatchPalette;
}) {
  const cardMarkup = (
    <div className={styles.card}>
      <h3>Example</h3>
      <div className={styles.cardContent}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
          fermentum nunc. Nullam nec fermentum nunc. Nullam nec fermentum nunc.
        </p>
        <ul>
          <li>heading: swatch--800 / swatch--100</li>
          <li>content: black / swatch--100</li>
          <li>button: white / swatch--700</li>
        </ul>
      </div>
      <button type="button">Learn More ⟶</button>
    </div>
  );

  return (
    <Fragment>
      <h3>{label}</h3>
      <div className={styles.cards} style={oklchStyles}>
        {cardMarkup}
        {cardMarkup}
        {cardMarkup}
      </div>
    </Fragment>
  );
}

declare module "react" {
  interface HTMLAttributes<T>
    extends React.AriaAttributes,
      React.DOMAttributes<T> {
    shadowrootmode?: string;
  }

  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
