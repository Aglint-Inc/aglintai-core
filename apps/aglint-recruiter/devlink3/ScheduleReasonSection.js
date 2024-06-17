"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ReasonList } from "./ReasonList";
import { ButtonGhost } from "./ButtonGhost";
import * as _utils from "./utils";
import _styles from "./ScheduleReasonSection.module.css";

export function ScheduleReasonSection({
  as: _Component = _Builtin.Block,
  slotReasonList,
  textHeading = "Reschedule Reasons",
  textDesc = "Add reasons for rescheduling, and these options will be provided at the time of rescheduling.",
  onClickAdd = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "srs-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "section_header_desc")}
        tag="div"
      >
        <Text content={textHeading} weight="medium" />
        <Text content={textDesc} weight="" color="neutral" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "srs-input-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "srs-input-item")}
          tag="div"
        >
          {slotReasonList ?? <ReasonList />}
        </_Builtin.Block>
        <ButtonGhost onClickButton={onClickAdd} size="2" textButton="Add" />
      </_Builtin.Block>
    </_Component>
  );
}
