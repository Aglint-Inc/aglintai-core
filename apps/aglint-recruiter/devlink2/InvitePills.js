import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InvitePills.module.css";

export function InvitePills({
  as: _Component = _Builtin.Block,
  textTime = "09:00 AM to 09:30 PM",
  textTitle = "Personality and culture",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1159")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "text-grey-600")} tag="div">
        {textTime}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {textTitle}
      </_Builtin.Block>
    </_Component>
  );
}
