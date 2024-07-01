"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./TextWithIcon.module.css";

export function TextWithIcon({
  as: _Component = _Builtin.Block,
  fontWeight,
  textContent = "This is a global text component",
  iconName = "shapes",
  iconSize = "3",
  slotIcon,
  color = "neutral-12",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "text_with_icon")}
      tag="div"
      data-color={color}
    >
      <_Builtin.Block className={_utils.cx(_styles, "slot_icon")} tag="div">
        {slotIcon ?? (
          <GlobalIcon size={iconSize} iconName={iconName} weight="light" />
        )}
      </_Builtin.Block>
      <Text weight={fontWeight} content={textContent} color="" />
    </_Component>
  );
}
