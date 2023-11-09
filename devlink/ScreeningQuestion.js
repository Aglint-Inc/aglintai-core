import React from "react";
import * as _Builtin from "./_Builtin";
import { UploadVideo } from "./UploadVideo";
import { ScreeningQuestionCard } from "./ScreeningQuestionCard";
import { AssessmentQuestions } from "./AssessmentQuestions";
import { ScreeningQuestionAudio } from "./ScreeningQuestionAudio";
import { AssessmentScrollMenu } from "./AssessmentScrollMenu";
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
  slotUpload,
  slotInstructionsBrief,
  slotRightScrollMenu,
  onClickGenerateAi = {},
  onClickUpload = {},
  isGenerateWithAiChecked = false,
  isUploadChecked = false,
  slotToggleInstructionVideo,
  isUploadVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-562")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "new-screening-wrappers")}
        tag="div"
      >
        <_Builtin.Block tag="div" id="instruction">
          <_Builtin.Block
            className={_utils.cx(_styles, "instruction-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-lg", "fw-semibold")}
              tag="div"
            >
              {"Instructions"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "color-grey-600")}
              tag="div"
            >
              {
                "This will serve as the initial screen for candidates before they begin the assessment. You have the option to personalize the instructions."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "accessment-toggle-wrap", "mt-28")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-toggle-screening")}
              tag="div"
            >
              {slotToggleInstructionVideo}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Show Instruction video"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "color-grey-600", "mt-12")}
              tag="div"
            >
              {
                "This video will appeaer to the candidate along with the instructions"
              }
            </_Builtin.Block>
          </_Builtin.Block>
          {isUploadVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "upload-wrap-edit")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-560")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "upload-radio-btn-wrap")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "upload-radio-btn-circle")}
                    tag="div"
                    {...onClickGenerateAi}
                  >
                    {isGenerateWithAiChecked ? (
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%222%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    ) : null}
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">
                    {"Generate with AI"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "upload-radio-btn-wrap")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "upload-radio-btn-circle")}
                    tag="div"
                    {...onClickUpload}
                  >
                    {isUploadChecked ? (
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%222%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    ) : null}
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">{"Upload"}</_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "slot-drag-drop-video")}
                tag="div"
              >
                {slotUpload ?? <UploadVideo />}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-569")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Instructions Brief"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-brief-intro")}
              tag="div"
            >
              {slotInstructionsBrief}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "accessment-wrap")}
          tag="div"
          id="assessment_mode"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Assessment Mode"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "accessment-desc")}
            tag="div"
          >
            {
              "Configure screening questions and welcome/ending messages. Activate the toggle if you wish to utilize AI-generated videos in the assessment."
            }
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "accessment-toggle-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-toggle-screening")}
              tag="div"
            >
              {slotToggleAssessment}
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {"Use AI generated videos for assessment"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "avatar-default-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-561")}
              tag="div"
            />
            <_Builtin.Block tag="div">
              <_Builtin.Block
                className={_utils.cx(_styles, "color-grey-600")}
                tag="div"
              >
                {"This avatar will be used to generate audio."}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "color-grey-600")}
                tag="div"
              >
                {"To change the avatar go to "}
                <_Builtin.Span
                  className={_utils.cx(
                    _styles,
                    "text-blue-500",
                    "text-underline"
                  )}
                >
                  {"company settings."}
                </_Builtin.Span>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "new-screen-welcome")}
          tag="div"
          id="welcome"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Welcome Message"}
          </_Builtin.Block>
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
            {"Please set atleast 10 Questions for an ideal assessment"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "skill-based-question-wrap")}
            tag="div"
          >
            {slotAssessmentQuestion ?? <AssessmentQuestions />}
          </_Builtin.Block>
        </_Builtin.Block>
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
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-555")}
            tag="div"
          >
            {slotEndingMessageVideo ?? (
              <>
                <ScreeningQuestionCard />
                <ScreeningQuestionAudio />
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-565")} tag="div">
        {slotRightScrollMenu ?? <AssessmentScrollMenu />}
      </_Builtin.Block>
    </_Component>
  );
}
