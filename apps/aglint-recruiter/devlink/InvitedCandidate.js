"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InvitedCandidate.module.css";

export function InvitedCandidate({
  as: _Component = _Builtin.Block,
  onClickScheduler = {},
  textHeader = "Phase 1: Interview for software engineer",
  textDuration = "30 Minutes",
  slotMeetingIcon,
  textMeetingPlatform = "Google Meet",
  slotProfileAvatar,
  textName = "Michel Oven",
  slotAvatarImage,
  textInterviewPanelName = "Michel Oven",
  textSlotsBookedText = "6 slots between Feb 17-20",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-874")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-873")} tag="div">
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10%2018C8.54167%2017.9792%207.20833%2017.625%206%2016.9375C4.79167%2016.2292%203.8125%2015.25%203.0625%2014C2.35417%2012.7292%202%2011.3958%202%2010C2%208.60417%202.35417%207.27083%203.0625%206C3.8125%204.75%204.79167%203.77083%206%203.0625C7.20833%202.375%208.54167%202.02083%2010%202C11.4583%202.02083%2012.7917%202.375%2014%203.0625C15.2083%203.77083%2016.1875%204.75%2016.9375%206C17.6458%207.27083%2018%208.60417%2018%2010C18%2011.3958%2017.6458%2012.7292%2016.9375%2014C16.1875%2015.25%2015.2083%2016.2292%2014%2016.9375C12.7917%2017.625%2011.4583%2017.9792%2010%2018ZM13.5312%208.53125C13.8229%208.17708%2013.8229%207.82292%2013.5312%207.46875C13.1771%207.17708%2012.8229%207.17708%2012.4688%207.46875L9%2010.9375L7.53125%209.46875C7.17708%209.17708%206.82292%209.17708%206.46875%209.46875C6.17708%209.82292%206.17708%2010.1771%206.46875%2010.5312L8.46875%2012.5312C8.82292%2012.8229%209.17708%2012.8229%209.53125%2012.5312L13.5312%208.53125Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "text-block-35")}
          tag="div"
        >
          {"The invitation email has been sent to the candidate's inbox."}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block tag="div">
          {
            "Once the candidate selects a slot, the interview will be confirmed. You can view the interview status in the "
          }
          <_Builtin.Span
            className={_utils.cx(_styles, "text-blue-500", "text-underline")}
            {...onClickScheduler}
          >
            {"Scheduler"}
          </_Builtin.Span>
          {"."}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-875")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textHeader}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-877")}
          tag="div"
        >
          <_Builtin.Block tag="div">{textDuration}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-876")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotMeetingIcon}</_Builtin.Block>
            <_Builtin.Block tag="div">{textMeetingPlatform}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-877")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Candidate"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-876")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotProfileAvatar}</_Builtin.Block>
            <_Builtin.Block tag="div">{textName}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-877")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Interview Panel"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-876")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotAvatarImage}</_Builtin.Block>
            <_Builtin.Block tag="div">{textInterviewPanelName}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-878")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-879")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-yellow-800")}
              tag="div"
            >
              {"Pending Candidate Confirmation"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {textSlotsBookedText}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
