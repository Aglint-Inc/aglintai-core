"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./InterviewLoad.module.css";

export function InterviewLoad({
  as: _Component = _Builtin.Block,
  slotDailyLimit,
  slotWeeklyLimit,
}) {
  return (
    <_Component className={_utils.cx(_styles, "schedule_settings")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "setting_wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "setting_title")}
          tag="div"
        >
          <Text content="Interview Load" weight="bold" />
          <Text
            content="Setup maximum interviews per day and week."
            weight=""
            color="neutral"
          />
        </_Builtin.Block>
        <_Builtin.Grid className={_utils.cx(_styles, "load_grid")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "flex-h", "align-center")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "interviewload-lable")}
              tag="div"
            >
              <Text content="Daily Limit" weight="" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_hr_input")}
              id={_utils.cx(
                _styles,
                "w-node-_55b24612-1348-951b-c98a-0357678cca02-678cc9f8"
              )}
              tag="div"
            >
              {slotDailyLimit ?? <SlotComp componentName="Input" />}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "flex-h", "align-center")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "interviewload-lable")}
              tag="div"
            >
              <Text content="Weekly Limit" weight="" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_hr_input")}
              tag="div"
            >
              {slotWeeklyLimit ?? <SlotComp componentName="Input" />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Grid>
      </_Builtin.Block>
    </_Component>
  );
}
