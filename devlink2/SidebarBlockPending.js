import React from "react";
import * as _Builtin from "./_Builtin";
import { ScheduleInfoBlock } from "./ScheduleInfoBlock";
import { GroupedSlots } from "./GroupedSlots";
import { InterviewPanelCard } from "./InterviewPanelCard";
import * as _utils from "./utils";
import _styles from "./SidebarBlockPending.module.css";

export function SidebarBlockPending({
  as: _Component = _Builtin.Block,
  textScheduleName = "Phase 1: Interview for software engineer",
  onClickResendInvite = {},
  slotScheduleInfoBlock,
  textSlotNumber = "6 Slots provided to the candidate",
  slorGroupedSlots,
  slotInterviewPanel,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "sidebar_block_pending")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "interview_info")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textScheduleName}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotScheduleInfoBlock ?? (
            <ScheduleInfoBlock textDateTimeOrSlots="Waiting for the candidate to choose" />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "slot_list")} tag="div">
        <_Builtin.Block tag="div">{textSlotNumber}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_list-copy")}
          tag="div"
        >
          {slorGroupedSlots ?? (
            <>
              <GroupedSlots />
              <GroupedSlots />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "pending_tag")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "pending-candidate-info")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Pending"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-underline", "text-blue-500")}
          tag="div"
          {...onClickResendInvite}
        >
          {"Resend Invite"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_team_block")}
        tag="div"
      >
        <_Builtin.Block tag="div">{"Interview Panel"}</_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotInterviewPanel ?? <InterviewPanelCard />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
