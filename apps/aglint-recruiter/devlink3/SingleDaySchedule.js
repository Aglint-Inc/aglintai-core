"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ConflictOutsideWorkHours } from "./ConflictOutsideWorkHours";
import { ConflictSoft } from "./ConflictSoft";
import { ConflictHard } from "./ConflictHard";
import { SessionDetails } from "./SessionDetails";
import * as _utils from "./utils";
import _styles from "./SingleDaySchedule.module.css";

export function SingleDaySchedule({
  as: _Component = _Builtin.Block,
  textTotalTimeRange = "11:30AM - 04:00PM PST",
  slotConflicts,
  slotSessionDetails,
  textDayCount = "Day 1",
  textDate = "April 04",
  isMultiDay = false,
  onClickSingleDay = {},
  rotateArrow = {},
  isRotateArrowVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "schedule_option")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "schedule_option_main")}
        tag="div"
        {...onClickSingleDay}
      >
        <_Builtin.Block className={_utils.cx(_styles, "main_left")} tag="div">
          {isMultiDay ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "timeblock")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewbox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7%203V4.5H13V3C13.0208%202.6875%2013.1875%202.52083%2013.5%202.5C13.8125%202.52083%2013.9792%202.6875%2014%203V4.5H15C15.5625%204.52083%2016.0312%204.71875%2016.4062%205.09375C16.7812%205.46875%2016.9792%205.9375%2017%206.5V7.5V8.5V16.5C16.9792%2017.0625%2016.7812%2017.5312%2016.4062%2017.9062C16.0312%2018.2812%2015.5625%2018.4792%2015%2018.5H5C4.4375%2018.4792%203.96875%2018.2812%203.59375%2017.9062C3.21875%2017.5312%203.02083%2017.0625%203%2016.5V8.5V7.5V6.5C3.02083%205.9375%203.21875%205.46875%203.59375%205.09375C3.96875%204.71875%204.4375%204.52083%205%204.5H6V3C6.02083%202.6875%206.1875%202.52083%206.5%202.5C6.8125%202.52083%206.97917%202.6875%207%203ZM4%208.5V16.5C4%2016.7917%204.09375%2017.0312%204.28125%2017.2188C4.46875%2017.4062%204.70833%2017.5%205%2017.5H15C15.2917%2017.5%2015.5312%2017.4062%2015.7188%2017.2188C15.9062%2017.0312%2016%2016.7917%2016%2016.5V8.5H4ZM5%205.5C4.70833%205.5%204.46875%205.59375%204.28125%205.78125C4.09375%205.96875%204%206.20833%204%206.5V7.5H16V6.5C16%206.20833%2015.9062%205.96875%2015.7188%205.78125C15.5312%205.59375%2015.2917%205.5%2015%205.5H5ZM6.25%2010.5C6.10417%2010.5208%206.02083%2010.6042%206%2010.75V13.25C6.02083%2013.3958%206.10417%2013.4792%206.25%2013.5H8.75C8.89583%2013.4792%208.97917%2013.3958%209%2013.25V10.75C8.97917%2010.6042%208.89583%2010.5208%208.75%2010.5H6.25ZM5%2010.75C5%2010.3958%205.125%2010.1042%205.375%209.875C5.60417%209.625%205.89583%209.5%206.25%209.5H8.75C9.10417%209.5%209.39583%209.625%209.625%209.875C9.875%2010.1042%2010%2010.3958%2010%2010.75V13.25C10%2013.6042%209.875%2013.8958%209.625%2014.125C9.39583%2014.375%209.10417%2014.5%208.75%2014.5H6.25C5.89583%2014.5%205.60417%2014.375%205.375%2014.125C5.125%2013.8958%205%2013.6042%205%2013.25V10.75Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {textDayCount}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey_600")}
                tag="div"
              >
                {textDate}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block className={_utils.cx(_styles, "timeblock")} tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2220%22%20height%3D%2221%22%20viewbox%3D%220%200%2020%2021%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M17%2010.5C16.9792%209.22917%2016.6667%208.0625%2016.0625%207C15.4375%205.9375%2014.5833%205.08333%2013.5%204.4375C12.3958%203.8125%2011.2292%203.5%2010%203.5C8.77083%203.5%207.60417%203.8125%206.5%204.4375C5.41667%205.08333%204.5625%205.9375%203.9375%207C3.33333%208.0625%203.02083%209.22917%203%2010.5C3.02083%2011.7708%203.33333%2012.9375%203.9375%2014C4.5625%2015.0625%205.41667%2015.9167%206.5%2016.5625C7.60417%2017.1875%208.77083%2017.5%2010%2017.5C11.2292%2017.5%2012.3958%2017.1875%2013.5%2016.5625C14.5833%2015.9167%2015.4375%2015.0625%2016.0625%2014C16.6667%2012.9375%2016.9792%2011.7708%2017%2010.5ZM2%2010.5C2.02083%209.04167%202.375%207.70833%203.0625%206.5C3.77083%205.29167%204.75%204.3125%206%203.5625C7.27083%202.85417%208.60417%202.5%2010%202.5C11.3958%202.5%2012.7292%202.85417%2014%203.5625C15.25%204.3125%2016.2292%205.29167%2016.9375%206.5C17.625%207.70833%2017.9792%209.04167%2018%2010.5C17.9792%2011.9583%2017.625%2013.2917%2016.9375%2014.5C16.2292%2015.7083%2015.25%2016.6875%2014%2017.4375C12.7292%2018.1458%2011.3958%2018.5%2010%2018.5C8.60417%2018.5%207.27083%2018.1458%206%2017.4375C4.75%2016.6875%203.77083%2015.7083%203.0625%2014.5C2.375%2013.2917%202.02083%2011.9583%202%2010.5ZM9.5%206C9.52083%205.6875%209.6875%205.52083%2010%205.5C10.3125%205.52083%2010.4792%205.6875%2010.5%206V10.2188L13.2812%2012.0938C13.5104%2012.2812%2013.5521%2012.5104%2013.4062%2012.7812C13.2188%2013.0104%2012.9896%2013.0521%2012.7188%2012.9062L9.71875%2010.9062C9.57292%2010.8021%209.5%2010.6667%209.5%2010.5V6Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {textTotalTimeRange}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_conflicts")}
            tag="div"
          >
            {slotConflicts ?? (
              <>
                <ConflictOutsideWorkHours isHover={false} />
                <ConflictSoft />
                <ConflictHard />
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
        {isRotateArrowVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "expand_arrow")}
            tag="div"
            {...rotateArrow}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewbox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.75781%2010.7578C7.58594%2010.9141%207.41406%2010.9141%207.24219%2010.7578L2.74219%206.25781C2.58594%206.08594%202.58594%205.91406%202.74219%205.74219C2.91406%205.58594%203.08594%205.58594%203.25781%205.74219L7.5%209.96094L11.7422%205.74219C11.9141%205.58594%2012.0859%205.58594%2012.2578%205.74219C12.4141%205.91406%2012.4141%206.08594%2012.2578%206.25781L7.75781%2010.7578Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "schedule_option_expandeed")}
        tag="div"
      >
        {slotSessionDetails ?? (
          <>
            <SessionDetails />
            <SessionDetails
              isMemberRow={false}
              textSessionName={
                <>
                  {"Break"}
                  <br />
                </>
              }
            />
            <SessionDetails />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
