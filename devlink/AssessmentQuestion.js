import React from "react";
import * as _Builtin from "./_Builtin";
import { AssessmentQuestions } from "./AssessmentQuestions";
import * as _utils from "./utils";
import _styles from "./AssessmentQuestion.module.css";

export function AssessmentQuestion({
  as: _Component = _Builtin.Block,
  textQuestionCount = "06",
  slotAssessmentQuestion,
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
          className={_utils.cx(_styles, "new-screen-assememnt-question")}
          tag="div"
          id="assessment_question"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-542")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Assessment Questions -"}
            </_Builtin.Block>
            <_Builtin.Block tag="div">{"Total Questions :"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-yellow-500")}
              tag="div"
            >
              {textQuestionCount}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "color-grey-600")}
            tag="div"
          >
            {"Please set at least 10 Questions for an ideal assessment"}
          </_Builtin.Block>
          {isWarningVisible ? (
            <_Builtin.Block className={_utils.cx(_styles, "mt-13")} tag="div">
              {slotWarning}
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "skill-based-question-wrap")}
            tag="div"
          >
            {slotAssessmentQuestion ?? <AssessmentQuestions />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
