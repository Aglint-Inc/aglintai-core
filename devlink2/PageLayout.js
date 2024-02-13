import React from "react";

import _styles from "./PageLayout.module.css";

import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";

export function PageLayout({
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
        className={_utils.cx(_styles, "slot-body-global")}
        tag="div"
      >
        {slotBody}
      </_Builtin.Block>
    </_Component>
  );
}
