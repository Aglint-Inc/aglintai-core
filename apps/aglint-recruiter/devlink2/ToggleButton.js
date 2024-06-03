"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ToggleButton.module.css";

export function ToggleButton({
  as: _Component = _Builtin.Block,
  onclickToggle = {},
  isInactive = true,
  isActive = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "toggle-button-wrapper")}
      tag="div"
      {...onclickToggle}
    >
      {isInactive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "toggle-button")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "toggle-dot")}
            tag="div"
          />
        </_Builtin.Block>
      ) : null}
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "toggle-button", "active")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "toggle-dot")}
            tag="div"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
