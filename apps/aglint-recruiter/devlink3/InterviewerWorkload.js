"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithIcon } from "./TextWithIcon";
import { IconButtonOutlined } from "./IconButtonOutlined";
import { Text } from "./Text";
import { InterviewWorkloadList } from "./InterviewWorkloadList";
import { InterviewerNotConnected } from "./InterviewerNotConnected";
import * as _utils from "./utils";
import _styles from "./InterviewerWorkload.module.css";

export function InterviewerWorkload({
  as: _Component = _Builtin.Block,
  slotFilter,
  textDateRange = "This is a global text component",
  onClickLeft = {},
  onClickRight = {},
  slotInterviewWorkloadList,
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
              textContent={textDateRange}
              iconName="calendar_today"
              fontWeight="regular"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ia-arrow-wrapper")}
            tag="div"
          >
            <IconButtonOutlined
              onClickButton={onClickLeft}
              iconName="chevron_left"
              size="1"
              color="neutral"
            />
            <IconButtonOutlined
              onClickButton={onClickRight}
              iconName="chevron_right"
              size="1"
              color="neutral"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "interviewer-avail-table-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "interviewer-workload-header-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer-avail-head-item")}
            tag="div"
          >
            <Text weight="medium" size="1" content="Interviewer" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer-avail-head-item")}
            id={_utils.cx(
              _styles,
              "w-node-_8e55ab1f-5df3-4099-568c-cdc856993928-56993916"
            )}
            tag="div"
          >
            <Text weight="medium" size="1" content="Workload" />
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
            {slotInterviewWorkloadList ?? (
              <>
                <InterviewWorkloadList />
                <InterviewerNotConnected />
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
