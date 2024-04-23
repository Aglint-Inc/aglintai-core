"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TaskDate.module.css";

export function TaskDate({
  as: _Component = _Builtin.Block,
  onClickSpecificDate = {},
  isSpecificDateActive = false,
  onClickInDateRange = {},
  isInDateRangeActive = true,
  slotDate,
  textButton1 = "Specific date",
  textButton2 = "In a date range",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1509")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1517")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1518")}
          tag="div"
          {...onClickSpecificDate}
        >
          {isSpecificDateActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1519")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "relative-1")}
            tag="div"
          >
            {textButton1}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1518")}
          tag="div"
          {...onClickInDateRange}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "relative-1")}
            tag="div"
          >
            {textButton2}
          </_Builtin.Block>
          {isInDateRangeActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1519", "right")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotDate}</_Builtin.Block>
    </_Component>
  );
}
