"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./NewJobStep1.module.css";

export function NewJobStep1({
  as: _Component = _Builtin.Block,
  slotForm,
  isJobHeaderVisible = true,
  onClickProceed = {},
  isProceedButtonDisable = true,
  isAddJob = true,
  slotWarning,
  isWarningVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "jd-step-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "email-template-left-head")}
        tag="div"
      >
        <Text content="Job Details" weight="medium" />
        <Text
          content="Enter the basic job details and write with AI or paste your job description and add required skills for this job role"
          color="neutral"
        />
      </_Builtin.Block>
      {isWarningVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "jd-slot-warning")}
          tag="div"
        >
          {slotWarning}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-main-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-job-form-step-2")}
          tag="div"
        >
          {slotForm}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
