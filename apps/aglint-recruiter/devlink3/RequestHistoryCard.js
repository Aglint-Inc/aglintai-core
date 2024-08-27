"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./RequestHistoryCard.module.css";

export function RequestHistoryCard({
  as: _Component = _Builtin.Block,
  slotStatus,
  slotAssignedTo,
  textHistory = "Qorem ipsum dolor sit amet, consectetur adipiscing elit adipiscing elit.",
  onClickCard = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "req-history-cards-wrap")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "req-history-card-header")}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotStatus}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "req-history-assign")}
          tag="div"
        >
          <Text weight="regular" color="neutral" content="Assigned to " />
          <_Builtin.Block tag="div">{slotAssignedTo}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <Text content={textHistory} weight="regular" />
      </_Builtin.Block>
    </_Component>
  );
}
