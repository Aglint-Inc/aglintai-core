"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AvailableTimeRangeLoader.module.css";

export function AvailableTimeRangeLoader({
  as: _Component = _Builtin.Block,
  slotSkeleton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "time_range_available", "fixed_loader")}
      tag="div"
    >
      {slotSkeleton ?? (
        <_Builtin.Block
          className={_utils.cx(_styles, "relative_2", "ehfeiruytfivrtf")}
          tag="div"
        >
          {"09:00 AM - 10:00 AM"}
        </_Builtin.Block>
      )}
    </_Component>
  );
}
