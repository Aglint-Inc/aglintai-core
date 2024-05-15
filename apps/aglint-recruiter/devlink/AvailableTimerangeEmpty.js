"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AvailableTimerangeEmpty.module.css";

export function AvailableTimerangeEmpty({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "timerange_empty")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "text-grey-400")} tag="div">
        {"No slots available"}
      </_Builtin.Block>
    </_Component>
  );
}
