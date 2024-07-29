"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalSwitchPill } from "./GlobalSwitchPill";
import * as _utils from "./utils";
import _styles from "./GlobalSwitch.module.css";

export function GlobalSwitch({
  as: _Component = _Builtin.Block,
  slotGlobalSwitchPill,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "task-switch-button-group")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "task_switch_comp")}
        tag="div"
      >
        {slotGlobalSwitchPill ?? (
          <>
            <GlobalSwitchPill />
            <GlobalSwitchPill />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
