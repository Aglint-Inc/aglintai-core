"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./IntegrationThanks.module.css";

export function IntegrationThanks({
  as: _Component = _Builtin.Block,
  slotButtonClose,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1250")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1251")}
        tag="div"
      >
        <GlobalIcon iconName="" size="9" weight="thin" color="success-9" />
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1252")}
          tag="div"
        >
          <Text weight="bold" content="" />
          <Text
            weight=""
            content="Thank you for your time. We will review your request and get back to you."
            align="center"
            color="neutral"
          />
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotButtonClose ?? <SlotComp componentName="Close Button" />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
