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
  size,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1481")}
      tag="div"
      width-size={size}
    >
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
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%5Bwidth-size%3D'small'%5D%7B%0Awidth%3A600px%3B%0A%7D%0A%5Bwidth-size%3D'large'%5D%7B%0Awidth%3A700px%3B%0A%7D%0A%3C%2Fstyle%3E" />
    </_Component>
  );
}
