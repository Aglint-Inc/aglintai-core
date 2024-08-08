"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { IconButtonSoft } from "./IconButtonSoft";
import * as _utils from "./utils";
import _styles from "./RequestSetting.module.css";

export function RequestSetting({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  slotToolsEnables,
  slotCustomize,
  slotAutoPilotToggle,
  slotAiFrequency,
}) {
  return (
    <_Component className={_utils.cx(_styles, "req-setting-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "req-setting-header")}
        tag="div"
      >
        <Text size="3" color="neutral" content="Your Settings" />
        <_Builtin.Block tag="div" {...onClickClose}>
          <IconButtonSoft iconName="close" color="neutral" size="1" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-setting-body-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <Text content="Aglint AI Capabilities" size="2" />
          <Text
            content="Choose which tools you want to enable for the agent"
            weight="regular"
          />
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotToolsEnables}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-setting-body-foot-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "req-setting-customize")}
          tag="div"
        >
          <Text content="Customize" />
          <Text
            content="How do you want the Aglint AI to handle scheduling, re scheduling? Write your own instructions."
            weight="regular"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-customize-req-setting")}
            tag="div"
          >
            {slotCustomize}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "req-settingai")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "req-setting-auto-pilot")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-autopilot")}
              tag="div"
            >
              {slotAutoPilotToggle}
            </_Builtin.Block>
            <Text
              weight="regular"
              content="When you turn on auto-pilot, the agent will schedule, re schedule interviews once in every 2 hours. You can also customise it bellow."
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "req-setting-ai-wrap")}
            tag="div"
          >
            <Text content="How frequent you want Aglint AI to auto run:" />
            <_Builtin.Block tag="div">{slotAiFrequency}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
