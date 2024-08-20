"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { DarkPill } from "./DarkPill";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./InterviewersDash.module.css";

export function InterviewersDash({
  as: _Component = _Builtin.Block,
  slotInterviewersCardList,
  onClickQualified = {},
  onClickTrainee = {},
  isQualifiedActive = false,
  isTraineeActive = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "interview-dash-wrappers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "dashboard-widget-header")}
        tag="div"
      >
        <Text content="Interviewers" weight="medium" />
        <_Builtin.Block
          className={_utils.cx(_styles, "ci_option_switch")}
          tag="div"
        >
          <DarkPill
            onClickPill={onClickQualified}
            textPill="Qualified"
            isActive={false}
          />
          <DarkPill
            onClickPill={onClickTrainee}
            textPill="Trainees"
            isActive={true}
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "sd_table")} tag="div">
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "module_row",
            "height-56",
            "interviewers",
            "height-auto"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "sd_table_header_cell")}
            id={_utils.cx(
              _styles,
              "w-node-_78c91b2f-e9a0-e12f-c3da-df89e6bcfc38-e6bcfc2d"
            )}
            tag="div"
          >
            <Text weight="" size="1" color="neutral" content="Name" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sd_table_header_cell")}
            id={_utils.cx(
              _styles,
              "w-node-_78c91b2f-e9a0-e12f-c3da-df89e6bcfc3b-e6bcfc2d"
            )}
            tag="div"
          >
            <Text weight="" size="1" color="neutral" content="Upcoming" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sd_table_header_cell")}
            id={_utils.cx(
              _styles,
              "w-node-_78c91b2f-e9a0-e12f-c3da-df89e6bcfc3e-e6bcfc2d"
            )}
            tag="div"
          >
            <Text weight="" size="1" color="neutral" content="Completed" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sd_table_header_cell")}
            id={_utils.cx(
              _styles,
              "w-node-_78c91b2f-e9a0-e12f-c3da-df89e6bcfc41-e6bcfc2d"
            )}
            tag="div"
          >
            <Text weight="" size="1" color="neutral" content="Declined" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sd_table_body")}
          tag="div"
        >
          {slotInterviewersCardList ?? (
            <>
              <SlotComp componentNeme="InterviewersCardList" />
              <SlotComp componentNeme="InterviewersCardList" />
              <SlotComp componentNeme="InterviewersCardList" />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
