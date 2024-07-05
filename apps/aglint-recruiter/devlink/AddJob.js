"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AddJobList } from "./AddJobList";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./AddJob.module.css";

export function AddJob({
  as: _Component = _Builtin.Block,
  slotAddJobList,
  textJobSelected = "0",
  slotAddButton,
  slotCancelButton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "add-job-cd-list-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "add-job-list-subwrap")}
        tag="div"
      >
        {slotAddJobList ?? <AddJobList />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "add-job-bottom")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "add-job-bottom-left")}
          tag="div"
        >
          <Text content={textJobSelected} color="neutral" />
          <Text color="neutral" content="job selected" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "add-job-bottom-right")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            {slotCancelButton ?? (
              <Text content="Cancel" size="1" color="neutral" />
            )}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotAddButton}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
