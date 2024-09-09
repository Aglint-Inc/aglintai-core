"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { TextWithIcon } from "./TextWithIcon";
import * as _utils from "./utils";
import _styles from "./SchedulingQuickLink.module.css";

export function SchedulingQuickLink({
  as: _Component = _Builtin.Block,
  onClickCandidates = {},
  onClickSchedules = {},
  onClickInterviewTypes = {},
  onClickInterviewers = {},
  onClickSettings = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "sd-quicklink-wrap")} tag="div">
      <Text size="1" weight="regular" color="neutral" content="Quick Links" />
      <_Builtin.Block
        className={_utils.cx(_styles, "sd-quicklink-list")}
        tag="div"
        {...onClickCandidates}
      >
        <TextWithIcon
          fontWeight="medium"
          iconSize="6"
          iconWeight="medium"
          iconName="group"
          textContent="Candidates"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sd-quicklink-list")}
        tag="div"
        {...onClickSchedules}
      >
        <TextWithIcon
          fontWeight="medium"
          iconSize="6"
          iconWeight="medium"
          iconName="calendar_today"
          textContent="Schedules"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sd-quicklink-list")}
        tag="div"
        {...onClickInterviewTypes}
      >
        <TextWithIcon
          fontWeight="medium"
          iconSize="6"
          iconWeight="medium"
          iconName="co_present"
          textContent="Interview Types"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sd-quicklink-list")}
        tag="div"
        {...onClickInterviewers}
      >
        <TextWithIcon
          fontWeight="medium"
          iconSize="6"
          iconWeight="medium"
          iconName="3p"
          textContent="Interviewers"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sd-quicklink-list")}
        tag="div"
        {...onClickSettings}
      >
        <TextWithIcon
          fontWeight="medium"
          iconSize="6"
          iconWeight="medium"
          iconName="settings"
          textContent="Settings"
        />
      </_Builtin.Block>
    </_Component>
  );
}
