"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { WorkingHourDay } from "./WorkingHourDay";
import * as _utils from "./utils";
import _styles from "./WorkingHours.module.css";

export function WorkingHours({
  as: _Component = _Builtin.Block,
  slotTimeZoneToggle,
  slotTimeZoneInput,
  slotWorkingHourDay,
}) {
  return (
    <_Component className={_utils.cx(_styles, "schedule_settings")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1117")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1115")}
          tag="div"
        >
          <Text content="Working Hours" weight="medium" />
          <Text
            content="Set up your company's default time zone, working hours, and breaks."
            weight=""
            color="neutral"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1116", "hide")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-red-500", "cursor-pointer")}
            tag="div"
          >
            {"Discard"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "button_primary")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Update Changes"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "setting_wrap")} tag="div">
        <Text content="Time Zone" weight="medium" />
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_timezoneinput")}
          tag="div"
        >
          {slotTimeZoneInput}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "setting_wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "setting_title")}
          tag="div"
        >
          <Text content="Default Working Hours" />
          <Text
            content="Set the standard working hours for the company."
            color="neutral"
            weight=""
          />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "week_days")} tag="div">
          {slotWorkingHourDay ?? (
            <>
              <WorkingHourDay />
              <WorkingHourDay isApplytoAll={true} />
              <WorkingHourDay isApplytoAll={true} />
              <WorkingHourDay isApplytoAll={true} />
              <WorkingHourDay isApplytoAll={true} />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
