"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ResumeTag.module.css";

export function ResumeTag({
  as: _Component = _Builtin.Block,
  props = {},
  slotText,
  isErrorIcon = false,
  isLoading = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "resume-match-tag")}
      tag="div"
      {...props}
    >
      {isErrorIcon ? (
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.25%200.75H9.75C10.1719%200.765625%2010.5234%200.914062%2010.8047%201.19531C11.0859%201.47656%2011.2344%201.82812%2011.25%202.25V9.75C11.2344%2010.1719%2011.0859%2010.5234%2010.8047%2010.8047C10.5234%2011.0859%2010.1719%2011.2344%209.75%2011.25H2.25C1.82812%2011.2344%201.47656%2011.0859%201.19531%2010.8047C0.914062%2010.5234%200.765625%2010.1719%200.75%209.75V2.25C0.765625%201.82812%200.914062%201.47656%201.19531%201.19531C1.47656%200.914062%201.82812%200.765625%202.25%200.75ZM6%203C5.65625%203.03125%205.46875%203.21875%205.4375%203.5625V6.1875C5.46875%206.53125%205.65625%206.71875%206%206.75C6.34375%206.71875%206.53125%206.53125%206.5625%206.1875V3.5625C6.53125%203.21875%206.34375%203.03125%206%203ZM5.25%208.25C5.25%208.46875%205.32031%208.64844%205.46094%208.78906C5.60156%208.92969%205.78125%209%206%209C6.21875%209%206.39844%208.92969%206.53906%208.78906C6.67969%208.64844%206.75%208.46875%206.75%208.25C6.75%208.03125%206.67969%207.85156%206.53906%207.71094C6.39844%207.57031%206.21875%207.5%206%207.5C5.78125%207.5%205.60156%207.57031%205.46094%207.71094C5.32031%207.85156%205.25%208.03125%205.25%208.25Z%22%20fill%3D%22%23E54D2E%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      ) : null}
      <_Builtin.Block tag="div" fontSize="1">
        {slotText ?? <Text content="Top Match" size="1" />}
      </_Builtin.Block>
      {isLoading ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "loading_score")}
          tag="div"
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "apple_loader")}
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/665d54fd36db641586a0319a_kOnzy.gif"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
