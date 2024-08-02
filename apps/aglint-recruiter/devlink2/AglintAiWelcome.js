"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./AglintAiWelcome.module.css";

export function AglintAiWelcome({
  as: _Component = _Builtin.Block,
  textAiHeader = "Hey Sara, I am Aglint AI your Scheduling co-pilot.",
  slotOption,
}) {
  return (
    <_Component className={_utils.cx(_styles, "req-right-initial")} tag="div">
      <Text content={textAiHeader} size="3" weight="regular" color="neutral" />
      <_Builtin.Block
        className={_utils.cx(_styles, "req-header-gradient")}
        tag="div"
      >
        <Text size="7" color="inherit" content="How can i help you today?" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-right-initail-grid")}
        tag="div"
      >
        {slotOption}
      </_Builtin.Block>
    </_Component>
  );
}
