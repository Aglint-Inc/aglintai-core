import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ScheduleOptions.module.css";

export function ScheduleOptions({
  as: _Component = _Builtin.Block,
  slotCandidateImage,
  textCandidateName = "Senior Software Engineer",
  slotInputName,
  slotDateRangeInput,
  slotPrimaryButton,
  slotInterviewCordinator,
  isNoOptionsFoundVisible = false,
  slotButtonLeft,
  slotButtonRight,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1192")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1193")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          {
            "You haven't yet scheduled an interview with the candidate. Please provide a name for the interview schedule and specify the timeframe during which you'd like to schedule the interview to explore available options."
          }
        </_Builtin.Block>
      </_Builtin.Block>
      {isNoOptionsFoundVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "no-option-wrap")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2217%22%20viewBox%3D%220%200%2016%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8%2016.5C6.54167%2016.4792%205.20833%2016.125%204%2015.4375C2.79167%2014.7292%201.8125%2013.75%201.0625%2012.5C0.354167%2011.2292%200%209.89583%200%208.5C0%207.10417%200.354167%205.77083%201.0625%204.5C1.8125%203.25%202.79167%202.27083%204%201.5625C5.20833%200.875%206.54167%200.520833%208%200.5C9.45833%200.520833%2010.7917%200.875%2012%201.5625C13.2083%202.27083%2014.1875%203.25%2014.9375%204.5C15.6458%205.77083%2016%207.10417%2016%208.5C16%209.89583%2015.6458%2011.2292%2014.9375%2012.5C14.1875%2013.75%2013.2083%2014.7292%2012%2015.4375C10.7917%2016.125%209.45833%2016.4792%208%2016.5ZM6.75%2011C6.29167%2011.0417%206.04167%2011.2917%206%2011.75C6.04167%2012.2083%206.29167%2012.4583%206.75%2012.5H9.25C9.70833%2012.4583%209.95833%2012.2083%2010%2011.75C9.95833%2011.2917%209.70833%2011.0417%209.25%2011H9V8.25C8.95833%207.79167%208.70833%207.54167%208.25%207.5H6.75C6.29167%207.54167%206.04167%207.79167%206%208.25C6.04167%208.70833%206.29167%208.95833%206.75%209H7.5V11H6.75H7.5H6.75ZM8%204.5C7.70833%204.5%207.46875%204.59375%207.28125%204.78125C7.09375%204.96875%207%205.20833%207%205.5C7%205.79167%207.09375%206.03125%207.28125%206.21875C7.46875%206.40625%207.70833%206.5%208%206.5C8.29167%206.5%208.53125%206.40625%208.71875%206.21875C8.90625%206.03125%209%205.79167%209%205.5C9%205.20833%208.90625%204.96875%208.71875%204.78125C8.53125%204.59375%208.29167%204.5%208%204.5Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-yellow-800")}
            tag="div"
          >
            {
              "No available options found. Try modifying the date range to get options."
            }
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1275")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Interview Cordinator"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotInterviewCordinator}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1093")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Schedule Name"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotInputName}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1097")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Date Range"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {"Pick a start and end date where you have to conduct interview."}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotDateRangeInput}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotPrimaryButton}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1286")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1287")}
          tag="div"
        >
          {slotButtonLeft}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1288")}
          tag="div"
        >
          {slotButtonRight}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
