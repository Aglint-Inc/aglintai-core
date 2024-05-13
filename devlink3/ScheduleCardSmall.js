"use client";
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
          <_Builtin.Block className={_utils.cx(_styles, "hide")} tag="div">
            {"Candidate :"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "meeting_type")}
            tag="div"
          >
            <_Builtin.Block className={_utils.cx(_styles, "hide")} tag="div">
              {slotCandidatePic}
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2223.5%22%20height%3D%2223.5%22%20rx%3D%2211.75%22%20fill%3D%22%23F8F9F9%22%2F%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2223.5%22%20height%3D%2223.5%22%20rx%3D%2211.75%22%20stroke%3D%22%23D8DCDE%22%20stroke-width%3D%220.5%22%2F%3E%0A%3Cpath%20d%3D%22M12%2012C11.4531%2012%2010.9531%2011.8672%2010.5%2011.6016C10.0469%2011.3359%209.67969%2010.9688%209.39844%2010.5C9.13281%2010.0312%209%209.53125%209%209C9%208.46875%209.13281%207.96875%209.39844%207.5C9.67969%207.03125%2010.0469%206.66406%2010.5%206.39844C10.9531%206.13281%2011.4531%206%2012%206C12.5469%206%2013.0469%206.13281%2013.5%206.39844C13.9531%206.66406%2014.3203%207.03125%2014.6016%207.5C14.8672%207.96875%2015%208.46875%2015%209C15%209.53125%2014.8672%2010.0312%2014.6016%2010.5C14.3203%2010.9688%2013.9531%2011.3359%2013.5%2011.6016C13.0469%2011.8672%2012.5469%2012%2012%2012ZM10.9219%2013.125H13.0781C14.25%2013.1562%2015.2344%2013.5625%2016.0312%2014.3438C16.8125%2015.1406%2017.2188%2016.125%2017.25%2017.2969C17.25%2017.5%2017.1797%2017.6641%2017.0391%2017.7891C16.9141%2017.9297%2016.75%2018%2016.5469%2018H7.45312C7.25%2018%207.08594%2017.9297%206.96094%2017.7891C6.82031%2017.6641%206.75%2017.5%206.75%2017.2969C6.78125%2016.125%207.1875%2015.1406%207.96875%2014.3438C8.76562%2013.5625%209.75%2013.1562%2010.9219%2013.125Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block tag="div">{textCandidateName}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
