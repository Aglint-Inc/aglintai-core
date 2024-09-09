"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ScheduleCountStats } from "./ScheduleCountStats";
import { Reason } from "./Reason";
import { LeaderBoard } from "./LeaderBoard";
import { CardWithNumber } from "./CardWithNumber";
import { CandidateSatisfactionRate } from "./CandidateSatisfactionRate";
import { TrainingProgress } from "./TrainingProgress";
import { RecentReschedule } from "./RecentReschedule";
import { RecentDeclines } from "./RecentDeclines";
import { SchedulingQuickLink } from "./SchedulingQuickLink";
import * as _utils from "./utils";
import _styles from "./SchedulingDashboard.module.css";

export function SchedulingDashboard({
  as: _Component = _Builtin.Block,
  slotFirstGrid,
  slotScheduleCount,
  slotsCradsWithNumber,
  slotRecentReschedule,
  slotCompletedInterview,
  slotTimeToSchedule,
  slotCandidateSatisfactionRate,
  slotDeclineRequest,
  slotFilters,
  slotQuickLinks,
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
        <_Builtin.Block tag="div">{slotFilters}</_Builtin.Block>
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
        <_Builtin.Block
          className={_utils.cx(_styles, "sd-row-three")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "sd-row-three-item")}
            tag="div"
          >
            {slotTimeToSchedule ?? (
              <>
                <CardWithNumber />
                <CardWithNumber />
              </>
            )}
          </_Builtin.Block>
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-ad80a1dd-ecdc-7fcc-7da6-d9a0fcf718db-aa8c5b1c"
            )}
            tag="div"
          >
            {slotCandidateSatisfactionRate ?? <CandidateSatisfactionRate />}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotDeclineRequest}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "sd_row_2")} tag="div">
          {slotCompletedInterview ?? <TrainingProgress />}
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
      <_Builtin.Block className={_utils.cx(_styles, "sd-right-wrap")} tag="div">
        {slotQuickLinks ?? (
          <>
            <SchedulingQuickLink />
            <_Builtin.Block tag="div" />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
