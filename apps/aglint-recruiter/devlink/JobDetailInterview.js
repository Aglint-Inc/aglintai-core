"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonSoft } from "./ButtonSoft";
import * as _utils from "./utils";
import _styles from "./JobDetailInterview.module.css";

export function JobDetailInterview({
  as: _Component = _Builtin.Block,
  slotNewInterviewPlanCard,
  onClickViewScheduler = {},
  textButton = "View in scheduler",
}) {
  return (
    <_Component className={_utils.cx(_styles, "jdi-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "jdi-slot")} tag="div">
        {slotNewInterviewPlanCard}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "jdi-btn-wrap")} tag="div">
        <ButtonSoft
          onClickButton={onClickViewScheduler}
          size="2"
          iconSize="3"
          textButton="View In Tasks"
          isRightIcon={true}
          iconName="north_east"
        />
      </_Builtin.Block>
    </_Component>
  );
}
