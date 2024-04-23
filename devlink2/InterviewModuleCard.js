"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewModuleCard.module.css";

export function InterviewModuleCard({
  as: _Component = _Builtin.Block,
  textModuleName = "C++ Coding",
  textMembersCount = "2 Members",
  slotMemberPic,
  textUpcomingSchedules = "2",
  textCompletedSchedules = "2",
  isUpcomingScheduleEmpty = false,
  isUpcomingScheduleVisible = true,
  isCompletedScheduleEmpty = false,
  isCompletedScheduleVisible = true,
  onClickCard = {},
  textObjective = "This is some text inside of a div block.",
  isObjectiveVisible = true,
  isArchivedIconVisible = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1065")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1066")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1319")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "fw-semibold",
              "text-capitalize-word"
            )}
            id={_utils.cx(
              _styles,
              "w-node-_1eadd607-1492-0d1b-a196-62336e91e7a9-6e91e7a7"
            )}
            tag="div"
          >
            {textModuleName}
          </_Builtin.Block>
          {isArchivedIconVisible ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M18%2015C17.9792%2015.5625%2017.7812%2016.0312%2017.4062%2016.4062C17.0312%2016.7812%2016.5625%2016.9792%2016%2017H4C3.4375%2016.9792%202.96875%2016.7812%202.59375%2016.4062C2.21875%2016.0312%202.02083%2015.5625%202%2015V5C2.02083%204.4375%202.21875%203.96875%202.59375%203.59375C2.96875%203.21875%203.4375%203.02083%204%203H8C8.66667%203.02083%209.19792%203.29167%209.59375%203.8125L10.1875%204.59375C10.3958%204.86458%2010.6667%205%2011%205H16C16.5625%205.02083%2017.0312%205.21875%2017.4062%205.59375C17.7812%205.96875%2017.9792%206.4375%2018%207V15ZM10.75%208.25C10.7083%207.79167%2010.4583%207.54167%2010%207.5C9.54167%207.54167%209.29167%207.79167%209.25%208.25V11.4375L8.28125%2010.4688C7.92708%2010.1771%207.57292%2010.1771%207.21875%2010.4688C6.92708%2010.8229%206.92708%2011.1771%207.21875%2011.5312L9.46875%2013.7812C9.82292%2014.0729%2010.1771%2014.0729%2010.5312%2013.7812L12.7812%2011.5312C13.0729%2011.1771%2013.0729%2010.8229%2012.7812%2010.4688C12.4271%2010.1771%2012.0729%2010.1771%2011.7188%2010.4688L10.75%2011.4375V8.25Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
        {isObjectiveVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600", "two-line-clamp")}
            tag="div"
          >
            {textObjective}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1066")}
        id={_utils.cx(
          _styles,
          "w-node-_1eadd607-1492-0d1b-a196-62336e91e7ab-6e91e7a7"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          id={_utils.cx(
            _styles,
            "w-node-_1eadd607-1492-0d1b-a196-62336e91e7ac-6e91e7a7"
          )}
          tag="div"
        >
          {textMembersCount}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1067")}
          tag="div"
        >
          {slotMemberPic}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1066", "center")}
        tag="div"
      >
        {isUpcomingScheduleVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            id={_utils.cx(
              _styles,
              "w-node-_1eadd607-1492-0d1b-a196-62336e91e7b0-6e91e7a7"
            )}
            tag="div"
          >
            {textUpcomingSchedules}
          </_Builtin.Block>
        ) : null}
        {isUpcomingScheduleEmpty ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-400")}
            tag="div"
          >
            {"No schedules"}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1066", "center")}
        tag="div"
      >
        {isCompletedScheduleVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            id={_utils.cx(
              _styles,
              "w-node-_1eadd607-1492-0d1b-a196-62336e91e7b3-6e91e7a7"
            )}
            tag="div"
          >
            {textCompletedSchedules}
          </_Builtin.Block>
        ) : null}
        {isCompletedScheduleEmpty ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-400")}
            tag="div"
          >
            {"No schedules"}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
