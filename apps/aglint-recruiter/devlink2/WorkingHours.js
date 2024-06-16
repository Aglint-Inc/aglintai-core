"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
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
        className={_utils.cx(_styles, "wh-top-wrapper")}
        tag="div"
      >
        <Text content="Working Hours" weight="medium" />
        <Text
          content="Set up your company's default time zone, working hours, and breaks."
          weight=""
          color="neutral"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "setting_wrap")} tag="div">
        <Text content="Time Zone" weight="medium" />
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_timezoneinput")}
          tag="div"
        >
          {slotTimeZoneInput ?? <SlotComp componentName="Slot TieZone" />}
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
              <SlotComp componentName="WorkingDays" />
              <SlotComp componentName="WorkingDays" />
              <SlotComp componentName="WorkingDays" />
              <SlotComp componentName="WorkingDays" />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
