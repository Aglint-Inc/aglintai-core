"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FeedbackTableRow } from "./FeedbackTableRow";
import * as _utils from "./utils";
import _styles from "./ScheduleTabFeedback.module.css";

export function ScheduleTabFeedback({
  as: _Component = _Builtin.Block,
  slotFeedbackTableRow,
  isSessionVisible = false,
  styleMinWidth = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "feedback_layout")}
      tag="div"
      {...styleMinWidth}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "all-interview-table-copy")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "allinterview_row")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "header_interviewer")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Interviewer"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "header_session", "width-324-copy")}
            id={_utils.cx(
              _styles,
              "w-node-_6b67c368-b168-fb6f-e0a0-4f34fed2f971-03362df7"
            )}
            tag="div"
          >
            {isSessionVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "session_colum_fixed_width")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Session"}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "header_recommendation")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Recommendation"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "header_feedback")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Feedback"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_candidaterow")}
          tag="div"
        >
          {slotFeedbackTableRow ?? <FeedbackTableRow />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
