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
          id={_utils.cx(
            _styles,
            "w-node-_1eadd607-1492-0d1b-a196-62336e91e7a9-6e91e7a7"
          )}
          tag="div"
        >
          {textModuleName}
        </_Builtin.Block>
        {isObjectiveVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600", "one-line-clamp")}
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
