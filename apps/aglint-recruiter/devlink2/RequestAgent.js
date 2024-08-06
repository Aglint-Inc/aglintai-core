"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AglintAiChat } from "./AglintAiChat";
import { Text } from "./Text";
import { RequestOption } from "./RequestOption";
import { RequestAgentTab } from "./RequestAgentTab";
import { RequestAgentEmpty } from "./RequestAgentEmpty";
import * as _utils from "./utils";
import _styles from "./RequestAgent.module.css";

export function RequestAgent({
  as: _Component = _Builtin.Block,
  textName = "Sara",
  textTopStatus = "Your top priorities as of July 31, 2024",
  slotRequestOption,
  slotRequestSection,
  slotAiInput,
  slotAiBody,
  textAiHeader = "Hey Sara, I am Aglint AI your Scheduling co-pilot.",
  slotFilter,
  slotAglintAiChat,
  slotTabs,
}) {
  return (
    <_Component className={_utils.cx(_styles, "request-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-agent-chat")}
        tag="div"
      >
        {slotAglintAiChat ?? <AglintAiChat />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "request-left-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "req-left-header-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "request-left-header")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "request-left-name-wrap")}
              tag="div"
            >
              <Text content="Welcome" size="3" color="neutral" />
              <Text content={textName} size="3" color="neutral" />
            </_Builtin.Block>
            <Text
              content={textTopStatus}
              size="1"
              color="neutral"
              weight="regular"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "req-tab-header")}
            tag="div"
          >
            {slotRequestOption ?? <RequestOption />}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "req-body-left-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-header-ra")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ra-tab-pill-wrapper")}
              tag="div"
            >
              {slotTabs ?? <RequestAgentTab />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ra-slot-filter")}
              tag="div"
            >
              {slotFilter}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "req-left-body-wrap")}
            tag="div"
          >
            {slotRequestSection ?? <RequestAgentEmpty />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
