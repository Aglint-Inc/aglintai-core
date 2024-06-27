"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./GeneralBanner.module.css";

export function GeneralBanner({
  as: _Component = _Builtin.Block,
  textHeading = "Heading",
  slotHeadingIcon,
  textDesc = "Heading",
  titleColorProps = {},
  slotButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "general-banner-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "general-banner-header")}
        tag="div"
        {...titleColorProps}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "gb-icon-wrap")}
          tag="div"
        >
          {slotHeadingIcon}
        </_Builtin.Block>
        <Text content={textHeading} weight="bold" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "general-banner-desc")}
        tag="div"
      >
        <Text content={textDesc} color="neutral" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "general-banner-button")}
        tag="div"
      >
        {slotButton ?? (
          <>
            <SlotComp componentName="ButtonSolid" />
            <SlotComp componentName="ButtonSoft" />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
