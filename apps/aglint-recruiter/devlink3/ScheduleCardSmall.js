"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
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
        <Text content={textMonth} weight="" size="1" />
        <Text content={textDate} weight="medium" size="5" />
        <Text content={textDay} weight="" size="1" />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "schedule_info")} tag="div">
        <Text content={textScheduleName} weight="medium" />
        <_Builtin.Block className={_utils.cx(_styles, "timer_flex")} tag="div">
          <Text content={textTimeRange} weight="" />
          <_Builtin.Block
            className={_utils.cx(_styles, "meeting_type")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {slotPlatformLogo ?? <SlotComp componentNeme="logo" />}
            </_Builtin.Block>
            <Text content={textPlatformName} weight="" />
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
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%223%22%20fill%3D%22%238D8D86%22%2F%3E%0A%3Crect%20width%3D%2210.6667%22%20height%3D%2210.6667%22%20transform%3D%22translate(2.66666%202.66667)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8%203.28889C6.57634%203.28889%205.42222%204.443%205.42222%205.86667C5.42222%207.04205%206.20888%208.03369%207.28443%208.34383C6.43534%208.4473%205.70707%208.74762%205.15845%209.2883C4.4602%209.97646%204.10668%2011.0009%204.10668%2012.3377C4.10668%2012.5243%204.25791%2012.6755%204.44446%2012.6755C4.63101%2012.6755%204.78224%2012.5243%204.78224%2012.3377C4.78224%2011.1146%205.10426%2010.2902%205.63265%209.76946C6.16203%209.24774%206.95235%208.97777%207.99997%208.97777C9.04759%208.97777%209.83794%209.24774%2010.3674%209.76947C10.8957%2010.2902%2011.2178%2011.1146%2011.2178%2012.3377C11.2178%2012.5243%2011.369%2012.6755%2011.5556%2012.6755C11.7421%2012.6756%2011.8933%2012.5243%2011.8933%2012.3378C11.8933%2011.0009%2011.5398%209.97646%2010.8415%209.28829C10.2929%208.74763%209.56462%208.44731%208.71556%208.34384C9.79108%208.03371%2010.5778%207.04206%2010.5778%205.86667C10.5778%204.443%209.42367%203.28889%208%203.28889ZM6.09778%205.86667C6.09778%204.8161%206.94943%203.96444%208%203.96444C9.05057%203.96444%209.90222%204.8161%209.90222%205.86667C9.90222%206.91723%209.05057%207.76889%208%207.76889C6.94943%207.76889%206.09778%206.91723%206.09778%205.86667Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <Text content={textCandidateName} weight="" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
