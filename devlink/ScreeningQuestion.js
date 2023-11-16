import React from "react";
import * as _Builtin from "./_Builtin";
import { UploadVideo } from "./UploadVideo";
import { VideoSwitcherCard } from "./VideoSwitcherCard";
import { ScreeningQuestionCard } from "./ScreeningQuestionCard";
import { AssessmentQuestions } from "./AssessmentQuestions";
import { AssessmentScrollMenu } from "./AssessmentScrollMenu";
import * as _utils from "./utils";
import _styles from "./ScreeningQuestion.module.css";

export function ScreeningQuestion({
  as: _Component = _Builtin.Block,
  slotToggleAssessment,
  slotWelcomeMessage,
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
  slotExpirationInput,
  slotRetrysCount,
  slotSwitchAudioVideo,
  isProceedDisable = false,
  onClickProceed = {},
  isAddJob = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-562")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "new-screening-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "relative")}
          tag="div"
          id="instruction"
        >
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
          <_Builtin.Block
            className={_utils.cx(_styles, "fake-div-trigger")}
            tag="div"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "accessment-wrap")}
          tag="div"
          id="assessment_mode"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
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
          <_Builtin.Block tag="div">
            {slotSwitchAudioVideo ?? <VideoSwitcherCard />}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "new-screen-welcome")}
          tag="div"
          id="welcome"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
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
              className={_utils.cx(_styles, "text-lg", "fw-semibold")}
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
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
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
            {slotEndingMessageVideo ?? <ScreeningQuestionCard />}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "mt-60")}
          tag="div"
          id="validity"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {"Assessment Validity"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "color-grey-600", "mt-8")}
            tag="div"
          >
            {
              "Set the assessment link’s expiration time and the maximum retry threshold for candidates."
            }
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "expiration-duration-wrap", "mt-17")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "width-210", "flex-expiration")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Expiration duration"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {":"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-575")}
              tag="div"
            >
              {slotExpirationInput}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "color-grey-600")}
              tag="div"
            >
              {"Days after sending the invite"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "expiration-duration-wrap", "mt-7")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "width-210", "flex-expiration")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"No of retrys per candidate"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {":"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-576")}
              tag="div"
            >
              {slotRetrysCount}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "color-grey-600")}
              tag="div"
            >
              {"Times excluding the first try"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isAddJob ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "job-details-button-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "proceed-to-apply")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "blue-process-button")}
                tag="div"
                {...onClickProceed}
              >
                <_Builtin.Block tag="div">
                  {"Proceed to workflow"}
                </_Builtin.Block>
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.1464%202.24645C9.95118%202.44171%209.95118%202.75829%2010.1464%202.95355L14.1929%207L0.499999%207C0.223857%207%20-5.04966e-07%207.22386%20-4.80825e-07%207.5C-4.56684e-07%207.77614%200.223857%208%200.5%208L14.2929%208L10.1464%2012.1464C9.95118%2012.3417%209.95118%2012.6583%2010.1464%2012.8536C10.3417%2013.0488%2010.6583%2013.0488%2010.8536%2012.8536L15.4536%208.25355C15.8488%207.85829%2015.8488%207.24171%2015.4536%206.84645L10.8536%202.24645C10.6583%202.05119%2010.3417%202.05119%2010.1464%202.24645Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              {isProceedDisable ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "grey-disable-process-button")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    {"Proceed to workflow"}
                  </_Builtin.Block>
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.1464%202.24645C9.95118%202.44171%209.95118%202.75829%2010.1464%202.95355L14.1929%207L0.499999%207C0.223857%207%20-5.04966e-07%207.22386%20-4.80825e-07%207.5C-4.56684e-07%207.77614%200.223857%208%200.5%208L14.2929%208L10.1464%2012.1464C9.95118%2012.3417%209.95118%2012.6583%2010.1464%2012.8536C10.3417%2013.0488%2010.6583%2013.0488%2010.8536%2012.8536L15.4536%208.25355C15.8488%207.85829%2015.8488%207.24171%2015.4536%206.84645L10.8536%202.24645C10.6583%202.05119%2010.3417%202.05119%2010.1464%202.24645Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-565")} tag="div">
        {slotRightScrollMenu ?? <AssessmentScrollMenu />}
      </_Builtin.Block>
    </_Component>
  );
}
