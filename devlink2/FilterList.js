"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FilterPill } from "./FilterPill";
import { FilterItem } from "./FilterItem";
import * as _utils from "./utils";
import _styles from "./FilterList.module.css";

export function FilterList({
  as: _Component = _Builtin.Block,
  slotFilterPill,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "all-interview-filter")}
      tag="div"
    >
      {slotFilterPill ?? <FilterPill />}
    </_Component>
  );
}
