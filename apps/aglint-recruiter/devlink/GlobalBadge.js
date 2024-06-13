"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./GlobalBadge.module.css";

export function GlobalBadge({
  as: _Component = _Builtin.Block,
  size = "1",
  color = "accent",
  variant = "soft",
  iconSize = "2",
  iconWeight = "medium",
  iconColor = "inherit",
  iconName = "shapes",
  showIcon = false,
  textBadge = "Badge Text",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "global_badge")}
      tag="div"
      badge-size={size}
      badge-color={color}
      badge-variant={variant}
    >
      {showIcon ? (
        <_Builtin.Block className={_utils.cx(_styles, "iconstart")} tag="div">
          <GlobalIcon
            size={iconSize}
            weight={iconWeight}
            color={iconColor}
            iconName={iconName}
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block tag="div">{textBadge}</_Builtin.Block>
    </_Component>
  );
}
