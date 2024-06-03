"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AiIcon } from "./AiIcon";
import * as _utils from "./utils";
import _styles from "./ButtonGenerate.module.css";

export function ButtonGenerate({
  as: _Component = _Builtin.Block,
  onClickGenerate = {},
  slotIcon,
  textDynamic = "Generate",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "generate-btn-cd")}
      tag="div"
      {...onClickGenerate}
    >
      <_Builtin.Block className={_utils.cx(_styles, "icons")} tag="div">
        {slotIcon ?? <AiIcon />}
      </_Builtin.Block>
      <_Builtin.Block tag="div">{textDynamic}</_Builtin.Block>
    </_Component>
  );
}
