"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalBadge } from "./GlobalBadge";
import * as _utils from "./utils";
import _styles from "./StatusBadge.module.css";

export function StatusBadge({
  as: _Component = _Builtin.Block,
  isCompletedVisible = false,
  isConfirmedVisible = true,
  isNotScheduledVisible = false,
  isInProgressVisible = false,
  isCancelledVisible = false,
  isWaitingVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1273")} tag="div">
      {isCompletedVisible ? (
        <_Builtin.Block className={_utils.cx(_styles, "sb-wrapper")} tag="div">
          <GlobalBadge
            showIcon={true}
            iconName="event_available"
            textBadge=""
            color="success"
          />
        </_Builtin.Block>
      ) : null}
      {isConfirmedVisible ? (
        <_Builtin.Block className={_utils.cx(_styles, "sb-wrapper")} tag="div">
          <GlobalBadge
            showIcon={true}
            iconName="event_upcoming"
            textBadge="Confirmed"
            color="info"
          />
        </_Builtin.Block>
      ) : null}
      {isNotScheduledVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "sb-wrapper", "not-schedule")}
          tag="div"
        >
          <GlobalBadge
            showIcon={true}
            iconName="calendar_add_on"
            textBadge="Not Scheduled"
            color="neutral"
          />
        </_Builtin.Block>
      ) : null}
      {isInProgressVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "sb-wrapper", "in-progress")}
          tag="div"
        >
          <GlobalBadge
            showIcon={true}
            iconName="event"
            textBadge="In Progress"
            color="lime"
            size="1"
          />
        </_Builtin.Block>
      ) : null}
      {isCancelledVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "sb-wrapper", "cancelled")}
          tag="div"
        >
          <GlobalBadge
            showIcon={true}
            iconName={
              <>
                {"event_busy"}
                <br />
              </>
            }
            textBadge="Cancelled"
            color="error"
            size="1"
          />
        </_Builtin.Block>
      ) : null}
      {isWaitingVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "sb-wrapper", "waiting")}
          tag="div"
        >
          <GlobalBadge
            showIcon={true}
            iconName={
              <>
                {"calendar_clock"}
                <br />
              </>
            }
            textBadge="Unconfirmed"
            color="warning"
            size="1"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
