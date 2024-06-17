"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./JobEmptyState.module.css";

export function JobEmptyState({
  as: _Component = _Builtin.Block,
  onClickHere = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "no-jobs-to-show")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "no-job-wrappers")}
        tag="div"
      >
        <GlobalIcon iconName="business_center" size="9" weight="thin" />
        <Text content="No jobs found." weight="" color="neutral-12" />
      </_Builtin.Block>
    </_Component>
  );
}
