"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./IconButtonSoft.module.css";

export function IconButtonSoft({
  as: _Component = _Builtin.Block,
  size = "2",
  color = "accent",
  highContrast = "false",
  isDisabled = false,
  isLoading = false,
  iconSize = "4",
  iconWeight = "medium",
  iconColor = "inherit",
  iconName = "shapes",
  onClickButton = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "radix-button")}
      tag="div"
      icon-button-size-soft={size}
      button-color-soft={color}
      button-high-contrast-soft={highContrast}
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
          icon-button-size-soft={size}
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
          icon-button-size-soft={size}
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
