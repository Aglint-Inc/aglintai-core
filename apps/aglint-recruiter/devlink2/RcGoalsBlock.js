"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { RcCheckbox } from "./RcCheckbox";
import * as _utils from "./utils";
import _styles from "./RcGoalsBlock.module.css";

export function RcGoalsBlock({
  as: _Component = _Builtin.Block,
  slotCheckboxes,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "sl-ats-wrapper", "sl-ats-padding")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "sl-goal-title-block")}
        tag="div"
      >
        <Text
          content="What are your goals with Aglint?"
          align=""
          weight="bold"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sl-goal-check-wrapper")}
        tag="div"
      >
        {slotCheckboxes ?? <RcCheckbox text="Sourcing new candidates" />}
      </_Builtin.Block>
    </_Component>
  );
}
