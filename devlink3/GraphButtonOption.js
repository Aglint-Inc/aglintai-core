"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GraphButtonOption.module.css";

export function GraphButtonOption({
  as: _Component = _Builtin.Block,
  onClickWeek = {},
  isWeekVisible = true,
  onClickMonth = {},
  isMonthVisible = true,
  onClickYear = {},
  isYearVisible = true,
  onClickAllTime = {},
  isAllTimeVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1591")} tag="div">
      {isWeekVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1592")}
          tag="div"
          {...onClickWeek}
        >
          <_Builtin.Block tag="div">{"Past week"}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isMonthVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1592")}
          tag="div"
          {...onClickMonth}
        >
          <_Builtin.Block tag="div">{"Past month"}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isYearVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1592")}
          tag="div"
          {...onClickYear}
        >
          <_Builtin.Block tag="div">{"Past year"}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isAllTimeVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1592", "no-border")}
          tag="div"
          {...onClickAllTime}
        >
          <_Builtin.Block tag="div">{"All time"}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
