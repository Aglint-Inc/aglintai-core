"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { InterviewModuleCard } from "./InterviewModuleCard";
import * as _utils from "./utils";
import _styles from "./InterviewModuleTable.module.css";

export function InterviewModuleTable({
  as: _Component = _Builtin.Block,
  slotInterviewModuleCard,
  slotFilter,
  isFilterVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "interview_type_detail")}
      tag="div"
    >
      {isFilterVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_filters")}
          tag="div"
        >
          {slotFilter}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "header-body-sublink")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "header-col")} tag="div">
          <Text content="Name" />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "header-col")} tag="div">
          <Text content="Department" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "header-col")}
          id={_utils.cx(
            _styles,
            "w-node-b5f4b2a5-2799-e778-c903-c1a46487a198-7ad50c41"
          )}
          tag="div"
        >
          <Text content="Schedules" />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "header-col")} tag="div">
          <Text content="Members" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_intervoew_module_card")}
        tag="div"
      >
        {slotInterviewModuleCard ?? (
          <>
            <InterviewModuleCard />
            <InterviewModuleCard />
            <InterviewModuleCard />
            <InterviewModuleCard />
            <InterviewModuleCard />
            <InterviewModuleCard />
            <InterviewModuleCard />
            <InterviewModuleCard />
            <InterviewModuleCard />
            <InterviewModuleCard />
            <InterviewModuleCard />
            <InterviewModuleCard />
            <InterviewModuleCard />
          </>
        )}
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%2F*%0A%5Bclass*%3D%22InterviewModuleTable_div-block-1068__%22%5D%7B%0Aheight%3Acalc(100v)%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
