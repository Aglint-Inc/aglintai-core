"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { JobsBanner } from "./JobsBanner";
import { Text } from "./Text";
import { PipeLine } from "./PipeLine";
import { ScheduleCardSmall } from "./ScheduleCardSmall";
import { GraphBlock } from "./GraphBlock";
import { CardWithNumber } from "./CardWithNumber";
import { JobRole } from "./JobRole";
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
  textGoodMatchCount = "12 Candidates",
  textAveageMatchCount = "13 Candidates",
  textBelowAverageCount = "11 Candidates",
  textNotAMatchCount = "11 Candidates",
  slotPipeline,
  slotModuleCard,
  onClickAssistant = {},
  slotScheduleCardSmall,
  slotLocationGraphBlock,
  slotSkillGraphBlock,
  slotExperienceGraph,
  slotCardWithNumber,
  isBanner = true,
  slotBanner,
  onClickViewSchedule = {},
  isViewScheduleVisible = true,
  onClickTopMatch = {},
  onClickGoodMatch = {},
  onClickAverageMatch = {},
  onClickBelowAverage = {},
  onClickNotaMatch = {},
  slotJobRole,
  isJobRoleVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "jobdashboard")} tag="div">
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "jobdadhboard_left",
          "hide-scrollbar",
          "pt-0"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1735")}
          tag="div"
        >
          {isBanner ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "jd_titleblock")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                {slotBanner ?? <JobsBanner />}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
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
                <Text content={textTopMatchCount} weight="" color="neutral" />
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
                <Text content={textGoodMatchCount} weight="" color="neutral" />
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
                <Text
                  content={textAveageMatchCount}
                  weight=""
                  color="neutral"
                />
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
                <Text
                  content={textBelowAverageCount}
                  weight=""
                  color="neutral"
                />
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
                <Text content={textNotAMatchCount} weight="" color="neutral" />
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
              <Text content="Upcoming Schedules" weight="medium" />
              {isViewScheduleVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "view-jd-wrap")}
                  tag="div"
                  {...onClickViewSchedule}
                >
                  <Text content="View all" size="2" weight="" color="accent" />
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
                            value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_4066_197815)%22%3E%0A%3Cpath%20d%3D%22M20%2010C20%2011.06%2019.92%2012.12%2019.74%2013.14C19.2%2016.52%2016.52%2019.2%2013.14%2019.74C12.12%2019.92%2011.06%2020%2010%2020C8.94%2020%207.88%2019.92%206.86%2019.74C3.48%2019.2%200.8%2016.52%200.26%2013.14C0.08%2012.12%200%2011.06%200%2010C0%208.94%200.08%207.88%200.26%206.86C0.8%203.48%203.48%200.8%206.86%200.26C7.88%200.08%208.94%200%2010%200C11.06%200%2012.12%200.08%2013.14%200.26C16.52%200.8%2019.2%203.48%2019.74%206.86C19.92%207.88%2020%208.94%2020%2010Z%22%20fill%3D%22url(%23paint0_linear_4066_197815)%22%2F%3E%0A%3Cpath%20d%3D%22M15.9405%2016.2402H5.86055C5.20055%2016.2402%204.56055%2015.8802%204.26055%2015.3002C3.90055%2014.6202%204.04055%2013.8002%204.58055%2013.2602L11.6005%206.24023H6.56055C5.18055%206.24023%204.06055%205.12023%204.06055%203.74023H13.3405C14.0005%203.74023%2014.6405%204.10023%2014.9405%204.68023C15.3005%205.36023%2015.1605%206.18023%2014.6205%206.72023L7.62055%2013.7602H13.4405C14.8205%2013.7602%2015.9405%2014.8602%2015.9405%2016.2402Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Clineargradient%20id%3D%22paint0_linear_4066_197815%22%20x1%3D%22473.32%22%20y1%3D%221912.24%22%20x2%3D%221526.68%22%20y2%3D%2287.76%22%20gradientunits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%230845BF%22%2F%3E%0A%3Cstop%20offset%3D%220.1911%22%20stop-color%3D%22%230950DE%22%2F%3E%0A%3Cstop%20offset%3D%220.3823%22%20stop-color%3D%22%230B59F6%22%2F%3E%0A%3Cstop%20offset%3D%220.5%22%20stop-color%3D%22%230B5CFF%22%2F%3E%0A%3Cstop%20offset%3D%220.6732%22%20stop-color%3D%22%230E5EFE%22%2F%3E%0A%3Cstop%20offset%3D%220.7774%22%20stop-color%3D%22%231665FC%22%2F%3E%0A%3Cstop%20offset%3D%220.8633%22%20stop-color%3D%22%23246FF9%22%2F%3E%0A%3Cstop%20offset%3D%220.9388%22%20stop-color%3D%22%23387FF4%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%234F90EE%22%2F%3E%0A%3C%2Flineargradient%3E%0A%3Cclippath%20id%3D%22clip0_4066_197815%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
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
                            value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewbox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.8125%209.44531L14.4375%2010.5703C14.6406%2010.6641%2014.7969%2010.8125%2014.9062%2011.0156C15%2011.2031%2015.0234%2011.4062%2014.9766%2011.625L14.4141%2014.25C14.2891%2014.7188%2013.9844%2014.9688%2013.5%2015C13.3594%2015%2013.2188%2015%2013.0781%2015C12.9688%2014.9844%2012.8594%2014.9766%2012.75%2014.9766C10.9219%2014.8203%209.27344%2014.2656%207.80469%2013.3125C6.33594%2012.3594%205.17188%2011.1172%204.3125%209.58594C3.45312%208.07031%203.01562%206.375%203%204.5C3.03125%204.01562%203.28125%203.71094%203.75%203.58594L6.375%203.02344C6.59375%202.97656%206.79688%203.00781%206.98438%203.11719C7.1875%203.21094%207.33594%203.35937%207.42969%203.5625L8.55469%206.1875C8.71094%206.60938%208.61719%206.97656%208.27344%207.28906L7.33594%208.0625C7.97656%209.15625%208.84375%2010.0234%209.9375%2010.6641L10.7109%209.72656C11.0234%209.38281%2011.3906%209.28906%2011.8125%209.44531ZM13.5%2014.25C13.5938%2014.25%2013.6562%2014.2031%2013.6875%2014.1094L14.25%2011.4844C14.2656%2011.375%2014.2266%2011.3047%2014.1328%2011.2734L11.5078%2010.1484C11.4297%2010.1172%2011.3594%2010.1328%2011.2969%2010.1953L10.5234%2011.1562C10.2422%2011.4375%209.92188%2011.4922%209.5625%2011.3203C8.34375%2010.6172%207.38281%209.65625%206.67969%208.4375C6.50781%208.07812%206.5625%207.75781%206.84375%207.47656L7.80469%206.70312C7.86719%206.64062%207.88281%206.57031%207.85156%206.49219L6.72656%203.86719C6.67969%203.77344%206.60938%203.73437%206.51562%203.75L3.89062%204.3125C3.79688%204.34375%203.75%204.40625%203.75%204.5C3.76562%206.3125%204.21094%207.95312%205.08594%209.42188C5.94531%2010.8906%207.10938%2012.0547%208.57812%2012.9141C10.0469%2013.7891%2011.6875%2014.2344%2013.5%2014.25Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
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
        {isJobRoleVisible ? (
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-aa7b022e-09a1-5735-d7ae-9984900320f8-06b69083"
            )}
            tag="div"
          >
            {slotJobRole ?? <JobRole />}
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          id={_utils.cx(
            _styles,
            "w-node-cdf60b6e-005f-30d1-1695-854c7b1d7df3-06b69083"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "jd-setting-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "jd-setting-header")}
              tag="div"
            >
              <Text content="Settings" color="neutral" size="1" weight="" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "module_card_wrapper")}
              tag="div"
            >
              {slotModuleCard ?? (
                <>
                  <ModuleCard textName="Profile Score" />
                  <ModuleCard textName="Profile Score" />
                  <ModuleCard textName="Profile Score" />
                  <ModuleCard textName="Profile Score" />
                  <ModuleCard textName="Profile Score" />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
