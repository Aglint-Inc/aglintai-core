import React from "react";
import * as _Builtin from "./_Builtin";
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
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textTitle}
        </_Builtin.Block>
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
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "text-gray-600")}
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
              <_Builtin.Block
                className={_utils.cx(_styles, "text-xsm")}
                tag="div"
              >
                {textDay}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-xsm", "text-first-cap")}
                tag="div"
                {...colorPropsText}
              >
                {textStatus}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-912")}
          tag="div"
        >
          <_Builtin.Block tag="div">{textTime}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-913")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotMeetingIcon}</_Builtin.Block>
            <_Builtin.Block tag="div">{textMeetingPlatform}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-915")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-914")}
              tag="div"
            >
              <_Builtin.Block tag="div">{slotMemberImage}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
