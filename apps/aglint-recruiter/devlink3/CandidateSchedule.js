"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { IconButtonSoft } from "./IconButtonSoft";
import { Text } from "./Text";
import { ScheduleTypeButton } from "./ScheduleTypeButton";
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
  textSelectedNumber = "2 Selected",
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
          className={_utils.cx(_styles, "cs-slot-wrap")}
          tag="div"
        >
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
        </_Builtin.Block>
        {isScheduleNowVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule_now_bar", "schedule_nbow")}
            tag="div"
          >
            <IconButtonSoft
              onClickButton={onClickClose}
              size="1"
              iconSize="3"
              iconName="close"
              color="neutral"
            />
            <Text content={textSelectedNumber} weight="" />
            <_Builtin.Block
              className={_utils.cx(_styles, "schedule_button_options")}
              tag="div"
            >
              {slotScheduleButton ?? <ScheduleTypeButton />}
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
