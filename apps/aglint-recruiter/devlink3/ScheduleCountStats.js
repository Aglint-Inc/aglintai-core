"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ScheduleCountStats.module.css";

export function ScheduleCountStats({
  as: _Component = _Builtin.Block,
  textCompletedCount = "5",
  textIncreasedCompleted = "+1% from yesterday",
  textNotScheduledCount = (
    <>
      {"10"}
      <br />
    </>
  ),
  textIncreasedNotScheduled = "+2% from yesterday",
  textWaitingCount = "15",
  textIncreasedWaiting = "+3% from yesterday",
  textConfirmedCount = "20",
  textIncreasedConfirmed = "+4% from yesterday",
  textCancelledCount = "25",
  textIncreasedCancelled = "+5% from yesterday",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "schedule-count-wrap-menu")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "scheduling-menu")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "event_available")}
          tag="div"
        >
          <GlobalIcon size="8" iconName="event_available" weight="thin" />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "count_info")} tag="div">
          <Text content={textCompletedCount} size="6" weight="medium" />
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-count-wrap")}
            tag="div"
          >
            <Text content="Completed" weight="medium" color="neutral" />
            <_Builtin.Block
              className={_utils.cx(_styles, "accent-text")}
              tag="div"
            >
              {textIncreasedCompleted}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "scheduling-menu")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "hourglass_empty")}
          tag="div"
        >
          <GlobalIcon size="8" iconName="hourglass_empty" weight="thin" />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "count_info")} tag="div">
          <Text content={textNotScheduledCount} size="6" weight="medium" />
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-count-wrap")}
            tag="div"
          >
            <Text content="Not Scheduled" weight="medium" color="neutral" />
            <_Builtin.Block
              className={_utils.cx(_styles, "accent-text")}
              tag="div"
            >
              {textIncreasedNotScheduled}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "scheduling-menu")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "calendar_clock")}
          tag="div"
        >
          <GlobalIcon size="8" iconName="calendar_clock" weight="thin" />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "count_info")} tag="div">
          <Text content={textWaitingCount} size="6" weight="medium" />
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-count-wrap")}
            tag="div"
          >
            <Text content="Waiting" weight="medium" color="neutral" />
            <_Builtin.Block
              className={_utils.cx(_styles, "accent-text")}
              tag="div"
            >
              {textIncreasedWaiting}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "scheduling-menu")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "event_upcoming")}
          tag="div"
        >
          <GlobalIcon size="8" iconName="event_upcoming" weight="thin" />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "count_info")} tag="div">
          <Text content={textConfirmedCount} size="6" weight="medium" />
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-count-wrap")}
            tag="div"
          >
            <Text content="Confirmed" weight="medium" color="neutral" />
            <_Builtin.Block
              className={_utils.cx(_styles, "accent-text")}
              tag="div"
            >
              {textIncreasedConfirmed}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "scheduling-menu")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "event_busy")} tag="div">
          <GlobalIcon size="8" iconName="event_busy" weight="thin" />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "count_info")} tag="div">
          <Text content={textCancelledCount} size="6" weight="medium" />
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-count-wrap")}
            tag="div"
          >
            <Text content="Cancelled" weight="medium" color="neutral" />
            <_Builtin.Block
              className={_utils.cx(_styles, "accent-text")}
              tag="div"
            >
              {textIncreasedCancelled}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
