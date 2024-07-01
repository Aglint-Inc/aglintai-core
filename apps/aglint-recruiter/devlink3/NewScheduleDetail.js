"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { TextWithIcon } from "./TextWithIcon";
import * as _utils from "./utils";
import _styles from "./NewScheduleDetail.module.css";

export function NewScheduleDetail({
  as: _Component = _Builtin.Block,
  slotCandidateList,
  slotCandidateButton,
  isCandidateButtonVisible = true,
  slotInterviewerList,
  slotInterviewerButton,
  isInterviewerButtonVisible = true,
  slotOrganizerList,
  slotHiringTeamList,
  slotInterviewTypeButton,
  textMonth = "Feb",
  textDate = "24",
  textDay = "Friday",
  textPanelName = "This is a global text component",
  iconPanel = "shapes",
  slotStatusBadge,
  textTime = "This is a global text component",
}) {
  return (
    <_Component className={_utils.cx(_styles, "interview_plan_wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "ip_content_wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ip_date_wrap")}
          tag="div"
        >
          <Text content={textMonth} size="1" weight="" color="neutral" />
          <Text content={textDate} size="7" weight="medium" />
          <Text content={textDay} size="1" weight="" color="neutral" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ip_details_wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ip_panel_wrap")}
            tag="div"
          >
            <TextWithIcon
              textContent={textPanelName}
              iconName={iconPanel}
              fontWeight="medium"
            />
            <_Builtin.Block tag="div">{slotStatusBadge}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ip_panel_wrap")}
            tag="div"
          >
            <TextWithIcon
              textContent={textTime}
              fontWeight="medium"
              iconName="timer"
            />
            <TextWithIcon fontWeight="medium" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ip_panel_wrap")}
            tag="div"
          >
            <TextWithIcon fontWeight="medium" />
            <_Builtin.Block
              className={_utils.cx(_styles, "ip_meeting_link")}
              tag="div"
            >
              <TextWithIcon fontWeight="medium" />
              <_Builtin.Block tag="div" />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "ip_content_block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ip_content_left")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ip_block_wrap")}
            tag="div"
          >
            <Text content="Candidate" color="neutral" weight="" />
            <_Builtin.Block tag="div">{slotCandidateList}</_Builtin.Block>
            {isCandidateButtonVisible ? (
              <_Builtin.Block tag="div">{slotCandidateButton}</_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ip_block_wrap")}
            tag="div"
          >
            <Text content="Interviewers(5)" color="neutral" weight="regular" />
            <_Builtin.Block tag="div">{slotInterviewerList}</_Builtin.Block>
            {isInterviewerButtonVisible ? (
              <_Builtin.Block tag="div">{slotInterviewerButton}</_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ip_content_right")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ip_block_wrap")}
            tag="div"
          >
            <Text content="Organizer" color="neutral" weight="regular" />
            <_Builtin.Block tag="div">{slotOrganizerList}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ip_block_wrap")}
            tag="div"
          >
            <Text content="Hiring Team" color="neutral" weight="regular" />
            <_Builtin.Block tag="div">{slotHiringTeamList}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ip_block_wrap")}
            tag="div"
          >
            <Text content="Interview Type" color="neutral" weight="regular" />
            <_Builtin.Block tag="div">{slotInterviewTypeButton}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
