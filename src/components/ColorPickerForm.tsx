"use client";

import { IHarmonyType } from "@/types";
import { Dispatch, FormEventHandler, SetStateAction, useCallback } from "react";

export function ColorPickerForm({
  setNumSwatches,
  numSwatches,
  setChromaValue,
  chromaValue,
  setHueAngle,
  hueAngle,
  setEnabledHarmonyTypes,
  enabledHarmonyTypes,
}: {
  setNumSwatches: Dispatch<SetStateAction<number>>;
  numSwatches: number;
  setChromaValue: Dispatch<SetStateAction<number>>;
  chromaValue: number;
  setHueAngle: Dispatch<SetStateAction<number>>;
  hueAngle: number;
  setEnabledHarmonyTypes: Dispatch<SetStateAction<IHarmonyType[]>>;
  enabledHarmonyTypes: IHarmonyType[];
}) {
  const handleNumSwatchesChange = useCallback<FormEventHandler>(
    (event) => {
      const inputElement = event.target;

      if (!(inputElement instanceof HTMLInputElement)) {
        return;
      }

      const value = Number(inputElement.value);

      setNumSwatches(value);
    },
    [setNumSwatches]
  );

  const handleChromaValueChange = useCallback<FormEventHandler>(
    (event) => {
      const inputElement = event.target;

      if (!(inputElement instanceof HTMLInputElement)) {
        return;
      }

      const value = Number(inputElement.value);

      setChromaValue(value);
    },
    [setChromaValue]
  );

  const handleHueAngleChange = useCallback<FormEventHandler>(
    (event) => {
      const inputElement = event.target;

      if (!(inputElement instanceof HTMLInputElement)) {
        return;
      }

      const value = Number(inputElement.value);

      setHueAngle(value);
    },
    [setHueAngle]
  );

  const handleEnabledHarmonyTypesChange = useCallback<FormEventHandler>(
    (event) => {
      const inputElement = event.target;

      if (!(inputElement instanceof HTMLInputElement)) {
        return;
      }

      const isEnabled = inputElement.checked;
      const harmonyType = inputElement.value;

      if (isEnabled) {
        setEnabledHarmonyTypes([
          ...enabledHarmonyTypes,
          harmonyType as IHarmonyType,
        ]);
      } else {
        setEnabledHarmonyTypes(
          enabledHarmonyTypes.filter(
            (enabledHarmonyType) =>
              enabledHarmonyType !== (harmonyType as IHarmonyType)
          )
        );
      }
    },
    [setEnabledHarmonyTypes, enabledHarmonyTypes]
  );

  return (
    <form role="form">
      <details open>
        <summary>Base Color</summary>
        <fieldset>
          <legend>Base Color (LCH)</legend>
          <label>
            Hue
            <div>
              <input
                onChange={handleHueAngleChange}
                type="range"
                min="0"
                max="360"
                defaultValue={hueAngle}
                name="hueAngle"
                list="degree-markers"
              />
              <datalist id="degree-markers">
                <option value="0" label="0deg"></option>
                <option value="30" label="30deg"></option>
                <option value="60" label="60deg"></option>
                <option value="90" label="90deg"></option>
                <option value="120" label="120deg"></option>
                <option value="150" label="120deg"></option>
                <option value="180" label="180deg"></option>
                <option value="210" label="180deg"></option>
                <option value="240" label="240deg"></option>
                <option value="270" label="270deg"></option>
                <option value="300" label="300deg"></option>
                <option value="330" label="330deg"></option>
                <option value="360" label="360deg"></option>
              </datalist>
              <output>{hueAngle}°</output>
            </div>
          </label>
          <label>
            Chroma
            <div>
              <input
                onChange={handleChromaValueChange}
                type="range"
                min="0"
                max=".3"
                step=".01"
                defaultValue={chromaValue}
                name="chroma"
                list="decimal-markers"
              />
              <datalist id="decimal-markers">
                <option value="0" label="0"></option>
                <option value=".05" label=".05"></option>
                <option value=".1" label=".1"></option>
                <option value=".15" label=".15"></option>
                <option value=".2" label=".2"></option>
                <option value=".25" label=".25"></option>
                <option value=".3" label=".3"></option>
              </datalist>
              <output>{chromaValue}</output>
            </div>
          </label>
          <label>
            Count
            <div>
              <input
                onChange={handleNumSwatchesChange}
                type="range"
                min="3"
                max="41"
                step="1"
                defaultValue={numSwatches}
                name="chroma"
              />
              <output>{numSwatches}</output>
            </div>
          </label>
        </fieldset>
      </details>
      <details>
        <summary>Color Harmonies</summary>
        <fieldset>
          <legend>Harmonies</legend>
          <label>
            <input
              onInput={handleEnabledHarmonyTypesChange}
              type="checkbox"
              name="harmony"
              value="complementary"
            />
            <p>Complementary</p>
          </label>
          <label>
            <input
              onInput={handleEnabledHarmonyTypesChange}
              type="checkbox"
              name="harmony"
              value="analogous"
            />
            <p>Analogous</p>
          </label>
          <label>
            <input
              onInput={handleEnabledHarmonyTypesChange}
              type="checkbox"
              name="harmony"
              value="triadic"
            />
            <p>Triadic</p>
          </label>
          <label>
            <input
              onInput={handleEnabledHarmonyTypesChange}
              type="checkbox"
              name="harmony"
              value="split"
            />
            <p>Split Complementary</p>
          </label>
          <label>
            <input
              onInput={handleEnabledHarmonyTypesChange}
              type="checkbox"
              name="harmony"
              value="tetradic"
            />
            <p>Tetradic</p>
          </label>
        </fieldset>
      </details>
    </form>
  );
}
