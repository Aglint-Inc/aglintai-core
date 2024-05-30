"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { WorkflowItem } from "./WorkflowItem";
import { WorkflowConnector } from "./WorkflowConnector";
import { WorkflowAdd } from "./WorkflowAdd";
import * as _utils from "./utils";
import _styles from "./WorkflowDetail.module.css";

export function WorkflowDetail({
  as: _Component = _Builtin.Block,
  slotWorkflowItem,
}) {
  return (
    <_Component className={_utils.cx(_styles, "workflow_listing")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "workflow_itesm")}
        tag="div"
      >
        {slotWorkflowItem ?? (
          <>
            <WorkflowItem />
            <WorkflowConnector />
            <WorkflowAdd />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
