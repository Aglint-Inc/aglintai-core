"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./AddScheduleOption.module.css";

export function AddScheduleOption({
  as: _Component = _Builtin.Block,
  onClickAddSession = {},
  onClickAddDebriefSession = {},
  onClickAddBreak = {},
  isBreakVisibe = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "add_plan_links_wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "add-plan-links")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "add_plan_link")}
          tag="div"
          {...onClickAddSession}
        >
          <GlobalIcon iconName="add" color="accent" />
          <Text content="Add Interview" color="accent" weight="regular" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "add_plan_link", "cursor-pointer")}
          tag="div"
          {...onClickAddDebriefSession}
        >
          <GlobalIcon iconName="add" color="accent" />
          <Text content="Add Debrief" color="accent" weight="regular" />
        </_Builtin.Block>
        {isBreakVisibe ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "add_plan_link", "cursor-pointer")}
            tag="div"
            {...onClickAddBreak}
          >
            <GlobalIcon iconName="add" color="accent" />
            <Text content="Add Break" color="accent" weight="regular" />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
