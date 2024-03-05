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
  isUpcomingVisible = false,
  isCompletedVisible = true,
  textDate = "27",
  textDay = "FRIDAY",
  textMonth = "Feb",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "completed-interview-wrappers")}
      tag="div"
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
          {isCompletedVisible ? (
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
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "completed-bottom-wrap")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-xsm")}
                  tag="div"
                >
                  {"Completed"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isUpcomingVisible ? (
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
                  {"Feb"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-20", "fw-semibold")}
                  tag="div"
                >
                  {"27"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-xsm")}
                  tag="div"
                >
                  {"FRIDAY"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "div-block-910",
                  "upcoming-inter"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-xsm")}
                  tag="div"
                >
                  {"Upcoming"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
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
