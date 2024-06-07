"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ResumeTag.module.css";

export function ResumeTag({
  as: _Component = _Builtin.Block,
  props = {},
  slotText,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "resume-match-tag")}
      tag="div"
      {...props}
    >
      <_Builtin.Block tag="div" fontSize="1">
        {slotText ?? <Text content="Top Match" size="" />}
      </_Builtin.Block>
    </_Component>
  );
}
