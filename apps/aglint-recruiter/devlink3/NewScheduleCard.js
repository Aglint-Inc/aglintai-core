"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./NewScheduleCard.module.css";

export function NewScheduleCard({
  as: _Component = _Builtin.Block,
  textMonth = "February",
  textDate = "27",
  textDay = "FRIDAY",
  textTitle = "This is some text inside of a div block.",
  textMeetTime = "09:00 AM to 09:30 AM",
  slotIconMeeting,
  textPlatformName = "Google Meet",
  slotCandidateImage,
  textCandidateName = "Taylor",
}) {
  return (
    <_Component className={_utils.cx(_styles, "my-schedule-card")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1491")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1492")}
          tag="div"
        >
          <Text content={textMonth} size="1" weight="" color="neutral-11" />
          <Text content={textDate} size="5" weight="bold" color="neutral-11" />
          <Text content={textDay} size="1" weight="" color="neutral-11" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1495")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textTitle}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1494")}
          tag="div"
        >
          <_Builtin.Block tag="div">{textMeetTime}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1493")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {slotIconMeeting ?? <SlotComp componentNeme="Icon" />}
            </_Builtin.Block>
            <Text
              content={textPlatformName}
              size="2"
              weight=""
              color="neutral-12"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1497")}
          tag="div"
        >
          <Text size="2" weight="" color="neutral-12" content="Candidate :" />
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1496")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1498")}
              tag="div"
            >
              {slotCandidateImage}
            </_Builtin.Block>
            <Text
              content={textCandidateName}
              size="2"
              weight=""
              color="neutral-12"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
