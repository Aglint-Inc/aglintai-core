"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JobsWorkflow.module.css";

export function JobsWorkflow({
  as: _Component = _Builtin.Block,
  slotWorflows,
  onClickAddWorkflow = {},
  isVisible = false,
  onClickCreateWorkflow = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "jobs_workflow_warper")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "text-grey-600")} tag="div">
        {
          "Click on add to add workflow. Use the toggle to enable/disable workflow .Click here to "
        }
        <_Builtin.Span
          className={_utils.cx(_styles, "text-underline", "cursor-pointer")}
          {...onClickCreateWorkflow}
        >
          {"create workflow"}
        </_Builtin.Span>
      </_Builtin.Block>
      {isVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1754")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1755", "cursor-pointer")}
            tag="div"
            {...onClickAddWorkflow}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.5625%201.6875V5.4375H10.3125C10.6562%205.46875%2010.8438%205.65625%2010.875%206C10.8438%206.34375%2010.6562%206.53125%2010.3125%206.5625H6.5625V10.3125C6.53125%2010.6562%206.34375%2010.8438%206%2010.875C5.65625%2010.8438%205.46875%2010.6562%205.4375%2010.3125V6.5625H1.6875C1.34375%206.53125%201.15625%206.34375%201.125%206C1.15625%205.65625%201.34375%205.46875%201.6875%205.4375H5.4375V1.6875C5.46875%201.34375%205.65625%201.15625%206%201.125C6.34375%201.15625%206.53125%201.34375%206.5625%201.6875Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-blue-500")}
              tag="div"
            >
              {"Add workflow"}
            </_Builtin.Block>
          </_Builtin.Block>
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
