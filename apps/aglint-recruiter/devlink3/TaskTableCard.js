"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TaskStatus } from "./TaskStatus";
import { PriorityPill } from "./PriorityPill";
import * as _utils from "./utils";
import _styles from "./TaskTableCard.module.css";

export function TaskTableCard({
  as: _Component = _Builtin.Block,
  slotCheckbox,
  slotStatus,
  textTask = "Agent with Watsapp and text messages",
  textJob = "Architect",
  slotCandidate,
  isActiveCard = false,
  slotAssignedToCard,
  onClickCard = {},
  slotPriority,
  onClickOverview = {},
  isOverdueVisible = false,
  textOverdue = "Today 07 Apr",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "task_row", "height-53", "pointer")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "task_selection_checkbox")}
        id={_utils.cx(
          _styles,
          "w-node-_64cd7013-b477-21b7-5d99-36b360482539-f9aebf0d"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "checkbox-wrap-task")}
          id={_utils.cx(
            _styles,
            "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf0e-f9aebf0d"
          )}
          tag="div"
        >
          {slotCheckbox}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "task_row_cell", "overview-wrap")}
        id={_utils.cx(
          _styles,
          "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf10-f9aebf0d"
        )}
        tag="div"
        {...onClickCard}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "one-line-clamp")}
          tag="div"
        >
          {textTask}
        </_Builtin.Block>
        {isOverdueVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "tjsc-overdue-wrap")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewbox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.65625%201.5C4.23438%201.51563%204.72656%201.71094%205.13281%202.08594C5.28906%202.25781%205.29688%202.42969%205.15625%202.60156C4.98438%202.75781%204.80469%202.76562%204.61719%202.625C4.35156%202.39062%204.03125%202.26563%203.65625%202.25C3.26562%202.26563%202.9375%202.40625%202.67188%202.67188C2.40625%202.9375%202.26562%203.26562%202.25%203.65625C2.25%203.9375%202.32031%204.1875%202.46094%204.40625C2.57031%204.625%202.53906%204.80469%202.36719%204.94531C2.14844%205.03906%201.96875%205%201.82812%204.82812C1.60938%204.48438%201.5%204.09375%201.5%203.65625C1.51562%203.04688%201.72656%202.53906%202.13281%202.13281C2.53906%201.72656%203.04688%201.51563%203.65625%201.5ZM9.86719%202.08594C10.2734%201.71094%2010.7656%201.51563%2011.3438%201.5C11.9531%201.51563%2012.4609%201.72656%2012.8672%202.13281C13.2734%202.53906%2013.4844%203.04688%2013.5%203.65625C13.5%204.09375%2013.3906%204.48438%2013.1719%204.82812C13.0312%205%2012.8594%205.03906%2012.6562%204.94531C12.4688%204.80469%2012.4297%204.63281%2012.5391%204.42969C12.6797%204.19531%2012.75%203.9375%2012.75%203.65625C12.7344%203.26562%2012.5938%202.9375%2012.3281%202.67188C12.0625%202.40625%2011.7344%202.26563%2011.3438%202.25C10.9688%202.26563%2010.6484%202.39062%2010.3828%202.625C10.1953%202.76562%2010.0156%202.75781%209.84375%202.60156C9.70312%202.42969%209.71094%202.25781%209.86719%202.08594ZM2.88281%2013.3828C2.71094%2013.5391%202.53906%2013.5391%202.36719%2013.3828C2.21094%2013.2109%202.21094%2013.0391%202.36719%2012.8672L3.53906%2011.6953C2.71094%2010.7422%202.28125%209.59375%202.25%208.25C2.26562%207.26562%202.50781%206.38281%202.97656%205.60156C3.42969%204.80469%204.05469%204.17969%204.85156%203.72656C5.63281%203.25781%206.51562%203.01563%207.5%203C8.48438%203.01563%209.36719%203.25781%2010.1484%203.72656C10.9453%204.17969%2011.5703%204.80469%2012.0234%205.60156C12.4922%206.38281%2012.7344%207.26562%2012.75%208.25C12.7188%209.59375%2012.2891%2010.7422%2011.4609%2011.6953L12.6328%2012.8672C12.7891%2013.0391%2012.7891%2013.2109%2012.6328%2013.3828C12.4609%2013.5391%2012.2891%2013.5391%2012.1172%2013.3828L10.9453%2012.2109C9.99219%2013.0391%208.84375%2013.4688%207.5%2013.5C6.15625%2013.4688%205.00781%2013.0391%204.05469%2012.2109L2.88281%2013.3828ZM7.5%203.75C6.6875%203.75%205.9375%203.95313%205.25%204.35938C4.5625%204.75%204.01562%205.29688%203.60938%206C3.20312%206.70312%203%207.45312%203%208.25C3%209.04688%203.20312%209.79688%203.60938%2010.5C4.01562%2011.2031%204.5625%2011.75%205.25%2012.1406C5.9375%2012.5469%206.6875%2012.75%207.5%2012.75C8.3125%2012.75%209.0625%2012.5469%209.75%2012.1406C10.4375%2011.75%2010.9844%2011.2031%2011.3906%2010.5C11.7969%209.79688%2012%209.04688%2012%208.25C12%207.45312%2011.7969%206.70312%2011.3906%206C10.9844%205.29688%2010.4375%204.75%209.75%204.35938C9.0625%203.95313%208.3125%203.75%207.5%203.75ZM7.875%205.625V8.4375L9.23438%209.44531C9.39062%209.60156%209.41406%209.78125%209.30469%209.98438C9.14844%2010.1406%208.96875%2010.1641%208.76562%2010.0547L7.26562%208.92969C7.17188%208.85156%207.125%208.75%207.125%208.625V5.625C7.14062%205.39062%207.26562%205.26562%207.5%205.25C7.73438%205.26562%207.85938%205.39062%207.875%205.625Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-block-31")}
              tag="div"
            >
              {textOverdue}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "task_row_cell")}
        id={_utils.cx(
          _styles,
          "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf0f-f9aebf0d"
        )}
        tag="div"
      >
        {slotStatus ?? <TaskStatus />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "task_row_cell")}
        id={_utils.cx(
          _styles,
          "w-node-_11278828-2b21-6637-8526-f1ac7659ccbf-f9aebf0d"
        )}
        tag="div"
      >
        {slotPriority ?? <PriorityPill />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "task_row_cell")}
        id={_utils.cx(
          _styles,
          "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf13-f9aebf0d"
        )}
        tag="div"
        {...onClickCard}
      >
        {slotAssignedToCard}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "task_row_cell")}
        id={_utils.cx(
          _styles,
          "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf1d-f9aebf0d"
        )}
        tag="div"
        {...onClickCard}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "one-line-clamp")}
          tag="div"
        >
          {textJob}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "task_row_cell", "hide")}
        id={_utils.cx(
          _styles,
          "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf20-f9aebf0d"
        )}
        tag="div"
        {...onClickCard}
      >
        {slotCandidate}
      </_Builtin.Block>
      {isActiveCard ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1449")}
          id={_utils.cx(
            _styles,
            "w-node-_5835e3c5-e90c-dac6-4a0a-13a054034032-f9aebf0d"
          )}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
