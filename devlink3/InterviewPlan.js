import React from "react";
import * as _Builtin from "./_Builtin";
import { InterviewPlanCard } from "./InterviewPlanCard";
import { InterviewModuleCard } from "./InterviewModuleCard";
import { InterviewBreakCard } from "./InterviewBreakCard";
import * as _utils from "./utils";
import _styles from "./InterviewPlan.module.css";

export function InterviewPlan({
  as: _Component = _Builtin.Block,
  slotInterviewPlan,
  onClickAddModule = {},
  onClickAddBreak = {},
  onClickScheduler = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "interviewplan")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "title_wrap")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Interview Plan"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {
            "Add your interview modules to form an interview plan. You can find your interview modules in "
          }
          <_Builtin.Span
            className={_utils.cx(_styles, "link")}
            {...onClickScheduler}
          >
            {"scheduler"}
          </_Builtin.Span>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slotinterviewplancard")}
        tag="div"
      >
        {slotInterviewPlan ?? (
          <>
            <InterviewPlanCard />
            <InterviewModuleCard />
            <InterviewBreakCard />
          </>
        )}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "buttons_wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "button_primary")}
          tag="div"
          {...onClickAddModule}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.75%201.875V5.25H10.125C10.3438%205.25%2010.5234%205.32031%2010.6641%205.46094C10.8047%205.60156%2010.875%205.78125%2010.875%206C10.875%206.21875%2010.8047%206.39844%2010.6641%206.53906C10.5234%206.67969%2010.3438%206.75%2010.125%206.75H6.75V10.125C6.75%2010.3438%206.67969%2010.5234%206.53906%2010.6641C6.39844%2010.8047%206.21875%2010.875%206%2010.875C5.78125%2010.875%205.60156%2010.8047%205.46094%2010.6641C5.32031%2010.5234%205.25%2010.3438%205.25%2010.125V6.75H1.875C1.65625%206.75%201.47656%206.67969%201.33594%206.53906C1.19531%206.39844%201.125%206.21875%201.125%206C1.125%205.78125%201.19531%205.60156%201.33594%205.46094C1.47656%205.32031%201.65625%205.25%201.875%205.25H5.25V1.875C5.25%201.65625%205.32031%201.47656%205.46094%201.33594C5.60156%201.19531%205.78125%201.125%206%201.125C6.21875%201.125%206.39844%201.19531%206.53906%201.33594C6.67969%201.47656%206.75%201.65625%206.75%201.875Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Add Module"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "button_primary", "is_outline")}
          tag="div"
          {...onClickAddBreak}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.75%201.875V5.25H10.125C10.3438%205.25%2010.5234%205.32031%2010.6641%205.46094C10.8047%205.60156%2010.875%205.78125%2010.875%206C10.875%206.21875%2010.8047%206.39844%2010.6641%206.53906C10.5234%206.67969%2010.3438%206.75%2010.125%206.75H6.75V10.125C6.75%2010.3438%206.67969%2010.5234%206.53906%2010.6641C6.39844%2010.8047%206.21875%2010.875%206%2010.875C5.78125%2010.875%205.60156%2010.8047%205.46094%2010.6641C5.32031%2010.5234%205.25%2010.3438%205.25%2010.125V6.75H1.875C1.65625%206.75%201.47656%206.67969%201.33594%206.53906C1.19531%206.39844%201.125%206.21875%201.125%206C1.125%205.78125%201.19531%205.60156%201.33594%205.46094C1.47656%205.32031%201.65625%205.25%201.875%205.25H5.25V1.875C5.25%201.65625%205.32031%201.47656%205.46094%201.33594C5.60156%201.19531%205.78125%201.125%206%201.125C6.21875%201.125%206.39844%201.19531%206.53906%201.33594C6.67969%201.47656%206.75%201.65625%206.75%201.875Z%22%20fill%3D%22%231f73b7%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Add Break"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
