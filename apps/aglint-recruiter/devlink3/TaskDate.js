"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
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
    <_Component className={_utils.cx(_styles, "date-range-widget")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "date-range-switcher")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "date-range-switcher-tab")}
          tag="div"
          {...onClickSpecificDate}
        >
          {isSpecificDateActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1519")}
              tag="div"
            />
          ) : null}
          <Text content={textButton1} weight="" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "date-range-switcher-tab")}
          tag="div"
          {...onClickInDateRange}
        >
          <Text content={textButton2} weight="" />
          {isInDateRangeActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1519", "right")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {slotDate ?? <SlotComp componentNeme="MUI Calander" />}
      </_Builtin.Block>
    </_Component>
  );
}
