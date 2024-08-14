"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ReqUrgent } from "./ReqUrgent";
import { RequestList } from "./RequestList";
import { ReqCompleted } from "./ReqCompleted";
import { NoPendingReq } from "./NoPendingReq";
import * as _utils from "./utils";
import _styles from "./RequestDashboard.module.css";

export function RequestDashboard({
  as: _Component = _Builtin.Block,
  textGraphTitle = "128 Requests on 25 August 2024, Mondayl text component",
  slotGraph,
  textProgressTitle = "47 Open Requests (52% complete)",
  slotProgressBar,
  slotRequestList,
  slotReqCompleted,
  slotHeaderText,
  textGreetingTitle = "👋 Hey There!",
  textGreetingDescription = (
    <>
      {"You have No requests on today."}
      <br />
    </>
  ),
}) {
  return (
    <_Component className={_utils.cx(_styles, "req-dashbaord-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "req-dashbaord-sub-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "req-dash-top-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "req-dash-graph")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              <Text content={textGreetingTitle} weight="medium" size="4" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "grapsh_wrapper")}
              tag="div"
            >
              <Text
                content={textGreetingDescription}
                color="neutral"
                size="1"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "slot_graph")}
                tag="div"
              >
                {slotGraph}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "req-dash-top-bottom")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "req-dash-progress-wrap")}
              tag="div"
            >
              <Text content={textProgressTitle} size="4" weight="regular" />
              <_Builtin.Block
                className={_utils.cx(_styles, "req_progress")}
                tag="div"
              >
                {slotProgressBar}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "req-dash-list-wrap")}
              tag="div"
            >
              {slotRequestList ?? (
                <>
                  <ReqUrgent />
                  <RequestList />
                  <RequestList />
                  <RequestList />
                  <RequestList />
                  <ReqCompleted />
                  <NoPendingReq />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
