"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { WorkflowButton } from "./WorkflowButton";
import * as _utils from "./utils";
import _styles from "./WorkflowAddAction.module.css";

export function WorkflowAddAction({
  as: _Component = _Builtin.Block,
  textHeader = "Choose an action from below",
  slotWorkflowButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "workflow-add-wrap")} tag="div">
      <Text content={textHeader} weight="regular" color="neutral" />
      <_Builtin.Block
        className={_utils.cx(_styles, "workflow-list-wrappers")}
        tag="div"
      >
        {slotWorkflowButton ?? (
          <>
            <WorkflowButton />
            <WorkflowButton />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
