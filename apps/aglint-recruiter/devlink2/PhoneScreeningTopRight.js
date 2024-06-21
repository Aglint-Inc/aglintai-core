"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./PhoneScreeningTopRight.module.css";

export function PhoneScreeningTopRight({
  as: _Component = _Builtin.Block,
  slotSearchInput,
  onClickAllCandidates = {},
  onClickNewScreening = {},
  slotButton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "phonescreeening_top_right")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "slot_search")} tag="div">
        {slotSearchInput}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "pstr-btn-wrap")} tag="div">
        {slotButton ?? (
          <>
            <SlotComp componentName="ButtonSoft" />
            <SlotComp componentName="ButtonSolid" />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
