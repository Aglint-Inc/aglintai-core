"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewPlanCard.module.css";

export function InterviewPlanCard({
  as: _Component = _Builtin.Block,
  slotInterviewModuleInput,
  slotDurationInput,
  slotInputSelectedQualified,
  onClickCancel = {},
  onClickDone = {},
  isInterviewModuleVisible = true,
  isMemberSelectionVisible = true,
  isSessionNameVisible = true,
  slotSessionNameInput,
  isQualifiedMemberVisible = true,
  slotQualifiedMemberList,
  slotSearchQualifiedMember,
  slotShadowMemberList,
  slotShadowMemberSearch,
  isShadowMemberVisible = true,
  slotReverseShadowMemberList,
  slotRsSearch,
  isReverseShadowVisible = true,
  slotScheduleTypeInput,
  isScheduleTypeVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-745")} tag="div">
      {isSessionNameVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-746")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Session Name"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotSessionNameInput}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "div-block-746")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Duration"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotDurationInput}</_Builtin.Block>
      </_Builtin.Block>
      {isScheduleTypeVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-746")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Schedule Type"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotScheduleTypeInput}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isInterviewModuleVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-746")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Interview Type"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotInterviewModuleInput}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isQualifiedMemberVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-746", "gap-10")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Qualified Members"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-747")}
            tag="div"
          >
            {slotQualifiedMemberList}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotSearchQualifiedMember}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-749")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Include"}</_Builtin.Block>
            <_Builtin.Block tag="div">
              {slotInputSelectedQualified}
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {"of the selected members"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isShadowMemberVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-746", "gap-10")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Shadow members"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-747")}
            tag="div"
          >
            {slotShadowMemberList}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotShadowMemberSearch}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isReverseShadowVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-746", "gap-10")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Reverse Shadow members"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-747")}
            tag="div"
          >
            {slotReverseShadowMemberList}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotRsSearch}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isMemberSelectionVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-748", "hide")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Member selection Criteria"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-749")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Include"}</_Builtin.Block>
            <_Builtin.Block tag="div">
              {slotInputSelectedQualified}
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {"of the selected members"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "div-block-750")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600", "cursor-pointer")}
          tag="div"
          {...onClickCancel}
        >
          {"Cancel"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "button_primary")}
            tag="div"
            {...onClickDone}
          >
            <_Builtin.Block tag="div">{"Done"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
