"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonSurface } from "./ButtonSurface";
import { SlotComp } from "./SlotComp";
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
  isViewButtonVisible = true,
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
          {isViewButtonVisible ? (
            <_Builtin.Block tag="div">
              <ButtonSurface
                textButton={textButton1}
                onClickButton={onClickViewAllSchedule}
                size="1"
                isLeftIcon={false}
                isRightIcon={false}
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1702")}
          tag="div"
        >
          {slotUpcomingSchedule ?? <SlotComp componentNeme="" />}
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
          {isViewButtonVisible ? (
            <_Builtin.Block tag="div">
              <ButtonSurface
                textButton={textButton2}
                onClickButton={onClickViewAllModule}
                size="1"
                isLeftIcon={false}
                isRightIcon={false}
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1703")}
          tag="div"
        >
          {slotTrainingModules ?? <SlotComp componentNeme="Schedules" />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
