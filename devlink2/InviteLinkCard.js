import React from "react";
import * as _Builtin from "./_Builtin";
import { InvitePills } from "./InvitePills";
import * as _utils from "./utils";
import _styles from "./InviteLinkCard.module.css";

export function InviteLinkCard({
  as: _Component = _Builtin.Block,
  textDate = "27",
  textMonth = "February",
  textDay = "FRIDAY",
  slotInvitePills,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1158")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1161")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
          {textMonth}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-20", "fw-semibold")}
          tag="div"
        >
          {textDate}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "text-xsm")} tag="div">
          {textDay}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1160")}
        tag="div"
      >
        {slotInvitePills ?? <InvitePills />}
      </_Builtin.Block>
    </_Component>
  );
}
