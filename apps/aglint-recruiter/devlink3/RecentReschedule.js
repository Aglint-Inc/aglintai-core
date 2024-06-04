"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./RecentReschedule.module.css";

export function RecentReschedule({
  as: _Component = _Builtin.Block,
  slotDropdown,
  slotRecentRescheduleList,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "reschedule-req")}
      id={_utils.cx(
        _styles,
        "w-node-_08e9c8a0-50e0-f49b-8fab-98bbc719eb69-c719eb69"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "reschedule-req-header")}
        tag="div"
      >
        <Text content="RecentReschedule" />
        <_Builtin.Block tag="div">{slotDropdown}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1782")}
        tag="div"
      >
        {slotRecentRescheduleList ?? (
          <SlotComp componentNeme="RecentResceduleList" />
        )}
      </_Builtin.Block>
    </_Component>
  );
}
