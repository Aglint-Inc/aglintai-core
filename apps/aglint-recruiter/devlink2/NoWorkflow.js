"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./NoWorkflow.module.css";

export function NoWorkflow({
  as: _Component = _Builtin.Block,
  textDesc = "This is a global text component",
  slotButton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "no-workflow-pregress")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "no-progress-text-wrap")}
        tag="div"
      >
        <Text content={textDesc} />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "alot-no-progress-btn")}
        tag="div"
      >
        {slotButton}
      </_Builtin.Block>
    </_Component>
  );
}
