"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DatePicker.module.css";

export function DatePicker({
  as: _Component = _Builtin.Block,
  textMonth = "Feb",
  textDate = "19",
  textDay = "Saturday",
  isActive = false,
  onClickDate = {},
  isDisable = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1720")}
      tag="div"
      {...onClickDate}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1719")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textMonth}</_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "text-30")} tag="div">
          {textDate}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
          {textDay}
        </_Builtin.Block>
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1719", "active")}
          tag="div"
        >
          <_Builtin.Block tag="div">{textMonth}</_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "text-30")} tag="div">
            {textDate}
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
            {textDay}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isDisable ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1726")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
