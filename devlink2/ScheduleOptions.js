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
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1093")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Candidate"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1095")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1096")}
            tag="div"
          >
            {slotCandidateImage}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <_Builtin.Block tag="div">{textCandidateName}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
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
    </_Component>
  );
}
