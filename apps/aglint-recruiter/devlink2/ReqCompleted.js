"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { IconButtonSoft } from "./IconButtonSoft";
import * as _utils from "./utils";
import _styles from "./ReqCompleted.module.css";

export function ReqCompleted({
  as: _Component = _Builtin.Block,
  textTitle = "This is a global text component",
  textDesc = "This is a global text component",
  onClickArrow = {},
  slotTextwithIcon,
  isDetailListVisible = false,
  isDropIconVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "req-dash-bottom-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1737")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <Text content={textTitle} size="3" color="success" />
          <Text content={textDesc} color="neutral" weight="regular" />
        </_Builtin.Block>
        {isDropIconVisible ? (
          <_Builtin.Block tag="div" {...onClickArrow}>
            <IconButtonSoft
              iconName="keyboard_double_arrow_down"
              color="neutral"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isDetailListVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1738")}
          tag="div"
        >
          {slotTextwithIcon}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
