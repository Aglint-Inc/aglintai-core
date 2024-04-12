"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FeedbackTableRow.module.css";

export function FeedbackTableRow({
  as: _Component = _Builtin.Block,
  textInterviewerName = "Westly Snedger",
  textjobTitle = "Prodct Designer",
  slotAvatar,
  textRecommendation = "Strongly Recommended (9/10)",
  textFeedback = "During the interview, the candidate showcased a strong understanding of both front-end and..",
  onClickFeedback = {},
  textSessionTime = "12 Feb 2024 09:00 AM to 09:30 PM",
  textSessionTitle = "Company Introduction",
  isAddFeedback = false,
  isNoFeedback = false,
  isSessionVisible = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "feedbackrow")}
      tag="div"
      {...onClickFeedback}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "interviewer_details")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "inteerviewr_avatar")}
          tag="div"
        >
          {slotAvatar ?? (
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d8b0e9fcc50326d2974c84_user3.png"
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "interviewr_details")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-first-cap")}
            tag="div"
          >
            {textInterviewerName}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600", "one-line-clamp")}
            tag="div"
          >
            {textjobTitle}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "session_details")}
        tag="div"
      >
        {isSessionVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "session_colum_fixed_width")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {textSessionTime}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "one-line-clamp")}
              tag="div"
            >
              {textSessionTitle}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "recommendation_info")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textRecommendation}</_Builtin.Block>
        {isAddFeedback ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "feedbackemptyadmin")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "link-copy")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.5625%201.6875V5.4375H10.3125C10.6562%205.46875%2010.8438%205.65625%2010.875%206C10.8438%206.34375%2010.6562%206.53125%2010.3125%206.5625H6.5625V10.3125C6.53125%2010.6562%206.34375%2010.8438%206%2010.875C5.65625%2010.8438%205.46875%2010.6562%205.4375%2010.3125V6.5625H1.6875C1.34375%206.53125%201.15625%206.34375%201.125%206C1.15625%205.65625%201.34375%205.46875%201.6875%205.4375H5.4375V1.6875C5.46875%201.34375%205.65625%201.15625%206%201.125C6.34375%201.15625%206.53125%201.34375%206.5625%201.6875Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Add Feedback"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isNoFeedback ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "feedbackempty")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {"Not Submitted feedback"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isAddFeedback ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "abosulte_block_white")}
            tag="div"
          />
        ) : null}
        {isNoFeedback ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "abosulte_block_white")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "two-line-clamp")}
          tag="div"
        >
          {textFeedback}
        </_Builtin.Block>
        {isAddFeedback ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "abosulte_block_white")}
            tag="div"
          />
        ) : null}
        {isNoFeedback ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "abosulte_block_white")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
