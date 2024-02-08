import React from "react";
import * as _Builtin from "./_Builtin";
import { SchedulerDashboard } from "./SchedulerDashboard";
import * as _utils from "./utils";
import _styles from "./SchedulerLayout.module.css";

export function SchedulerLayout({
  as: _Component = _Builtin.Block,
  slotTopbarLeft,
  slotTopbarRight,
  slotBody,
}) {
  return (
    <_Component className={_utils.cx(_styles, "scheduler_layout")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "scheduler_topbar")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "topbar_left")} tag="div">
          {slotTopbarLeft ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Scheduler"}
            </_Builtin.Block>
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "topbar_right")}
          tag="div"
        >
          {slotTopbarRight}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "scheduler_body")}
        tag="div"
      >
        {slotBody ?? (
          <>
            <SchedulerDashboard />
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_css")}
              value="%3Cstyle%3E%0A%20%20%5Bclass%20*%3D%22SchedulerLayout_scheduler_body__%22%5D%20%7B%0A%20%20%20%20height%3A%20calc(100vh%20-%2060px)%20!important%3B%0A%20%20%7D%0A%3C%2Fstyle%3E"
            />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
