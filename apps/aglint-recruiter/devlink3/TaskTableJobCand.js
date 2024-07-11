"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { TaskTableJobCard } from "./TaskTableJobCard";
import * as _utils from "./utils";
import _styles from "./TaskTableJobCand.module.css";

export function TaskTableJobCand({
  as: _Component = _Builtin.Block,
  slotFilter,
  slotTaskJobCard,
  slotCheckbox,
  textStatusHeader = "Status",
  textPriorityHeader = "Priority",
  textAssigneeHeader = "Assignee",
  gridProps = {},
  textCandidateHeader = "Candidate",
  textJobHeader = "Job",
}) {
  return (
    <_Component className={_utils.cx(_styles, "task_table")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "task_table_filters")}
        tag="div"
      >
        {slotFilter}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "task_table_wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "task_row", "title-row", "job-cand")}
          tag="div"
          {...gridProps}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1537")}
            id={_utils.cx(
              _styles,
              "w-node-_4236db5e-3938-26b8-a04e-ed6679bd2c95-79bd2c91"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "checkbox-wrap-task")}
              id={_utils.cx(
                _styles,
                "w-node-_7aa6a833-923f-9190-7ab6-0d3438ac9b89-79bd2c91"
              )}
              tag="div"
            >
              {slotCheckbox}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "task_row_cell")}
            id={_utils.cx(
              _styles,
              "w-node-_4236db5e-3938-26b8-a04e-ed6679bd2c99-79bd2c91"
            )}
            tag="div"
          >
            <Text color="neutral-12" content="Task" weight="medium" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "task_row_cell", "is_status")}
            id={_utils.cx(
              _styles,
              "w-node-_4236db5e-3938-26b8-a04e-ed6679bd2c96-79bd2c91"
            )}
            tag="div"
          >
            <Text
              content={textStatusHeader}
              color="neutral-12"
              weight="medium"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "task_row_cell")}
            tag="div"
          >
            <Text
              content={textPriorityHeader}
              color="neutral-12"
              weight="medium"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "task_row_cell")}
            id={_utils.cx(
              _styles,
              "w-node-_4236db5e-3938-26b8-a04e-ed6679bd2c9c-79bd2c91"
            )}
            tag="div"
          >
            <Text
              content={textAssigneeHeader}
              color="neutral-12"
              weight="medium"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "task_row_cell")}
            id={_utils.cx(
              _styles,
              "w-node-_430a6ab2-8864-faea-9e6c-d2de1e9414d2-79bd2c91"
            )}
            tag="div"
          >
            <Text
              content={textCandidateHeader}
              color="neutral-12"
              weight="medium"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "task_row_cell")}
            id={_utils.cx(
              _styles,
              "w-node-_7183a5b7-2ac4-fc35-bd91-61b79d6499d3-79bd2c91"
            )}
            tag="div"
          >
            <Text content={textJobHeader} color="neutral-12" weight="medium" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1452")}
          tag="div"
        >
          {slotTaskJobCard ?? (
            <>
              <TaskTableJobCard />
              <TaskTableJobCard />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
