"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./RequestList.module.css";

export function RequestList({
  as: _Component = _Builtin.Block,
  iconName = "shapes",
  textTitle = "New Schedule Requestal text component",
  slotBadge,
  textCount = "13",
  onClickCard = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "req-dash-list-card")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "req-dash-list-card-left")}
        tag="div"
      >
        <GlobalIcon iconName={iconName} size="5" />
        <Text content={textTitle} weight="regular" />
        <_Builtin.Block tag="div">{slotBadge}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <Text content={textCount} size="3" />
      </_Builtin.Block>
    </_Component>
  );
}
