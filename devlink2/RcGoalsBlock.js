import React from "react";
import * as _Builtin from "./_Builtin";
import { RcCheckbox } from "./RcCheckbox";
import * as _utils from "./utils";
import _styles from "./RcGoalsBlock.module.css";

export function RcGoalsBlock({
  as: _Component = _Builtin.Block,
  slotButtons,
  slotCheckboxes,
}) {
  return (
    <_Component className={_utils.cx(_styles, "sl-goal-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "sl-goal-title-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {"What's your main goal for using Aglint?"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "text-grey-600")}
          tag="div"
        >
          {"Choose the reason you're here, and we'll customize your setup."}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sl-goal-check-wrapper")}
        tag="div"
      >
        {slotCheckboxes ?? <RcCheckbox text="Sourcing new candidates" />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sl-goal-buttons-wrapper")}
        tag="div"
      >
        {slotButtons}
      </_Builtin.Block>
    </_Component>
  );
}
