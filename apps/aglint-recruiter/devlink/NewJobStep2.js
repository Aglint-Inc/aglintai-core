"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./NewJobStep2.module.css";

export function NewJobStep2({
  as: _Component = _Builtin.Block,
  slotJobDescription,
  onClickAddSkill = {},
  slotAddedSkill,
  slotSuggestedSkill,
  isAddSkillVisible = true,
  slotRequiredSKill,
  isJobHeaderVisible = true,
  onClickGenerate = {},
  isGenerateVisible = true,
  onClickProceed = {},
  isProceedDisable = true,
  isAddJob = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "jd-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-input-wrapper")}
        tag="div"
      >
        <Text content="Job Description" />
        <_Builtin.Block
          className={_utils.cx(_styles, "cj-richtext-editor-wrapper")}
          tag="div"
        >
          {slotJobDescription}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
