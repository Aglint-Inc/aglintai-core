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
import { AllApplicantsTable } from "./AllApplicantsTable";
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
              {slotBreadcrumb ?? <Breadcrum />}
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
            <_Builtin.Block tag="div">
              {slotRefresh ?? <RefreshButton />}
            </_Builtin.Block>
            {isImportCandidates ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "bu", "clickable")}
                tag="div"
                {...onclickAddCandidates}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "rounded-icon", "grey-100")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "icon-block", "_30x30")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "svg-icon")}
                      value="%3Csvg%20width%3D%2217%22%20height%3D%2214%22%20viewbox%3D%220%200%2017%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.96171%203.46409C3.96171%203.90159%204.07108%204.30544%204.28983%204.67563C4.50858%205.04582%204.80305%205.34029%205.17325%205.55904C5.56027%205.77779%205.96411%205.88717%206.38478%205.88717C6.80546%205.88717%207.2093%205.77779%207.59632%205.55904C7.96652%205.34029%208.26099%205.04582%208.47974%204.67563C8.69849%204.30544%208.80786%203.90159%208.80786%203.46409C8.80786%203.02659%208.69849%202.62275%208.47974%202.25255C8.26099%201.88236%207.96652%201.58789%207.59632%201.36914C7.2093%201.15039%206.80546%201.04102%206.38478%201.04102C5.96411%201.04102%205.56027%201.15039%205.17325%201.36914C4.80305%201.58789%204.50858%201.88236%204.28983%202.25255C4.07108%202.62275%203.96171%203.02659%203.96171%203.46409ZM7.54584%208.71409H5.22373C4.19728%208.74775%203.33911%209.10111%202.64921%209.77419C1.94248%2010.4641%201.57228%2011.3223%201.53863%2012.3487H11.2309C11.1973%2011.3223%2010.8271%2010.4641%2010.1204%209.77419C9.43046%209.10111%208.57228%208.74775%207.54584%208.71409ZM6.38478%206.69486C5.79584%206.69486%205.25738%206.55183%204.7694%206.26577C4.28142%205.97972%203.88599%205.58428%203.5831%205.07948C3.29704%204.57467%203.15402%204.03621%203.15402%203.46409C3.15402%202.89198%203.29704%202.35352%203.5831%201.84871C3.88599%201.3439%204.28142%200.948467%204.7694%200.662409C5.25738%200.376352%205.79584%200.233323%206.38478%200.233323C6.97373%200.233323%207.51219%200.376352%208.00017%200.662409C8.48815%200.948467%208.88358%201.3439%209.18647%201.84871C9.47252%202.35352%209.61555%202.89198%209.61555%203.46409C9.61555%204.03621%209.47252%204.57467%209.18647%205.07948C8.88358%205.58428%208.48815%205.97972%208.00017%206.26577C7.51219%206.55183%206.97373%206.69486%206.38478%206.69486ZM5.22373%207.9064H7.54584C8.80786%207.94005%209.86796%208.37755%2010.7261%209.2189C11.5675%2010.0771%2012.005%2011.1372%2012.0386%2012.3992C12.0386%2012.6179%2011.9629%2012.7946%2011.8115%2012.9292C11.6769%2013.0807%2011.5002%2013.1564%2011.2814%2013.1564H1.48815C1.2694%2013.1564%201.09272%2013.0807%200.958101%2012.9292C0.806659%2012.7946%200.730938%2012.6179%200.730938%2012.3992C0.764592%2011.1372%201.20209%2010.0771%202.04344%209.2189C2.90161%208.37755%203.96171%207.94005%205.22373%207.9064ZM13.654%207.9064V5.88717H11.6348C11.3824%205.87034%2011.2478%205.73573%2011.2309%205.48332C11.2478%205.23092%2011.3824%205.0963%2011.6348%205.07948H13.654V3.06025C13.6708%202.80784%2013.8055%202.67323%2014.0579%202.6564C14.3103%202.67323%2014.4449%202.80784%2014.4617%203.06025V5.07948H16.4809C16.7333%205.0963%2016.868%205.23092%2016.8848%205.48332C16.868%205.73573%2016.7333%205.87034%2016.4809%205.88717H14.4617V7.9064C14.4449%208.1588%2014.3103%208.29342%2014.0579%208.31025C13.8055%208.29342%2013.6708%208.1588%2013.654%207.9064Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Add Candidates"}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "bu", "clickable")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "rounded-icon", "grey-100")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "icon-block", "_30x30")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "svg-icon")}
                    value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.8314%204.36719C14.6632%204.21574%2014.4697%204.14002%2014.2509%204.14002C14.0322%204.14002%2013.8386%204.21574%2013.6704%204.36719L13.0141%205.04868L14.4528%206.48738L15.1343%205.83113C15.2858%205.66286%2015.3615%205.46935%2015.3615%205.2506C15.3615%205.03185%2015.2858%204.83834%2015.1343%204.67007L14.8314%204.36719ZM8.11749%209.94531C8.01653%2010.0463%207.94922%2010.1725%207.91556%2010.3239L7.51172%2011.9898L9.17758%2011.6112C9.32903%2011.5607%209.45523%2011.485%209.55619%2011.384L13.8723%207.06791L12.4336%205.62921L8.11749%209.94531ZM13.1151%203.8119C13.4516%203.49219%2013.8302%203.33233%2014.2509%203.33233C14.6884%203.33233%2015.067%203.49219%2015.3867%203.8119L15.6896%204.11478C16.0093%204.45132%2016.1692%204.82993%2016.1692%205.2506C16.1692%205.6881%2016.0093%206.06671%2015.6896%206.38642L10.1367%2011.9645C9.91797%2012.1833%209.65715%2012.3263%209.35427%2012.3936L7.08263%2012.9237C6.93119%2012.9405%206.80499%2012.8984%206.70403%2012.7975C6.60306%2012.6965%206.561%2012.5787%206.57782%2012.4441L7.10787%2010.1472C7.17518%209.84435%207.31821%209.58353%207.53696%209.36478L13.1151%203.8119ZM5.36629%204.84675H8.59706C8.84946%204.86358%208.98407%204.9982%209.0009%205.2506C8.98407%205.503%208.84946%205.63762%208.59706%205.65445H5.36629C5.02975%205.67127%204.74369%205.78906%204.50811%206.00781C4.28936%206.24339%204.17157%206.52945%204.15475%206.86599V14.1352C4.17157%2014.4718%204.28936%2014.7578%204.50811%2014.9934C4.74369%2015.2121%205.02975%2015.3299%205.36629%2015.3468H12.6355C12.9721%2015.3299%2013.2581%2015.2121%2013.4937%2014.9934C13.7124%2014.7578%2013.8302%2014.4718%2013.8471%2014.1352V10.9044C13.8639%2010.652%2013.9985%2010.5174%2014.2509%2010.5006C14.5033%2010.5174%2014.6379%2010.652%2014.6547%2010.9044V14.1352C14.6379%2014.7073%2014.4444%2015.1869%2014.0742%2015.5739C13.6872%2015.9441%2013.2076%2016.1376%2012.6355%2016.1544H5.36629C4.79417%2016.1376%204.3146%2015.9441%203.92758%2015.5739C3.55739%2015.1869%203.36388%2014.7073%203.34705%2014.1352V6.86599C3.36388%206.29387%203.55739%205.8143%203.92758%205.42728C4.3146%205.05709%204.79417%204.86358%205.36629%204.84675Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Edit Job"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidates-view-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-426")}
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
                    <ApplicantsTable />
                    <AllApplicantsTable />
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
