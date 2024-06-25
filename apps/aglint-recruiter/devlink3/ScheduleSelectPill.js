"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ScheduleSelectPill.module.css";

export function ScheduleSelectPill({
  as: _Component = _Builtin.Block,
  slotIcons,
  textScheduleName = "Company Indroduction",
  onClickClose = {},
  textTime = "1 Hour",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "schedule-select-pill-wrap")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "ssp-content")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "ssp-header-wrap")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            {slotIcons ?? <SlotComp componentNeme="Icon" />}
          </_Builtin.Block>
          <Text content={textScheduleName} weight="" />
        </_Builtin.Block>
        <Text content={textTime} size="1" weight="" color="neutral" />
      </_Builtin.Block>
    </_Component>
  );
}
