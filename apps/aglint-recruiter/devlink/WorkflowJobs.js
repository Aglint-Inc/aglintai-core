"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { WorkflowPreview } from "./WorkflowPreview";
import * as _utils from "./utils";
import _styles from "./WorkflowJobs.module.css";

export function WorkflowJobs({
  as: _Component = _Builtin.Block,
  slotWorkflowCards,
  slotWorkflowPreview,
}) {
  return (
    <_Component className={_utils.cx(_styles, "workflow-jobs")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-workflow-cards")}
        tag="div"
      >
        {slotWorkflowCards}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-workflowpreview")}
        id={_utils.cx(
          _styles,
          "w-node-_463e6d3e-a507-7c54-d345-80e0014fdf69-014fdf67"
        )}
        tag="div"
      >
        {slotWorkflowPreview ?? <WorkflowPreview />}
      </_Builtin.Block>
    </_Component>
  );
}
