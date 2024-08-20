"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { InterviewMode } from "./InterviewMode";
import * as _utils from "./utils";
import _styles from "./SidedrawerBodySession.module.css";

export function SidedrawerBodySession({
  as: _Component = _Builtin.Block,
  slotSessionNameInput,
  slotDurationDropdown,
  slotScheduleTypeDropdown,
  slotModuleDropdown,
  slotInterviewMode,
}) {
  return (
    <_Component className={_utils.cx(_styles, "sidedrawer_session")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "input_and_label")}
        tag="div"
      >
        <Text content="Interview Name" weight="" />
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
        <Text content="Duration" weight="" />
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
        <Text content="Schedule Type" weight="" />
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
        <Text content="Interview Type" weight="" />
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
      <_Builtin.Block tag="div">
        {slotInterviewMode ?? (
          <>
            <SlotComp componentName="InterviewMode" />
            <InterviewMode />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
