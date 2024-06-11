"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./IconButtonSolid.module.css";

export function IconButtonSolid({
  as: _Component = _Builtin.Block,
  iconName = "shapes",
  iconsize = "4",
  iconWeight = "medium",
  iconColor = "inherit",
  size = "2",
  color = "accent",
  highContrast = "false",
  isDisabled = false,
  isLoading = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "radix-button")}
      tag="div"
      icon-button-size-solid={size}
      button-color-solid={color}
      button-high-contrast-solid={highContrast}
    >
      <_Builtin.Block tag="div">
        <GlobalIcon
          iconName={iconName}
          size={iconsize}
          weight={iconWeight}
          color={iconColor}
        />
      </_Builtin.Block>
      {isDisabled ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "disabled_state")}
          tag="div"
          icon-button-size-solid={size}
        >
          <_Builtin.Block tag="div">
            <GlobalIcon
              iconName={iconName}
              size={iconsize}
              weight={iconWeight}
              color={iconColor}
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isLoading ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "loading_state")}
          tag="div"
          icon-button-size-solid={size}
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "loader_place_holder")}
            width="auto"
            height="auto"
            loading="lazy"
            alt=""
            src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/665d54fd36db641586a0319a_kOnzy.gif"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
