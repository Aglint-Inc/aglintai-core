"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ApplicantInfoBox } from "./ApplicantInfoBox";
import { InterviewPlanApplication } from "./InterviewPlanApplication";
import * as _utils from "./utils";
import _styles from "./ApplicationDetail.module.css";

export function ApplicationDetail({
  as: _Component = _Builtin.Block,
  slotApplicantInfoBox,
  slotTab,
  slotTabBody,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "app-detail-comp-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "app-detail-header-wrap")}
        tag="div"
      >
        {slotApplicantInfoBox ?? <ApplicantInfoBox />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "ta-aap-detail-wrap")}
        tag="div"
      >
        {slotTab}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "applcant-detail-body-scroll")}
        tag="div"
      >
        {slotTabBody ?? <InterviewPlanApplication />}
      </_Builtin.Block>
    </_Component>
  );
}
