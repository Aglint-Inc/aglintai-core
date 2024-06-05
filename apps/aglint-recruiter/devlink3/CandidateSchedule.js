"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./CandidateSchedule.module.css";

export function CandidateSchedule({
  as: _Component = _Builtin.Block,
  slotDarkPill,
  slotFullScheduleCard,
  slotCandidateCard,
  isScheduleNowVisible = true,
  onClickClose = {},
  slotScheduleButton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "new-candidate-schedule-grid")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate-schedule-left-wrap")}
        id={_utils.cx(
          _styles,
          "w-node-b4f8c833-3062-0810-c58b-254fa7da7af2-a7da7af1"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cd-schedule-header", "new-header")}
          tag="div"
        >
          {slotDarkPill}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "new-schedule-cd-card-wrap")}
          tag="div"
        >
          {slotFullScheduleCard ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummydiv")}
              tag="div"
            />
          )}
        </_Builtin.Block>
        {isScheduleNowVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule_now_bar", "schedule_nbow")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "_30-30_iconbutton")}
              tag="div"
              {...onClickClose}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M16.1562%2016.8438L12%2012.7188L7.875%2016.8438C7.625%2017.0312%207.38542%2017.0312%207.15625%2016.8438C6.96875%2016.6146%206.96875%2016.3854%207.15625%2016.1562L11.2812%2012L7.15625%207.875C6.96875%207.625%206.96875%207.38542%207.15625%207.15625C7.38542%206.96875%207.625%206.96875%207.875%207.15625L12%2011.2812L16.1562%207.15625C16.3854%206.96875%2016.6146%206.96875%2016.8438%207.15625C17.0312%207.38542%2017.0312%207.625%2016.8438%207.875L12.7188%2012L16.8438%2016.1562C17.0312%2016.3854%2017.0312%2016.6146%2016.8438%2016.8438C16.6146%2017.0312%2016.3854%2017.0312%2016.1562%2016.8438Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block tag="div">{"2 Selected"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "schedule_button_options")}
              tag="div"
            >
              {slotScheduleButton ?? (
                <SlotComp componentNeme="SheduleTypeButton, Agent popoverBlock" />
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate-schedule-right-wrap")}
        tag="div"
      >
        {slotCandidateCard ?? <SlotComp componentNeme="Activities" />}
      </_Builtin.Block>
    </_Component>
  );
}
