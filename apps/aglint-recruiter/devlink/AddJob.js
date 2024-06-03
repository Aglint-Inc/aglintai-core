"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AddJobList } from "./AddJobList";
import * as _utils from "./utils";
import _styles from "./AddJob.module.css";

export function AddJob({
  as: _Component = _Builtin.Block,
  slotAddJobList,
  textJobSelected = "0",
  slotAddButton,
  onClickCancel = {},
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
          className={_utils.cx(_styles, "div-block-603")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "color-grey-600")}
            tag="div"
          >
            {textJobSelected}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "color-grey-600")}
            tag="div"
          >
            {"job selected"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-602")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "cursor-pointer")}
            tag="div"
            {...onClickCancel}
          >
            {"Cancel"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotAddButton}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
