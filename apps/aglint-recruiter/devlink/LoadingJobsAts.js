"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./LoadingJobsAts.module.css";

export function LoadingJobsAts({
  as: _Component = _Builtin.Block,
  slotLottie,
  textJobCount = "5 jobs",
  textAtsCompany = "lever...",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "loading-jobs-ats-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "loading-modal-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-lottie-loading")}
          tag="div"
        >
          {slotLottie}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "loading-job-text-wrap")}
          tag="div"
        >
          <Text content="Importing" weight="bold" />
          <Text content={textJobCount} weight="bold" />
          <Text content="from" weight="bold" />
          <Text content={textAtsCompany} weight="bold" />
        </_Builtin.Block>
        <Text content="This may take a while." color="neutral" />
      </_Builtin.Block>
    </_Component>
  );
}
