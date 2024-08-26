"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithIcon } from "./TextWithIcon";
import { IconButtonOutlined } from "./IconButtonOutlined";
import { Text } from "./Text";
import { InterviewerListAvail } from "./InterviewerListAvail";
import * as _utils from "./utils";
import _styles from "./InterviewerAvailability.module.css";

export function InterviewerAvailability({
  as: _Component = _Builtin.Block,
  slotFilter,
  textDateRange = "This is a global text component",
  onClickLeftIcon = {},
  onClickRightIcon = {},
  textDay1 = "Interviewer",
  textDay2 = "Interviewer",
  textDay3 = "Interviewer",
  textDay4 = "Interviewer",
  textDay5 = "Interviewer",
  slotInterviewerList,
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
              onClickButton={onClickLeftIcon}
              iconName="chevron_left"
              size="1"
              color="neutral"
            />
            <IconButtonOutlined
              onClickButton={onClickRightIcon}
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
          className={_utils.cx(_styles, "interviewer-avail-header-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer-avail-head-item")}
            tag="div"
          >
            <Text weight="regular" size="1" content="Interviewer" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer-avail-head-item")}
            id={_utils.cx(
              _styles,
              "w-node-_6e7cdf57-62ef-8901-e4a9-8b1ed592b0e2-d592b0d1"
            )}
            tag="div"
          >
            <Text content={textDay1} weight="regular" size="1" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer-avail-head-item")}
            id={_utils.cx(
              _styles,
              "w-node-_6e7cdf57-62ef-8901-e4a9-8b1ed592b0e5-d592b0d1"
            )}
            tag="div"
          >
            <Text content={textDay2} weight="regular" size="1" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer-avail-head-item")}
            id={_utils.cx(
              _styles,
              "w-node-_6e7cdf57-62ef-8901-e4a9-8b1ed592b0e8-d592b0d1"
            )}
            tag="div"
          >
            <Text content={textDay3} weight="regular" size="1" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer-avail-head-item")}
            id={_utils.cx(
              _styles,
              "w-node-_6e7cdf57-62ef-8901-e4a9-8b1ed592b0eb-d592b0d1"
            )}
            tag="div"
          >
            <Text content={textDay4} weight="regular" size="1" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer-avail-head-item")}
            id={_utils.cx(
              _styles,
              "w-node-_6e7cdf57-62ef-8901-e4a9-8b1ed592b0ee-d592b0d1"
            )}
            tag="div"
          >
            <Text content={textDay5} weight="regular" size="1" />
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
            {slotInterviewerList ?? <InterviewerListAvail />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
