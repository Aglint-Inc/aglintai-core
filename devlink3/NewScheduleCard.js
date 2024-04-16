"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
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
    <_Component className={_utils.cx(_styles, "div-block-1490")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1491")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1492")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "text-grey_600")}
            tag="div"
          >
            {textMonth}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-20", "fw-semibold")}
            tag="div"
          >
            {textDate}
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "text-xsm")} tag="div">
            {textDay}
          </_Builtin.Block>
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
            <_Builtin.Block tag="div">{slotIconMeeting}</_Builtin.Block>
            <_Builtin.Block tag="div">{textPlatformName}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1497")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Candidate :"}</_Builtin.Block>
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
            <_Builtin.Block tag="div">{textCandidateName}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
