"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FullScheduleCard } from "./FullScheduleCard";
import { CandidateCard } from "./CandidateCard";
import { JobCards } from "./JobCards";
import * as _utils from "./utils";
import _styles from "./CandidateSchedule.module.css";

export function CandidateSchedule({
  as: _Component = _Builtin.Block,
  slotDarkPill,
  slotFullScheduleCard,
  slotCandidateCard,
  slotScheduleNowButton,
  isScheduleNowVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "new-candidate-schedule-grid")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate-schedule-left-wrap")}
        id={_utils.cx(
          _styles,
          "w-node-b4f8c833-3062-0810-c58b-254fa7da7af2-a7da7af1"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cd-schedule-header")}
          tag="div"
        >
          {slotDarkPill}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "new-schedule-cd-card-wrap")}
          tag="div"
        >
          {slotFullScheduleCard ?? (
            <>
              <FullScheduleCard />
              <FullScheduleCard />
              <FullScheduleCard />
              <FullScheduleCard />
            </>
          )}
        </_Builtin.Block>
        {isScheduleNowVisible ? (
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "div-block-1327",
              "schedule-button-wrap"
            )}
            tag="div"
          >
            {slotScheduleNowButton}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate-schedule-right-wrap")}
        tag="div"
      >
        {slotCandidateCard ?? (
          <>
            <CandidateCard />
            <JobCards />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
