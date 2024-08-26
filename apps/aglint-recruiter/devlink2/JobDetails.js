"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import { SelectActionBar } from "./SelectActionBar";
import { JobDetailsFilterBlock } from "./JobDetailsFilterBlock";
import { ApplicantsTable } from "./ApplicantsTable";
import { SkeletonCandidateListItem } from "./SkeletonCandidateListItem";
import { CandidateListItem } from "./CandidateListItem";
import * as _utils from "./utils";
import _styles from "./JobDetails.module.css";

export function JobDetails({
  as: _Component = _Builtin.Block,
  slotTabs,
  slotFilters,
  onclickAddCandidates = {},
  slotTable,
  slotRefresh,
  isFetchingPillVisible = false,
  slotLoadingLottie,
  isImportCandidates = true,
  slotBreadcrumb,
  slotShowFilterButton,
  isFilterVisible = true,
  slotButtons,
  slotGlobalBanner,
}) {
  return (
    <_Component className={_utils.cx(_styles, "job-details-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "candidates-view-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "candidate_list_and_filter")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "jdet-tabs")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1713")}
              tag="div"
            >
              {slotTabs ?? <SlotComp componentName="Tabs Component" />}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "candidates-view-main")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-tab-content-wrapper")}
              tag="div"
            >
              {isFilterVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "jdet-actions-bar")}
                  tag="div"
                >
                  {slotFilters ?? (
                    <>
                      <SelectActionBar />
                      <JobDetailsFilterBlock
                        isAllApplicants={true}
                        isTopApplicants={false}
                      />
                    </>
                  )}
                </_Builtin.Block>
              ) : null}
              <_Builtin.Block
                className={_utils.cx(_styles, "jdet-table")}
                tag="div"
              >
                {slotTable ?? (
                  <>
                    <ApplicantsTable
                      isScreeningVisible={false}
                      isInterviewVisible={false}
                    />
                    <SkeletonCandidateListItem />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <CandidateListItem
                      isDisqualifiedVisible={false}
                      isInterviewVisible={false}
                      isScreeningVisible={false}
                    />
                    <SkeletonCandidateListItem />
                  </>
                )}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "slot_banner")} tag="div">
        {slotGlobalBanner}
      </_Builtin.Block>
    </_Component>
  );
}
