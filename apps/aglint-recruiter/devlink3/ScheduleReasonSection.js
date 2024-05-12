"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ReasonList } from "./ReasonList";
import * as _utils from "./utils";
import _styles from "./ScheduleReasonSection.module.css";

export function ScheduleReasonSection({
  as: _Component = _Builtin.Block,
  slotReasonList,
  textHeading = "Reschedule Reasons",
  textDesc = "Add reasons for rescheduling, and these options will be provided at the time of rescheduling.",
  onClickAdd = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1671")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1670")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textHeading}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {textDesc}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1676")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1672")}
          tag="div"
        >
          {slotReasonList ?? <ReasonList />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1677", "cursor_pointer")}
          tag="div"
          {...onClickAdd}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.875%203.5V7.625H12C12.2344%207.64062%2012.3594%207.76562%2012.375%208C12.3594%208.23438%2012.2344%208.35938%2012%208.375H7.875V12.5C7.85938%2012.7344%207.73438%2012.8594%207.5%2012.875C7.26562%2012.8594%207.14062%2012.7344%207.125%2012.5V8.375H3C2.76562%208.35938%202.64062%208.23438%202.625%208C2.64062%207.76562%202.76562%207.64062%203%207.625H7.125V3.5C7.14062%203.26562%207.26562%203.14063%207.5%203.125C7.73438%203.14063%207.85938%203.26562%207.875%203.5Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-500")}
            tag="div"
          >
            {"Add"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
