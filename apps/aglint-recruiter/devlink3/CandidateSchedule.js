"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FullScheduleCard } from "./FullScheduleCard";
import { ScheduleNowButton } from "./ScheduleNowButton";
import { JobCards } from "./JobCards";
import { Activities } from "./Activities";
import { CurrentStage } from "./CurrentStage";
import * as _utils from "./utils";
import _styles from "./CandidateSchedule.module.css";

export function CandidateSchedule({
  as: _Component = _Builtin.Block,
  slotDarkPill,
  slotFullScheduleCard,
  slotCandidateCard,
  slotScheduleNowButton,
  isScheduleNowVisible = true,
  onClickClose = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "new-candidate-schedule-grid")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate-schedule-left-wrap")}
        id={_utils.cx(
          _styles,
          "w-node-b4f8c833-3062-0810-c58b-254fa7da7af2-a7da7af1"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cd-schedule-header")}
          tag="div"
        >
          {slotDarkPill}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "new-schedule-cd-card-wrap")}
          tag="div"
        >
          {slotFullScheduleCard ?? (
            <>
              <FullScheduleCard />
              <FullScheduleCard />
              <FullScheduleCard />
              <FullScheduleCard />
            </>
          )}
        </_Builtin.Block>
        {isScheduleNowVisible ? (
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "div-block-1327",
              "schedule-button-wrap"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1377")}
              tag="div"
            >
              {slotScheduleNowButton ?? <ScheduleNowButton />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1376", "cursor-pointer")}
              tag="div"
              {...onClickClose}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.1953%2013.0547L7%207.89844L1.84375%2013.0547C1.53125%2013.2891%201.23177%2013.2891%200.945312%2013.0547C0.710938%2012.7682%200.710938%2012.4818%200.945312%2012.1953L6.10156%207L0.945312%201.84375C0.710938%201.53125%200.710938%201.23177%200.945312%200.945312C1.23177%200.710938%201.53125%200.710938%201.84375%200.945312L7%206.10156L12.1953%200.945312C12.4818%200.710938%2012.7682%200.710938%2013.0547%200.945312C13.2891%201.23177%2013.2891%201.53125%2013.0547%201.84375L7.89844%207L13.0547%2012.1953C13.2891%2012.4818%2013.2891%2012.7682%2013.0547%2013.0547C12.7682%2013.2891%2012.4818%2013.2891%2012.1953%2013.0547Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate-schedule-right-wrap")}
        tag="div"
      >
        {slotCandidateCard ?? (
          <>
            <JobCards />
            <Activities />
            <CurrentStage />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
