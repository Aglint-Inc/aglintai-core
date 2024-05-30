"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AvailabilityEmpty.module.css";

export function AvailabilityEmpty({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1717")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "text-grey-600")} tag="div">
        {"Slot of the selected dates will appear here."}
      </_Builtin.Block>
    </_Component>
  );
}
