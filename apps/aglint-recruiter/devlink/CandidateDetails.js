"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./CandidateDetails.module.css";

export function CandidateDetails({
  as: _Component = _Builtin.Block,
  onClickScore = {},
  onClickEducation = {},
  onClickExperience = {},
  onClickSkills = {},
  slotInterviewScore,
  slotResumeScore,
  slotEducation,
  slotExperiences,
  slotSkills,
  isFullWidthVisible = false,
  isSmallWidthVisible = true,
}) {
  return (
    <_Component tag="div">
      {isSmallWidthVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cvs-info-content-main")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cd-slot-interview")}
            tag="div"
          >
            {slotInterviewScore ?? (
              <>
                <SlotComp componentName="CandidateInterviewScore" />
                <SlotComp componentName="CandidateResumeScore" />
                <SlotComp componentName="CandidateExperience" />
                <SlotComp componentName="CandidateEducation" />
                <SlotComp componentName="CandidateSkill" />
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isFullWidthVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-sidebar-info-wrapper", "width-600")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cvs-info-content-main")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cd-slot-interview")}
              tag="div"
            >
              {slotInterviewScore ?? (
                <>
                  <SlotComp componentName="CandidateInterviewScore" />
                  <SlotComp componentName="CandidateResumeScore" />
                  <SlotComp componentName="CandidateExperience" />
                  <SlotComp componentName="CandidateEducation" />
                  <SlotComp componentName="CandidateSkill" />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
