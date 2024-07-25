"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonSolid } from "./ButtonSolid";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonSurface } from "./ButtonSurface";
import * as _utils from "./utils";
import _styles from "./RescheduleCard.module.css";

export function RescheduleCard({
  as: _Component = _Builtin.Block,
  slotProfileImage,
  textReschedule = "requested for reschedule",
  textReason = "Out of the office",
  onClickRescheduleNow = {},
  onClickChangeInterviewer = {},
  isChangeInterviewerVisible = true,
  isButtonVisible = true,
  bgColorProps = {},
  textColorProps = {},
  textName = "Robert fox",
  isRescheduleBtnVisible = true,
  isIgnoreVisible = true,
  onClickIgnore = {},
  isTakeActionVisible = false,
  onClickTakeAction = {},
  slotDateReason,
  slotAdditionalNotes,
  isNotesVisible = true,
  isDateVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "requested_reschedule")}
      tag="div"
      {...bgColorProps}
    >
      <_Builtin.Block className={_utils.cx(_styles, "rc-notes-wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "first-part-title")}
          tag="div"
        >
          <Text content="Reason" weight="" color="neutral" size="1" />
        </_Builtin.Block>
        <Text content={textReason} weight="" />
      </_Builtin.Block>
      {isNotesVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "rc-notes-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "first-part-title")}
            tag="div"
          >
            <Text
              content="Additional Notes"
              weight=""
              color="neutral"
              size="1"
            />
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotAdditionalNotes}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isDateVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "rc-notes-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "first-part-title")}
            tag="div"
          >
            <Text content="Proposed Date" weight="" color="neutral" size="1" />
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotDateReason}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isButtonVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "action_buttons")}
          tag="div"
        >
          {isRescheduleBtnVisible ? (
            <_Builtin.Block tag="div">
              <ButtonSolid
                onClickButton={onClickRescheduleNow}
                size="1"
                textButton="Reschedule Now"
              />
            </_Builtin.Block>
          ) : null}
          {isChangeInterviewerVisible ? (
            <_Builtin.Block tag="div">
              <ButtonSoft
                onClickButton={onClickChangeInterviewer}
                size="1"
                textButton="Change Interviewer"
              />
            </_Builtin.Block>
          ) : null}
          {isIgnoreVisible ? (
            <_Builtin.Block tag="div">
              <ButtonSurface
                onClickButton={onClickIgnore}
                size="1"
                color="accent"
                isRightIcon={false}
                isLeftIcon={false}
                textButton="Ignore"
              />
            </_Builtin.Block>
          ) : null}
          {isTakeActionVisible ? (
            <_Builtin.Block tag="div">
              <ButtonSolid
                onClickButton={onClickTakeAction}
                size="1"
                textButton="Take Action"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
