import React from "react";
import * as _Builtin from "./_Builtin";
import { JobsListingCard } from "./JobsListingCard";
import * as _utils from "./utils";
import _styles from "./JobsDashboard.module.css";

export function JobsDashboard({
  as: _Component = _Builtin.Block,
  onClickCreateNewJob = {},
  draftCount = "0",
  sourcingCount = "0",
  interviewingCount = "0",
  closedCount = "0",
  slotAllJobs,
  slotDraftJobs,
  slotSourcingJobs,
  slotInterviewingJobs,
  slotClosedJobs,
  slotSearchJobs,
  onClickAll = {},
  onClickDraft = {},
  onClickSourcing = {},
  onClickInterviewing = {},
  onClickClosed = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "rd-main-wrapper")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-271")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-jobs-header-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {"Jobs"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "rd-job-create-btn")}
            tag="div"
            {...onClickCreateNewJob}
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "vectors-wrapper-23")}
              loading="lazy"
              width={12}
              height={12}
              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/650318de9c321e2d4561e9ea_Vectors-Wrapper.svg"
            />
            <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
              {"Create New Job"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "rd-jobs-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-job-stats-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "rd-jobs-stat-block", "yellow-100")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "job-count-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "rd-stat-number", "zero")}
                tag="div"
              >
                {draftCount}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-yellow-800")}
              tag="div"
            >
              {"Jobs in Draft"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "rd-jobs-stat-block", "blue-100")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "job-count-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "rd-stat-number", "zero")}
                tag="div"
              >
                {sourcingCount}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "color-blue-800")}
              tag="div"
            >
              {"Sourcing"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "rd-jobs-stat-block", "kale-100")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "job-count-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "rd-stat-number", "zero")}
                tag="div"
              >
                {interviewingCount}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-kale-800")}
              tag="div"
            >
              {"Interviewing"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "rd-jobs-stat-block", "red-100")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "job-count-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "rd-stat-number", "zero")}
                tag="div"
              >
                {closedCount}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-red-800")}
              tag="div"
            >
              {"Closed"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-job-list-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "rd-search-filter")}
            tag="div"
          >
            {slotSearchJobs}
          </_Builtin.Block>
          <_Builtin.TabsWrapper
            className={_utils.cx(_styles, "rd-job-list-tab")}
            current="Tab 1"
            easing="ease"
            fadeIn={300}
            fadeOut={100}
          >
            <_Builtin.TabsMenu
              className={_utils.cx(_styles, "rd-job-list-tab-menu")}
              tag="div"
            >
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "rd-job-list-tab-link")}
                data-w-tab="Tab 1"
                {...onClickAll}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"All"}
                </_Builtin.Block>
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "rd-job-list-tab-link")}
                data-w-tab="Tab 2"
                {...onClickDraft}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Draft"}
                </_Builtin.Block>
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "rd-job-list-tab-link")}
                data-w-tab="Tab 3"
                {...onClickSourcing}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Sourcing"}
                </_Builtin.Block>
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "rd-job-list-tab-link")}
                data-w-tab="Tab 4"
                {...onClickInterviewing}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Interviewing"}
                </_Builtin.Block>
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "rd-job-list-tab-link")}
                data-w-tab="Tab 5"
                {...onClickClosed}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Closed"}
                </_Builtin.Block>
              </_Builtin.TabsLink>
            </_Builtin.TabsMenu>
            <_Builtin.TabsContent
              className={_utils.cx(_styles, "rd-job-list-tab-content")}
              tag="div"
            >
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "rd-job-list-tab-pane")}
                tag="div"
                data-w-tab="Tab 1"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "all-job-list")}
                  tag="div"
                >
                  {slotAllJobs ?? <JobsListingCard />}
                </_Builtin.Block>
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "rd-job-list-tab-pane")}
                tag="div"
                data-w-tab="Tab 2"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "all-job-list")}
                  tag="div"
                >
                  {slotDraftJobs}
                </_Builtin.Block>
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "rd-job-list-tab-pane")}
                tag="div"
                data-w-tab="Tab 3"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "all-job-list")}
                  tag="div"
                >
                  {slotSourcingJobs}
                </_Builtin.Block>
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "rd-job-list-tab-pane")}
                tag="div"
                data-w-tab="Tab 4"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "all-job-list")}
                  tag="div"
                >
                  {slotInterviewingJobs}
                </_Builtin.Block>
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "rd-job-list-tab-pane")}
                tag="div"
                data-w-tab="Tab 5"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "all-job-list")}
                  tag="div"
                >
                  {slotClosedJobs}
                </_Builtin.Block>
              </_Builtin.TabsPane>
            </_Builtin.TabsContent>
          </_Builtin.TabsWrapper>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A.all-job-list%7B%0Aheight%3A%20calc(100vh%20-%20350px)%3B%0A%20%20%20%20overflow%3A%20scroll%3B%0A%7D%0A%3C%2Fstyle%3E" />
    </_Component>
  );
}
