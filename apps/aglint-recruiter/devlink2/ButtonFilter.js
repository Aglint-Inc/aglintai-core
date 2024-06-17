"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ButtonFilter.module.css";

export function ButtonFilter({
  as: _Component = _Builtin.Block,
  onClickStatus = {},
  slotLeftIcon,
  slotRightIcon,
  textLabel = "Status",
  isDotVisible = false,
  isActive = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "schedul-type")}
      tag="div"
      {...onClickStatus}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "relative-1", "icon-center")}
        tag="div"
      >
        {slotLeftIcon}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "relative-1")} tag="div">
        <Text content={textLabel} weight="" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "relative-1", "icon-center")}
        tag="div"
      >
        {slotRightIcon}
      </_Builtin.Block>
      {isDotVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "dot-indicator")}
          tag="div"
        />
      ) : null}
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "active-filter-btn")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
