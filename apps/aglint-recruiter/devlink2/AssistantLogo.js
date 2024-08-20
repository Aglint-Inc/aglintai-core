"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./AssistantLogo.module.css";

export function AssistantLogo({
  as: _Component = _Builtin.Block,
  onClickAssistant = {},
  isActive = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "asstant-logo-wrap")}
      tag="div"
      {...onClickAssistant}
    >
      <GlobalIcon iconName="task_alt" size="6" />
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "active-assistant")}
          tag="div"
        >
          <GlobalIcon iconName="task_alt" size="6" />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
