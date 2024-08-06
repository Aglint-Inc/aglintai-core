"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { RecentRescheduleList } from "./RecentRescheduleList";
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
        className={_utils.cx(_styles, "dashboard-widget-header")}
        tag="div"
      >
        <Text content="Recent Reschedules" weight="medium" />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "slot_recent")} tag="div">
        {slotRecentRescheduleList ?? (
          <>
            <RecentRescheduleList />
            <RecentRescheduleList />
            <RecentRescheduleList />
            <RecentRescheduleList />
            <RecentRescheduleList />
            <RecentRescheduleList />
            <RecentRescheduleList />
            <RecentRescheduleList />
            <RecentRescheduleList />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
