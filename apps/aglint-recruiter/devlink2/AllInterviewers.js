"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { AllInterviewersCard } from "./AllInterviewersCard";
import * as _utils from "./utils";
import _styles from "./AllInterviewers.module.css";

export function AllInterviewers({
  as: _Component = _Builtin.Block,
  slotAllInterviewesCard,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "all-interviewers-wrapp")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "all-interviewers-header-wrap",
          "decrease-grid"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "all-interviewer-header-item")}
          id={_utils.cx(
            _styles,
            "w-node-_51c09859-0c9a-df83-83a4-a6e076826a5d-76826a5b"
          )}
          tag="div"
        >
          <Text content="Interviewer" weight="bold" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "all-interviewer-header-item",
            "center"
          )}
          id={_utils.cx(
            _styles,
            "w-node-_51c09859-0c9a-df83-83a4-a6e076826a60-76826a5b"
          )}
          tag="div"
        >
          <Text content="Upcoming" weight="bold" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "all-interviewer-header-item",
            "center"
          )}
          tag="div"
        >
          <Text content="Completed" weight="bold" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "all-interviewer-header-item")}
          tag="div"
        >
          <Text content="Qualified" weight="bold" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "all-interviewer-header-item")}
          tag="div"
        >
          <Text content="Training" weight="bold" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "all-interviewers-body")}
        tag="div"
      >
        {slotAllInterviewesCard ?? <AllInterviewersCard />}
      </_Builtin.Block>
    </_Component>
  );
}
