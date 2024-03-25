import React from "react";
import * as _Builtin from "./_Builtin";
import { DarkPill } from "./DarkPill";
import { ScheduleTabOverview } from "./ScheduleTabOverview";
import { ScheduleTabCandidateDetails } from "./ScheduleTabCandidateDetails";
import * as _utils from "./utils";
import _styles from "./ScheduleDetailTabs.module.css";

export function ScheduleDetailTabs({
  as: _Component = _Builtin.Block,
  slotDarkPills,
  slotTabContent,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "schedule_detail_block")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "schedule_tabs")} tag="div">
        {slotDarkPills ?? (
          <>
            <DarkPill textPill="Overview" isActive={true} />
            <DarkPill isActive={false} textPill="Candidate Details" />
            <DarkPill textPill="Instructions" />
            <DarkPill textPill="Feedback" />
          </>
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "scheduletab_content")}
        tag="div"
      >
        {slotTabContent ?? (
          <>
            <ScheduleTabOverview />
            <ScheduleTabCandidateDetails />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
