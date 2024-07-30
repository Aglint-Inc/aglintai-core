"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
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
        className={_utils.cx(_styles, "scheduling-menu", "success")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "count_info")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "menu-scheduling-wrap")}
            tag="div"
          >
            <Text content={textCompletedCount} size="7" weight="medium" />
            <_Builtin.Block
              className={_utils.cx(_styles, "event_available")}
              tag="div"
            >
              <GlobalIcon size="6" iconName="event_available" weight="medium" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-count-wrap")}
            tag="div"
          >
            <Text content="Completed" weight="medium" color="neutral-12" />
            <Text
              content={textIncreasedCompleted}
              weight="regular"
              color="neutral"
              size="1"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "scheduling-menu", "confirmed")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "count_info")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "menu-scheduling-wrap")}
            tag="div"
          >
            <Text content={textConfirmedCount} size="7" weight="medium" />
            <_Builtin.Block
              className={_utils.cx(_styles, "event_upcoming")}
              tag="div"
            >
              <GlobalIcon size="6" iconName="event_upcoming" weight="medium" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-count-wrap")}
            tag="div"
          >
            <Text content="Confirmed" weight="medium" color="neutral-12" />
            <Text
              content={textIncreasedConfirmed}
              weight="regular"
              color="neutral"
              size="1"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "scheduling-menu", "waiting")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "count_info")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "menu-scheduling-wrap")}
            tag="div"
          >
            <Text content={textWaitingCount} size="7" weight="medium" />
            <_Builtin.Block
              className={_utils.cx(_styles, "calendar_clock")}
              tag="div"
            >
              <GlobalIcon size="6" iconName="calendar_clock" weight="medium" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-count-wrap")}
            tag="div"
          >
            <Text content="Waiting" weight="medium" color="neutral-12" />
            <Text
              content={textIncreasedWaiting}
              weight="regular"
              color="neutral"
              size="1"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "scheduling-menu", "cancelled")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "count_info")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "menu-scheduling-wrap")}
            tag="div"
          >
            <Text content={textCancelledCount} size="7" weight="medium" />
            <_Builtin.Block
              className={_utils.cx(_styles, "event_busy")}
              tag="div"
            >
              <GlobalIcon size="6" iconName="event_busy" weight="medium" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-count-wrap")}
            tag="div"
          >
            <Text content="Cancelled" weight="medium" color="neutral-12" />
            <Text
              content={textIncreasedCancelled}
              weight="regular"
              color="neutral"
              size="1"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
