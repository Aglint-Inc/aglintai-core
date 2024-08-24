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
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%40media%20screen%20and%20(max-width%3A%20991px)%20%7B%0A%20%20.slot-agent-chat%20%7B%0A%20%20%20%20display%3A%20none%3B%0A%20%20%7D%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
