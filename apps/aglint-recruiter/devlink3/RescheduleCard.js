"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./RescheduleCard.module.css";

export function RescheduleCard({
  as: _Component = _Builtin.Block,
  textReason = "Out of the office",
  bgColorProps = {},
  slotDateReason,
  slotAdditionalNotes,
  isNotesVisible = true,
  isDateVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "requested_reschedule")}
      tag="div"
      {...bgColorProps}
    >
      <_Builtin.Block className={_utils.cx(_styles, "rc-notes-wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "first-part-title")}
          tag="div"
        >
          <Text content="Reason" weight="" color="neutral" size="1" />
        </_Builtin.Block>
        <Text content={textReason} weight="" />
      </_Builtin.Block>
      {isNotesVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "rc-notes-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "first-part-title")}
            tag="div"
          >
            <Text
              content="Additional Notes"
              weight=""
              color="neutral"
              size="1"
            />
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotAdditionalNotes}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isDateVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "rc-notes-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "first-part-title")}
            tag="div"
          >
            <Text content="Proposed Date" weight="" color="neutral" size="1" />
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotDateReason}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
