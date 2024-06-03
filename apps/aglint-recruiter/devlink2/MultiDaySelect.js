"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./MultiDaySelect.module.css";

export function MultiDaySelect({
  as: _Component = _Builtin.Block,
  slotCandidateScheduleCard,
  slotPrimaryButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1732")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1731")}
        tag="div"
      >
        {slotCandidateScheduleCard ?? (
          <SlotComp componentName="CandidateScheduleCard from Devlink 1" />
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1733")}
        tag="div"
      >
        {slotPrimaryButton ?? <SlotComp componentName="PrimaryButton" />}
      </_Builtin.Block>
    </_Component>
  );
}
