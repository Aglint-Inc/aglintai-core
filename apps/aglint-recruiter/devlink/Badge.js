"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./Badge.module.css";

export function Badge({
  as: _Component = _Builtin.Block,
  colorProps = {},
  text = "⚒️ Skilled",
  slotIcon,
  isIcon = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "badge")}
      tag="div"
      {...colorProps}
    >
      {isIcon ? (
        <_Builtin.Block className={_utils.cx(_styles, "badge_icon")} tag="div">
          {slotIcon}
        </_Builtin.Block>
      ) : null}
      <Text content={text} size="1" />
    </_Component>
  );
}
