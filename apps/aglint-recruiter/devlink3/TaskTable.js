"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TaskUpdateButton } from "./TaskUpdateButton";
import { Text } from "./Text";
import { NewTaskCard } from "./NewTaskCard";
import { TaskTableCard } from "./TaskTableCard";
import * as _utils from "./utils";
import _styles from "./TaskTable.module.css";

export function TaskTable({
  as: _Component = _Builtin.Block,
  slotTaskTableCard,
  onClickNewTask = {},
  slotNewTaskCard,
  isNewTaskCardVisible = false,
  slotFilter,
  slotCheckbox,
}) {
  return (
    <_Component className={_utils.cx(_styles, "task_table")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "task_table_filters")}
        tag="div"
      >
        {slotFilter ?? <TaskUpdateButton />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "task_table_wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "task_row", "title-row")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "task_selection_checkbox")}
            id={_utils.cx(
              _styles,
              "w-node-e2a009d4-d014-04d6-b837-039f401c4ec7-401c4ec4"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "checkbox-wrap-task")}
              id={_utils.cx(
                _styles,
                "w-node-a912ad28-61de-e2be-3b5b-b1a487db6b63-401c4ec4"
              )}
              tag="div"
            >
              {slotCheckbox ?? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2220%22%20viewBox%3D%220%200%2016%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2220%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20d%3D%22M0%205C0%203.34315%201.34315%202%203%202H13C14.6569%202%2016%203.34315%2016%205V15C16%2016.6569%2014.6569%2018%2013%2018H3C1.34315%2018%200%2016.6569%200%2015V5Z%22%20fill%3D%22white%22%20fill-opacity%3D%220.9%22%2F%3E%0A%3Cpath%20d%3D%22M0.5%205C0.5%203.61929%201.61929%202.5%203%202.5H13C14.3807%202.5%2015.5%203.61929%2015.5%205V15C15.5%2016.3807%2014.3807%2017.5%2013%2017.5H3C1.61929%2017.5%200.5%2016.3807%200.5%2015V5Z%22%20stroke%3D%22%23191400%22%20stroke-opacity%3D%220.207843%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              )}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "task_row_cell")}
            id={_utils.cx(
              _styles,
              "w-node-e2a009d4-d014-04d6-b837-039f401c4ecb-401c4ec4"
            )}
            tag="div"
          >
            <Text weight="medium" content="Task" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "task_row_cell")}
            id={_utils.cx(
              _styles,
              "w-node-e2a009d4-d014-04d6-b837-039f401c4ec8-401c4ec4"
            )}
            tag="div"
          >
            <Text weight="medium" content="Status" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "task_row_cell")}
            id={_utils.cx(
              _styles,
              "w-node-_98446a6e-7f10-ed73-7fea-bb5776f6dc5c-401c4ec4"
            )}
            tag="div"
          >
            <Text weight="medium" content="Priority" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "task_row_cell")}
            id={_utils.cx(
              _styles,
              "w-node-e2a009d4-d014-04d6-b837-039f401c4ece-401c4ec4"
            )}
            tag="div"
          >
            <Text weight="medium" content="Assignee" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "task_row_cell", "gap-8")}
            id={_utils.cx(
              _styles,
              "w-node-e2a009d4-d014-04d6-b837-039f401c4ed1-401c4ec4"
            )}
            tag="div"
          >
            <Text weight="medium" content="Job" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "task_row_cell", "hide")}
            id={_utils.cx(
              _styles,
              "w-node-e2a009d4-d014-04d6-b837-039f401c4ed4-401c4ec4"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Candidate"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "task_new_button")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "new_task")}
            tag="div"
            {...onClickNewTask}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "tjc-space-div")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "link-flex-accent")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewBox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%201.5C5.69318%201.5%205.44444%201.74873%205.44444%202.05556V5.94444H1.55556C1.24873%205.94444%201%206.19318%201%206.5C1%206.80683%201.24873%207.05556%201.55556%207.05556H5.44444V10.9444C5.44444%2011.2513%205.69318%2011.5%206%2011.5C6.30683%2011.5%206.55556%2011.2513%206.55556%2010.9444V7.05556H10.4444C10.7513%207.05556%2011%206.80683%2011%206.5C11%206.19318%2010.7513%205.94444%2010.4444%205.94444H6.55556V2.05556C6.55556%201.74873%206.30683%201.5%206%201.5Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"New"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          {isNewTaskCardVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1453")}
              tag="div"
            >
              {slotNewTaskCard ?? <NewTaskCard />}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_tasktablecard")}
          tag="div"
        >
          {slotTaskTableCard ?? <TaskTableCard />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
