"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./TextWithIcon.module.css";

export function TextWithIcon({
  as: _Component = _Builtin.Block,
  color = "neutral-12",
  fontWeight,
  textContent = "This is a global text component",
  iconName = "shapes",
  iconSize = "2",
  slotIcon,
  iconWeight = "medium",
  iconColor = "inherit",
  fontSize = "2",
  fontColor = "inherit",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "text_with_icon")}
      id={_utils.cx(
        _styles,
        "w-node-_978154f6-fd85-cdc5-810b-078c750d7fc1-750d7fc1"
      )}
      tag="div"
      data-color={color}
    >
      <_Builtin.Block className={_utils.cx(_styles, "slot_icon")} tag="div">
        {slotIcon ?? (
          <GlobalIcon
            iconName={iconName}
            size={iconSize}
            weight={iconWeight}
            color={iconColor}
          />
        )}
      </_Builtin.Block>
      <Text
        weight={fontWeight}
        content={textContent}
        size={fontSize}
        color={fontColor}
      />
    </_Component>
  );
}
