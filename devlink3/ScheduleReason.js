"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { NewTabPill } from "./NewTabPill";
import { ScheduleReasonSection } from "./ScheduleReasonSection";
import * as _utils from "./utils";
import _styles from "./ScheduleReason.module.css";

export function ScheduleReason({
  as: _Component = _Builtin.Block,
  slotReasonList,
  slotScheduleReasonSection,
  sloNewTabPill,
  textMainHeading = "Interview Scheduling Options",
  textMainHelperText = "Configure default reasons for candidates to cancel or reschedule their interviews. These reasons will be available as options for candidates when they request to modify their scheduled interviews.",
  isMainHeadingVisible = true,
}) {
  return (
    <_Component tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1719")}
        tag="div"
      >
        {sloNewTabPill ?? <NewTabPill />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1669")}
        tag="div"
      >
        {isMainHeadingVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1725")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {textMainHeading}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {textMainHelperText}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1726")}
          tag="div"
        >
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
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
