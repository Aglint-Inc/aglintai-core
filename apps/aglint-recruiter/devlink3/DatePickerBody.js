"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./DatePickerBody.module.css";

export function DatePickerBody({
  as: _Component = _Builtin.Block,
  slotMuiDatePicker,
  slotGlobalnfo,
  slotTextWithIcon,
  slotScheduleSelectPill,
  textCalenderHelper = "This is a global text component",
}) {
  return (
    <_Component className={_utils.cx(_styles, "date_picker")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "schedulestepone")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "schedule_step_one_wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "selcted_schedule_info")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_text_with_icon")}
              tag="div"
            >
              {slotTextWithIcon ?? (
                <>
                  <SlotComp componentNeme="TextWithIcon" />
                  <SlotComp componentNeme="TextWithIcon" />
                </>
              )}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_schedule_selcetpill")}
              tag="div"
            >
              {slotScheduleSelectPill ?? (
                <>
                  <SlotComp componentNeme="ScheduleSelectPill" />
                  <SlotComp componentNeme="ScheduleSelectPill" />
                  <SlotComp componentNeme="ScheduleSelectPill" />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_global_info")}
            tag="div"
          >
            {slotGlobalnfo ?? <SlotComp componentNeme="Global info" />}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "flex-v4-copy")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_text_helper")}
              tag="div"
            >
              <Text content={textCalenderHelper} weight="medium" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "calender_wrapper")}
              tag="div"
            >
              {slotMuiDatePicker ?? <SlotComp componentNeme="Mui Calender" />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
