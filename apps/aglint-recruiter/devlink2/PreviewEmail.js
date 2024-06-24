"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./PreviewEmail.module.css";

export function PreviewEmail({
  as: _Component = _Builtin.Block,
  textTitle = "Preview: This email contains dummy data for review purposes only.",
  onClickClose = {},
  slotContent,
}) {
  return (
    <_Component className={_utils.cx(_styles, "preview-email-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "pe-top-wrap")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "pe-top-left")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "pe-top-icon-wrap")}
            tag="div"
          >
            <GlobalIcon iconName="info" color="accent" />
          </_Builtin.Block>
          <Text content={textTitle} />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "icons", "cursor-pointer")}
          tag="div"
          {...onClickClose}
        >
          <GlobalIcon iconName="close" size="4" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "pe-body-wrap")} tag="div">
        {slotContent}
      </_Builtin.Block>
    </_Component>
  );
}
