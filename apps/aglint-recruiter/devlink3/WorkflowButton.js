"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./WorkflowButton.module.css";

export function WorkflowButton({
  as: _Component = _Builtin.Block,
  onClickButton = {},
  slotIcon,
  textButton = "This is a global text component",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "button-workflow")}
      tag="div"
      {...onClickButton}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-icon-workflow-btn")}
        tag="div"
      >
        {slotIcon}
      </_Builtin.Block>
      <Text content={textButton} />
    </_Component>
  );
}
