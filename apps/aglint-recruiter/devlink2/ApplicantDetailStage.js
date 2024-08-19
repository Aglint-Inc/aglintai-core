"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./ApplicantDetailStage.module.css";

export function ApplicantDetailStage({
  as: _Component = _Builtin.Block,
  textName = "Stage 3 Final Session",
  textInterviewCount = "This is a global text component",
  onClickDrop = {},
  slotInterviewStageDetail,
  isInterviewStageDetailVisible = true,
  isCountVisible = true,
  slotScheduleButton,
  isScheduleButtonVisible = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "app-detail-stages-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "app-detail-card-header-drop")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <Text content={textName} weight="medium" />
        </_Builtin.Block>
        {isScheduleButtonVisible ? (
          <_Builtin.Block tag="div">{slotScheduleButton}</_Builtin.Block>
        ) : null}
        {isCountVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "app-detail-wrap-left-icon")}
            tag="div"
          >
            <Text content={textInterviewCount} size="1" color="neutral" />
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1739")}
              tag="div"
              {...onClickDrop}
            >
              <GlobalIcon iconName="keyboard_double_arrow_down" size="5" />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isInterviewStageDetailVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "appdetails-drop-card-wrap")}
          tag="div"
        >
          {slotInterviewStageDetail}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
