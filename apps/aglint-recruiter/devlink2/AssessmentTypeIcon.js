"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AssessmentTypeIcon.module.css";

export function AssessmentTypeIcon({
  as: _Component = _Builtin.Block,
  slotIcon,
}) {
  return (
    <_Component className={_utils.cx(_styles, "icon_wrapper")} tag="div">
      {slotIcon}
    </_Component>
  );
}
