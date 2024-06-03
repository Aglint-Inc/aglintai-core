"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { LoadedSlotPill } from "./LoadedSlotPill";
import * as _utils from "./utils";
import _styles from "./LoadedSlots.module.css";

export function LoadedSlots({
  as: _Component = _Builtin.Block,
  slotLoadedSlotPill,
  textDay = "17 Monday",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-866")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "text-lg", "fw-semibold")}
        tag="div"
      >
        {textDay}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-868")} tag="div">
        {slotLoadedSlotPill ?? <LoadedSlotPill />}
      </_Builtin.Block>
    </_Component>
  );
}
