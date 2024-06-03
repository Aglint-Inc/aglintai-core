"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { JobWarningList } from "./JobWarningList";
import * as _utils from "./utils";
import _styles from "./JobEditWarning.module.css";

export function JobEditWarning({
  as: _Component = _Builtin.Block,
  slotWarningList,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "warnig-point-wrap-job")}
      tag="div"
    >
      {slotWarningList ?? <JobWarningList />}
    </_Component>
  );
}
