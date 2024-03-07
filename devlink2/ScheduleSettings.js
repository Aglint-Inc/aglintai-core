import React from "react";
import * as _Builtin from "./_Builtin";
import { KeywordCard } from "./KeywordCard";
import { WorkingHourDay } from "./WorkingHourDay";
import * as _utils from "./utils";
import _styles from "./ScheduleSettings.module.css";

export function ScheduleSettings({
  as: _Component = _Builtin.Block,
  slotTimeZoneToggle,
  slotTimeZoneInput,
  slotDailyLimit,
  slotWeeklyLimit,
  slotWorkingHourDay,
  slotDayOff,
  onClickAddDate = {},
  isTimeZoneToggleVisible = true,
  onClickDiscard = {},
  onClickUpdateChanges = {},
  slotKeywordCard,
  isKeywordVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "schedule_settings")} tag="div">
      {isKeywordVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "keywords-wrapp")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1115", "keyword-head")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Keywords"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {
                "Keywords allow you to identify events on interviewer’s calendars that can be scheduled over by either you or a candidate when booking interviews."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1169")}
            tag="div"
          >
            {slotKeywordCard ?? <KeywordCard />}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
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
            {"Availability"}
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
            {...onClickDiscard}
          >
            {"Discard"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "button_primary")}
            tag="div"
            {...onClickUpdateChanges}
          >
            <_Builtin.Block tag="div">{"Update Changes"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "setting_wrap")} tag="div">
        <_Builtin.Block tag="div">{"Time Zone"}</_Builtin.Block>
        {isTimeZoneToggleVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "toggle_wrap")}
            tag="div"
          >
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
        ) : null}
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
          <_Builtin.Block tag="div">{"Interview Load"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-500")}
            tag="div"
          >
            {"Setup maximum interviews per day and week."}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Grid className={_utils.cx(_styles, "load_grid")} tag="div">
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-_76440e59-9763-59af-34c8-e8567ac45a4f-0d30d7a9"
            )}
            tag="div"
          >
            {"Daily Limit"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_hr_input")}
            id={_utils.cx(
              _styles,
              "w-node-_76440e59-9763-59af-34c8-e8567ac45a51-0d30d7a9"
            )}
            tag="div"
          >
            {slotDailyLimit}
          </_Builtin.Block>
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-_76440e59-9763-59af-34c8-e8567ac45a52-0d30d7a9"
            )}
            tag="div"
          >
            {"Weekly Limit"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_hr_input")}
            id={_utils.cx(
              _styles,
              "w-node-_76440e59-9763-59af-34c8-e8567ac45a54-0d30d7a9"
            )}
            tag="div"
          >
            {slotWeeklyLimit}
          </_Builtin.Block>
        </_Builtin.Grid>
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
      <_Builtin.Block
        className={_utils.cx(_styles, "setting_wrap", "p-b-40")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "setting_title")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Company Days Off"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-500")}
            tag="div"
          >
            {"These days will be excluded while scheduling."}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "days_off_wrap")}
          tag="div"
        >
          {slotDayOff ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "days_off_empty")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-400")}
                tag="div"
              >
                {"No days added"}
              </_Builtin.Block>
            </_Builtin.Block>
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "link_button", "is_blue")}
          tag="div"
          {...onClickAddDate}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewBox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.0625%203.1875V6.9375H11.8125C12.1562%206.96875%2012.3438%207.15625%2012.375%207.5C12.3438%207.84375%2012.1562%208.03125%2011.8125%208.0625H8.0625V11.8125C8.03125%2012.1562%207.84375%2012.3438%207.5%2012.375C7.15625%2012.3438%206.96875%2012.1562%206.9375%2011.8125V8.0625H3.1875C2.84375%208.03125%202.65625%207.84375%202.625%207.5C2.65625%207.15625%202.84375%206.96875%203.1875%206.9375H6.9375V3.1875C6.96875%202.84375%207.15625%202.65625%207.5%202.625C7.84375%202.65625%208.03125%202.84375%208.0625%203.1875Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Add"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
