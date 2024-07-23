"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { WorkflowItem } from "./WorkflowItem";
import { WorkflowConnector } from "./WorkflowConnector";
import { WorkflowAdd } from "./WorkflowAdd";
import { Text } from "./Text";
import { TextWithIcon } from "./TextWithIcon";
import * as _utils from "./utils";
import _styles from "./WorkflowDetail.module.css";

export function WorkflowDetail({
  as: _Component = _Builtin.Block,
  slotWorkflowItem,
  slotConnectedJobs,
}) {
  return (
    <_Component className={_utils.cx(_styles, "workflow_listing")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "workflow_item_wrap")}
        tag="div"
      >
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
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "connected_jobs_wrap")}
        id={_utils.cx(
          _styles,
          "w-node-_965d923c-99e0-e5e3-fc3b-e0d10190b041-2b3cbc8e"
        )}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "info_block")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "title_info", "is_neutral")}
            tag="div"
          >
            <Text weight="medium" content="Connected Jobs" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_coneected_jobs")}
          tag="div"
        >
          {slotConnectedJobs ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "connected_job-copy")}
              tag="div"
            >
              <TextWithIcon iconName="work" textContent="Managing Director" />
              <TextWithIcon iconName="work" textContent="Managing Director" />
              <TextWithIcon iconName="work" textContent="Managing Director" />
              <TextWithIcon iconName="work" textContent="Managing Director" />
              <TextWithIcon iconName="work" textContent="Managing Director" />
            </_Builtin.Block>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
