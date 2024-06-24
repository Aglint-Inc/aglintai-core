"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./IconButtonSolid.module.css";

export function IconButtonSolid({
  as: _Component = _Builtin.Block,
  size = "2",
  color = "accent",
  highContrast = "false",
  iconSize = "4",
  iconWeight = "medium",
  iconColor = "inherit",
  iconName = "shapes",
  onClickButton = {},
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
      {...onClickButton}
    >
      <_Builtin.Block tag="div">
        <GlobalIcon
          size={iconSize}
          weight={iconWeight}
          color={iconColor}
          iconName={iconName}
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
              size={iconSize}
              weight={iconWeight}
              color={iconColor}
              iconName={iconName}
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
            src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/665d6d6ac63854bb312ed8b2_kOnzy.gif"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
