"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { PriorityPill } from "./PriorityPill";
import * as _utils from "./utils";
import _styles from "./PriorityOption.module.css";

export function PriorityOption({
  as: _Component = _Builtin.Block,
  onClickHigh = {},
  onClickMedium = {},
  onClickLow = {},
  textScheduleHigh = "Schedule within 24 hours",
  textScheduleMedium = "Schedule within 48 hours",
  textScheduleLow = "Schedule within 2 days",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1541")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1542")}
        tag="div"
        {...onClickHigh}
      >
        <_Builtin.Block tag="div">
          <PriorityPill />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey_600", "text-sm")}
          tag="div"
        >
          {textScheduleHigh}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1542")}
        tag="div"
        {...onClickMedium}
      >
        <_Builtin.Block tag="div">
          <PriorityPill isHighVisible={false} isMediumVisible={true} />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey_600", "text-sm")}
          tag="div"
        >
          {textScheduleMedium}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1543")}
          tag="div"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1542")}
        tag="div"
        {...onClickLow}
      >
        <_Builtin.Block tag="div">
          <PriorityPill isLowVisible={true} isHighVisible={false} />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey_600", "text-sm")}
          tag="div"
        >
          {textScheduleLow}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
