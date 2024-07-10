"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./RescheduleOption.module.css";

export function RescheduleOption({
  as: _Component = _Builtin.Block,
  slotScheduligLink,
  slotReqAvailability,
  slotEmailAgent,
  slotPhoneAgent,
  isSchedulingLinkActive = false,
  isReqAvailabilityActive = false,
  isEmailAgentActive = false,
  isPhoneAgentActive = false,
  onClickSchedulingLink = {},
  onClickReqAvailability = {},
  onClickEmailAgent = {},
  onClickPhoneAgent = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "reschedule-option-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ro-list-wrap")}
        tag="div"
        {...onClickSchedulingLink}
      >
        <_Builtin.Block className={_utils.cx(_styles, "relative-1")} tag="div">
          {slotScheduligLink}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "relative-1")} tag="div">
          <Text
            weight=""
            color="neutral"
            content="You will select suitable options and send them to the candidate to choose the final schedule."
          />
        </_Builtin.Block>
        {isSchedulingLinkActive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "option-list-active")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "ro-list-wrap")}
        tag="div"
        {...onClickReqAvailability}
      >
        <_Builtin.Block className={_utils.cx(_styles, "relative-1")} tag="div">
          {slotReqAvailability}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "relative-1")} tag="div">
          <Text weight="" color="neutral" content="" />
        </_Builtin.Block>
        {isReqAvailabilityActive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "option-list-active")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "ro-list-wrap")}
        tag="div"
        {...onClickEmailAgent}
      >
        <_Builtin.Block className={_utils.cx(_styles, "relative-1")} tag="div">
          {slotEmailAgent}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "relative-1")} tag="div">
          <Text
            weight=""
            color="neutral"
            content="The agent will contact the candidate via email and arrange a suitable time within the provided date range."
          />
        </_Builtin.Block>
        {isEmailAgentActive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "option-list-active")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "ro-list-wrap")}
        tag="div"
        {...onClickPhoneAgent}
      >
        <_Builtin.Block className={_utils.cx(_styles, "relative-1")} tag="div">
          {slotPhoneAgent}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "relative-1")} tag="div">
          <Text
            weight=""
            color="neutral"
            content="The agent will contact the candidate via phone call and arrange a suitable time within the provided date range."
          />
        </_Builtin.Block>
        {isPhoneAgentActive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "option-list-active")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
