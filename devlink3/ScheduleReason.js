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
          <ScheduleReasonSection slotReasonList={slotReasonList} />
          <ScheduleReasonSection
            slotReasonList={slotReasonList}
            textHeading="Cancel Schedule Reasons"
            textDesc="Add reasons for cancelling the schedule, and these options will be provided at the time of cancelling."
          />
          <ScheduleReasonSection
            slotReasonList={slotReasonList}
            textHeading="Decline Reasons"
            textDesc="Add reasons for declinnig the schedule, and these options will be provided at the time of declining."
          />
        </>
      )}
    </_Component>
  );
}
