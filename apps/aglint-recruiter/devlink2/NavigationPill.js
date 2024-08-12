"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithIcon } from "./TextWithIcon";
import * as _utils from "./utils";
import _styles from "./NavigationPill.module.css";

export function NavigationPill({
  as: _Component = _Builtin.Block,
  iconName = "shapes",
  textPill = "This is a global text component",
  textCount = "3",
  onClickPill = {},
  attributeValue,
  showNumberCount = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "navigation_pill")}
      tag="div"
      data-req-button={attributeValue}
      {...onClickPill}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "navigation_name")}
        tag="div"
      >
        <TextWithIcon iconName={iconName} textContent={textPill} fontSize="1" />
      </_Builtin.Block>
      {showNumberCount ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "number_count")}
          tag="div"
        >
          <_Builtin.Block tag="div">{textCount}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
