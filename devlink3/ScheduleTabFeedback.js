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
}) {
  return (
    <_Component className={_utils.cx(_styles, "feedback_layout")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "all-interview-table-copy")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "allinterview_row")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "allinterview_header_cell",
              "width-25"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-958")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Interviewer"}
            </_Builtin.Block>
          </_Builtin.Block>
          {isSessionVisible ? (
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "allinterview_header_cell",
                "width-324"
              )}
              id={_utils.cx(
                _styles,
                "w-node-_6b67c368-b168-fb6f-e0a0-4f34fed2f971-03362df7"
              )}
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
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "allinterview_header_cell",
              "widthh-324px"
            )}
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
            className={_utils.cx(
              _styles,
              "allinterview_header_cell",
              "width-324"
            )}
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
          {slotFeedbackTableRow ?? (
            <FeedbackTableRow isAddFeedback={false} isNoFeedback={false} />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
