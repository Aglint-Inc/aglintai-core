import React from "react";
import * as _Builtin from "./_Builtin";
import { InterviewModePill } from "./InterviewModePill";
import { SelectedMemberPill } from "./SelectedMemberPill";
import { InlineEmptyBlock } from "./InlineEmptyBlock";
import * as _utils from "./utils";
import _styles from "./SidedrawerBodySession.module.css";

export function SidedrawerBodySession({
  as: _Component = _Builtin.Block,
  slotSessionNameInput,
  slotDurationDropdown,
  slotScheduleTypeDropdown,
  slotModuleDropdown,
  slotInterviewModePill,
  slotInterviewersAvatarSelectionPill,
  slotInterviewersDropdown,
  slotMemberCountDropdown,
  isPanel = false,
  isIndividual = false,
  slotTraineeAvatarSelectionPill,
  slotTraineesDropdown,
  isTraining = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "sidedrawer_session")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "input_and_label")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Session Name"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_input_field")}
          tag="div"
        >
          {slotSessionNameInput ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_inputfield")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Sample session name"}</_Builtin.Block>
            </_Builtin.Block>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "input_and_label")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Duration"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_input_field")}
          tag="div"
        >
          {slotDurationDropdown ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_inputfield")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"45 Mintues"}</_Builtin.Block>
            </_Builtin.Block>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "input_and_label")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Schedule Type"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_input_field")}
          tag="div"
        >
          {slotScheduleTypeDropdown ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_inputfield")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Zoom, Meet"}</_Builtin.Block>
            </_Builtin.Block>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "input_and_label")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Interview Module"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_input_field")}
          tag="div"
        >
          {slotModuleDropdown ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_inputfield")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"C++ coding"}</_Builtin.Block>
            </_Builtin.Block>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
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
              <InlineEmptyBlock />
            </>
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_input_field")}
          tag="div"
        >
          {slotInterviewersDropdown ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_inputfield")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Search Interviewers"}</_Builtin.Block>
            </_Builtin.Block>
          )}
        </_Builtin.Block>
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
      <_Builtin.Block
        className={_utils.cx(_styles, "input_and_label")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "input_block_flex")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2240%22%20height%3D%2220%22%20viewBox%3D%220%200%2040%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2240%22%20height%3D%2220%22%20rx%3D%2210%22%20fill%3D%22%2387929D%22%2F%3E%0A%3Ccircle%20cx%3D%2211%22%20cy%3D%2210%22%20r%3D%226%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Trainng Off"}
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
                  <SelectedMemberPill textMemberName="Ravi K" isShadow={true} />
                  <InlineEmptyBlock textEmptyMessage="No Trainee Selected " />
                </>
              )}
            </_Builtin.Block>
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
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
