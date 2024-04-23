import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ScheduleCardSmall.module.css";

export function ScheduleCardSmall({
  as: _Component = _Builtin.Block,
  textMonth = "March ",
  textDate = "21",
  textDay = "Thursday",
  textScheduleName = "Company Indroduction",
  textTimeRange = "09:00 AM to 09:30 AM",
  textPlatformName = "Google Meet",
  slotPlatformLogo,
  textCandidateName = "Mary Jane Watson",
  slotCandidatePic,
}) {
  return (
    <_Component className={_utils.cx(_styles, "schedulecardsmall")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "card_date")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
          {textMonth}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "big_date")} tag="div">
          {textDate}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "text-capitalize")}
          tag="div"
        >
          {textDay}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "schedule_info")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textScheduleName}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "timer_flex")} tag="div">
          <_Builtin.Block tag="div">{textTimeRange}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "meeting_type")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotPlatformLogo}</_Builtin.Block>
            <_Builtin.Block tag="div">{textPlatformName}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "timer_flex")} tag="div">
          <_Builtin.Block tag="div">{"Candidate :"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "meeting_type")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotCandidatePic}</_Builtin.Block>
            <_Builtin.Block tag="div">{textCandidateName}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
