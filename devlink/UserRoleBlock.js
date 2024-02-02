import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./UserRoleBlock.module.css";

export function UserRoleBlock({
  as: _Component = _Builtin.Block,
  roleName = "Recruiter",
  permissionsNumber = "6/8",
  onClickProps = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "tu-role-block")}
      id={_utils.cx(
        _styles,
        "w-node-_6f093b60-cbb7-c451-fc49-a51ba7c34eb3-a7c34eb3"
      )}
      tag="div"
      {...onClickProps}
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-512")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "text-color-black")}
          tag="div"
        >
          {roleName}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "color-blue-600")}
          tag="div"
        >
          {"Edit"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600", "inline-text")}
          tag="div"
        >
          {permissionsNumber}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600", "inline-text")}
          tag="div"
        >
          {" Permissions"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
