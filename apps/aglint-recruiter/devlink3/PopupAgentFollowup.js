"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { RadioWithText } from "./RadioWithText";
import * as _utils from "./utils";
import _styles from "./PopupAgentFollowup.module.css";

export function PopupAgentFollowup({
  as: _Component = _Builtin.Block,
  slotRadioWithText,
  isScheduleLater = false,
  slotDateTimePicker,
  isImmediately = true,
  textMessage = "Phone call will be started immediately.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "agent_followup")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "selection_wrapper")}
        tag="div"
      >
        <_Builtin.HFlex className={_utils.cx(_styles, "flex_center")} tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3%204.25C2.78125%204.25%202.60156%204.32031%202.46094%204.46094C2.32031%204.60156%202.25%204.78125%202.25%205V5.9375L6.84375%209.28906C7.28125%209.58594%207.71875%209.58594%208.15625%209.28906L12.75%205.9375V5C12.75%204.78125%2012.6797%204.60156%2012.5391%204.46094C12.3984%204.32031%2012.2188%204.25%2012%204.25H3ZM2.25%206.875V11C2.25%2011.2188%202.32031%2011.3984%202.46094%2011.5391C2.60156%2011.6797%202.78125%2011.75%203%2011.75H12C12.2188%2011.75%2012.3984%2011.6797%2012.5391%2011.5391C12.6797%2011.3984%2012.75%2011.2188%2012.75%2011V6.875L8.60156%209.89844C8.27344%2010.1484%207.90625%2010.2734%207.5%2010.2734C7.09375%2010.2734%206.72656%2010.1484%206.39844%209.89844L2.25%206.875ZM1.5%205C1.51562%204.57812%201.66406%204.22656%201.94531%203.94531C2.22656%203.66406%202.57812%203.51563%203%203.5H12C12.4219%203.51563%2012.7734%203.66406%2013.0547%203.94531C13.3359%204.22656%2013.4844%204.57812%2013.5%205V11C13.4844%2011.4219%2013.3359%2011.7734%2013.0547%2012.0547C12.7734%2012.3359%2012.4219%2012.4844%2012%2012.5H3C2.57812%2012.4844%202.22656%2012.3359%201.94531%2012.0547C1.66406%2011.7734%201.51562%2011.4219%201.5%2011V5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"When to email"}</_Builtin.Block>
        </_Builtin.HFlex>
        <_Builtin.Block
          className={_utils.cx(_styles, "radio_wrapper")}
          tag="div"
        >
          {slotRadioWithText ?? (
            <>
              <RadioWithText isSelected={true} textRadio="Immediately" />
              <RadioWithText textRadio="Schedule for Later" />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "fixed_height")} tag="div">
        {isImmediately ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "selected_immediately")}
            tag="div"
          >
            <_Builtin.Block tag="div">{textMessage}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isScheduleLater ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_selctedarea")}
            tag="div"
          >
            {slotDateTimePicker}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
