"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./AvailableTimeRange.module.css";

export function AvailableTimeRange({
  as: _Component = _Builtin.Block,
  isActive = false,
  textTime = "09:00 - 10:00 AM",
  isSemiActive = false,
  onClickTime = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "time_range_available")}
      tag="div"
      {...onClickTime}
    >
      <_Builtin.Block className={_utils.cx(_styles, "relative_2")} tag="div">
        <Text content={textTime} align="center" />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "default_bg")} tag="div" />
      {isActive ? (
        <_Builtin.Block className={_utils.cx(_styles, "active_bg")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "relative_2")}
            tag="div"
          >
            <Text content={textTime} />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isSemiActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "semi-active-bg")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "relative_2")}
            tag="div"
          >
            <Text content={textTime} color="" />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "dp-minus-wrap")}
          tag="div"
          {...onClickTime}
        >
          <GlobalIcon iconName="remove" />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
