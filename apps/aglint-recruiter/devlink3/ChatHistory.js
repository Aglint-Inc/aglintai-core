"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./ChatHistory.module.css";

export function ChatHistory({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "chat_history_block")} tag="div">
      <Text
        content="Data Scientist With Expertise In Machine Learning For Our Boston Office"
        weight=""
      />
      <_Builtin.Block className={_utils.cx(_styles, "flex-h3")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "flex-h1")} tag="div">
          <GlobalIcon size="3" iconName="schedule" weight="" />
          <Text weight="" content="4 Hhours ago" size="1" />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "flex-h1")} tag="div">
          <GlobalIcon size="3" iconName="list" />
          <Text weight="" content="1 Tasks" size="1" />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "flex-h1")} tag="div">
          <GlobalIcon size="3" iconName="task_alt" weight="light" />
          <Text weight="" content="0 Completed" size="1" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
