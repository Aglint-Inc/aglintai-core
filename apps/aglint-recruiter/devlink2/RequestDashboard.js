"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { RequestList } from "./RequestList";
import { ReqCompleted } from "./ReqCompleted";
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
            <Text content={textGraphTitle} weight="regular" color="neutral" />
            <_Builtin.Block tag="div">{slotGraph}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "req-dash-top-bottom")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "req-dash-progress-wrap")}
              tag="div"
            >
              <Text content={textProgressTitle} size="4" />
              <_Builtin.Block tag="div">{slotProgressBar}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "req-dash-list-wrap")}
              tag="div"
            >
              {slotRequestList ?? <RequestList />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotReqCompleted ?? <ReqCompleted />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
