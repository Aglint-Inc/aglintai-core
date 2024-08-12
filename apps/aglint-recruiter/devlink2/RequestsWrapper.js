"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { NavigationPill } from "./NavigationPill";
import * as _utils from "./utils";
import _styles from "./RequestsWrapper.module.css";

export function RequestsWrapper({
  as: _Component = _Builtin.Block,
  slotFilter,
  slotRequestSection,
  slotNavigationPills,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "req-body-left-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-header-ra")}
        tag="div"
      >
        {slotFilter}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-left-body-wrap")}
        tag="div"
        id="outer-div"
      >
        {slotRequestSection}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_navigation_pills")}
        tag="div"
      >
        {slotNavigationPills ?? (
          <>
            <NavigationPill />
            <NavigationPill />
            <NavigationPill />
            <NavigationPill />
            <NavigationPill />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
