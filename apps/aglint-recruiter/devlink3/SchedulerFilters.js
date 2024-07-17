"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import { SlotComp } from "./SlotComp";
import { TimeRangeSelector } from "./TimeRangeSelector";
import * as _utils from "./utils";
import _styles from "./SchedulerFilters.module.css";

export function SchedulerFilters({
  as: _Component = _Builtin.Block,
  textNumberNoConflicts = "0",
  textNumberSoftConflicts = "0",
  textNumberHardConflicts = "0",
  textNumberOutsideWorkHours = (
    <>
      {"0"}
      <br />
    </>
  ),
  slotPreferedInterviewersSearch,
  slotTimeRangeSelector,
  slotCheckbox,
  textDateRange = "April 04 - April 05",
  slotSoftConflictToggle,
  slotNoConflictToggle,
  slotHardConflictToggle,
  slotOutsideToggle,
  isNoConflictActive = false,
  isSoftConflictActive = false,
  isHardConflictActive = false,
  isOutsideActive = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "schedule_preferences")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "slottimeblock")} tag="div">
        <_Builtin.Block tag="div">
          <Text
            content={
              <>
                {"Selected Date Range"}
                <br />
              </>
            }
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "timeblock", "is_link")}
          tag="div"
        >
          <GlobalIcon iconName="" color="neutral-11" />
          <Text content={textDateRange} weight="medium" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "conflict_block_wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "conflict_block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "conflict_block_head")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "conflict-number-wrap")}
              tag="div"
            >
              <Text content={textNumberNoConflicts} size="6" color="success" />
              <Text content="No Conflicts" weight="medium" color="success" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "nc-icomn-wrap")}
              tag="div"
            >
              <GlobalIcon iconName="check_circle" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "relative-1")}
            tag="div"
          >
            {slotNoConflictToggle}
          </_Builtin.Block>
          {isNoConflictActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "conflict_block_active")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "conflict_block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "conflict_block_head")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "conflict-number-wrap")}
              tag="div"
            >
              <Text
                content={textNumberSoftConflicts}
                size="6"
                color="warning"
              />
              <Text content="Soft Conflicts" weight="medium" color="warning" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "sc-icon-wrap")}
              tag="div"
            >
              <GlobalIcon iconName="info" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "relative-1")}
            tag="div"
          >
            {slotSoftConflictToggle}
          </_Builtin.Block>
          {isSoftConflictActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "conflict_block_active")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "conflict_block")}
          id={_utils.cx(
            _styles,
            "w-node-_0e66376c-6f8f-5928-fc1e-939cce85cb18-04bedc83"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "conflict_block_head")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "conflict-number-wrap")}
              tag="div"
            >
              <Text content={textNumberHardConflicts} size="6" color="error" />
              <Text content="Hard Conflicts" weight="medium" color="error" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "hc-icon-wrap")}
              tag="div"
            >
              <GlobalIcon iconName="warning" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "relative-1")}
            tag="div"
          >
            {slotHardConflictToggle}
          </_Builtin.Block>
          {isHardConflictActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "conflict_block_active")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "conflict_block")}
          id={_utils.cx(
            _styles,
            "w-node-_12a6b914-407e-f355-78ff-89a41a97aba0-04bedc83"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "conflict_block_head")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "conflict-number-wrap")}
              tag="div"
            >
              <Text
                content={textNumberOutsideWorkHours}
                size="6"
                color="info"
              />
              <Text content="Outside Work Hours" weight="medium" color="info" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "owh-icon-wrap")}
              tag="div"
            >
              <GlobalIcon iconName="bedtime" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "relative-1")}
            tag="div"
          >
            {slotOutsideToggle}
          </_Builtin.Block>
          {isOutsideActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "conflict_block_active")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sub_session_with_heading")}
        tag="div"
      >
        <Text content="Preferred Interviewers" weight="medium" />
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_prefer_user_search_fielf")}
          tag="div"
        >
          {slotPreferedInterviewersSearch ?? (
            <SlotComp componentNeme="Slot for preferred Interviewers" />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sub_session_with_heading")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "header_wrapper")}
          tag="div"
        >
          <Text content="Preferred Time Ranges" weight="medium" />
          <Text
            content="Add the time ranges that you are available"
            color="neutral"
            weight=""
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_prefer_user_search_fielf")}
          tag="div"
        >
          {slotTimeRangeSelector ?? <TimeRangeSelector />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sub_session_with_heading")}
        tag="div"
      >
        <Text content="Preference by workload" weight="medium" />
        <_Builtin.Block
          className={_utils.cx(_styles, "checkbox_wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "checkbox_text")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {slotCheckbox ?? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2220%22%20viewBox%3D%220%200%2016%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20y%3D%222%22%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22var(--accent-9)%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%2010.5858L10.2929%207.29289C10.6834%206.90237%2011.3166%206.90237%2011.7071%207.29289C12.0976%207.68342%2012.0976%208.31658%2011.7071%208.70711L7.70711%2012.7071C7.31658%2013.0976%206.68342%2013.0976%206.29289%2012.7071L4.29289%2010.7071C3.90237%2010.3166%203.90237%209.68342%204.29289%209.29289C4.68342%208.90237%205.31658%208.90237%205.70711%209.29289L7%2010.5858Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              )}
            </_Builtin.Block>
            <Text
              content="Workload availability set for each interviewers considered as a preference."
              color="neutral"
              weight=""
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
