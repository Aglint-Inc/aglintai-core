"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./Filter.module.css";

export function Filter({
  as: _Component = _Builtin.Block,
  onClickAddFilter = {},
  onClickApplyFilter = {},
  slotFilter,
  isApplyFilterDisable = true,
  isFilterEmpty = false,
  slotButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "add-filter-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "relative")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-add-filter")}
          tag="div"
        >
          {slotFilter}
        </_Builtin.Block>
        {isFilterEmpty ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "empty-filter-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "color-grey-600")}
              tag="div"
            >
              {"No filters have been added. Click 'add filter' to add one."}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "filter-wraps-add")}
        tag="div"
      >
        {slotButton ?? (
          <>
            <SlotComp componentName="ButtonGhost" />
            <SlotComp componentName="ButtonSolid" />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
