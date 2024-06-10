"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FilterPageLayout.module.css";

export function FilterPageLayout({
  as: _Component = _Builtin.Block,
  slotFilter,
  slotBody,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "filter-page-layout-wrap")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "fpl-top-wrap")} tag="div">
        {slotFilter}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "fpl-body-wrap")} tag="div">
        {slotBody}
      </_Builtin.Block>
    </_Component>
  );
}
