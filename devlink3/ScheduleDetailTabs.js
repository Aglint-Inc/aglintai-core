"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ScheduleTabOverview } from "./ScheduleTabOverview";
import { NewTabPill } from "./NewTabPill";
import { ScheduleTabCandidateDetails } from "./ScheduleTabCandidateDetails";
import * as _utils from "./utils";
import _styles from "./ScheduleDetailTabs.module.css";

export function ScheduleDetailTabs({
  as: _Component = _Builtin.Block,
  slotDarkPills,
  slotTabContent,
  slotScheduleTabOverview,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1407")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1408")}
        tag="div"
      >
        {slotScheduleTabOverview ?? <ScheduleTabOverview />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "schedule_detail_block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "schedule_tabs", "gap-0")}
          tag="div"
        >
          {slotDarkPills ?? <NewTabPill />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scheduletab_content")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1365")}
            tag="div"
          >
            {slotTabContent ?? (
              <>
                <ScheduleTabOverview />
                <ScheduleTabCandidateDetails />
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
