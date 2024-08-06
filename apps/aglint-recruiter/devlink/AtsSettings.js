"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./AtsSettings.module.css";

export function AtsSettings({
  as: _Component = _Builtin.Block,
  slotAtsIcon,
  slotConnectIcon,
  slotButton,
  slotSyncItems,
  slotFrequencySync,
  textSyncItems = "Sync Items from Greenhouse",
  textAtsConnected = "Greenhouse is connected",
}) {
  return (
    <_Component className={_utils.cx(_styles, "ats-settings-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "ats-connect-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ats-connect-left-detail")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotAtsIcon}</_Builtin.Block>
          <Text content={textAtsConnected} weight="medium" />
          <_Builtin.Block tag="div">{slotConnectIcon}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ats-connect-right-btn")}
          tag="div"
        >
          {slotButton}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "ats-sync-item-wrap")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "asi-header")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "asi-header-wrap")}
            tag="div"
          >
            <GlobalIcon iconName="sync" />
            <Text content={textSyncItems} weight="medium" />
          </_Builtin.Block>
          <Text color="neutral" />
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotSyncItems}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "ats-sync-item-wrap")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "asi-header")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "asi-header-wrap")}
            tag="div"
          >
            <GlobalIcon iconName="rule_settings" />
            <Text content="Frequency of sync" weight="medium" />
          </_Builtin.Block>
          <Text color="neutral" />
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotFrequencySync}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
