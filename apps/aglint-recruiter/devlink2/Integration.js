"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./Integration.module.css";

export function Integration({
  as: _Component = _Builtin.Block,
  slotHrTools,
  slotScheduling,
  slotMessaging,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "integration-wrapp")}
      tag="div"
      editable={false}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "intagrations-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "integration_title")}
          tag="div"
        >
          <Text content="ATS" align="" />
          <Text
            content="Easily manage job postings and candidate information by connecting your preferred ATS."
            color="neutral"
            weight=""
            align=""
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "intagrations-list")}
          tag="div"
        >
          {slotHrTools ?? <SlotComp componentName="IntegrationCard" />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "intagrations-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "integration_title")}
          tag="div"
        >
          <Text content="Scheduling Tools" align="" />
          <Text
            content="Connect your calendar and video conferencing tools to simplify interview scheduling."
            color="neutral"
            weight=""
            align=""
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "intagrations-list")}
          tag="div"
        >
          {slotScheduling ?? <SlotComp componentName="IntegrationCard" />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "intagrations-block", "border-none")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "integration_title")}
          tag="div"
        >
          <Text content="Communication Platforms" align="" />
          <Text
            content="Connect popular communication tools to enhance your team's coordination."
            color="neutral"
            weight=""
            align=""
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "intagrations-list")}
          tag="div"
        >
          {slotMessaging ?? <SlotComp componentName="IntegrationCard" />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
