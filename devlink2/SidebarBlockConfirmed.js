import React from "react";
import * as _Builtin from "./_Builtin";
import { ScheduleInfoBlock } from "./ScheduleInfoBlock";
import { InterviewPanelCard } from "./InterviewPanelCard";
import * as _utils from "./utils";
import _styles from "./SidebarBlockConfirmed.module.css";

export function SidebarBlockConfirmed({
  as: _Component = _Builtin.Block,
  textScheduleName = "Phase 1: Interview for software engineer",
  slotScheduleInfo,
  onClickReminder = {},
  slotInterviewPanel,
  onClickReschedule = {},
  onClickCancelSchedule = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "interview_info")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {textScheduleName}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {slotScheduleInfo ?? (
          <ScheduleInfoBlock textDateTimeOrSlots="Waiting for the candidate to choose" />
        )}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "pending_tag")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "confirmed_info")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Confirmed"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "link_button_flex")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "link_button", "is_blue")}
          tag="div"
          {...onClickReschedule}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2214%22%20height%3D%2212%22%20viewBox%3D%220%200%2014%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.25%200C3.59375%200.03125%203.78125%200.21875%203.8125%200.5625V1.5H7.1875V0.5625C7.21875%200.21875%207.40625%200.03125%207.75%200C8.09375%200.03125%208.28125%200.21875%208.3125%200.5625V1.5H9.25C9.67188%201.51563%2010.0234%201.66406%2010.3047%201.94531C10.5859%202.22656%2010.7344%202.57812%2010.75%203V3.375V4.5H10.375H9.625H7H1.375V10.5C1.39062%2010.7344%201.51562%2010.8594%201.75%2010.875H6.92969C7.21094%2011.3125%207.57031%2011.6875%208.00781%2012H1.75C1.32812%2011.9844%200.976562%2011.8359%200.695312%2011.5547C0.414062%2011.2734%200.265625%2010.9219%200.25%2010.5V4.5V3.375V3C0.265625%202.57812%200.414062%202.22656%200.695312%201.94531C0.976562%201.66406%201.32812%201.51563%201.75%201.5H2.6875V0.5625C2.71875%200.21875%202.90625%200.03125%203.25%200ZM7%208.625C7%208.01562%207.14844%207.45312%207.44531%206.9375C7.74219%206.42188%208.15625%206.00781%208.6875%205.69531C9.21875%205.39844%209.78125%205.25%2010.375%205.25C10.9688%205.25%2011.5312%205.39844%2012.0625%205.69531C12.5938%206.00781%2013.0078%206.42188%2013.3047%206.9375C13.6016%207.45312%2013.75%208.01562%2013.75%208.625C13.75%209.23438%2013.6016%209.79688%2013.3047%2010.3125C13.0078%2010.8281%2012.5938%2011.2422%2012.0625%2011.5547C11.5312%2011.8516%2010.9688%2012%2010.375%2012C9.78125%2012%209.21875%2011.8516%208.6875%2011.5547C8.15625%2011.2422%207.74219%2010.8281%207.44531%2010.3125C7.14844%209.79688%207%209.23438%207%208.625ZM10.375%206.75C10.1406%206.76562%2010.0156%206.89062%2010%207.125V8.625C10.0156%208.85938%2010.1406%208.98438%2010.375%209H11.5C11.7344%208.98438%2011.8594%208.85938%2011.875%208.625C11.8594%208.39062%2011.7344%208.26562%2011.5%208.25H10.75V7.125C10.7344%206.89062%2010.6094%206.76562%2010.375%206.75Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Reschedule"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "link_button", "is_red")}
          tag="div"
          {...onClickCancelSchedule}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2214%22%20height%3D%2212%22%20viewBox%3D%220%200%2014%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.25%200C3.59375%200.03125%203.78125%200.21875%203.8125%200.5625V1.5H7.1875V0.5625C7.21875%200.21875%207.40625%200.03125%207.75%200C8.09375%200.03125%208.28125%200.21875%208.3125%200.5625V1.5H9.25C9.67188%201.51563%2010.0234%201.66406%2010.3047%201.94531C10.5859%202.22656%2010.7344%202.57812%2010.75%203V3.375V4.5H10.375H9.625H8.5H1.375V10.5C1.39062%2010.7344%201.51562%2010.8594%201.75%2010.875H6.92969C7.21094%2011.3125%207.57031%2011.6875%208.00781%2012H1.75C1.32812%2011.9844%200.976562%2011.8359%200.695312%2011.5547C0.414062%2011.2734%200.265625%2010.9219%200.25%2010.5V4.5V3.375V3C0.265625%202.57812%200.414062%202.22656%200.695312%201.94531C0.976562%201.66406%201.32812%201.51563%201.75%201.5H2.6875V0.5625C2.71875%200.21875%202.90625%200.03125%203.25%200ZM7%208.625C7%208.01562%207.14844%207.45312%207.44531%206.9375C7.74219%206.42188%208.15625%206.00781%208.6875%205.69531C9.21875%205.39844%209.78125%205.25%2010.375%205.25C10.9688%205.25%2011.5312%205.39844%2012.0625%205.69531C12.5938%206.00781%2013.0078%206.42188%2013.3047%206.9375C13.6016%207.45312%2013.75%208.01562%2013.75%208.625C13.75%209.23438%2013.6016%209.79688%2013.3047%2010.3125C13.0078%2010.8281%2012.5938%2011.2422%2012.0625%2011.5547C11.5312%2011.8516%2010.9688%2012%2010.375%2012C9.78125%2012%209.21875%2011.8516%208.6875%2011.5547C8.15625%2011.2422%207.74219%2010.8281%207.44531%2010.3125C7.14844%209.79688%207%209.23438%207%208.625ZM12.25%208.625C12.2344%208.39062%2012.1094%208.26562%2011.875%208.25H8.875C8.64062%208.26562%208.51562%208.39062%208.5%208.625C8.51562%208.85938%208.64062%208.98438%208.875%209H11.875C12.1094%208.98438%2012.2344%208.85938%2012.25%208.625Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Cancel Schedule"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_team_block")}
        tag="div"
      >
        <_Builtin.Block tag="div">{"Interview Panel"}</_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotInterviewPanel ?? <InterviewPanelCard />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
