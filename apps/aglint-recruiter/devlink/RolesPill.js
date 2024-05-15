"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RolesPill.module.css";

export function RolesPill({
  as: _Component = _Builtin.Block,
  textRoles = "CSS",
  onClickRemoveRoles = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "", "cj-suggested-roles-block")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "")} tag="div">
        {textRoles}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "plus---12px-icon", "clickable")}
        tag="div"
        {...onClickRemoveRoles}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icon-embed")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%209.35355C2.84171%209.54882%203.15829%209.54882%203.35355%209.35355L6%206.70711L8.64645%209.35355C8.84171%209.54882%209.15829%209.54882%209.35355%209.35355C9.54882%209.15829%209.54882%208.84171%209.35355%208.64645L6.70711%206L9.35355%203.35355C9.54882%203.15829%209.54882%202.84171%209.35355%202.64645C9.15829%202.45118%208.84171%202.45118%208.64645%202.64645L6%205.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L5.29289%206L2.64645%208.64645C2.45118%208.84171%202.45118%209.15829%202.64645%209.35355Z%22%20fill%3D%22%230F3554%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
    </_Component>
  );
}
