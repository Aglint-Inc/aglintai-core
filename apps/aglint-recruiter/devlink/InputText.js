"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./InputText.module.css";

export function InputText({
  as: _Component = _Builtin.Block,
  textInput = "Javascript",
  onClickInput = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "input-text-wrap")}
      tag="div"
      {...onClickInput}
    >
      <Text content={textInput} weight="medium" />
    </_Component>
  );
}
