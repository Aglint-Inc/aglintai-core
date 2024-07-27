"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { InterviewModuleStatsCard } from "./InterviewModuleStatsCard";
import * as _utils from "./utils";
import _styles from "./InterviewModuleStats.module.css";

export function InterviewModuleStats({
  as: _Component = _Builtin.Block,
  slotInterviewModuleStatsCard,
  onClickViewAllModules = {},
  isViewAllVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "ims-wrappers")}
      tag="div"
      col-span="3"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "dashboard-widget-header")}
        tag="div"
      >
        <Text content="Interview Type" weight="medium" />
        {isViewAllVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-link-accent")}
            tag="div"
            {...onClickViewAllModules}
          >
            {"View all"}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "sd_table")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "sd_table_header")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "sd_table_header_cell")}
            id={_utils.cx(
              _styles,
              "w-node-d0086500-dc7e-dd71-8fe3-288597e9f586-97e9f57e"
            )}
            tag="div"
          >
            <Text weight="" size="1" color="neutral" content="Interview Type" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sd_table_header_cell")}
            id={_utils.cx(
              _styles,
              "w-node-d0086500-dc7e-dd71-8fe3-288597e9f589-97e9f57e"
            )}
            tag="div"
          >
            <Text weight="" size="1" color="neutral" content="Qualified" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sd_table_header_cell")}
            id={_utils.cx(
              _styles,
              "w-node-d0086500-dc7e-dd71-8fe3-288597e9f58c-97e9f57e"
            )}
            tag="div"
          >
            <Text weight="" size="1" color="neutral" content="Training" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sd_table_body")}
          tag="div"
        >
          {slotInterviewModuleStatsCard ?? (
            <>
              <InterviewModuleStatsCard />
              <InterviewModuleStatsCard />
              <InterviewModuleStatsCard />
              <InterviewModuleStatsCard />
              <InterviewModuleStatsCard />
              <InterviewModuleStatsCard />
              <InterviewModuleStatsCard />
              <InterviewModuleStatsCard />
              <InterviewModuleStatsCard />
              <InterviewModuleStatsCard />
              <InterviewModuleStatsCard />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
