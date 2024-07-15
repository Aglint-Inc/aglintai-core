"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./FilterOption.module.css";

export function FilterOption({
  as: _Component = _Builtin.Block,
  onClickCancelInvite = {},
  isCancelInviteVisible = true,
  slotIcon,
  text = "Cancel Invite",
  color = "error",
}) {
  return isCancelInviteVisible ? (
    <_Component
      className={_utils.cx(_styles, "team-action-item")}
      tag="div"
      {...onClickCancelInvite}
    >
      <_Builtin.Block tag="div">{slotIcon}</_Builtin.Block>
      <Text content={text} color={color} />
    </_Component>
  ) : null;
}
