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
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2221%22%20height%3D%2218%22%20viewBox%3D%220%200%2021%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_6113_95289)%22%3E%0A%3Cpath%20d%3D%22M11.8125%208.99906L13.7622%2011.2277L16.3842%2012.9031L16.8403%209.01313L16.3842%205.21094L13.712%206.68267L11.8125%208.99906Z%22%20fill%3D%22%2300832D%22%2F%3E%0A%3Cpath%20d%3D%22M0.5%2012.5458V15.8606C0.5%2016.6175%201.11431%2017.2319%201.87135%2017.2319H5.18616L5.87256%2014.7274L5.18616%2012.5458L2.91198%2011.8594L0.5%2012.5458Z%22%20fill%3D%22%230066DA%22%2F%3E%0A%3Cpath%20d%3D%22M5.18616%200.773438L0.5%205.4596L2.91213%206.14441L5.18616%205.4596L5.86009%203.3077L5.18616%200.773438Z%22%20fill%3D%22%23E94235%22%2F%3E%0A%3Cpath%20d%3D%22M0.5%2012.5465H5.18616V5.46094H0.5V12.5465Z%22%20fill%3D%22%232684FC%22%2F%3E%0A%3Cpath%20d%3D%22M19.3802%202.75891L16.3867%205.21484V12.9068L19.3927%2015.3724C19.8427%2015.7248%2020.5009%2015.4035%2020.5009%2014.8316V3.28865C20.5009%202.71031%2019.827%202.39061%2019.3802%202.75891Z%22%20fill%3D%22%2300AC47%22%2F%3E%0A%3Cpath%20d%3D%22M11.8154%209V12.542H5.1875V17.2281H15.0157C15.7728%2017.2281%2016.3871%2016.6137%2016.3871%2015.8568V12.904L11.8154%209Z%22%20fill%3D%22%2300AC47%22%2F%3E%0A%3Cpath%20d%3D%22M15.0157%200.773438H5.1875V5.4596H11.8154V9.00157L16.3871%205.21344V2.14479C16.3871%201.38775%2015.7728%200.773438%2015.0157%200.773438Z%22%20fill%3D%22%23FFBA00%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_6113_95289%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2216.4563%22%20fill%3D%22white%22%20transform%3D%22translate(0.5%200.773438)%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Google Meet"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "timer_flex")} tag="div">
          <_Builtin.Block tag="div">{"Candidate :"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "meeting_type")}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "avatar_sample")}
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d5b7a977d6963e90278a83_be70d16d697e187131884dce35888e36.png"
            />
            <_Builtin.Block tag="div">{"Mary Jane Watson"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
