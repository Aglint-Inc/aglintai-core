"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { FilterItem } from "./FilterItem";
import * as _utils from "./utils";
import _styles from "./AllInterviewFilter.module.css";

export function AllInterviewFilter({
  as: _Component = _Builtin.Block,
  isRelatedJobVisible = true,
  isScheduleTypeVisible = true,
  isStatusVisible = true,
  isInterviewPanelVisible = true,
  isDataRangeVisible = true,
  isDurationVisible = true,
  onClickRelatedJob = {},
  onClickScheduleType = {},
  onClickStatus = {},
  onClickInterviewPanel = {},
  onClickDateRange = {},
  onClickDuration = {},
  isCustomSlot = false,
  slotCustom,
  onClickCoordinator = {},
  isCoordinatorVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "all-interview-filter")}
      tag="div"
    >
      {isRelatedJobVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "jobs-wrap")}
          tag="div"
          {...onClickRelatedJob}
        >
          <Text content="Job" weight="" />
        </_Builtin.Block>
      ) : null}
      {isScheduleTypeVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "jobs-wrap")}
          tag="div"
          {...onClickScheduleType}
        >
          <Text weight="" content="Schedule Type" />
        </_Builtin.Block>
      ) : null}
      {isStatusVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "jobs-wrap", "cursor-pointer")}
          tag="div"
          {...onClickStatus}
        >
          <Text content="Status" weight="" />
        </_Builtin.Block>
      ) : null}
      {isInterviewPanelVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "jobs-wrap", "cursor-pointer")}
          tag="div"
          {...onClickInterviewPanel}
        >
          <Text content="Interview Type" weight="" />
        </_Builtin.Block>
      ) : null}
      {isDataRangeVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "jobs-wrap", "cursor-pointer")}
          tag="div"
          {...onClickDateRange}
        >
          <Text content="Date Range" weight="" />
        </_Builtin.Block>
      ) : null}
      {isDurationVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "jobs-wrap", "cursor-pointer")}
          tag="div"
          {...onClickDuration}
        >
          <Text weight="" content="Duration" />
        </_Builtin.Block>
      ) : null}
      {isCoordinatorVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "jobs-wrap", "cursor-pointer")}
          tag="div"
          {...onClickCoordinator}
        >
          <Text weight="" content="Co-ordinator" />
        </_Builtin.Block>
      ) : null}
      {isCustomSlot ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "all-interview-filter-copy")}
          tag="div"
        >
          {slotCustom ?? <FilterItem />}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
