"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ScheduleCard } from "./ScheduleCard";
import { AvatarWithName } from "./AvatarWithName";
import { CandidatesCard } from "./CandidatesCard";
import { RelatedJobCard } from "./RelatedJobCard";
import * as _utils from "./utils";
import _styles from "./ScheduleTabOverview.module.css";

export function ScheduleTabOverview({
  as: _Component = _Builtin.Block,
  slotAvatarWithName,
  slotCandidateCard,
  slotRelatedJobCard,
  slotScheduleCard,
}) {
  return (
    <_Component className={_utils.cx(_styles, "tab_overview")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "tab_row")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Schedule Info"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotScheduleCard ?? <ScheduleCard />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "tab_row")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Members"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_members")}
          tag="div"
        >
          {slotAvatarWithName ?? (
            <>
              <AvatarWithName
                isShadowVisible={false}
                isReverseShadowVisible={false}
                textName="Raimon T Simon"
              />
              <AvatarWithName
                isShadowVisible={true}
                isReverseShadowVisible={false}
                textName="Mike Tyson"
              />
              <AvatarWithName
                isShadowVisible={false}
                isReverseShadowVisible={true}
                textName="Roberto Carlos"
              />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "tab_row")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Candidate "}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotCandidateCard ?? <CandidatesCard />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "tab_row")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Job"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "schedule_card")}
          tag="div"
        >
          {slotRelatedJobCard ?? <RelatedJobCard />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
