"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./RequestCard.module.css";

export function RequestCard({
  as: _Component = _Builtin.Block,
  slotBadgeNew,
  isNewBadgeVisible = true,
  textTitle = "This is a global text component",
  slotRightIcons,
  onClickCard = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "req-card-wrapper")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "req-card-wrapper-sub-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "req-card-wrapper-left")}
          tag="div"
        >
          {isNewBadgeVisible ? (
            <_Builtin.Block tag="div">{slotBadgeNew}</_Builtin.Block>
          ) : null}
          <Text content={textTitle} />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-card-right-icon")}
          tag="div"
        >
          {slotRightIcons}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
