"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./IconButtonOutlined.module.css";

export function IconButtonOutlined({
  as: _Component = _Builtin.Block,
  iconName = "shapes",
  iconSize = "4",
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
      icon-button-size-outline={size}
      button-color-outline={color}
      button-high-contrast-outline={highContrast}
    >
      <_Builtin.Block tag="div">
        <GlobalIcon
          iconName={iconName}
          size={iconSize}
          weight={iconWeight}
          color={iconColor}
        />
      </_Builtin.Block>
      {isDisabled ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "disabled_state")}
          tag="div"
          icon-button-size-outline={size}
        >
          <_Builtin.Block tag="div">
            <GlobalIcon
              iconName={iconName}
              size={iconSize}
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
          icon-button-size-outline={size}
        >
          <_Builtin.Block tag="div">
            <_Builtin.Image
              className={_utils.cx(_styles, "loader_place_holder")}
              width="auto"
              height="auto"
              loading="lazy"
              alt=""
              src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/665d54fd36db641586a0319a_kOnzy.gif"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
