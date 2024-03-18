import React from "react";
import * as _Builtin from "./_Builtin";
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
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Working Hours"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {"Set up recruitng time ranges and available working hours"}
          </_Builtin.Block>
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
        <_Builtin.Block tag="div">{"Time Zone"}</_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "toggle_wrap")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_toggle")}
            tag="div"
          >
            {slotTimeZoneToggle}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-500")}
            tag="div"
          >
            {"Get timezone automatically"}
          </_Builtin.Block>
        </_Builtin.Block>
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
          <_Builtin.Block tag="div">{"Working Hours"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-500")}
            tag="div"
          >
            {"Setup working hour across company level."}
          </_Builtin.Block>
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
