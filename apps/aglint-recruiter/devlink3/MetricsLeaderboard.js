"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithIcon } from "./TextWithIcon";
import { InterviewerMetricList } from "./InterviewerMetricList";
import * as _utils from "./utils";
import _styles from "./MetricsLeaderboard.module.css";

export function MetricsLeaderboard({
  as: _Component = _Builtin.Block,
  slotInterviewerMetricsList,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "metrics-interview-leader")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "metrics-table-header")}
        tag="div"
      >
        <TextWithIcon
          fontWeight="medium"
          textContent="Interviewer Leaderboard"
          iconName="trophy"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "metrics-table-body-wrap")}
        tag="div"
      >
        {slotInterviewerMetricsList ?? <InterviewerMetricList />}
      </_Builtin.Block>
    </_Component>
  );
}
