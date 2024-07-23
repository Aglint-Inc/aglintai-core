"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CdFeedback.module.css";

export function CdFeedback({
  as: _Component = _Builtin.Block,
  slotHeader,
  slotBody,
}) {
  return (
    <_Component className={_utils.cx(_styles, "cdfeedback-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cdf-header-wrap")}
        tag="div"
      >
        {slotHeader}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "cdf-body-wrap")} tag="div">
        {slotBody}
      </_Builtin.Block>
    </_Component>
  );
}
