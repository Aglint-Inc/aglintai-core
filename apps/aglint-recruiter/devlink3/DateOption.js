"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import { ScheduleOption } from "./ScheduleOption";
import * as _utils from "./utils";
import _styles from "./DateOption.module.css";

export function DateOption({
  as: _Component = _Builtin.Block,
  slotScheduleOption,
  isSelected = false,
  textdate = "April 16",
  textOptionCount = "3 options",
  onClickDateOption = {},
  rotateArrow = {},
  isDisabled = false,
  slotCheckbox,
  isCheckboxVisible = true,
  slotRightBlock,
  slotLeftBlock,
}) {
  return (
    <_Component className={_utils.cx(_styles, "date_option")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "date_option_list_wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "date_wrap")}
          tag="div"
          {...onClickDateOption}
        >
          <_Builtin.Block className={_utils.cx(_styles, "flex_h4")} tag="div">
            {isCheckboxVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "date_option_chcek-copy")}
                tag="div"
              >
                {slotCheckbox ?? (
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "embed_flex")}
                    value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%23F76B15%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%208.58579L10.2929%205.29289C10.6834%204.90237%2011.3166%204.90237%2011.7071%205.29289C12.0976%205.68342%2012.0976%206.31658%2011.7071%206.70711L7.70711%2010.7071C7.31658%2011.0976%206.68342%2011.0976%206.29289%2010.7071L4.29289%208.70711C3.90237%208.31658%203.90237%207.68342%204.29289%207.29289C4.68342%206.90237%205.31658%206.90237%205.70711%207.29289L7%208.58579Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                )}
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "flex_hr_10", "relative_2")}
              tag="div"
            >
              {slotLeftBlock ?? (
                <>
                  <GlobalIcon iconName="today" color="neutral-11" />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "flex_hr_4")}
                    tag="div"
                  >
                    <Text content={textdate} weight="medium" />
                  </_Builtin.Block>
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "do-right-wraper")}
            tag="div"
          >
            {slotRightBlock ?? (
              <>
                <_Builtin.Block tag="div">{textOptionCount}</_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "expand_arrow_date_option")}
                  tag="div"
                  {...rotateArrow}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewbox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.75781%2010.7578C7.58594%2010.9141%207.41406%2010.9141%207.24219%2010.7578L2.74219%206.25781C2.58594%206.08594%202.58594%205.91406%202.74219%205.74219C2.91406%205.58594%203.08594%205.58594%203.25781%205.74219L7.5%209.96094L11.7422%205.74219C11.9141%205.58594%2012.0859%205.58594%2012.2578%205.74219C12.4141%205.91406%2012.4141%206.08594%2012.2578%206.25781L7.75781%2010.7578Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              </>
            )}
          </_Builtin.Block>
          {isSelected ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "is_selected_bg-copy")}
              tag="div"
            />
          ) : null}
          {isDisabled ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "date_wrap-_disabled")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "flex_hr_10", "disabled_text")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex")}
                  value="%3Csvg%20width%3D%2214%22%20height%3D%2217%22%20viewBox%3D%220%200%2014%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4%201V2.5H10V1C10.0208%200.6875%2010.1875%200.520833%2010.5%200.5C10.8125%200.520833%2010.9792%200.6875%2011%201V2.5H12C12.5625%202.52083%2013.0312%202.71875%2013.4062%203.09375C13.7812%203.46875%2013.9792%203.9375%2014%204.5V5.5V6.5V14.5C13.9792%2015.0625%2013.7812%2015.5312%2013.4062%2015.9062C13.0312%2016.2812%2012.5625%2016.4792%2012%2016.5H2C1.4375%2016.4792%200.96875%2016.2812%200.59375%2015.9062C0.21875%2015.5312%200.0208333%2015.0625%200%2014.5V6.5V5.5V4.5C0.0208333%203.9375%200.21875%203.46875%200.59375%203.09375C0.96875%202.71875%201.4375%202.52083%202%202.5H3V1C3.02083%200.6875%203.1875%200.520833%203.5%200.5C3.8125%200.520833%203.97917%200.6875%204%201ZM1%206.5V14.5C1%2014.7917%201.09375%2015.0312%201.28125%2015.2188C1.46875%2015.4062%201.70833%2015.5%202%2015.5H12C12.2917%2015.5%2012.5312%2015.4062%2012.7188%2015.2188C12.9062%2015.0312%2013%2014.7917%2013%2014.5V6.5H1ZM2%203.5C1.70833%203.5%201.46875%203.59375%201.28125%203.78125C1.09375%203.96875%201%204.20833%201%204.5V5.5H13V4.5C13%204.20833%2012.9062%203.96875%2012.7188%203.78125C12.5312%203.59375%2012.2917%203.5%2012%203.5H2ZM3.25%208.5C3.10417%208.52083%203.02083%208.60417%203%208.75V11.25C3.02083%2011.3958%203.10417%2011.4792%203.25%2011.5H5.75C5.89583%2011.4792%205.97917%2011.3958%206%2011.25V8.75C5.97917%208.60417%205.89583%208.52083%205.75%208.5H3.25ZM2%208.75C2%208.39583%202.125%208.10417%202.375%207.875C2.60417%207.625%202.89583%207.5%203.25%207.5H5.75C6.10417%207.5%206.39583%207.625%206.625%207.875C6.875%208.10417%207%208.39583%207%208.75V11.25C7%2011.6042%206.875%2011.8958%206.625%2012.125C6.39583%2012.375%206.10417%2012.5%205.75%2012.5H3.25C2.89583%2012.5%202.60417%2012.375%202.375%2012.125C2.125%2011.8958%202%2011.6042%202%2011.25V8.75Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "flex_hr_4")}
                  tag="div"
                >
                  <Text content={textdate} weight="medium" color="" />
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "flex_hr_20", "relative_2")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "italic")}
                  tag="div"
                >
                  {"Can't choose from this date"}
                </_Builtin.Block>
              </_Builtin.Block>
              {isSelected ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "is_selected_bg-copy")}
                  tag="div"
                />
              ) : null}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_schedule_option")}
          tag="div"
        >
          {slotScheduleOption ?? (
            <>
              <ScheduleOption isSelected={false} />
              <ScheduleOption isSelected={false} isCheckbox={true} />
              <ScheduleOption isSelected={false} isCheckbox={true} />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
