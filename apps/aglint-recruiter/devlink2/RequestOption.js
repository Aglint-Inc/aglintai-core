"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalBadge } from "./GlobalBadge";
import * as _utils from "./utils";
import _styles from "./RequestOption.module.css";

export function RequestOption({
  as: _Component = _Builtin.Block,
  textOption = "Urgent Requests:",
  slotCountBadge,
}) {
  return (
    <_Component className={_utils.cx(_styles, "req-tab-pill-wrap")} tag="div">
      <Text content={textOption} size="3" weight="regular" />
      <_Builtin.Block tag="div">
        {slotCountBadge ?? <GlobalBadge />}
      </_Builtin.Block>
    </_Component>
  );
}
