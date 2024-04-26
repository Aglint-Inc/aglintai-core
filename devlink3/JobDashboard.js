"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { JobsBanner } from "./JobsBanner";
import { PipeLine } from "./PipeLine";
import { ScheduleCardSmall } from "./ScheduleCardSmall";
import { GraphBlock } from "./GraphBlock";
import { CardWithNumber } from "./CardWithNumber";
import { ModuleCard } from "./ModuleCard";
import * as _utils from "./utils";
import _styles from "./JobDashboard.module.css";

export function JobDashboard({
  as: _Component = _Builtin.Block,
  textTopMatchPercentage = "27%",
  textGoodMatchPercentage = "27%",
  textAverageMatchPercentage = "27%",
  textBelowAveragePercentage = "27%",
  textNotAMatchPercentage = "27%",
  textTopMatchCount = "11 Candidates",
  textGoodMatchCount = "11 Candidates",
  textAveageMatchCount = "11 Candidates",
  textBelowAverageCount = "11 Candidates",
  textNotAMatchCount = "11 Candidates",
  slotPipeline,
  slotModuleCard,
  onClickAssistant = {},
  textCandidateCount = "125",
  slotScheduleCardSmall,
  slotLocationGraphBlock,
  slotSkillGraphBlock,
  slotExperienceGraph,
  slotCardWithNumber,
  isBanner = true,
  slotBanner,
  onClickViewSchedule = {},
  isViewScheduleVisible = true,
  onClickImport = {},
  isImport = true,
  onClickCandidateList = {},
  textScoreCount = "(321/820)",
  isScoring = false,
  slotScoringLoader,
  onClickTopMatch = {},
  onClickGoodMatch = {},
  onClickAverageMatch = {},
  onClickBelowAverage = {},
  onClickNotaMatch = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "jobdashboard")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "jobdadhboard_left", "hide-scrollbar")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "jd_titleblock")}
          tag="div"
        >
          {isBanner ? (
            <_Builtin.Block tag="div">
              {slotBanner ?? <JobsBanner />}
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "score_settings_top")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "job_candidate_count")}
              tag="div"
              {...onClickCandidateList}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {textCandidateCount}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-600")}
                tag="div"
              >
                {"Total Applicants"}
              </_Builtin.Block>
              {isScoring ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "score_settings", "pop")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "loader_button")}
                    tag="div"
                  >
                    {slotScoringLoader ?? (
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "embed_flex")}
                        value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13%205V7C13%207.29167%2012.9062%207.53125%2012.7188%207.71875C12.5312%207.90625%2012.2917%208%2012%208C11.7083%208%2011.4688%207.90625%2011.2812%207.71875C11.0938%207.53125%2011%207.29167%2011%207V5C11%204.70833%2011.0938%204.46875%2011.2812%204.28125C11.4688%204.09375%2011.7083%204%2012%204C12.2917%204%2012.5312%204.09375%2012.7188%204.28125C12.9062%204.46875%2013%204.70833%2013%205ZM13%2017V19C13%2019.2917%2012.9062%2019.5312%2012.7188%2019.7188C12.5312%2019.9062%2012.2917%2020%2012%2020C11.7083%2020%2011.4688%2019.9062%2011.2812%2019.7188C11.0938%2019.5312%2011%2019.2917%2011%2019V17C11%2016.7083%2011.0938%2016.4688%2011.2812%2016.2812C11.4688%2016.0938%2011.7083%2016%2012%2016C12.2917%2016%2012.5312%2016.0938%2012.7188%2016.2812C12.9062%2016.4688%2013%2016.7083%2013%2017ZM4%2012C4%2011.7083%204.09375%2011.4688%204.28125%2011.2812C4.46875%2011.0938%204.70833%2011%205%2011H7C7.29167%2011%207.53125%2011.0938%207.71875%2011.2812C7.90625%2011.4688%208%2011.7083%208%2012C8%2012.2917%207.90625%2012.5312%207.71875%2012.7188C7.53125%2012.9062%207.29167%2013%207%2013H5C4.70833%2013%204.46875%2012.9062%204.28125%2012.7188C4.09375%2012.5312%204%2012.2917%204%2012ZM17%2011H19C19.2917%2011%2019.5312%2011.0938%2019.7188%2011.2812C19.9062%2011.4688%2020%2011.7083%2020%2012C20%2012.2917%2019.9062%2012.5312%2019.7188%2012.7188C19.5312%2012.9062%2019.2917%2013%2019%2013H17C16.7083%2013%2016.4688%2012.9062%2016.2812%2012.7188C16.0938%2012.5312%2016%2012.2917%2016%2012C16%2011.7083%2016.0938%2011.4688%2016.2812%2011.2812C16.4688%2011.0938%2016.7083%2011%2017%2011ZM6.34375%206.34375C6.55208%206.15625%206.79167%206.0625%207.0625%206.0625C7.3125%206.0625%207.54167%206.15625%207.75%206.34375L9.1875%207.75C9.375%207.95833%209.46875%208.19792%209.46875%208.46875C9.46875%208.73958%209.375%208.97917%209.1875%209.1875C8.97917%209.375%208.73958%209.46875%208.46875%209.46875C8.19792%209.46875%207.95833%209.375%207.75%209.1875L6.34375%207.75C6.15625%207.54167%206.0625%207.3125%206.0625%207.0625C6.0625%206.79167%206.15625%206.55208%206.34375%206.34375ZM16.25%2014.8438V14.8125L17.6562%2016.25C17.8438%2016.4583%2017.9375%2016.6875%2017.9375%2016.9375C17.9375%2017.2083%2017.8438%2017.4479%2017.6562%2017.6562C17.4479%2017.8438%2017.2083%2017.9375%2016.9375%2017.9375C16.6875%2017.9375%2016.4583%2017.8438%2016.25%2017.6562L14.8438%2016.25C14.6354%2016.0417%2014.5312%2015.8021%2014.5312%2015.5312C14.5312%2015.2604%2014.6354%2015.0312%2014.8438%2014.8438C15.0312%2014.6354%2015.2604%2014.5312%2015.5312%2014.5312C15.8021%2014.5312%2016.0417%2014.6354%2016.25%2014.8438ZM6.34375%2017.6562C6.15625%2017.4479%206.0625%2017.2083%206.0625%2016.9375C6.0625%2016.6875%206.15625%2016.4583%206.34375%2016.25L7.75%2014.8125C7.95833%2014.625%208.19792%2014.5312%208.46875%2014.5312C8.73958%2014.5312%208.97917%2014.625%209.1875%2014.8125C9.375%2015.0208%209.46875%2015.2604%209.46875%2015.5312C9.46875%2015.8021%209.375%2016.0417%209.1875%2016.25L7.75%2017.6562C7.54167%2017.8438%207.3125%2017.9375%207.0625%2017.9375C6.79167%2017.9375%206.55208%2017.8438%206.34375%2017.6562ZM14.8438%207.75H14.8125L16.25%206.34375C16.4583%206.15625%2016.6875%206.0625%2016.9375%206.0625C17.2083%206.0625%2017.4479%206.15625%2017.6562%206.34375C17.8438%206.55208%2017.9375%206.79167%2017.9375%207.0625C17.9375%207.3125%2017.8438%207.54167%2017.6562%207.75L16.25%209.1875C16.0417%209.375%2015.8021%209.46875%2015.5312%209.46875C15.2604%209.46875%2015.0312%209.375%2014.8438%209.1875C14.6354%208.97917%2014.5312%208.73958%2014.5312%208.46875C14.5312%208.19792%2014.6354%207.95833%2014.8438%207.75Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    )}
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">
                    {"Scoring candidates"}
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">{textScoreCount}</_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "score_settings")}
              tag="div"
              {...onClickImport}
            >
              {isImport ? (
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
                        value="%3Csvg%20width%3D%2217%22%20height%3D%2214%22%20viewBox%3D%220%200%2017%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.96171%203.46409C3.96171%203.90159%204.07108%204.30544%204.28983%204.67563C4.50858%205.04582%204.80305%205.34029%205.17325%205.55904C5.56027%205.77779%205.96411%205.88717%206.38478%205.88717C6.80546%205.88717%207.2093%205.77779%207.59632%205.55904C7.96652%205.34029%208.26099%205.04582%208.47974%204.67563C8.69849%204.30544%208.80786%203.90159%208.80786%203.46409C8.80786%203.02659%208.69849%202.62275%208.47974%202.25255C8.26099%201.88236%207.96652%201.58789%207.59632%201.36914C7.2093%201.15039%206.80546%201.04102%206.38478%201.04102C5.96411%201.04102%205.56027%201.15039%205.17325%201.36914C4.80305%201.58789%204.50858%201.88236%204.28983%202.25255C4.07108%202.62275%203.96171%203.02659%203.96171%203.46409ZM7.54584%208.71409H5.22373C4.19728%208.74775%203.33911%209.10111%202.64921%209.77419C1.94248%2010.4641%201.57228%2011.3223%201.53863%2012.3487H11.2309C11.1973%2011.3223%2010.8271%2010.4641%2010.1204%209.77419C9.43046%209.10111%208.57228%208.74775%207.54584%208.71409ZM6.38478%206.69486C5.79584%206.69486%205.25738%206.55183%204.7694%206.26577C4.28142%205.97972%203.88599%205.58428%203.5831%205.07948C3.29704%204.57467%203.15402%204.03621%203.15402%203.46409C3.15402%202.89198%203.29704%202.35352%203.5831%201.84871C3.88599%201.3439%204.28142%200.948467%204.7694%200.662409C5.25738%200.376352%205.79584%200.233323%206.38478%200.233323C6.97373%200.233323%207.51219%200.376352%208.00017%200.662409C8.48815%200.948467%208.88358%201.3439%209.18647%201.84871C9.47252%202.35352%209.61555%202.89198%209.61555%203.46409C9.61555%204.03621%209.47252%204.57467%209.18647%205.07948C8.88358%205.58428%208.48815%205.97972%208.00017%206.26577C7.51219%206.55183%206.97373%206.69486%206.38478%206.69486ZM5.22373%207.9064H7.54584C8.80786%207.94005%209.86796%208.37755%2010.7261%209.2189C11.5675%2010.0771%2012.005%2011.1372%2012.0386%2012.3992C12.0386%2012.6179%2011.9629%2012.7946%2011.8115%2012.9292C11.6769%2013.0807%2011.5002%2013.1564%2011.2814%2013.1564H1.48815C1.2694%2013.1564%201.09272%2013.0807%200.958101%2012.9292C0.806659%2012.7946%200.730938%2012.6179%200.730938%2012.3992C0.764592%2011.1372%201.20209%2010.0771%202.04344%209.2189C2.90161%208.37755%203.96171%207.94005%205.22373%207.9064ZM13.654%207.9064V5.88717H11.6348C11.3824%205.87034%2011.2478%205.73573%2011.2309%205.48332C11.2478%205.23092%2011.3824%205.0963%2011.6348%205.07948H13.654V3.06025C13.6708%202.80784%2013.8055%202.67323%2014.0579%202.6564C14.3103%202.67323%2014.4449%202.80784%2014.4617%203.06025V5.07948H16.4809C16.7333%205.0963%2016.868%205.23092%2016.8848%205.48332C16.868%205.73573%2016.7333%205.87034%2016.4809%205.88717H14.4617V7.9064C14.4449%208.1588%2014.3103%208.29342%2014.0579%208.31025C13.8055%208.29342%2013.6708%208.1588%2013.654%207.9064Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold")}
                    tag="div"
                  >
                    {"Import Candidates"}
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "jd_stats_block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "jd_stat")}
            id={_utils.cx(
              _styles,
              "w-node-_7e6f5c12-f288-2e98-8a50-7d5c06b69091-06b69083"
            )}
            tag="div"
            {...onClickTopMatch}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-purple")}
              tag="div"
            >
              {"Top Match"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xl", "fw-semibold")}
              tag="div"
            >
              {textTopMatchPercentage}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "candidate_flex")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-600")}
                tag="div"
              >
                {textTopMatchCount}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "jd_stat")}
            tag="div"
            {...onClickGoodMatch}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-green")}
              tag="div"
            >
              {"Good Match"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xl", "fw-semibold")}
              tag="div"
            >
              {textGoodMatchPercentage}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "candidate_flex")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-600")}
                tag="div"
              >
                {textGoodMatchCount}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "jd_stat")}
            tag="div"
            {...onClickAverageMatch}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-yellow")}
              tag="div"
            >
              {"Average Match"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xl", "fw-semibold")}
              tag="div"
            >
              {textAverageMatchPercentage}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "candidate_flex")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-600")}
                tag="div"
              >
                {textAveageMatchCount}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "jd_stat")}
            tag="div"
            {...onClickBelowAverage}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-orange")}
              tag="div"
            >
              {"Below Average"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xl", "fw-semibold")}
              tag="div"
            >
              {textBelowAveragePercentage}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "candidate_flex")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-600")}
                tag="div"
              >
                {textBelowAverageCount}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "jd_stat")}
            tag="div"
            {...onClickNotaMatch}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-red")}
              tag="div"
            >
              {"Not a match"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xl", "fw-semibold")}
              tag="div"
            >
              {textNotAMatchPercentage}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "candidate_flex")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-600")}
                tag="div"
              >
                {textNotAMatchCount}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "jd_pipeline_pillls")}
          tag="div"
        >
          {slotPipeline ?? (
            <>
              <PipeLine isLeft={false} />
              <PipeLine isLeft={true} isRight={true} />
              <PipeLine isLeft={true} isRight={true} />
              <PipeLine isLeft={true} isRight={true} />
              <PipeLine isLeft={true} isRight={false} />
            </>
          )}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "jd_graph")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "graph_wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1606")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Upcoming Schedules"}
              </_Builtin.Block>
              {isViewScheduleVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-gray-600", "is_link")}
                  tag="div"
                  {...onClickViewSchedule}
                >
                  {"View all"}
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_schedulecards")}
              tag="div"
            >
              {slotScheduleCardSmall ?? (
                <>
                  <ScheduleCardSmall />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "schedulecardsmall")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "card_date")}
                      id={_utils.cx(
                        _styles,
                        "w-node-b4b01c05-acf7-c8a1-f084-f563d54c5fb1-06b69083"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-sm")}
                        tag="div"
                      >
                        {"March"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "big_date")}
                        tag="div"
                      >
                        {"02"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "text-sm",
                          "text-capitalize"
                        )}
                        tag="div"
                      >
                        {"Monday"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "schedule_info")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "fw-semibold")}
                        tag="div"
                      >
                        {"Personality and Culture"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "timer_flex")}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          {"09:00 AM to 09:30 AM"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "meeting_type")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "embed_flex")}
                            value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_4066_197815)%22%3E%0A%3Cpath%20d%3D%22M20%2010C20%2011.06%2019.92%2012.12%2019.74%2013.14C19.2%2016.52%2016.52%2019.2%2013.14%2019.74C12.12%2019.92%2011.06%2020%2010%2020C8.94%2020%207.88%2019.92%206.86%2019.74C3.48%2019.2%200.8%2016.52%200.26%2013.14C0.08%2012.12%200%2011.06%200%2010C0%208.94%200.08%207.88%200.26%206.86C0.8%203.48%203.48%200.8%206.86%200.26C7.88%200.08%208.94%200%2010%200C11.06%200%2012.12%200.08%2013.14%200.26C16.52%200.8%2019.2%203.48%2019.74%206.86C19.92%207.88%2020%208.94%2020%2010Z%22%20fill%3D%22url(%23paint0_linear_4066_197815)%22%2F%3E%0A%3Cpath%20d%3D%22M15.9405%2016.2402H5.86055C5.20055%2016.2402%204.56055%2015.8802%204.26055%2015.3002C3.90055%2014.6202%204.04055%2013.8002%204.58055%2013.2602L11.6005%206.24023H6.56055C5.18055%206.24023%204.06055%205.12023%204.06055%203.74023H13.3405C14.0005%203.74023%2014.6405%204.10023%2014.9405%204.68023C15.3005%205.36023%2015.1605%206.18023%2014.6205%206.72023L7.62055%2013.7602H13.4405C14.8205%2013.7602%2015.9405%2014.8602%2015.9405%2016.2402Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_4066_197815%22%20x1%3D%22473.32%22%20y1%3D%221912.24%22%20x2%3D%221526.68%22%20y2%3D%2287.76%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%230845BF%22%2F%3E%0A%3Cstop%20offset%3D%220.1911%22%20stop-color%3D%22%230950DE%22%2F%3E%0A%3Cstop%20offset%3D%220.3823%22%20stop-color%3D%22%230B59F6%22%2F%3E%0A%3Cstop%20offset%3D%220.5%22%20stop-color%3D%22%230B5CFF%22%2F%3E%0A%3Cstop%20offset%3D%220.6732%22%20stop-color%3D%22%230E5EFE%22%2F%3E%0A%3Cstop%20offset%3D%220.7774%22%20stop-color%3D%22%231665FC%22%2F%3E%0A%3Cstop%20offset%3D%220.8633%22%20stop-color%3D%22%23246FF9%22%2F%3E%0A%3Cstop%20offset%3D%220.9388%22%20stop-color%3D%22%23387FF4%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%234F90EE%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3CclipPath%20id%3D%22clip0_4066_197815%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22white%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                          />
                          <_Builtin.Block tag="div">{"Zoom"}</_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "timer_flex")}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          {"Candidate :"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "meeting_type")}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "avatar_sample")}
                            loading="lazy"
                            width="auto"
                            height="auto"
                            alt=""
                            src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d8b0e9a0e9f0451bc3536c_user2.png"
                          />
                          <_Builtin.Block tag="div">
                            {"Alejandro Garnecho"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "schedulecardsmall")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "card_date")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-sm")}
                        tag="div"
                      >
                        {"March"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "big_date")}
                        tag="div"
                      >
                        {"11"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "text-sm",
                          "text-capitalize"
                        )}
                        tag="div"
                      >
                        {"Friday"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "schedule_info")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "fw-semibold")}
                        tag="div"
                      >
                        {"C++ Coading"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "timer_flex")}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          {"09:00 AM to 09:30 AM"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "meeting_type")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "embed_flex")}
                            value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.8125%209.44531L14.4375%2010.5703C14.6406%2010.6641%2014.7969%2010.8125%2014.9062%2011.0156C15%2011.2031%2015.0234%2011.4062%2014.9766%2011.625L14.4141%2014.25C14.2891%2014.7188%2013.9844%2014.9688%2013.5%2015C13.3594%2015%2013.2188%2015%2013.0781%2015C12.9688%2014.9844%2012.8594%2014.9766%2012.75%2014.9766C10.9219%2014.8203%209.27344%2014.2656%207.80469%2013.3125C6.33594%2012.3594%205.17188%2011.1172%204.3125%209.58594C3.45312%208.07031%203.01562%206.375%203%204.5C3.03125%204.01562%203.28125%203.71094%203.75%203.58594L6.375%203.02344C6.59375%202.97656%206.79688%203.00781%206.98438%203.11719C7.1875%203.21094%207.33594%203.35937%207.42969%203.5625L8.55469%206.1875C8.71094%206.60938%208.61719%206.97656%208.27344%207.28906L7.33594%208.0625C7.97656%209.15625%208.84375%2010.0234%209.9375%2010.6641L10.7109%209.72656C11.0234%209.38281%2011.3906%209.28906%2011.8125%209.44531ZM13.5%2014.25C13.5938%2014.25%2013.6562%2014.2031%2013.6875%2014.1094L14.25%2011.4844C14.2656%2011.375%2014.2266%2011.3047%2014.1328%2011.2734L11.5078%2010.1484C11.4297%2010.1172%2011.3594%2010.1328%2011.2969%2010.1953L10.5234%2011.1562C10.2422%2011.4375%209.92188%2011.4922%209.5625%2011.3203C8.34375%2010.6172%207.38281%209.65625%206.67969%208.4375C6.50781%208.07812%206.5625%207.75781%206.84375%207.47656L7.80469%206.70312C7.86719%206.64062%207.88281%206.57031%207.85156%206.49219L6.72656%203.86719C6.67969%203.77344%206.60938%203.73437%206.51562%203.75L3.89062%204.3125C3.79688%204.34375%203.75%204.40625%203.75%204.5C3.76562%206.3125%204.21094%207.95312%205.08594%209.42188C5.94531%2010.8906%207.10938%2012.0547%208.57812%2012.9141C10.0469%2013.7891%2011.6875%2014.2344%2013.5%2014.25Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                          <_Builtin.Block tag="div">
                            {"Phone Call"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "timer_flex")}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          {"Candidate :"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "meeting_type")}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "avatar_sample")}
                            loading="lazy"
                            width="auto"
                            height="auto"
                            alt=""
                            src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d6e2cb5b27ca42119ddbb3_you.jpg"
                          />
                          <_Builtin.Block tag="div">
                            {"Timoty Ricks"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "graph_wrapper-copy-copy")}
            tag="div"
          >
            {slotLocationGraphBlock ?? <GraphBlock />}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "jd_graph_skills")}
          tag="div"
        >
          {slotSkillGraphBlock ?? (
            <GraphBlock dummyImage="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65e80bbf1bd6c485187c4a79_Chart.svg" />
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-753")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "jd_graph_skills")}
            tag="div"
          >
            {slotExperienceGraph ?? (
              <GraphBlock
                dummyImage="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65f0312480e94d0722e57320_Chart.svg"
                textGraphTitle="Experience Metrics"
              />
            )}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "crads_with_number")}
            id={_utils.cx(
              _styles,
              "w-node-_2e52e577-9ad7-d035-77fb-4341b0366642-06b69083"
            )}
            tag="div"
          >
            {slotCardWithNumber ?? (
              <>
                <CardWithNumber />
                <CardWithNumber
                  textTitle={
                    <>
                      {"Average Tenure"}
                      <br />
                    </>
                  }
                  textNumber="6.1"
                  textDescription={
                    <>
                      {"Average time before switching companies."}
                      <br />
                    </>
                  }
                  isEmpty={false}
                />
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_css_block")}
          id={_utils.cx(
            _styles,
            "w-node-_4e73c7f1-714f-6276-03b3-5a9eff08013a-06b69083"
          )}
          value="%3Cstyle%3E%0A.jobdadhboard_left%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A.hide-scrollbar%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%3C%2Fstyle%3E"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "jobdadhboard_right")}
        id={_utils.cx(
          _styles,
          "w-node-_7e6f5c12-f288-2e98-8a50-7d5c06b690d3-06b69083"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "jd_aglint_toggle")}
          tag="div"
          {...onClickAssistant}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2240%22%20height%3D%2240%22%20rx%3D%228%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M27.9063%2020.0062C25.2125%2019.3312%2023.8625%2019%2022.9313%2018.0687C22%2017.1312%2021.6688%2015.7875%2020.9938%2013.0938L20%209.125L19.0062%2013.0938C18.3312%2015.7875%2018%2017.1375%2017.0687%2018.0687C16.1312%2019%2014.7875%2019.3312%2012.0938%2020.0062L8.125%2021L12.0938%2021.9938C14.7875%2022.6688%2016.1375%2023%2017.0687%2023.9313C18%2024.8688%2018.3312%2026.2125%2019.0062%2028.9063L20%2032.875L20.9938%2028.9063C21.6688%2026.2125%2022%2024.8625%2022.9313%2023.9313C23.8688%2023%2025.2125%2022.6688%2027.9063%2021.9938L31.875%2021L27.9063%2020.0062Z%22%20fill%3D%22%233353E2%22%2F%3E%0A%3Cpath%20d%3D%22M27.9063%2020.0062C25.2125%2019.3312%2023.8625%2019%2022.9313%2018.0687C22%2017.1312%2021.6688%2015.7875%2020.9938%2013.0938L20%209.125L19.0062%2013.0938C18.3312%2015.7875%2018%2017.1375%2017.0687%2018.0687C16.1312%2019%2014.7875%2019.3312%2012.0938%2020.0062L8.125%2021L12.0938%2021.9938C14.7875%2022.6688%2016.1375%2023%2017.0687%2023.9313C18%2024.8688%2018.3312%2026.2125%2019.0062%2028.9063L20%2032.875L20.9938%2028.9063C21.6688%2026.2125%2022%2024.8625%2022.9313%2023.9313C23.8688%2023%2025.2125%2022.6688%2027.9063%2021.9938L31.875%2021L27.9063%2020.0062Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3Cpath%20d%3D%22M29.6367%209.66615C28.7388%209.44115%2028.2888%209.33073%2027.9784%209.02031C27.668%208.70781%2027.5576%208.2599%2027.3326%207.36198L27.0013%206.03906L26.6701%207.36198C26.4451%208.2599%2026.3346%208.7099%2026.0242%209.02031C25.7117%209.33073%2025.2638%209.44115%2024.3659%209.66615L23.043%209.9974L24.3659%2010.3286C25.2638%2010.5536%2025.7138%2010.6641%2026.0242%2010.9745C26.3346%2011.287%2026.4451%2011.7349%2026.6701%2012.6328L27.0013%2013.9557L27.3326%2012.6328C27.5576%2011.7349%2027.668%2011.2849%2027.9784%2010.9745C28.2909%2010.6641%2028.7388%2010.5536%2029.6367%2010.3286L30.9596%209.9974L29.6367%209.66615Z%22%20fill%3D%22%233353E2%22%2F%3E%0A%3Cpath%20d%3D%22M29.6367%209.66615C28.7388%209.44115%2028.2888%209.33073%2027.9784%209.02031C27.668%208.70781%2027.5576%208.2599%2027.3326%207.36198L27.0013%206.03906L26.6701%207.36198C26.4451%208.2599%2026.3346%208.7099%2026.0242%209.02031C25.7117%209.33073%2025.2638%209.44115%2024.3659%209.66615L23.043%209.9974L24.3659%2010.3286C25.2638%2010.5536%2025.7138%2010.6641%2026.0242%2010.9745C26.3346%2011.287%2026.4451%2011.7349%2026.6701%2012.6328L27.0013%2013.9557L27.3326%2012.6328C27.5576%2011.7349%2027.668%2011.2849%2027.9784%2010.9745C28.2909%2010.6641%2028.7388%2010.5536%2029.6367%2010.3286L30.9596%209.9974L29.6367%209.66615Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_5874_116344)%22%3E%0A%3Cpath%20d%3D%22M33.5813%2014.8013C33.0425%2014.6663%2032.7725%2014.6%2032.5863%2014.4138C32.4%2014.2263%2032.3338%2013.9575%2032.1988%2013.4188L32%2012.625L31.8013%2013.4188C31.6663%2013.9575%2031.6%2014.2275%2031.4138%2014.4138C31.2263%2014.6%2030.9575%2014.6663%2030.4188%2014.8013L29.625%2015L30.4188%2015.1988C30.9575%2015.3338%2031.2275%2015.4%2031.4138%2015.5863C31.6%2015.7738%2031.6663%2016.0425%2031.8013%2016.5813L32%2017.375L32.1988%2016.5813C32.3338%2016.0425%2032.4%2015.7725%2032.5863%2015.5863C32.7738%2015.4%2033.0425%2015.3338%2033.5813%2015.1988L34.375%2015L33.5813%2014.8013Z%22%20fill%3D%22%233353E2%22%2F%3E%0A%3Cpath%20d%3D%22M33.5813%2014.8013C33.0425%2014.6663%2032.7725%2014.6%2032.5863%2014.4138C32.4%2014.2263%2032.3338%2013.9575%2032.1988%2013.4188L32%2012.625L31.8013%2013.4188C31.6663%2013.9575%2031.6%2014.2275%2031.4138%2014.4138C31.2263%2014.6%2030.9575%2014.6663%2030.4188%2014.8013L29.625%2015L30.4188%2015.1988C30.9575%2015.3338%2031.2275%2015.4%2031.4138%2015.5863C31.6%2015.7738%2031.6663%2016.0425%2031.8013%2016.5813L32%2017.375L32.1988%2016.5813C32.3338%2016.0425%2032.4%2015.7725%2032.5863%2015.5863C32.7738%2015.4%2033.0425%2015.3338%2033.5813%2015.1988L34.375%2015L33.5813%2014.8013Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_5874_116344%22%3E%0A%3Crect%20width%3D%226%22%20height%3D%226%22%20fill%3D%22white%22%20transform%3D%22translate(29%2012)%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Ask Assistant"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {"Utilize AI for seamless execution of all job tasks."}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Grid
          id={_utils.cx(
            _styles,
            "w-node-_455ef4cc-ff1b-729d-620d-560a6abf007f-06b69083"
          )}
          tag="div"
        >
          {slotModuleCard ?? (
            <>
              <ModuleCard textName="Profile Score" />
              <ModuleCard textName="Interview Plan" />
              <ModuleCard textName="Assessment" isWarning={false} />
              <ModuleCard textName="Screening" />
              <ModuleCard textName="Templates" />
              <ModuleCard textName="Workflows" isWarning={false} />
            </>
          )}
        </_Builtin.Grid>
      </_Builtin.Block>
    </_Component>
  );
}
