"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { TextWithIcon } from "./TextWithIcon";
import { InterviewerMetricList } from "./InterviewerMetricList";
import * as _utils from "./utils";
import _styles from "./InterviewerMetrics.module.css";

export function InterviewerMetrics({
  as: _Component = _Builtin.Block,
  slotFilter,
  textDescription = "Metrics showing for the date range aug 24-28 for sales department ",
  slotInterviewerMetricsList,
  slotMetrics,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "interviewer-metrics-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "interviewer-metrics-sub")}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotFilter}</_Builtin.Block>
        <_Builtin.Block tag="div">
          <Text
            content={textDescription}
            color="neutral"
            size="1"
            weight="regular"
          />
        </_Builtin.Block>
        <_Builtin.Block
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
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-extra-metrics")}
          tag="div"
        >
          {slotMetrics}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
