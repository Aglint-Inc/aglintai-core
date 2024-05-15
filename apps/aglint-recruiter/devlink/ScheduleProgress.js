"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ScheduleProgressPill } from "./ScheduleProgressPill";
import * as _utils from "./utils";
import _styles from "./ScheduleProgress.module.css";

export function ScheduleProgress({
  as: _Component = _Builtin.Block,
  slotScheduleProgressPill,
}) {
  return (
    <_Component className={_utils.cx(_styles, "sampleflex")} tag="div">
      {slotScheduleProgressPill ?? (
        <>
          <ScheduleProgressPill isStarting={false} isEnding={false} />
          <ScheduleProgressPill isEnding={true} isStarting={true} />
          <ScheduleProgressPill isEnding={true} isStarting={true} />
          <ScheduleProgressPill isStarting={true} isEnding={true} />
          <ScheduleProgressPill isEnding={true} />
        </>
      )}
    </_Component>
  );
}
