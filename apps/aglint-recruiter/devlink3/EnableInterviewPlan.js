"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonPrimaryOutlinedRegular } from "./ButtonPrimaryOutlinedRegular";
import * as _utils from "./utils";
import _styles from "./EnableInterviewPlan.module.css";

export function EnableInterviewPlan({
  as: _Component = _Builtin.Block,
  onClickEnableInterviewPlan = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "enable-interview-wrap")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {"Manage your interview plan"}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "text-grey_600")} tag="div">
        {
          'Create your interview stages for the job to ensure a structured evaluation process. Add different interview types such as "Initial Screening" or "Technical Interview." Use this template each time you schedule interviews for candidates to maintain consistency and efficiency.'
        }
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "mt-10")}
        tag="div"
        {...onClickEnableInterviewPlan}
      >
        <ButtonPrimaryOutlinedRegular buttonText="Enable Interview Plan" />
      </_Builtin.Block>
    </_Component>
  );
}
