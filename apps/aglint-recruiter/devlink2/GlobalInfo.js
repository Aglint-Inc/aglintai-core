"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithIcon } from "./TextWithIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./GlobalInfo.module.css";

export function GlobalInfo({
  as: _Component = _Builtin.Block,
  textTitle = "How it Works",
  textDescription = "The interview is complete. Click the button for requesting interviewer feedback.",
  iconName = "info",
  color = "neutral",
  slotWidget,
  showWidget = false,
  showDescription = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "global_banner")}
      id={_utils.cx(
        _styles,
        "w-node-_8bbee309-4a2b-c35e-9a03-3f599e1158c1-9e1158c1"
      )}
      tag="div"
      data-banner-color={color}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "info_main_block")}
        tag="div"
      >
        <TextWithIcon
          iconName={iconName}
          textContent={textTitle}
          iconSize="3"
          fontWeight="medium"
          color="inherit"
        />
        {showDescription ? (
          <_Builtin.Block tag="div">
            <Text content={textDescription} color="neutral" weight="" />
          </_Builtin.Block>
        ) : null}
        {showWidget ? (
          <_Builtin.Block tag="div">{slotWidget}</_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
