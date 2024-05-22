"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { RoleList } from "./RoleList";
import * as _utils from "./utils";
import _styles from "./JobRole.module.css";

export function JobRole({
  as: _Component = _Builtin.Block,
  onClickEdit = {},
  slotRoleList,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1710")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1711")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "text-grey_600")}
          tag="div"
        >
          {"Hiring Team"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1712")}
        tag="div"
      >
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
