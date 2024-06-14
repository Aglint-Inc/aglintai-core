"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./InterviewScreenCard.module.css";

export function InterviewScreenCard({
  as: _Component = _Builtin.Block,
  textTitle = "Phase 1: Interview for software engineer",
  textTime = "09:00 AM to 09:30 AM (30 Minutes)",
  slotMeetingIcon,
  textMeetingPlatform = "Google Meet",
  slotMemberImage,
  textDate = "27",
  textDay = "FRIDAY",
  textMonth = "Feb",
  textStatus = "Completed",
  colorPropsText = {},
  onClickCard = {},
  isStatusVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "completed-interview-wrappers",
        "remove-padding"
      )}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block tag="div">
        <Text content={textTitle} weight="bold" size="2" color="neutral-11" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1114")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "full-date-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "date-wrappers")}
              tag="div"
            >
              <Text content={textMonth} weight="" size="1" color="neutral" />
              <Text content={textDate} weight="bold" size="5" />
              <Text content={textDay} weight="" size="1" color="neutral" />
              <Text
                content={textStatus}
                weight=""
                size="1"
                color="neutral-12"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-912")}
          tag="div"
        >
          <Text content={textTime} weight="" size="2" color="neutral-11" />
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-913")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {slotMeetingIcon ?? <SlotComp componentName="Meeting Icon" />}
            </_Builtin.Block>
            <Text
              content={textMeetingPlatform}
              weight=""
              size="2"
              color="neutral-11"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-915")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-914")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                {slotMemberImage ?? <SlotComp componentName="Member Image" />}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
