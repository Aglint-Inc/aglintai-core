"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./KeywordCard.module.css";

export function KeywordCard({
  as: _Component = _Builtin.Block,
  textTitle = "Free",
  isTextWarningVisible = true,
  slotSuggestPill,
  slotInput,
  textWarning = "If these keywords are detected in a calendar event title, interviews booked over or overlapping these events will not be counted as a scheduling conflict.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "keyword_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "header_desc")} tag="div">
        <Text content={textTitle} weight="medium" />
        {isTextWarningVisible ? (
          <_Builtin.Block tag="div">
            <Text content={textWarning} weight="" color="neutral" />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_suggestion_pill")}
        tag="div"
      >
        {slotSuggestPill ?? <SlotComp componentName="Input" />}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {slotInput ?? <SlotComp componentName="Input" />}
      </_Builtin.Block>
    </_Component>
  );
}
