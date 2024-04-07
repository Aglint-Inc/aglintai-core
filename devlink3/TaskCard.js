"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TaskInline } from "./TaskInline";
import { CloseNewTask } from "./CloseNewTask";
import * as _utils from "./utils";
import _styles from "./TaskCard.module.css";

export function TaskCard({
  as: _Component = _Builtin.Block,
  textTitle = "Software Engineer (Training)",
  slotTaskInline,
  onClickAddTask = {},
  slotNewTask,
  isNewTaskVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "task-cards")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "fw-semibold", "plr-16")}
        tag="div"
      >
        {textTitle}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1332", "plr-16")}
        tag="div"
      >
        {slotTaskInline ?? <TaskInline />}
      </_Builtin.Block>
      {isNewTaskVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1354")}
          tag="div"
        >
          {slotNewTask ?? <CloseNewTask />}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "task-add-btn-wrap",
          "cursor-pointer",
          "mlr-16"
        )}
        tag="div"
        {...onClickAddTask}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.5625%204.6875V8.4375H13.3125C13.6562%208.46875%2013.8438%208.65625%2013.875%209C13.8438%209.34375%2013.6562%209.53125%2013.3125%209.5625H9.5625V13.3125C9.53125%2013.6562%209.34375%2013.8438%209%2013.875C8.65625%2013.8438%208.46875%2013.6562%208.4375%2013.3125V9.5625H4.6875C4.34375%209.53125%204.15625%209.34375%204.125%209C4.15625%208.65625%204.34375%208.46875%204.6875%208.4375H8.4375V4.6875C8.46875%204.34375%208.65625%204.15625%209%204.125C9.34375%204.15625%209.53125%204.34375%209.5625%204.6875Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "text-blue-500")}
          tag="div"
        >
          {"Add Task"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
