"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./AvailableOptionCardDate.module.css";

export function AvailableOptionCardDate({
  as: _Component = _Builtin.Block,
  textMonth = "February",
  textDate = "27",
  textDay = "FRIDAY",
  slotOptionAvailable,
  isDateWrapVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1104")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1274")}
        tag="div"
      >
        {isDateWrapVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1108")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600", "text-sm")}
              tag="div"
            >
              {textMonth}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-20", "fw-semibold")}
              tag="div"
            >
              {textDate}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xsm")}
              tag="div"
            >
              {textDay}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1110")}
        tag="div"
      >
        {slotOptionAvailable ?? <SlotComp componentName="OptionAvailable" />}
      </_Builtin.Block>
    </_Component>
  );
}
