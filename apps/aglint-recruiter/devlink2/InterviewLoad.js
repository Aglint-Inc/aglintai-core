"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithIcon } from "./TextWithIcon";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./InterviewLoad.module.css";

export function InterviewLoad({
  as: _Component = _Builtin.Block,
  slotDailyLimit,
  slotWeeklyLimit,
  borderStyle,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "schedule_settings")}
      tag="div"
      border-style={borderStyle}
    >
      <_Builtin.Block className={_utils.cx(_styles, "setting_wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "setting_title")}
          tag="div"
        >
          <TextWithIcon
            fontWeight="medium"
            textContent="Interview Load"
            iconName="balance"
            iconSize="4"
          />
          <Text
            content="Setup maximum interviews per day and week."
            weight=""
            color="neutral"
          />
        </_Builtin.Block>
        <_Builtin.Grid className={_utils.cx(_styles, "load_grid")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "interv-load")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "interviewload-lable")}
              tag="div"
            >
              <Text content="Daily Limit" weight="medium" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_hr_input")}
              id={_utils.cx(
                _styles,
                "w-node-_55b24612-1348-951b-c98a-0357678cca02-678cc9f8"
              )}
              tag="div"
            >
              {slotDailyLimit ?? <SlotComp componentName="Input" />}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "interv-load")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "interviewload-lable")}
              tag="div"
            >
              <Text content="Weekly Limit" weight="medium" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_hr_input")}
              tag="div"
            >
              {slotWeeklyLimit ?? <SlotComp componentName="Input" />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Grid>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%5Bborder-style%3D%22true%22%5D%7B%0Aborder%3A%201px%20solid%20var(--neutral-6)%3B%0Aborder-radius%3A%20var(--radius-4)%3B%0Abackground-color%3A%20var(--white)%3B%0A%7D%0A%0A%5Bborder-style%3D%22false%22%5D%7B%0Aborder%3A%20none%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
