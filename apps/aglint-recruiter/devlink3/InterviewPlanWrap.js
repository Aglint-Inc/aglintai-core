"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { IconButtonGhost } from "./IconButtonGhost";
import { InterviewPlanDetail } from "./InterviewPlanDetail";
import * as _utils from "./utils";
import _styles from "./InterviewPlanWrap.module.css";

export function InterviewPlanWrap({
  as: _Component = _Builtin.Block,
  textStageName = "This is a global text component",
  onClickEdit = {},
  textInterviewCount = "This is a global text component",
  slotRightIconButton,
  slotInputButton,
  isInputVisible = false,
  slotInterviewPlanDetail,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "interview-plan-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ip-input-header-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "interview-paln-header-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "interview-plan-title-wrap")}
            tag="div"
          >
            <Text content={textStageName} />
            <_Builtin.Block tag="div" {...onClickEdit}>
              <IconButtonGhost iconName="edit_square" size="1" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "interview-plan-title-right")}
            tag="div"
          >
            <Text content={textInterviewCount} weight="regular" size="1" />
            <_Builtin.Block tag="div">{slotRightIconButton}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isInputVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "input-slot-ip-wrap")}
            tag="div"
          >
            {slotInputButton}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-interview-plan-card")}
        tag="div"
      >
        {slotInterviewPlanDetail ?? <InterviewPlanDetail />}
      </_Builtin.Block>
    </_Component>
  );
}
