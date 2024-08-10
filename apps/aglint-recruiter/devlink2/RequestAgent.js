"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AglintAiChat } from "./AglintAiChat";
import { RequestsWrapper } from "./RequestsWrapper";
import { RequestDashboard } from "./RequestDashboard";
import { TextWithIcon } from "./TextWithIcon";
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
  isFilterVisible = true,
  slotRequest,
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
        className={_utils.cx(_styles, "slot_request_right")}
        tag="div"
      >
        {slotRequest ?? (
          <>
            <RequestsWrapper />
            <RequestDashboard />
            <TextWithIcon />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
