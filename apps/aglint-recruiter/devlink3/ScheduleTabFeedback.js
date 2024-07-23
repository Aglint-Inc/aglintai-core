"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./ScheduleTabFeedback.module.css";

export function ScheduleTabFeedback({
  as: _Component = _Builtin.Block,
  slotFeedbackTableRow,
  isSessionVisible = false,
  styleMinWidth = {},
  border,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "feedback_layout")}
      tag="div"
      table-border={border}
      {...styleMinWidth}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "feedbaack-layout-table")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "feedback-table-header")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "header_interviewer")}
            tag="div"
          >
            <Text content="Interviewer" weight="medium" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "header_session", "version")}
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
                <Text content="" weight="medium" />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "header_recommendation")}
            tag="div"
          >
            <Text content="Recommendation" weight="medium" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "header_feedback")}
            tag="div"
          >
            <Text content="Feedback" weight="medium" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_candidaterow")}
          tag="div"
        >
          {slotFeedbackTableRow ?? (
            <SlotComp componentNeme="Feedback Table Row" />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
