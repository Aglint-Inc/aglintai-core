"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { TrainingProgressList } from "./TrainingProgressList";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./TrainingProgress.module.css";

export function TrainingProgress({
  as: _Component = _Builtin.Block,
  onClickViewAllInterviewers = {},
  slotTrainingProgressList,
  isViewAllVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "dashboard_widget_wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "dashboard-widget-header")}
        tag="div"
      >
        <Text content="Training Progress" weight="medium" />
        {isViewAllVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-link-accent")}
            tag="div"
            {...onClickViewAllInterviewers}
          >
            {"View all"}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "sd_table")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "module_row", "progress")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "sd_table_header_cell")}
            id={_utils.cx(
              _styles,
              "w-node-f51aea9e-3a98-2b3d-2e1f-0f944d5a854c-4d5a8544"
            )}
            tag="div"
          >
            <Text weight="" size="1" color="neutral" content="Interviewer" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sd_table_header_cell")}
            id={_utils.cx(
              _styles,
              "w-node-f51aea9e-3a98-2b3d-2e1f-0f944d5a854f-4d5a8544"
            )}
            tag="div"
          >
            <Text weight="" size="1" color="neutral" content="Interview Type" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sd_table_header_cell")}
            id={_utils.cx(
              _styles,
              "w-node-f51aea9e-3a98-2b3d-2e1f-0f944d5a8552-4d5a8544"
            )}
            tag="div"
          >
            <Text
              weight=""
              size="1"
              color="neutral"
              content="Training History"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sd_table_body")}
          tag="div"
        >
          {slotTrainingProgressList ?? (
            <>
              <TrainingProgressList />
              <SlotComp componentNeme="TrainingProgressList" />
              <SlotComp componentNeme="TrainingProgressLoader" />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
