"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./ScheduleOption.module.css";

export function ScheduleOption({
  as: _Component = _Builtin.Block,
  textTotalTimeRange = "11:30AM - 04:00PM PST",
  slotConflicts,
  isSelected = false,
  isCheckbox = true,
  isRadio = true,
  slotSessionDetails,
  onClickSelect = {},
  slotSingleDaySchedule,
  isCheckboxAndRadio = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "schedule_option_wrap")}
      tag="div"
    >
      {isCheckboxAndRadio ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "selection_wrap")}
          tag="div"
        >
          {isRadio ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "radio_wrap")}
              tag="div"
              {...onClickSelect}
            >
              {isSelected ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "radio_active")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22var(--accent-9)%22%2F%3E%0A%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%222%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              ) : null}
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "radio_inactive")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%227.5%22%20fill%3D%22white%22%20stroke%3D%22%23D8DCDE%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          ) : null}
          {isCheckbox ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "radio_wrap")}
              tag="div"
              {...onClickSelect}
            >
              {isSelected ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "radio_active")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22var(--accent-9)%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%208.58579L10.2929%205.29289C10.6834%204.90237%2011.3166%204.90237%2011.7071%205.29289C12.0976%205.68342%2012.0976%206.31658%2011.7071%206.70711L7.70711%2010.7071C7.31658%2011.0976%206.68342%2011.0976%206.29289%2010.7071L4.29289%208.70711C3.90237%208.31658%203.90237%207.68342%204.29289%207.29289C4.68342%206.90237%205.31658%206.90237%205.70711%207.29289L7%208.58579Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              ) : null}
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "radio_inactive")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2215%22%20height%3D%2215%22%20rx%3D%223.5%22%20fill%3D%22white%22%20stroke%3D%22%23D8DCDE%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "detail_schedules")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slotsingleday_schedule")}
          tag="div"
        >
          {slotSingleDaySchedule ?? (
            <>
              <SlotComp componentNeme="SingleDaySchedule" />
              <SlotComp componentNeme="SingleDaySchedule" />
            </>
          )}
        </_Builtin.Block>
        {isSelected ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "selected_absolute")}
            tag="div"
          />
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "normal_border")}
          tag="div"
        />
      </_Builtin.Block>
    </_Component>
  );
}
