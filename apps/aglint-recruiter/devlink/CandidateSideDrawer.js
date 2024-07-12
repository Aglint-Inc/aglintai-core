"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./CandidateSideDrawer.module.css";

export function CandidateSideDrawer({
  as: _Component = _Builtin.Block,
  slotNewTabPill,
  slotTabContent,
  slotBasicInfo,
  slotTopBar,
  isTabs = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "candiate-side-drawer-wrapper")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "slot_topbar")} tag="div">
        {slotTopBar ?? (
          <>
            <SlotComp />
            <SlotComp componentName="CandidateSidedrawerTop" />
          </>
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_cd_basic_info")}
        tag="div"
      >
        {slotBasicInfo ?? <SlotComp componentName="CandidateBasicInfo" />}
      </_Builtin.Block>
      {isTabs ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_newtab_pill")}
          tag="div"
        >
          {slotNewTabPill ?? <SlotComp componentName="Newtab_pill" />}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_tabcontents")}
        tag="div"
      >
        {slotTabContent ?? (
          <_Builtin.Block
            className={_utils.cx(_styles, "candidate_details")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "badges_and_overview")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "candidate_badges")}
                tag="div"
              >
                <SlotComp componentName="Badge" />
                <SlotComp componentName="Badge" />
                <SlotComp componentName="Badge" />
              </_Builtin.Block>
              <SlotComp componentName="CandidateOverview" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "other_details")}
              tag="div"
            >
              <SlotComp componentName="CandidateDetail (analysis)" />
              <SlotComp componentName="CandidateDetail (experience)" />
              <SlotComp componentName="CandidateDetail (education)" />
              <SlotComp componentName="CandidateDetail (skills)" />
            </_Builtin.Block>
          </_Builtin.Block>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
