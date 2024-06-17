"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { WorkflowEmpty } from "./WorkflowEmpty";
import { WorkflowCard } from "./WorkflowCard";
import * as _utils from "./utils";
import _styles from "./WorkflowLanding.module.css";

export function WorkflowLanding({
  as: _Component = _Builtin.Block,
  slotWorkflowCard,
  slotSearchAndFilter,
}) {
  return (
    <_Component className={_utils.cx(_styles, "workflow_listing")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_search_and-_filter")}
        tag="div"
      >
        {slotSearchAndFilter}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_workflow_card")}
        tag="div"
      >
        {slotWorkflowCard ?? (
          <>
            <WorkflowEmpty />
            <WorkflowCard />
            <WorkflowCard />
            <WorkflowCard />
            <WorkflowCard />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
