"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ReqAgentStats.module.css";

export function ReqAgentStats({
  as: _Component = _Builtin.Block,
  textCountCompleted = "5",
  textCountReschedule = (
    <>
      {"10"}
      <br />
    </>
  ),
  textCountSchedule = (
    <>
      {"20"}
      <br />
    </>
  ),
  textCountConfirmed = (
    <>
      {"20"}
      <br />
    </>
  ),
  textCountCancelled = (
    <>
      {"25"}
      <br />
    </>
  ),
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
            <Text content={textCountCompleted} size="6" />
            <_Builtin.Block
              className={_utils.cx(_styles, "event_available")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "icon_general-3")}
                tag="div"
                icon-font="true"
                icon-size="6"
                icon-weight="medium"
                icon-color="inherit"
              >
                <_Builtin.Block tag="div">{"event_available"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-count-wrap")}
            tag="div"
          >
            <_Builtin.Block
              tag="div"
              text-align="left"
              fontSize="2"
              fontWeight="medium"
              font-color="neutral-12"
              high-contrast="false"
            >
              {"Completed"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "scheduling-menu", "not-scheduled")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "count_info")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "menu-scheduling-wrap")}
            tag="div"
          >
            <Text content={textCountReschedule} size="6" />
            <_Builtin.Block
              className={_utils.cx(_styles, "hourglass_empty")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "icon_general-3")}
                tag="div"
                icon-font="true"
                icon-size="6"
                icon-weight="medium"
                icon-color="inherit"
              >
                <_Builtin.Block tag="div">{"calendar_add_on"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-count-wrap")}
            tag="div"
          >
            <_Builtin.Block
              tag="div"
              text-align="left"
              fontSize="2"
              fontWeight="medium"
              font-color="neutral-12"
              high-contrast="false"
            >
              {"Reschedule Requests"}
            </_Builtin.Block>
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
            <Text content={textCountSchedule} size="6" />
            <_Builtin.Block
              className={_utils.cx(_styles, "calendar_clock")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "icon_general-3")}
                tag="div"
                icon-font="true"
                icon-size="6"
                icon-weight="medium"
                icon-color="inherit"
              >
                <_Builtin.Block tag="div">{"calendar_clock"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-count-wrap")}
            tag="div"
          >
            <_Builtin.Block
              tag="div"
              text-align="left"
              fontSize="2"
              fontWeight="medium"
              font-color="neutral-12"
              high-contrast="false"
            >
              {"Scehdule Requests"}
            </_Builtin.Block>
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
            <Text content={textCountConfirmed} size="6" />
            <_Builtin.Block
              className={_utils.cx(_styles, "event_upcoming")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "icon_general-3")}
                tag="div"
                icon-font="true"
                icon-size="6"
                icon-weight="medium"
                icon-color="inherit"
              >
                <_Builtin.Block tag="div">{"event_upcoming"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-count-wrap")}
            tag="div"
          >
            <_Builtin.Block
              tag="div"
              text-align="left"
              fontSize="2"
              fontWeight="medium"
              font-color="neutral-12"
              high-contrast="false"
            >
              {"Confirmed"}
            </_Builtin.Block>
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
            <Text content={textCountCancelled} size="6" />
            <_Builtin.Block
              className={_utils.cx(_styles, "event_busy")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "icon_general-3")}
                tag="div"
                icon-font="true"
                icon-size="6"
                icon-weight="medium"
                icon-color="inherit"
              >
                <_Builtin.Block tag="div">{"event_busy"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule-count-wrap")}
            tag="div"
          >
            <_Builtin.Block
              tag="div"
              text-align="left"
              fontSize="2"
              fontWeight="medium"
              font-color="neutral-12"
              high-contrast="false"
            >
              {"Cancelled"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
