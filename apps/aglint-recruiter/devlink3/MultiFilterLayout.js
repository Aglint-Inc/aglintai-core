"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FilterItem } from "./FilterItem";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./MultiFilterLayout.module.css";

export function MultiFilterLayout({
  as: _Component = _Builtin.Block,
  slotFilterItem,
  onClickReset = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "multiple-filter-layout")}
      tag="div"
      box-shadow="4"
    >
      <_Builtin.Block className={_utils.cx(_styles, "mfl-top-wrap")} tag="div">
        {slotFilterItem ?? <FilterItem />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "mfl-bottom-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "reset-btn-wrap")}
          tag="div"
          {...onClickReset}
        >
          <_Builtin.Block tag="div">
            <GlobalIcon iconName="refresh" />
          </_Builtin.Block>
          <Text weight="medium" content="Reset" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
