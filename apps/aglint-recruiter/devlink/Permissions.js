"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./Permissions.module.css";

export function Permissions({
  as: _Component = _Builtin.Block,
  textTitle = "Job permissions (7/8)",
  textDescription = "Manage the Jobs module.",
  slotToggleWithText,
}) {
  return (
    <_Component className={_utils.cx(_styles, "permission_card")} tag="div">
      <Text content={textTitle} />
      <Text content={textDescription} size="1" color="neutral" />
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_toggle_with_text")}
        tag="div"
      >
        {slotToggleWithText}
      </_Builtin.Block>
    </_Component>
  );
}
