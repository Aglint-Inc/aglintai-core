"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
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
  slotSuggestionControlTooltip,
  slotPreferedInterviewersSearch,
  slotTimeRangeSelector,
  slotCheckbox,
  textDateRange = "April 04 - April 05",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "schedule_preferences")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "slottimeblock")} tag="div">
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
          <Text content={textNumberNoConflicts} />
          <_Builtin.Block
            className={_utils.cx(_styles, "type_of_conflict")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%2014C6.40625%2013.9844%205.40625%2013.7188%204.5%2013.2031C3.59375%2012.6719%202.85938%2011.9375%202.29688%2011C1.76562%2010.0469%201.5%209.04688%201.5%208C1.5%206.95312%201.76562%205.95312%202.29688%205C2.85938%204.0625%203.59375%203.32813%204.5%202.79688C5.40625%202.28125%206.40625%202.01563%207.5%202C8.59375%202.01563%209.59375%202.28125%2010.5%202.79688C11.4062%203.32813%2012.1406%204.0625%2012.7031%205C13.2344%205.95312%2013.5%206.95312%2013.5%208C13.5%209.04688%2013.2344%2010.0469%2012.7031%2011C12.1406%2011.9375%2011.4062%2012.6719%2010.5%2013.2031C9.59375%2013.7188%208.59375%2013.9844%207.5%2014ZM10.1484%206.89844C10.3672%206.63281%2010.3672%206.36719%2010.1484%206.10156C9.88281%205.88281%209.61719%205.88281%209.35156%206.10156L6.75%208.70312L5.64844%207.60156C5.38281%207.38281%205.11719%207.38281%204.85156%207.60156C4.63281%207.86719%204.63281%208.13281%204.85156%208.39844L6.35156%209.89844C6.61719%2010.1172%206.88281%2010.1172%207.14844%209.89844L10.1484%206.89844Z%22%20fill%3D%22var(--success-11)%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-kale-500")}
              tag="div"
            >
              {"No Conflicts"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "conflict_block")}
          tag="div"
        >
          <Text content={textNumberSoftConflicts} />
          <_Builtin.Block
            className={_utils.cx(_styles, "type_of_conflict")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%2014C6.40625%2013.9844%205.40625%2013.7188%204.5%2013.2031C3.59375%2012.6719%202.85938%2011.9375%202.29688%2011C1.76562%2010.0469%201.5%209.04688%201.5%208C1.5%206.95312%201.76562%205.95312%202.29688%205C2.85938%204.0625%203.59375%203.32813%204.5%202.79688C5.40625%202.28125%206.40625%202.01563%207.5%202C8.59375%202.01563%209.59375%202.28125%2010.5%202.79688C11.4062%203.32813%2012.1406%204.0625%2012.7031%205C13.2344%205.95312%2013.5%206.95312%2013.5%208C13.5%209.04688%2013.2344%2010.0469%2012.7031%2011C12.1406%2011.9375%2011.4062%2012.6719%2010.5%2013.2031C9.59375%2013.7188%208.59375%2013.9844%207.5%2014ZM7.5%205C7.15625%205.03125%206.96875%205.21875%206.9375%205.5625V8.1875C6.96875%208.53125%207.15625%208.71875%207.5%208.75C7.84375%208.71875%208.03125%208.53125%208.0625%208.1875V5.5625C8.03125%205.21875%207.84375%205.03125%207.5%205ZM6.75%2010.25C6.75%2010.4688%206.82031%2010.6484%206.96094%2010.7891C7.10156%2010.9297%207.28125%2011%207.5%2011C7.71875%2011%207.89844%2010.9297%208.03906%2010.7891C8.17969%2010.6484%208.25%2010.4688%208.25%2010.25C8.25%2010.0312%208.17969%209.85156%208.03906%209.71094C7.89844%209.57031%207.71875%209.5%207.5%209.5C7.28125%209.5%207.10156%209.57031%206.96094%209.71094C6.82031%209.85156%206.75%2010.0312%206.75%2010.25Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-yellow-600")}
              tag="div"
            >
              {"Soft Conflicts"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "conflict_block")}
          tag="div"
        >
          <Text content={textNumberHardConflicts} />
          <_Builtin.Block
            className={_utils.cx(_styles, "type_of_conflict")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%202.75C7.85938%202.76563%208.13281%202.92187%208.32031%203.21875L13.3828%2011.8438C13.5391%2012.1562%2013.5391%2012.4688%2013.3828%2012.7812C13.1953%2013.0781%2012.9219%2013.2344%2012.5625%2013.25H2.4375C2.07812%2013.2344%201.80469%2013.0781%201.61719%2012.7812C1.46094%2012.4688%201.46094%2012.1562%201.61719%2011.8438L6.70312%203.21875C6.89062%202.92187%207.15625%202.76563%207.5%202.75ZM7.5%205.75C7.15625%205.78125%206.96875%205.96875%206.9375%206.3125V8.9375C6.96875%209.28125%207.15625%209.46875%207.5%209.5C7.84375%209.46875%208.03125%209.28125%208.0625%208.9375V6.3125C8.03125%205.96875%207.84375%205.78125%207.5%205.75ZM8.25%2011C8.25%2010.7812%208.17969%2010.6016%208.03906%2010.4609C7.89844%2010.3203%207.71875%2010.25%207.5%2010.25C7.28125%2010.25%207.10156%2010.3203%206.96094%2010.4609C6.82031%2010.6016%206.75%2010.7812%206.75%2011C6.75%2011.2188%206.82031%2011.3984%206.96094%2011.5391C7.10156%2011.6797%207.28125%2011.75%207.5%2011.75C7.71875%2011.75%207.89844%2011.6797%208.03906%2011.5391C8.17969%2011.3984%208.25%2011.2188%208.25%2011Z%22%20fill%3D%22var(--error-11)%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-red-500")}
              tag="div"
            >
              {"Hard Conflicts"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "conflict_block")}
          tag="div"
        >
          <Text content={textNumberOutsideWorkHours} />
          <_Builtin.Block
            className={_utils.cx(_styles, "type_of_conflict")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.25%202.75H8.22656C8.38281%202.75%208.53125%202.75781%208.67188%202.77344C8.85938%202.80469%208.97656%202.89844%209.02344%203.05469C9.05469%203.24219%208.99219%203.38281%208.83594%203.47656C8.21094%203.83594%207.70312%204.32812%207.3125%204.95312C6.9375%205.57812%206.75%206.28125%206.75%207.0625C6.78125%208.23438%207.17969%209.20312%207.94531%209.96875C8.72656%2010.75%209.69531%2011.1562%2010.8516%2011.1875C11.1016%2011.1875%2011.3359%2011.1641%2011.5547%2011.1172C11.7422%2011.1016%2011.875%2011.1719%2011.9531%2011.3281C12.0312%2011.4844%2012.0078%2011.6328%2011.8828%2011.7734C10.9141%2012.7266%209.70312%2013.2188%208.25%2013.25C7.26562%2013.2344%206.38281%2012.9922%205.60156%2012.5234C4.80469%2012.0703%204.17969%2011.4453%203.72656%2010.6484C3.25781%209.86719%203.01562%208.98438%203%208C3.01562%207.01562%203.25%206.13281%203.70312%205.35156C4.17188%204.55469%204.80469%203.92969%205.60156%203.47656C6.38281%203.00781%207.26562%202.76563%208.25%202.75Z%22%20fill%3D%22var(--sky-11)%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-azure")}
              tag="div"
            >
              {"Outside Work Hours"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sub_session_with_heading")}
        tag="div"
      >
        <Text content="Suggestion Controls" weight="medium" />
        <_Builtin.Block
          className={_utils.cx(_styles, "flex_ver_left_16")}
          tag="div"
        >
          {slotSuggestionControlTooltip ?? (
            <>
              <SlotComp componentNeme="ToggleWithText" />
              <SlotComp componentNeme="ToggleWithText" />
              <SlotComp componentNeme="ToggleWithText" />
            </>
          )}
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
