import React from "react";
import * as _Builtin from "./_Builtin";
import { ScreeningQuestionCard } from "./ScreeningQuestionCard";
import { AssessmentQuestions } from "./AssessmentQuestions";
import * as _utils from "./utils";
import _styles from "./ScreeningQuestion.module.css";

export function ScreeningQuestion({
  as: _Component = _Builtin.Block,
  onClickUploadVideo = {},
  slotToggleAssessment,
  slotWelcomeMessage,
  slotIntroductionVideo,
  slotEndingMessageVideo,
  slotAssessmentQuestion,
  textQuestionCount = "06",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "new-screening-wrappers")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {"Introduction Video"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "new-screening-upload")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "color-grey-600")}
          tag="div"
        >
          {
            "This video vill be shown to the candidate before starting the interview.type in the text and click generate or "
          }
          <_Builtin.Span
            className={_utils.cx(_styles, "text-blue-600", "text-underline")}
            {...onClickUploadVideo}
          >
            {"upload a video."}
          </_Builtin.Span>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-555")} tag="div">
        {slotIntroductionVideo ?? <ScreeningQuestionCard />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "accessment-wrap")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Assesment Process"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "accessment-desc")}
          tag="div"
        >
          {
            "Set screening questions. These questions will be asked to the candidate while taking AI interview. Pick minimum 15 questions"
          }
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "accessment-toggle-wrap")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotToggleAssessment}</_Builtin.Block>
          <_Builtin.Block tag="div">
            {"Use AI generated videos for assesment"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "new-screen-welcome")}
        tag="div"
      >
        <_Builtin.Block tag="div">{"Welcome Message"}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "color-grey-600", "mt-8")}
          tag="div"
        >
          {
            "The candidate will be informed of this as the beginning of the assessment before the first question."
          }
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-555")}
          tag="div"
        >
          {slotWelcomeMessage ?? <ScreeningQuestionCard />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "new-screen-welcome")}
        tag="div"
      >
        <_Builtin.Block tag="div">{"Ending Message"}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "color-grey-600", "mt-8")}
          tag="div"
        >
          {
            "The candidate will see this once they have answered all the questions."
          }
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-555")}
          tag="div"
        >
          {slotEndingMessageVideo ?? <ScreeningQuestionCard />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "new-screen-assememnt-question")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-542")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Assessment Questions -"}</_Builtin.Block>
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
          {"Please set atleast 10 Questions for an ideal assessment"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "skill-based-question-wrap")}
          tag="div"
        >
          {slotAssessmentQuestion ?? <AssessmentQuestions />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
