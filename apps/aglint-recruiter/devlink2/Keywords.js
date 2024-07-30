"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithIcon } from "./TextWithIcon";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./Keywords.module.css";

export function Keywords({
  as: _Component = _Builtin.Block,
  slotKeywordsCard,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1481")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1228")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1231")}
          tag="div"
        >
          <TextWithIcon
            textContent="Keywords"
            fontWeight="medium"
            iconName="key_vertical"
            iconSize="4"
          />
          <Text
            content="Use keywords to mark events on interviewers’ calendars that can be overridden for interview scheduling."
            color="neutral"
            weight=""
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1229")}
          tag="div"
        >
          {slotKeywordsCard ?? (
            <SlotComp componentName="slot for keyword card" />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
