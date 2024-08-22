"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithIcon } from "./TextWithIcon";
import { IconButtonOutlined } from "./IconButtonOutlined";
import { Text } from "./Text";
import { InterviewerTrainingList } from "./InterviewerTrainingList";
import { InterviewerNotConnected } from "./InterviewerNotConnected";
import * as _utils from "./utils";
import _styles from "./InterviewerTraining.module.css";

export function InterviewerTraining({
  as: _Component = _Builtin.Block,
  slotFilter,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "interviewer-avail-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-filter-interviewer-avail")}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotFilter}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ia-slot-filter-right-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer-date-wrap-filter")}
            tag="div"
          >
            <TextWithIcon
              iconName="calendar_today"
              fontWeight="regular"
              textContent="This is a global text component"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ia-arrow-wrapper")}
            tag="div"
          >
            <IconButtonOutlined
              iconName="chevron_left"
              size="1"
              color="neutral"
              onClickButton={{}}
            />
            <IconButtonOutlined
              iconName="chevron_right"
              size="1"
              color="neutral"
              onClickButton={{}}
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "interviewer-avail-table-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "interviewer-training-header")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer-avail-head-item")}
            tag="div"
          >
            <Text weight="medium" size="1" content="Trainee" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer-avail-head-item")}
            id={_utils.cx(
              _styles,
              "w-node-ab21052d-bd1d-c4b0-a028-2ae2f1c8b092-f1c8b080"
            )}
            tag="div"
          >
            <Text weight="medium" size="1" content="Interview Pool" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer-avail-head-item")}
            id={_utils.cx(
              _styles,
              "w-node-ab21052d-bd1d-c4b0-a028-2ae2f1c8b095-f1c8b080"
            )}
            tag="div"
          >
            <Text weight="medium" size="1" content="Training Progress" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "interviewer-avail-body-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "bg-interviewer-avail-body")}
            tag="div"
          >
            <InterviewerTrainingList />
            <InterviewerNotConnected />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
