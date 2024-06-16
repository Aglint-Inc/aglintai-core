"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./WorkflowEmpty.module.css";

export function WorkflowEmpty({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "workflow_empty")} tag="div">
      <GlobalIcon iconName="lan" size="8" weight="thin" />
      <_Builtin.Block className={_utils.cx(_styles, "flex_hr_4")} tag="div">
        <Text content="No Workflow Found" weight="" />
      </_Builtin.Block>
    </_Component>
  );
}
