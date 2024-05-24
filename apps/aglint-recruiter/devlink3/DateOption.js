"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ScheduleOption } from "./ScheduleOption";
import * as _utils from "./utils";
import _styles from "./DateOption.module.css";

export function DateOption({
  as: _Component = _Builtin.Block,
  slotScheduleOption,
  isSelected = false,
  textdate = "April 16",
  textOptionCount = "3 options",
}) {
  return (
    <_Component className={_utils.cx(_styles, "date_option")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "date_wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "flex_hr_10", "relative_2")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2214%22%20height%3D%2217%22%20viewBox%3D%220%200%2014%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4%201V2.5H10V1C10.0208%200.6875%2010.1875%200.520833%2010.5%200.5C10.8125%200.520833%2010.9792%200.6875%2011%201V2.5H12C12.5625%202.52083%2013.0312%202.71875%2013.4062%203.09375C13.7812%203.46875%2013.9792%203.9375%2014%204.5V5.5V6.5V14.5C13.9792%2015.0625%2013.7812%2015.5312%2013.4062%2015.9062C13.0312%2016.2812%2012.5625%2016.4792%2012%2016.5H2C1.4375%2016.4792%200.96875%2016.2812%200.59375%2015.9062C0.21875%2015.5312%200.0208333%2015.0625%200%2014.5V6.5V5.5V4.5C0.0208333%203.9375%200.21875%203.46875%200.59375%203.09375C0.96875%202.71875%201.4375%202.52083%202%202.5H3V1C3.02083%200.6875%203.1875%200.520833%203.5%200.5C3.8125%200.520833%203.97917%200.6875%204%201ZM1%206.5V14.5C1%2014.7917%201.09375%2015.0312%201.28125%2015.2188C1.46875%2015.4062%201.70833%2015.5%202%2015.5H12C12.2917%2015.5%2012.5312%2015.4062%2012.7188%2015.2188C12.9062%2015.0312%2013%2014.7917%2013%2014.5V6.5H1ZM2%203.5C1.70833%203.5%201.46875%203.59375%201.28125%203.78125C1.09375%203.96875%201%204.20833%201%204.5V5.5H13V4.5C13%204.20833%2012.9062%203.96875%2012.7188%203.78125C12.5312%203.59375%2012.2917%203.5%2012%203.5H2ZM3.25%208.5C3.10417%208.52083%203.02083%208.60417%203%208.75V11.25C3.02083%2011.3958%203.10417%2011.4792%203.25%2011.5H5.75C5.89583%2011.4792%205.97917%2011.3958%206%2011.25V8.75C5.97917%208.60417%205.89583%208.52083%205.75%208.5H3.25ZM2%208.75C2%208.39583%202.125%208.10417%202.375%207.875C2.60417%207.625%202.89583%207.5%203.25%207.5H5.75C6.10417%207.5%206.39583%207.625%206.625%207.875C6.875%208.10417%207%208.39583%207%208.75V11.25C7%2011.6042%206.875%2011.8958%206.625%2012.125C6.39583%2012.375%206.10417%2012.5%205.75%2012.5H3.25C2.89583%2012.5%202.60417%2012.375%202.375%2012.125C2.125%2011.8958%202%2011.6042%202%2011.25V8.75Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block className={_utils.cx(_styles, "flex_hr_4")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {textdate}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "flex_hr_20", "relative_2")}
          tag="div"
        >
          <_Builtin.Block tag="div">{textOptionCount}</_Builtin.Block>
        </_Builtin.Block>
        {isSelected ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "is_selected_bg-copy")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_schedule_option")}
        tag="div"
      >
        {slotScheduleOption ?? (
          <>
            <ScheduleOption
              isSelected={false}
              isCheckbox={true}
              isRadio={false}
            />
            <ScheduleOption
              isSelected={false}
              isCheckbox={true}
              isRadio={false}
            />
            <ScheduleOption
              isSelected={false}
              isCheckbox={true}
              isRadio={false}
            />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
