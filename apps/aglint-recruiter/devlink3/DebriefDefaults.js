"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithIcon } from "./TextWithIcon";
import { Text } from "./Text";
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
        <TextWithIcon
          textContent="Debrief Defaults"
          iconWeight="medium"
          fontWeight="medium"
          iconName="forum"
          iconSize="4"
        />
        <Text
          content="Setup a default company wide setting for scheduling debrief sessions."
          weight=""
          color="neutral"
        />
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
