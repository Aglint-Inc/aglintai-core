"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ToggleWithText.module.css";

export function ToggleWithText({
  as: _Component = _Builtin.Block,
  textToggleLight = "Show only no conflicts",
  onClickToggle = {},
  textToggleBold = "Show only no conflicts",
  isBoldText = false,
  slotToggle,
  isSubText = false,
  textSub = "Show only no conflicts",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "tooggle_with_text-copy")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "tooggle_with_text")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_toggle")}
          tag="div"
          {...onClickToggle}
        >
          {slotToggle ?? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2230%22%20height%3D%2216%22%20viewBox%3D%220%200%2030%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20y%3D%220.5%22%20width%3D%2230%22%20height%3D%2215%22%20rx%3D%227.5%22%20fill%3D%22var(--accent-9)%22%2F%3E%0A%3Ccircle%20cx%3D%2221.75%22%20cy%3D%228%22%20r%3D%224.5%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <Text content={textToggleLight} weight="" />
          {isBoldText ? (
            <_Builtin.Block tag="div">
              <Text content={textToggleBold} weight="medium" />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      {isSubText ? (
        <_Builtin.Block className={_utils.cx(_styles, "sub_text")} tag="div">
          <Text content={textSub} weight="regular" size="1" color="neutral" />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
