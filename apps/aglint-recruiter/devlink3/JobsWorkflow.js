"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./JobsWorkflow.module.css";

export function JobsWorkflow({
  as: _Component = _Builtin.Block,
  slotWorflows,
  onClickAddWorkflow = {},
  isVisible = true,
  onClickCreateWorkflow = {},
  slotButtonSoft,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "jobs_workflow_warper")}
      tag="div"
    >
      <Text
        weight=""
        color="neutral"
        content="Click on add to add workflow. Use the toggle to enable/disable workflow."
      />
      {isVisible ? (
        <_Builtin.Block className={_utils.cx(_styles, "jw-btn-wrap")} tag="div">
          {slotButtonSoft}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "slotworkflowcard")}
        tag="div"
      >
        {slotWorflows}
      </_Builtin.Block>
    </_Component>
  );
}
