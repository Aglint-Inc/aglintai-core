"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DebriefDefaults.module.css";

export function DebriefDefaults({
  as: _Component = _Builtin.Block,
  slotSidedrawerBodyDebrief,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "debrief_company_settings")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "debrief_title")} tag="div">
        <_Builtin.Block tag="div">{"Debrief Defaults"}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {
            "Setup a default company wide setting for scheduling debrief sessions."
          }
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_sidedrawerbodydebrief")}
        tag="div"
      >
        {slotSidedrawerBodyDebrief}
      </_Builtin.Block>
    </_Component>
  );
}
