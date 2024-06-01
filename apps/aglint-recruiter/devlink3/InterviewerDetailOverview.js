"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./InterviewerDetailOverview.module.css";

export function InterviewerDetailOverview({
  as: _Component = _Builtin.Block,
  onClickViewAllSchedule = {},
  slotUpcomingSchedule,
  onClickViewAllModule = {},
  slotTrainingModules,
  textHeader1 = "Upcoming Schedules",
  textHeader2 = "Training",
  textButton1 = "View all",
  textButton2 = "View all",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1704")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1701")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1700")}
          tag="div"
        >
          <Text content={textHeader1} weight="medium" />
          <_Builtin.Block
            className={_utils.cx(_styles, "cursor-pointer")}
            tag="div"
            font-color="accent"
            {...onClickViewAllSchedule}
          >
            {textButton1}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1702")}
          tag="div"
        >
          {slotUpcomingSchedule}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1701")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1700")}
          tag="div"
        >
          <Text content={textHeader2} weight="medium" />
          <_Builtin.Block
            className={_utils.cx(_styles, "cursor-pointer")}
            tag="div"
            font-color="accent"
            {...onClickViewAllModule}
          >
            {textButton2}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1703")}
          tag="div"
        >
          {slotTrainingModules}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
