"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { DarkPill } from "./DarkPill";
import * as _utils from "./utils";
import _styles from "./CompletedInterviews.module.css";

export function CompletedInterviews({
  as: _Component = _Builtin.Block,
  slotGraph,
  textMonth = "Last 8 months",
  textLastDays = "Last 30 days",
  onClickLastMonth = {},
  onClickLastDays = {},
  isLastMonthsActive = false,
  isLastDaysActive = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "completed-interview-wrap")}
      id={_utils.cx(
        _styles,
        "w-node-_34ab1cb7-7f26-aa79-3f1b-e5788ae166be-8ae166be"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1784")}
        tag="div"
      >
        <Text content="Completed Interviews" weight="medium" />
        <_Builtin.Block
          className={_utils.cx(_styles, "ci_option_switch")}
          tag="div"
        >
          <DarkPill
            textPill={textMonth}
            onClickPill={onClickLastMonth}
            isActive={isLastMonthsActive}
          />
          <DarkPill
            textPill={textLastDays}
            onClickPill={onClickLastDays}
            isActive={isLastDaysActive}
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {slotGraph ?? (
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/666047b45fd85df292036c8c_Chart.png"
          />
        )}
      </_Builtin.Block>
    </_Component>
  );
}
