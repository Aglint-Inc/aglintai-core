"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { InterviewModePill } from "./InterviewModePill";
import { SelectedMemberPill } from "./SelectedMemberPill";
import * as _utils from "./utils";
import _styles from "./InterviewMode.module.css";

export function InterviewMode({
  as: _Component = _Builtin.Block,
  slotInterviewModePill,
  slotInterviewersAvatarSelectionPill,
  slotInterviewersDropdown,
  isPanel = false,
  slotMemberCountDropdown,
  isIndividual = false,
  slotToggle,
  textToggleLabel = "Trainng Off",
  isTraining = false,
  slotTraineeAvatarSelectionPill,
  slotTraineesDropdown,
  isInterviewerDropVisible = true,
  isTrainingVisible = true,
  isTraineesDropVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1307")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "input_and_label")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Interview Mode"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_interview_mode")}
          tag="div"
        >
          {slotInterviewModePill ?? (
            <>
              <InterviewModePill isActive={true} />
              <InterviewModePill textModeName="Individual" />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "input_and_label")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Interviewers"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_avatarselectionpill")}
          tag="div"
        >
          {slotInterviewersAvatarSelectionPill ?? (
            <>
              <SelectedMemberPill />
              <SelectedMemberPill textMemberName="Ogyen Thoga" />
              <SelectedMemberPill textMemberName="Punith G" />
              <SelectedMemberPill textMemberName="Dheeraj Kumar Sah" />
            </>
          )}
        </_Builtin.Block>
        {isInterviewerDropVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_input_field")}
            tag="div"
          >
            {slotInterviewersDropdown ?? (
              <_Builtin.Block
                className={_utils.cx(_styles, "dummy_inputfield")}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  {"Search Interviewers"}
                </_Builtin.Block>
              </_Builtin.Block>
            )}
          </_Builtin.Block>
        ) : null}
        {isPanel ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "selection_criteria_block")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Include"}</_Builtin.Block>
            <_Builtin.Block tag="div">
              {slotMemberCountDropdown ?? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "dummy_inputfield", "is_small")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">{"2"}</_Builtin.Block>
                </_Builtin.Block>
              )}
            </_Builtin.Block>
            <_Builtin.Block tag="div">{"of selected members"}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isIndividual ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "selection_criteria_block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {"One chosen member will serve as the interviewer."}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isTrainingVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "input_and_label")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "input_block_flex")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotToggle}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {textToggleLabel}
            </_Builtin.Block>
          </_Builtin.Block>
          {isTraining ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "training_members")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "slot_avatarselectionpill")}
                tag="div"
              >
                {slotTraineeAvatarSelectionPill ?? (
                  <>
                    <SelectedMemberPill
                      isReverseShadow={true}
                      textMemberName="Vivek Singh"
                    />
                    <SelectedMemberPill
                      textMemberName="Ravi K"
                      isShadow={true}
                    />
                  </>
                )}
              </_Builtin.Block>
              {isTraineesDropVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "slot_input_field")}
                  tag="div"
                >
                  {slotTraineesDropdown ?? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "dummy_inputfield")}
                      tag="div"
                    >
                      <_Builtin.Block tag="div">
                        {"Search Interviewers"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  )}
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
