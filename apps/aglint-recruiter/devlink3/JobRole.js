"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { RoleList } from "./RoleList";
import * as _utils from "./utils";
import _styles from "./JobRole.module.css";

export function JobRole({
  as: _Component = _Builtin.Block,
  onClickEdit = {},
  slotRoleList,
}) {
  return (
    <_Component className={_utils.cx(_styles, "job-role-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "jr-header-wrap")}
        tag="div"
      >
        <Text content="" weight="medium" color="neutral" />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "jr-body-wrap")} tag="div">
        {slotRoleList ?? (
          <>
            <RoleList />
            <RoleList />
            <RoleList />
            <RoleList />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
