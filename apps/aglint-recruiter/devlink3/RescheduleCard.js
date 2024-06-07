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
  isCancelVisible = true,
  onClickCancel = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "requested_reschedule")}
      tag="div"
      {...bgColorProps}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "reschedule_request_name")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "avatar-24")} tag="div">
          {slotProfileImage ?? (
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d8b0e9a0e9f0451bc3536c_user2.png"
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1684")}
          tag="div"
        >
          <Text content={textName} weight="medium" color="neutral-12" />
          <_Builtin.Block tag="div" {...textColorProps}>
            <Text content={textReschedule} weight="" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "request-reason")}
        tag="div"
      >
        <Text content="Reason :" weight="" color="neutral" />
        <Text content={textReason} weight="" />
      </_Builtin.Block>
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
          {isCancelVisible ? (
            <_Builtin.Block tag="div">
              <ButtonSurface
                onClickButton={onClickCancel}
                size="1"
                color="neutal"
                isRightIcon={false}
                isLeftIcon={false}
                textButton="Ignore"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
