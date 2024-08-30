"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ScheduleProgress } from "./ScheduleProgress";
import * as _utils from "./utils";
import _styles from "./RequestProgress.module.css";

export function RequestProgress({
  as: _Component = _Builtin.Block,
  indicator,
  circleIndicator,
  slotIndicator,
  slotProgress,
  textRequestProgress = "This is a global text component",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "request-progress-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "request-progress-line-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-insdicator-wrapp")}
          tag="div"
        >
          {slotIndicator ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "", "rp-circle")}
              tag="div"
              circle-indicator={circleIndicator}
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "rps-lin-item")}
          tag="div"
        />
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "hide")}
          value="%3Cstyle%3E%0A%5Bcircle-indicator%3D'success'%5D%7B%0Abackground-color%3A%20%2346A758%3B%0A%7D%0A%3C%2Fstyle%3E"
        />
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "progress-indicator-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "proegress-indicator")}
            tag="div"
            indicator={indicator}
          >
            <Text content={textRequestProgress} size="1" weight="medium" />
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "hide")}
              value="%3Cstyle%3E%0A%5Bindicator%3D'info'%5D%7B%0Aborder%3A%201px%20solid%20var(--info-6)%3B%0Abackground-color%3A%20var(--info-2)%3B%0Acolor%3A%20var(--info-11)%3B%0A%7D%0A%5Bindicator%3D'success'%5D%7B%0Aborder%3A%201px%20solid%20%23018B0F6B%3B%0Abackground-color%3A%20%23F5FBF5%3B%0Acolor%3A%23006514D5%3B%0A%7D%0A%0A%3C%2Fstyle%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotProgress ?? <ScheduleProgress />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
