"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Breadcrum } from "./Breadcrum";
import { RefreshButton } from "./RefreshButton";
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
                  <_Builtin.Block
                    className={_utils.cx(_styles, "radix-button")}
                    tag="div"
                    button-color-ghost="accent"
                    button-high-contrast-ghost="false"
                    button-size-ghost="1"
                    {...onclickAddCandidates}
                  >
                    <_Builtin.Block tag="div">
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon_placeholder")}
                        value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0.935547%207.9999C0.935547%204.09837%204.09837%200.935547%207.99991%200.935547C11.9014%200.935547%2015.0643%204.09837%2015.0643%207.9999C15.0643%2011.9014%2011.9014%2015.0642%207.99991%2015.0642C4.09837%2015.0642%200.935547%2011.9014%200.935547%207.9999ZM7.99991%201.94887C4.65802%201.94887%201.94888%204.65802%201.94888%207.9999C1.94888%209.57012%202.54699%2011.0007%203.52782%2012.0761C4.47019%2010.604%206.12079%209.62669%208.00031%209.62669C9.8796%209.62669%2011.53%2010.6037%2012.4725%2012.0756C13.453%2011.0002%2014.0509%209.56987%2014.0509%207.9999C14.0509%204.65802%2011.3417%201.94887%207.99991%201.94887ZM11.714%2012.7773C10.9696%2011.4982%209.58481%2010.64%208.00031%2010.64C6.41562%2010.64%205.03072%2011.4984%204.28641%2012.7777C5.31155%2013.5757%206.60023%2014.0509%207.99991%2014.0509C9.39982%2014.0509%2010.6887%2013.5755%2011.714%2012.7773ZM5.49339%206.93856C5.49339%205.55416%206.61566%204.43189%208.00005%204.43189C9.38445%204.43189%2010.5067%205.55416%2010.5067%206.93856C10.5067%208.32295%209.38445%209.44523%208.00005%209.44523C6.61566%209.44523%205.49339%208.32295%205.49339%206.93856ZM8.00005%205.44523C7.17531%205.44523%206.50672%206.11381%206.50672%206.93856C6.50672%207.76331%207.17531%208.43189%208.00005%208.43189C8.8248%208.43189%209.49339%207.76331%209.49339%206.93856C9.49339%206.11381%208.8248%205.44523%208.00005%205.44523Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block tag="div">
                      {"Add Candidates"}
                    </_Builtin.Block>
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
    </_Component>
  );
}
