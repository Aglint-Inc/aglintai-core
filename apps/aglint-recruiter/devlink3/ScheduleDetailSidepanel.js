"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ScheduleCard } from "./ScheduleCard";
import { CandidatesCard } from "./CandidatesCard";
import { RelatedJobCard } from "./RelatedJobCard";
import { AvatarWithName } from "./AvatarWithName";
import * as _utils from "./utils";
import _styles from "./ScheduleDetailSidepanel.module.css";

export function ScheduleDetailSidepanel({
  as: _Component = _Builtin.Block,
  slotScheduleCard,
  onClickJoinMeet = {},
  onClickCopy = {},
  slotCandidateCard,
  slotRelatedJobCard,
  onClickReschedule = {},
  onClickCancelSchedule = {},
  textScheduleConfirmed = "This Schedule has been confirmed on 24th Jan 2023",
  slotStatusPill,
  slotInterviewPlanCard,
  slotAvatarWithName,
  textUrl = "meet.google.com/efg-rgt-tte",
  isCandidateInfoVisible = true,
  isJobVisible = true,
  isJoinLinkVisible = true,
  isScheduleButtonVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "scheduledetail_sidebar")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "tab_row")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Schedule Info"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotScheduleCard ?? <ScheduleCard />}
        </_Builtin.Block>
        {isJoinLinkVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "join_block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "button_primary")}
              tag="div"
              {...onClickJoinMeet}
            >
              <_Builtin.Block tag="div">{"Join Meeting"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "meeting_link", "cursor-pointer")}
              tag="div"
              {...onClickCopy}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "one-line-clamp")}
                tag="div"
              >
                {textUrl}
              </_Builtin.Block>
              <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewBox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.75%209.22656C9.96875%209.22656%2010.1484%209.15625%2010.2891%209.01562C10.4297%208.875%2010.5%208.69531%2010.5%208.47656V3.69531C10.5%203.58594%2010.4609%203.5%2010.3828%203.4375L8.78906%201.84375C8.72656%201.76563%208.64062%201.72656%208.53125%201.72656H6C5.78125%201.72656%205.60156%201.79688%205.46094%201.9375C5.32031%202.07812%205.25%202.25781%205.25%202.47656V8.47656C5.25%208.69531%205.32031%208.875%205.46094%209.01562C5.60156%209.15625%205.78125%209.22656%206%209.22656H9.75ZM10.9219%202.89844C11.1406%203.11719%2011.25%203.38281%2011.25%203.69531V8.47656C11.2344%208.89844%2011.0859%209.25%2010.8047%209.53125C10.5234%209.8125%2010.1719%209.96094%209.75%209.97656H6C5.57812%209.96094%205.22656%209.8125%204.94531%209.53125C4.66406%209.25%204.51562%208.89844%204.5%208.47656V2.47656C4.51562%202.05469%204.66406%201.70312%204.94531%201.42188C5.22656%201.14062%205.57812%200.992188%206%200.976562H8.53125C8.84375%200.976562%209.10938%201.08594%209.32812%201.30469L10.9219%202.89844ZM2.25%203.97656H3.75V4.72656H2.25C2.03125%204.72656%201.85156%204.79688%201.71094%204.9375C1.57031%205.07812%201.5%205.25781%201.5%205.47656V11.4766C1.5%2011.6953%201.57031%2011.875%201.71094%2012.0156C1.85156%2012.1562%202.03125%2012.2266%202.25%2012.2266H6C6.21875%2012.2266%206.39844%2012.1562%206.53906%2012.0156C6.67969%2011.875%206.75%2011.6953%206.75%2011.4766V10.7266H7.5V11.4766C7.48438%2011.8984%207.33594%2012.25%207.05469%2012.5312C6.77344%2012.8125%206.42188%2012.9609%206%2012.9766H2.25C1.82812%2012.9609%201.47656%2012.8125%201.19531%2012.5312C0.914062%2012.25%200.765625%2011.8984%200.75%2011.4766V5.47656C0.765625%205.05469%200.914062%204.70312%201.19531%204.42188C1.47656%204.14062%201.82812%203.99219%202.25%203.97656Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E" />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isCandidateInfoVisible ? (
        <_Builtin.Block className={_utils.cx(_styles, "tab_row")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Candidate "}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotCandidateCard ?? <CandidatesCard />}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isJobVisible ? (
        <_Builtin.Block className={_utils.cx(_styles, "tab_row")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Job"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule_card")}
            tag="div"
          >
            {slotRelatedJobCard ?? <RelatedJobCard />}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "tab_row")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Schedule Status"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotStatusPill}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey_600")}
          tag="div"
        >
          {textScheduleConfirmed}
        </_Builtin.Block>
        {isScheduleButtonVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "share_links")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "link-copy")}
              tag="div"
              {...onClickReschedule}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.539062%206.5625C0.195312%206.51562%200.015625%206.32031%200%205.97656V5.78906C0.09375%204.61719%200.539062%203.64844%201.33594%202.88281C2.14844%202.11719%203.14062%201.71875%204.3125%201.6875H7.125V0.84375C7.125%200.59375%207.20312%200.390625%207.35938%200.234375C7.51562%200.078125%207.71875%200%207.96875%200C8.17188%200%208.35156%200.0703125%208.50781%200.210938L10.3125%201.82812C10.4375%201.9375%2010.5%202.07813%2010.5%202.25C10.5%202.42187%2010.4375%202.5625%2010.3125%202.67188L8.50781%204.28906C8.35156%204.42969%208.17188%204.5%207.96875%204.5C7.73438%204.48438%207.53125%204.39844%207.35938%204.24219C7.20312%204.08594%207.125%203.89062%207.125%203.65625V2.8125H4.3125C3.4375%202.82813%202.70312%203.11719%202.10938%203.67969C1.51562%204.25781%201.1875%204.97656%201.125%205.83594V6.02344C1.07812%206.36719%200.882812%206.54688%200.539062%206.5625ZM8.25%203.02344L9.09375%202.25L8.25%201.5V3.02344ZM11.4609%205.4375C11.8047%205.48438%2011.9844%205.67969%2012%206.02344V6.21094C11.9062%207.38281%2011.4609%208.35156%2010.6641%209.11719C9.85156%209.88281%208.85938%2010.2812%207.6875%2010.3125H4.875V11.1562C4.875%2011.3906%204.79688%2011.5938%204.64062%2011.7656C4.48438%2011.9219%204.28125%2012%204.03125%2012C3.82812%2012%203.64844%2011.9297%203.49219%2011.7891L1.6875%2010.1719C1.5625%2010.0625%201.5%209.92188%201.5%209.75C1.5%209.57812%201.5625%209.4375%201.6875%209.32812L3.49219%207.71094C3.64844%207.57031%203.82812%207.5%204.03125%207.5C4.26562%207.51562%204.46875%207.60156%204.64062%207.75781C4.79688%207.91406%204.875%208.10938%204.875%208.34375V9.1875H7.6875C8.5625%209.17188%209.29688%208.88281%209.89062%208.32031C10.4844%207.74219%2010.8125%207.02344%2010.875%206.16406V5.97656C10.9219%205.63281%2011.1172%205.45312%2011.4609%205.4375ZM3.75%209L2.90625%209.75L3.75%2010.5234V9Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Reschedule"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "link-copy", "red")}
              tag="div"
              {...onClickCancelSchedule}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.75%200C4.09375%200.03125%204.28125%200.21875%204.3125%200.5625V1.5H7.6875V0.5625C7.71875%200.21875%207.90625%200.03125%208.25%200C8.59375%200.03125%208.78125%200.21875%208.8125%200.5625V1.5H9.75C10.1719%201.51563%2010.5234%201.66406%2010.8047%201.94531C11.0859%202.22656%2011.2344%202.57812%2011.25%203V3.375V4.5V10.5C11.2344%2010.9219%2011.0859%2011.2734%2010.8047%2011.5547C10.5234%2011.8359%2010.1719%2011.9844%209.75%2012H2.25C1.82812%2011.9844%201.47656%2011.8359%201.19531%2011.5547C0.914062%2011.2734%200.765625%2010.9219%200.75%2010.5V4.5V3.375V3C0.765625%202.57812%200.914062%202.22656%201.19531%201.94531C1.47656%201.66406%201.82812%201.51563%202.25%201.5H3.1875V0.5625C3.21875%200.21875%203.40625%200.03125%203.75%200ZM10.125%204.5H1.875V10.5C1.89062%2010.7344%202.01562%2010.8594%202.25%2010.875H9.75C9.98438%2010.8594%2010.1094%2010.7344%2010.125%2010.5V4.5ZM7.89844%206.58594L6.79688%207.6875L7.89844%208.78906C8.11719%209.05469%208.11719%209.32031%207.89844%209.58594C7.63281%209.80469%207.36719%209.80469%207.10156%209.58594L6%208.48438L4.89844%209.58594C4.63281%209.80469%204.36719%209.80469%204.10156%209.58594C3.88281%209.32031%203.88281%209.05469%204.10156%208.78906L5.20312%207.6875L4.10156%206.58594C3.88281%206.32031%203.88281%206.05469%204.10156%205.78906C4.36719%205.57031%204.63281%205.57031%204.89844%205.78906L6%206.89062L7.10156%205.78906C7.36719%205.57031%207.63281%205.57031%207.89844%205.78906C8.11719%206.05469%208.11719%206.32031%207.89844%206.58594Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Cancel Schedule"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "co_ordinator")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey_600")}
          tag="div"
        >
          {"Co-ordinator :"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotAvatarWithName ?? <AvatarWithName />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
