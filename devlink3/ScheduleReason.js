"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ScheduleReasonSection } from "./ScheduleReasonSection";
import * as _utils from "./utils";
import _styles from "./ScheduleReason.module.css";

export function ScheduleReason({
  as: _Component = _Builtin.Block,
  slotReasonList,
  slotScheduleReasonSection,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1669")} tag="div">
      {slotScheduleReasonSection ?? (
        <>
          <ScheduleReasonSection
            slotReasonList={slotReasonList}
            textDesc="Add reasons for rescheduling. These options will be available when either the interviewer or the candidate reschedules:"
            textHeading="Reschedule Reason"
          />
          <ScheduleReasonSection
            slotReasonList={slotReasonList}
            textHeading="Cancel Reason"
            textDesc="Add reasons for cancelling. These options will be available when either the interviewer or the candidate cancels:"
          />
          <ScheduleReasonSection
            slotReasonList={slotReasonList}
            textHeading="Decline Reason"
            textDesc="Add reasons for declining. These options will be available when either the interviewer or the candidate declines:"
          />
        </>
      )}
    </_Component>
  );
}
