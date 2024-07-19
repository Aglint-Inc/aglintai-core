"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./PreviewEmail.module.css";

export function PreviewEmail({
  as: _Component = _Builtin.Block,
  textTitle = "Preview",
  slotContent,
  slotClose,
}) {
  return (
    <_Component className={_utils.cx(_styles, "preview-email-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "pe-top-wrap")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "pe-top-left")} tag="div">
          <Text content={textTitle} />
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotClose}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "pe-body-wrap")} tag="div">
        {slotContent}
      </_Builtin.Block>
    </_Component>
  );
}
