import React from "react";
import * as _Builtin from "./_Builtin";
import { ScreeningQuestionCard } from "./ScreeningQuestionCard";
import * as _utils from "./utils";
import _styles from "./AssessmentEpilogue.module.css";

export function AssessmentEpilogue({
  as: _Component = _Builtin.Block,
  slotEndingMessageVideo,
  slotWarning,
  isWarningVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-562")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "new-screening-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "new-screen-welcome")}
          tag="div"
          id="epilogue"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Epilogue"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "color-grey-600", "mt-8")}
            tag="div"
          >
            {
              "The candidate will see this once they have answered all the questions."
            }
          </_Builtin.Block>
          {isWarningVisible ? (
            <_Builtin.Block className={_utils.cx(_styles, "mt-13")} tag="div">
              {slotWarning}
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-555")}
            tag="div"
          >
            {slotEndingMessageVideo ?? <ScreeningQuestionCard />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
