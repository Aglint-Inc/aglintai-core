"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonSolid } from "./ButtonSolid";
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
      className={_utils.cx(_styles, "div-block-1639")}
      tag="div"
      {...bgColorProps}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1641")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1640")}
          tag="div"
        >
          {slotProfileImage}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1684")}
          tag="div"
        >
          <Text content={textName} weight="bold" color="neutral-12" />
          <_Builtin.Block tag="div" {...textColorProps}>
            <Text content={textReschedule} weight="bold" color="warning" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1642")}
        tag="div"
      >
        <_Builtin.Block tag="div">{"Reason :"}</_Builtin.Block>
        <_Builtin.Block tag="div">{textReason}</_Builtin.Block>
      </_Builtin.Block>
      {isButtonVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1643")}
          tag="div"
        >
          {isRescheduleBtnVisible ? (
            <_Builtin.Block tag="div">
              <ButtonSolid
                onClickButton={onClickRescheduleNow}
                size="1"
                textButton=""
              />
            </_Builtin.Block>
          ) : null}
          {isChangeInterviewerVisible ? (
            <_Builtin.Block tag="div">
              <ButtonSurface
                onClickButton={onClickChangeInterviewer}
                size="1"
                isLeftIcon={false}
                isRightIcon={false}
                textButton=""
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
                textButton="Cancel"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
