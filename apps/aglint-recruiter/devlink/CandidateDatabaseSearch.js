"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./CandidateDatabaseSearch.module.css";

export function CandidateDatabaseSearch({
  as: _Component = _Builtin.Block,
  slotNavSublink,
  slotSearchAglintCd,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "search-wrap-candidate")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "job-header-empty")}
        tag="div"
      >
        <Text weight="bold" content="Sourcing Hub" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate-empty-landing-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "new-layout-sublink")}
          tag="div"
        >
          {slotNavSublink}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cd-right-wrap")}
          tag="div"
        >
          {slotSearchAglintCd ?? <SlotComp componentName="SearchAglintCd" />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
