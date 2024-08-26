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
  slotStatusBadge,
  textTime = "This is a global text component",
  textDuration = "This is a global text component",
  textMeetingPlatform = "This is a global text component",
  textMeetingLink = "this is link",
  slotPanelIcon,
  slotMeetingIcon,
  slotJoinMeeting,
  textInterviewerCount = "(4)",
  isMeetingLinkVisible = true,
  isTimingVisible = true,
  isDateCardVisible = true,
  textInterviewer = "Interviewers",
}) {
  return (
    <_Component className={_utils.cx(_styles, "interview_plan_wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "ip_content_wrap")}
        tag="div"
      >
        {isDateCardVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "ip_date_wrap")}
            tag="div"
          >
            <Text content={textMonth} size="1" weight="" color="neutral" />
            <Text content={textDate} size="7" weight="medium" />
            <Text content={textDay} size="1" weight="" color="neutral" />
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "ip_details_wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ip_panel_wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text_with_icon")}
              tag="div"
              data-color="neutral-12"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "slot_icon")}
                tag="div"
              >
                {slotPanelIcon}
              </_Builtin.Block>
              <Text content={textPanelName} weight="medium" color="" />
            </_Builtin.Block>
            <_Builtin.Block tag="div">{slotStatusBadge}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ip_panel_wrap")}
            tag="div"
          >
            {isTimingVisible ? (
              <_Builtin.Block tag="div">
                <TextWithIcon
                  textContent={textTime}
                  fontWeight="medium"
                  iconName="schedule"
                  iconSize="4"
                  iconWeight="medium"
                />
              </_Builtin.Block>
            ) : null}
            <TextWithIcon
              textContent={textDuration}
              fontWeight="medium"
              iconName="hourglass"
              iconSize="4"
              iconWeight="medium"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ip_panel_wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text_with_icon")}
              tag="div"
              data-color="neutral-12"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "slot_icon")}
                tag="div"
              >
                {slotMeetingIcon}
              </_Builtin.Block>
              <Text content={textMeetingPlatform} weight="medium" color="" />
            </_Builtin.Block>
            {isMeetingLinkVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "ip_meeting_link")}
                tag="div"
              >
                <TextWithIcon
                  textContent={textMeetingLink}
                  fontWeight="medium"
                  iconName="attach_file"
                  iconSize="4"
                  iconWeight="medium"
                />
                <_Builtin.Block tag="div">{slotJoinMeeting}</_Builtin.Block>
              </_Builtin.Block>
            ) : null}
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
            <_Builtin.Block
              className={_utils.cx(_styles, "nsd-list-wrap")}
              tag="div"
            >
              {slotCandidateList}
            </_Builtin.Block>
            {isCandidateButtonVisible ? (
              <_Builtin.Block tag="div">{slotCandidateButton}</_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ip_block_wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "nsd-header-wrap")}
              tag="div"
            >
              <Text
                content={textInterviewer}
                color="neutral"
                weight="regular"
              />
              <Text
                content={textInterviewerCount}
                color="neutral"
                weight="regular"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "nsd-list-wrap")}
              tag="div"
            >
              {slotInterviewerList}
            </_Builtin.Block>
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
            <_Builtin.Block
              className={_utils.cx(_styles, "nsd-list-wrap")}
              tag="div"
            >
              {slotOrganizerList}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ip_block_wrap")}
            tag="div"
          >
            <Text content="Hiring Team" color="neutral" weight="regular" />
            <_Builtin.Block
              className={_utils.cx(_styles, "nsd-list-wrap")}
              tag="div"
            >
              {slotHiringTeamList}
            </_Builtin.Block>
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
