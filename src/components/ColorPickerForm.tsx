"use client";

import { IColorProfile, IHarmonyType } from "@/types";
import { Dispatch, FormEventHandler, SetStateAction, useCallback } from "react";

export function ColorPickerForm({
  setColorProfile,
  colorProfile,
  setChromaValue,
  chromaValue,
  setHueAngle,
  hueAngle,
  setEnabledHarmonyTypes,
  enabledHarmonyTypes,
}: {
  setColorProfile: Dispatch<SetStateAction<IColorProfile>>;
  colorProfile: IColorProfile;
  setChromaValue: Dispatch<SetStateAction<number>>;
  chromaValue: number;
  setHueAngle: Dispatch<SetStateAction<number>>;
  hueAngle: number;
  setEnabledHarmonyTypes: Dispatch<SetStateAction<IHarmonyType[]>>;
  enabledHarmonyTypes: IHarmonyType[];
}) {
  const handleColorProfileChange = useCallback<FormEventHandler>(
    (event) => {
      const inputElement = event.target;

      if (!(inputElement instanceof HTMLInputElement)) {
        return;
      }

      const value = inputElement.value;

      setColorProfile(value as IColorProfile);
    },
    [setColorProfile]
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
      <fieldset>
        <legend>Base Color (LCH)</legend>
        <label>
          Hue (Angle)
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
          Chroma (Intensity)
          <div>
            <input
              onChange={handleChromaValueChange}
              type="range"
              min="0"
              max=".3"
              step=".01"
              defaultValue={chromaValue}
              name="chroma"
            />
            <output>{chromaValue}</output>
          </div>
        </label>
      </fieldset>
      <fieldset>
        <legend>Harmonies</legend>
        <label>
          <input
            onInput={handleEnabledHarmonyTypesChange}
            type="checkbox"
            defaultChecked
            name="harmony"
            value="complementary"
          />
          <p>
            Complementary <small>(180 degrees)</small>
          </p>
        </label>
        <label>
          <input
            onInput={handleEnabledHarmonyTypesChange}
            type="checkbox"
            defaultChecked
            name="harmony"
            value="analogous"
          />
          <p>
            Analogous <small>(30/60/90/270/300/330 degrees)</small>
          </p>
        </label>
        <label>
          <input
            onInput={handleEnabledHarmonyTypesChange}
            type="checkbox"
            defaultChecked
            name="harmony"
            value="triadic"
          />
          <p>
            Triadic <small>(120/240 degrees)</small>
          </p>
        </label>
        <label>
          <input
            onInput={handleEnabledHarmonyTypesChange}
            type="checkbox"
            defaultChecked
            name="harmony"
            value="split"
          />
          <p>
            Split Complementary <small>(150/210 degrees)</small>
          </p>
        </label>
        <label>
          <input
            onInput={handleEnabledHarmonyTypesChange}
            type="checkbox"
            defaultChecked
            name="harmony"
            value="tetradic"
          />
          <p>
            Tetradic
            <small>(90/180/270 degrees)</small>
          </p>
        </label>
      </fieldset>
      <fieldset>
        <legend>Color Profile</legend>
        <label>
          Display-P3 (Wide Gamut)
          <input
            onChange={handleColorProfileChange}
            name="colorProfile"
            type="radio"
            value="p3"
            defaultChecked={colorProfile === "p3"}
          />
        </label>
        <label>
          sRGB (Standard)
          <input
            onChange={handleColorProfileChange}
            name="colorProfile"
            type="radio"
            value="srgb"
            defaultChecked={colorProfile === "srgb"}
          />
        </label>
      </fieldset>
    </form>
  );
}
