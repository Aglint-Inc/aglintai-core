"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RescheduleCard.module.css";

export function RescheduleCard({
  as: _Component = _Builtin.Block,
  slotProfileImage,
  textReschedule = "requested for reschedule",
  textReason = "Out of the office",
  onClickRescheduleNow = {},
  onClickChangeInterviewer = {},
  isChangeInterviewerVisible = true,
  isButtonVisible = true,
  bgColorProps = {},
  textColorProps = {},
  textName = "Robert fox",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1639")}
      tag="div"
      {...bgColorProps}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1641")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1640")}
          tag="div"
        >
          {slotProfileImage}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1684")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "name-text")}
            tag="div"
          >
            {textName}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
            {...textColorProps}
          >
            {textReschedule}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1642")}
        tag="div"
      >
        <_Builtin.Block tag="div">{"Reason :"}</_Builtin.Block>
        <_Builtin.Block tag="div">{textReason}</_Builtin.Block>
      </_Builtin.Block>
      {isButtonVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1643")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-blue-500",
              "text-underline",
              "cursor-pointer"
            )}
            tag="div"
            {...onClickRescheduleNow}
          >
            {"Reschedule Now"}
          </_Builtin.Block>
          {isChangeInterviewerVisible ? (
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-grey-600",
                "text-underline",
                "cursor-pointer"
              )}
              tag="div"
              {...onClickChangeInterviewer}
            >
              {"Change interviewer"}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
