import React from "react";

import _styles from "./PanelMember.module.css";

import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";

export function PanelMember({
  as: _Component = _Builtin.Block,
  textMemberName = "Member Name",
  slotMemberAvatar,
}) {
  return (
    <_Component className={_utils.cx(_styles, "panel_member")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "panel_member_avatar")}
        tag="div"
      >
        {slotMemberAvatar}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-lg", "fw-semibold")}
        tag="div"
      >
        {textMemberName}
      </_Builtin.Block>
    </_Component>
  );
}
