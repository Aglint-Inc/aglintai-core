"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { AssignedNameCard } from "./AssignedNameCard";
import * as _utils from "./utils";
import _styles from "./RequestDetailRight.module.css";

export function RequestDetailRight({
  as: _Component = _Builtin.Block,
  slotPriority,
  slotRequestType,
  textDueDate = "This is a global text component",
  slotAssignedTo,
  slotCandidate,
  slotRelatedJob,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "req-detail-right-sub-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "req-detail-tight-list")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <Text content="Priority" />
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotPriority}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-detail-tight-list")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <Text content="Request Type" />
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotRequestType}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-detail-tight-list")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <Text content="Due Date" />
        </_Builtin.Block>
        <Text content={textDueDate} size="1" color="neutral" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "asigned-to-wraper")}
        tag="div"
      >
        <Text content="Assigned to" />
        <_Builtin.Block tag="div">
          {slotAssignedTo ?? <AssignedNameCard />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "asigned-to-wraper")}
        tag="div"
      >
        <Text content="Candidate" />
        <_Builtin.Block tag="div">{slotCandidate}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "asigned-to-wraper")}
        tag="div"
      >
        <Text content="Related Job" />
        <_Builtin.Block tag="div">{slotRelatedJob}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
