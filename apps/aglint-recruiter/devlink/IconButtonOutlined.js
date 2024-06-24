"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./IconButtonOutlined.module.css";

export function IconButtonOutlined({
  as: _Component = _Builtin.Block,
  iconSize = "4",
  iconWeight = "medium",
  iconColor = "inherit",
  iconName = "shapes",
  size = "2",
  color = "accent",
  highContrast = "false",
  isLoading = false,
  isDisabled = false,
  onClickButton = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "radix-button")}
      tag="div"
      icon-button-size-outline={size}
      button-color-outline={color}
      button-high-contrast-outline={highContrast}
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
          icon-button-size-outline={size}
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
          icon-button-size-outline={size}
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "loader_place_holder")}
            width="auto"
            height="auto"
            loading="lazy"
            alt=""
            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/665d7ff94b360c4b8af3b8f8_kOnzy.gif"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
