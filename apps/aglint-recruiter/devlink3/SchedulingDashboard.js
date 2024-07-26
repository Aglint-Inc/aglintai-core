"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ScheduleCountStats } from "./ScheduleCountStats";
import { Reason } from "./Reason";
import { LeaderBoard } from "./LeaderBoard";
import { CardWithNumber } from "./CardWithNumber";
import { TrainingProgress } from "./TrainingProgress";
import { NewInterviewDetail } from "./NewInterviewDetail";
import { InterviewModuleStats } from "./InterviewModuleStats";
import { CompletedInterviews } from "./CompletedInterviews";
import { InterviewersDash } from "./InterviewersDash";
import { RecentReschedule } from "./RecentReschedule";
import { RecentDeclines } from "./RecentDeclines";
import { Text } from "./Text";
import { TextWithIcon } from "./TextWithIcon";
import * as _utils from "./utils";
import _styles from "./SchedulingDashboard.module.css";

export function SchedulingDashboard({
  as: _Component = _Builtin.Block,
  onClickCandidates = {},
  onClickMySchedule = {},
  onClickInterviewTypes = {},
  onClickInterviewers = {},
  onClickScheduleSetting = {},
  slotFirstGrid,
  slotGridInterviewDetail,
  slotInterviewStatic,
  slotInterviewModuleStats,
  slotTrainingProgress,
  slotScheduleCount,
  slotsCradsWithNumber,
  slotRecentReschedule,
  slotCompletedInterview,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "dashbaord-wrap-scheduling")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "scheduling-dashboard")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "scheduling_stats")}
          tag="div"
        >
          {slotScheduleCount ?? <ScheduleCountStats />}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "sd_row_5")} tag="div">
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-_86c7a60b-b65d-b86a-08cc-187f561d6b8c-aa8c5b1c"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "sd_row_4")}
              tag="div"
            >
              {slotFirstGrid ?? (
                <>
                  <Reason
                    id={_utils.cx(
                      _styles,
                      "w-node-_6c284abd-2308-8491-5078-d25cce0684e6-aa8c5b1c"
                    )}
                  />
                  <LeaderBoard
                    id={_utils.cx(
                      _styles,
                      "w-node-_6c284abd-2308-8491-5078-d25cce0684e7-aa8c5b1c"
                    )}
                  />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "sd_row_2")} tag="div">
          {slotTrainingProgress ?? <TrainingProgress />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sd_row_9")}
          id={_utils.cx(
            _styles,
            "w-node-_39a54981-40f7-c272-1ba4-739d34937bae-aa8c5b1c"
          )}
          tag="div"
        >
          {slotGridInterviewDetail ?? (
            <>
              <NewInterviewDetail
                id={_utils.cx(
                  _styles,
                  "w-node-fe29ed78-1e58-1d63-6be3-7cfde257adce-aa8c5b1c"
                )}
              />
              <InterviewModuleStats
                id={_utils.cx(
                  _styles,
                  "w-node-cc4f4f89-4ccc-de5a-20c4-b973179142a8-aa8c5b1c"
                )}
              />
            </>
          )}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "sd_row_5")} tag="div">
          {slotCompletedInterview ?? (
            <>
              <CompletedInterviews
                id={_utils.cx(
                  _styles,
                  "w-node-_96458fef-0fca-f087-1b6c-cdd6d67568d2-aa8c5b1c"
                )}
              />
              <InterviewersDash
                isTraineeActive={true}
                isQualifiedActive={false}
              />
            </>
          )}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "sd_row_4")} tag="div">
          {slotRecentReschedule ?? (
            <>
              <RecentReschedule
                id={_utils.cx(
                  _styles,
                  "w-node-a5bc1e9b-ec04-3260-90ed-e07bc8b8221a-aa8c5b1c"
                )}
              />
              <RecentDeclines
                id={_utils.cx(
                  _styles,
                  "w-node-c47b7744-d911-5950-ca98-79024f701501-aa8c5b1c"
                )}
              />
            </>
          )}
        </_Builtin.Block>
        <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%5Bcol-span%3D%222%22%5D%20%7B%0A%20%20%20%20grid-row-start%3A%20span%201%3B%0A%20%20%20%20grid-row-end%3A%20span%201%3B%0A%20%20%20%20grid-column-start%3A%20span%202%3B%0A%20%20%20%20grid-column-end%3A%20span%202%3B%0A%20%20%7D%0A%0A%20%20%5Bcol-span%3D%223%22%5D%7B%0A%20%20%20%20grid-row-start%3A%20span%201%3B%0A%20%20%20%20grid-row-end%3A%20span%201%3B%0A%20%20%20%20grid-column-start%3A%20span%203%3B%0A%20%20%20%20grid-column-end%3A%20span%203%3B%0A%20%20%7D%0A%3C%2Fstyle%3E" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "scheduling-dashboard-right")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "sd-right-wraps")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "quick-link-wrapper")}
            tag="div"
          >
            <Text weight="" color="neutral" size="1" content="Quick Links" />
            <_Builtin.Block
              className={_utils.cx(_styles, "quick-link-sub-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "scheduler-links-quick")}
                tag="div"
                {...onClickCandidates}
              >
                <TextWithIcon
                  iconName="group"
                  iconWeight="medium"
                  fontWeight="medium"
                  textContent="Candidates"
                  iconSize="4"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "scheduler-links-quick")}
                tag="div"
                {...onClickMySchedule}
              >
                <TextWithIcon
                  iconName="Calendar_today"
                  iconWeight="medium"
                  fontWeight="medium"
                  textContent="Schedules"
                  iconSize="4"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "scheduler-links-quick")}
                tag="div"
                {...onClickInterviewTypes}
              >
                <TextWithIcon
                  iconName="co_present"
                  iconWeight="medium"
                  fontWeight="medium"
                  textContent="Interview Types"
                  iconSize="4"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "scheduler-links-quick")}
                tag="div"
                {...onClickInterviewers}
              >
                <TextWithIcon
                  iconName="3p"
                  iconWeight="medium"
                  fontWeight="medium"
                  textContent="Interviewers"
                  iconSize="4"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "scheduler-links-quick")}
                tag="div"
                {...onClickScheduleSetting}
              >
                <TextWithIcon
                  iconName="settings"
                  iconWeight="medium"
                  fontWeight="medium"
                  textContent="Settings"
                  iconSize="4"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
