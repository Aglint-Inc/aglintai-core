"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import { ScheduleTabOverview } from "./ScheduleTabOverview";
import * as _utils from "./utils";
import _styles from "./ScheduleDetailTabs.module.css";

export function ScheduleDetailTabs({
  as: _Component = _Builtin.Block,
  slotDarkPills,
  slotTabContent,
  slotScheduleTabOverview,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "schedule-details-page")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "schedule-detail-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "schedule-tab-overview-wraper")}
          tag="div"
        >
          {slotScheduleTabOverview ?? (
            <>
              <SlotComp componentNeme="ScheduleTabOverview" />
              <ScheduleTabOverview />
            </>
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "schedule_detail_block")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "sdt-tabs")} tag="div">
            {slotDarkPills ?? <SlotComp componentNeme="Tab" />}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "scheduletab_content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "sdt-tab-content")}
              tag="div"
            >
              {slotTabContent ?? <SlotComp componentNeme="Tab Content" />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
