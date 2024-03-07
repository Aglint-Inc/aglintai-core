import React from "react";
import * as _Builtin from "./_Builtin";
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
          className={_utils.cx(_styles, "div-block-1142")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Interviewer"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1142", "center")}
          id={_utils.cx(
            _styles,
            "w-node-_51c09859-0c9a-df83-83a4-a6e076826a60-76826a5b"
          )}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Upcoming Interviews"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1142", "center")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Completed Interviews"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1142")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Interview Modules"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1147")}
        tag="div"
      >
        {slotAllInterviewesCard ?? <AllInterviewersCard />}
      </_Builtin.Block>
    </_Component>
  );
}
