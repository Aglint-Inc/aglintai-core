"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ScheduleCard } from "./ScheduleCard";
import { CandidatesCard } from "./CandidatesCard";
import * as _utils from "./utils";
import _styles from "./ScheduleTabOverview.module.css";

export function ScheduleTabOverview({
  as: _Component = _Builtin.Block,
  slotAvatarWithName,
  slotCandidateCard,
  slotRelatedJobCard,
  slotScheduleCard,
  slotJoinMeetingButton,
  onClickCopyLink = {},
  textMeetingLink = "meet.google.com/efg-rgt-tte",
  slotStatus,
  textSchedule = "on April 26, 2024",
  onClickInterviewModuleLink = {},
  slotInterviewers,
  slotTrainees,
  slotCoordinators,
  isCoordinatorVisible = true,
  isTraineesVisible = true,
  isInterviewersVisible = true,
  textInterviewModuleLink = "Company Introduction",
  onClickReschedule = {},
  onClickCancelSchedule = {},
  isScheduleLinkVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "tab_overview")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "tab_row")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Schedule Info"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1414")}
          tag="div"
        >
          {slotScheduleCard ?? <ScheduleCard />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1418")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotJoinMeetingButton}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1417")}
            tag="div"
            {...onClickCopyLink}
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-sm",
                "text-grey_600",
                "one-line-clamp"
              )}
              tag="div"
            >
              {textMeetingLink}
            </_Builtin.Block>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.75%208.25C9.96875%208.25%2010.1484%208.17969%2010.2891%208.03906C10.4297%207.89844%2010.5%207.71875%2010.5%207.5V2.71875C10.5%202.60937%2010.4609%202.52344%2010.3828%202.46094L8.78906%200.867188C8.72656%200.789063%208.64062%200.75%208.53125%200.75H6C5.78125%200.75%205.60156%200.820312%205.46094%200.960938C5.32031%201.10156%205.25%201.28125%205.25%201.5V7.5C5.25%207.71875%205.32031%207.89844%205.46094%208.03906C5.60156%208.17969%205.78125%208.25%206%208.25H9.75ZM10.9219%201.92188C11.1406%202.14062%2011.25%202.40625%2011.25%202.71875V7.5C11.2344%207.92188%2011.0859%208.27344%2010.8047%208.55469C10.5234%208.83594%2010.1719%208.98438%209.75%209H6C5.57812%208.98438%205.22656%208.83594%204.94531%208.55469C4.66406%208.27344%204.51562%207.92188%204.5%207.5V1.5C4.51562%201.07812%204.66406%200.726562%204.94531%200.445312C5.22656%200.164062%205.57812%200.015625%206%200H8.53125C8.84375%200%209.10938%200.109375%209.32812%200.328125L10.9219%201.92188ZM2.25%203H3.75V3.75H2.25C2.03125%203.75%201.85156%203.82031%201.71094%203.96094C1.57031%204.10156%201.5%204.28125%201.5%204.5V10.5C1.5%2010.7188%201.57031%2010.8984%201.71094%2011.0391C1.85156%2011.1797%202.03125%2011.25%202.25%2011.25H6C6.21875%2011.25%206.39844%2011.1797%206.53906%2011.0391C6.67969%2010.8984%206.75%2010.7188%206.75%2010.5V9.75H7.5V10.5C7.48438%2010.9219%207.33594%2011.2734%207.05469%2011.5547C6.77344%2011.8359%206.42188%2011.9844%206%2012H2.25C1.82812%2011.9844%201.47656%2011.8359%201.19531%2011.5547C0.914062%2011.2734%200.765625%2010.9219%200.75%2010.5V4.5C0.765625%204.07812%200.914062%203.72656%201.19531%203.44531C1.47656%203.16406%201.82812%203.01563%202.25%203Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "tab_row")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1419")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotStatus}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {textSchedule}
          </_Builtin.Block>
        </_Builtin.Block>
        {isScheduleLinkVisible ? (
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
              className={_utils.cx(_styles, "link-copy", "no-color")}
              tag="div"
              {...onClickCancelSchedule}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.75%200C4.09375%200.03125%204.28125%200.21875%204.3125%200.5625V1.5H7.6875V0.5625C7.71875%200.21875%207.90625%200.03125%208.25%200C8.59375%200.03125%208.78125%200.21875%208.8125%200.5625V1.5H9.75C10.1719%201.51563%2010.5234%201.66406%2010.8047%201.94531C11.0859%202.22656%2011.2344%202.57812%2011.25%203V3.375V4.5V10.5C11.2344%2010.9219%2011.0859%2011.2734%2010.8047%2011.5547C10.5234%2011.8359%2010.1719%2011.9844%209.75%2012H2.25C1.82812%2011.9844%201.47656%2011.8359%201.19531%2011.5547C0.914062%2011.2734%200.765625%2010.9219%200.75%2010.5V4.5V3.375V3C0.765625%202.57812%200.914062%202.22656%201.19531%201.94531C1.47656%201.66406%201.82812%201.51563%202.25%201.5H3.1875V0.5625C3.21875%200.21875%203.40625%200.03125%203.75%200ZM10.125%204.5H1.875V10.5C1.89062%2010.7344%202.01562%2010.8594%202.25%2010.875H9.75C9.98438%2010.8594%2010.1094%2010.7344%2010.125%2010.5V4.5ZM7.89844%206.58594L6.79688%207.6875L7.89844%208.78906C8.11719%209.05469%208.11719%209.32031%207.89844%209.58594C7.63281%209.80469%207.36719%209.80469%207.10156%209.58594L6%208.48438L4.89844%209.58594C4.63281%209.80469%204.36719%209.80469%204.10156%209.58594C3.88281%209.32031%203.88281%209.05469%204.10156%208.78906L5.20312%207.6875L4.10156%206.58594C3.88281%206.32031%203.88281%206.05469%204.10156%205.78906C4.36719%205.57031%204.63281%205.57031%204.89844%205.78906L6%206.89062L7.10156%205.78906C7.36719%205.57031%207.63281%205.57031%207.89844%205.78906C8.11719%206.05469%208.11719%206.32031%207.89844%206.58594Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-red-500")}
                tag="div"
              >
                {"Cancel Schedule"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1422")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Interview Module"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1421", "cursor-pointer")}
          tag="div"
          {...onClickInterviewModuleLink}
        >
          <_Builtin.Block tag="div">{textInterviewModuleLink}</_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.875%200H11.625C11.8594%200.015625%2011.9844%200.140625%2012%200.375V4.125C11.9844%204.35938%2011.8594%204.48438%2011.625%204.5C11.3906%204.48438%2011.2656%204.35938%2011.25%204.125V1.28906L5.50781%207.00781C5.33594%207.16406%205.16406%207.16406%204.99219%207.00781C4.83594%206.83594%204.83594%206.66406%204.99219%206.49219L10.7109%200.75H7.875C7.64062%200.734375%207.51562%200.609375%207.5%200.375C7.51562%200.140625%207.64062%200.015625%207.875%200ZM1.5%200.75H4.875C5.10938%200.765625%205.23438%200.890625%205.25%201.125C5.23438%201.35938%205.10938%201.48437%204.875%201.5H1.5C1.28125%201.5%201.10156%201.57031%200.960938%201.71094C0.820312%201.85156%200.75%202.03125%200.75%202.25V10.5C0.75%2010.7188%200.820312%2010.8984%200.960938%2011.0391C1.10156%2011.1797%201.28125%2011.25%201.5%2011.25H9.75C9.96875%2011.25%2010.1484%2011.1797%2010.2891%2011.0391C10.4297%2010.8984%2010.5%2010.7188%2010.5%2010.5V7.125C10.5156%206.89062%2010.6406%206.76562%2010.875%206.75C11.1094%206.76562%2011.2344%206.89062%2011.25%207.125V10.5C11.2344%2010.9219%2011.0859%2011.2734%2010.8047%2011.5547C10.5234%2011.8359%2010.1719%2011.9844%209.75%2012H1.5C1.07812%2011.9844%200.726562%2011.8359%200.445312%2011.5547C0.164062%2011.2734%200.015625%2010.9219%200%2010.5V2.25C0.015625%201.82812%200.164062%201.47656%200.445312%201.19531C0.726562%200.914062%201.07812%200.765625%201.5%200.75Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      {isInterviewersVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1423")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Attendies"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1424")}
            tag="div"
          >
            {slotInterviewers}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isTraineesVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1423")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Trainees"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1425")}
            tag="div"
          >
            {slotTrainees}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isCoordinatorVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1423")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Co-ordinator"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1426")}
            tag="div"
          >
            {slotCoordinators}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
