"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./RoleList.module.css";

export function RoleList({
  as: _Component = _Builtin.Block,
  slotImage,
  textRoleHeader = "Hiring Manager",
  textName = "Devon Lane",
  textDesignation = "HR Manager",
}) {
  return (
    <_Component className={_utils.cx(_styles, "role-list-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "rl-wrap")} tag="div">
        <_Builtin.Block tag="div">{slotImage}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "rl-description")}
          tag="div"
        >
          <Text
            content={textName}
            size="2"
            color="neutral-12"
            weight="medium"
          />
          <Text content={textRoleHeader} size="1" color="neutral" weight="" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
