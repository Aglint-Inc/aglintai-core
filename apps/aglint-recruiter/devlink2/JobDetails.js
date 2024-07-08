"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Breadcrum } from "./Breadcrum";
import { RefreshButton } from "./RefreshButton";
import { ButtonSolid } from "./ButtonSolid";
import { SlotComp } from "./SlotComp";
import { ShowFilterButton } from "./ShowFilterButton";
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
        className={_utils.cx(_styles, "job-details-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "job-details-header-block")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "jdet-main")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_breadcrum")}
              tag="div"
            >
              {slotBreadcrumb ?? (
                <>
                  <Breadcrum textName="Published Jobs" isLink={true} />
                  <Breadcrum
                    textName="Senior Software Engineer"
                    showArrow={true}
                    isLink={true}
                  />
                  <Breadcrum
                    textName="Candidates"
                    showArrow={true}
                    isLink={false}
                  />
                </>
              )}
            </_Builtin.Block>
            {isFetchingPillVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "fetching-pill")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-410")}
                  tag="div"
                >
                  {slotLoadingLottie}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-sm", "text-kale-800")}
                  tag="div"
                >
                  {"Syncing Candidates"}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "jdet-main-action-menu")}
            tag="div"
          >
            {slotButtons ?? (
              <>
                <_Builtin.Block tag="div">
                  {slotRefresh ?? <RefreshButton />}
                </_Builtin.Block>
                {isImportCandidates ? (
                  <_Builtin.Block tag="div">
                    <ButtonSolid
                      onClickButton={onclickAddCandidates}
                      size="1"
                      iconName="account_circle"
                      isLeftIcon={true}
                      textButton="Add Candidates"
                      iconSize="3"
                    />
                  </_Builtin.Block>
                ) : null}
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
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
            <_Builtin.Block
              className={_utils.cx(_styles, "show_filter_button")}
              tag="div"
            >
              {slotShowFilterButton ?? <ShowFilterButton />}
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
