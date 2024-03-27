import React from "react";
import * as _Builtin from "./_Builtin";
import { FeedbackTableRow } from "./FeedbackTableRow";
import * as _utils from "./utils";
import _styles from "./ScheduleTabFeedback.module.css";

export function ScheduleTabFeedback({
  as: _Component = _Builtin.Block,
  slotFeedbackTableRow,
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
            className={_utils.cx(_styles, "allinterview_header_cell")}
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
          <_Builtin.Block
            className={_utils.cx(_styles, "allinterview_header_cell")}
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
            className={_utils.cx(_styles, "allinterview_header_cell")}
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
            <FeedbackTableRow isAddFeedback={true} isNoFeedback={false} />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
