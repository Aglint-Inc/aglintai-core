"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MetricsLeaderboard } from "./MetricsLeaderboard";
import { InterviewersDash } from "./InterviewersDash";
import * as _utils from "./utils";
import _styles from "./InterviewerMetrics.module.css";

export function InterviewerMetrics({
  as: _Component = _Builtin.Block,
  slotFilter,
  slotMetrics,
  slotFirstGrid,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "interviewer-metrics-wrap")}
      tag="div"
    >
      <_Builtin.Block tag="div">{slotFilter}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "metrics-grid-first")}
        tag="div"
      >
        {slotFirstGrid ?? (
          <>
            <MetricsLeaderboard />
            <InterviewersDash
              id={_utils.cx(
                _styles,
                "w-node-e18175cc-50a5-19de-e5b3-6e0d768a3b0c-cc1a2f8c"
              )}
            />
          </>
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "interviewer-metrics-sub")}
        tag="div"
      >
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
