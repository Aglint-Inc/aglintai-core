"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./JobsDashboard.module.css";

export function JobsDashboard({
  as: _Component = _Builtin.Block,
  slotAllJobs,
  slotSearchInputJob,
  textJobsHeader = "All Jobs",
  onClickAddJob = {},
  slotFilters,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "job-dashboard-layout")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "job-dashboard-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-jobs-header-wrapper")}
          tag="div"
        >
          <Text content={textJobsHeader} weight="medium" />
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "slot-input-search-job",
              "mobile-hide"
            )}
            tag="div"
          >
            {slotSearchInputJob}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "job-dashboard-header",
          "bottom_border-copy"
        )}
        tag="div"
      >
        {slotFilters}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "all-job-list")} tag="div">
        {slotAllJobs ?? <SlotComp componentName="JobsListingCard" />}
      </_Builtin.Block>
    </_Component>
  );
}
