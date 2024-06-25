"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
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
    <_Component className={_utils.cx(_styles, "date-picker-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "dp-inactive-wrap")}
        tag="div"
        {...onClickDate}
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
          className={_utils.cx(_styles, "dp-inactive-wrap", "active")}
          tag="div"
          {...onClickDate}
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
          className={_utils.cx(_styles, "dp-disable-wrap")}
          tag="div"
        />
      ) : null}
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "dp-minus-wrap")}
          tag="div"
          {...onClickDate}
        >
          <GlobalIcon iconName="remove" />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
