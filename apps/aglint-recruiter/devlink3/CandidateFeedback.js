"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./CandidateFeedback.module.css";

export function CandidateFeedback({
  as: _Component = _Builtin.Block,
  slotEmoji,
  textSatisfactionLevel = "Satisfied",
  textAdditionalFeedback = "During the interview, the candidate showcased a strong understanding of both front-end and back-end development concepts. They effectively demonstrated their proficiency in various programming languages and frameworks. Their problem-solving skills and ability to communicate technical ideas were impressive. Overall, the candidate appears to be a promising fit for the full stack developer role.",
  onClickReqFeedback = {},
  isFeedbackNotSubmitted = false,
  isFeedbackSubmitted = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1723")} tag="div">
      {isFeedbackSubmitted ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1721")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Satisfaction Level"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1720")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {slotEmoji ?? <SlotComp componentNeme="Icon" />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {textSatisfactionLevel}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isFeedbackSubmitted ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1722")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Additinal Feedback"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{textAdditionalFeedback}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isFeedbackNotSubmitted ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1724")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {"Candidate haven’t submitted any feedback"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "accent-text",
              "text-underline",
              "cursor-pointer"
            )}
            tag="div"
            {...onClickReqFeedback}
          >
            {"Request Feedback"}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
