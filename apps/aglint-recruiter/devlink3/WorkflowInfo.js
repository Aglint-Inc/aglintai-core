"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./WorkflowInfo.module.css";

export function WorkflowInfo({
  as: _Component = _Builtin.Block,
  textInfo = "Ever wonder what “circle-check” might look like in the mix? Well, you're in luck! We've cooked up some examples of how you could use the “circle-check” icon in your projects, whether they're apps, interfaces, or print designs.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "workflow_info")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "info_title")} tag="div">
        <GlobalIcon iconName="help" weight="medium" size="3" />
        <Text weight="medium" size="1" content="How it works" />
      </_Builtin.Block>
      <Text content={textInfo} weight="" size="1" color="neutral" />
    </_Component>
  );
}
