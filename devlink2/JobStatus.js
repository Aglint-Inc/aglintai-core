import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JobStatus.module.css";

export function JobStatus({
  as: _Component = _Builtin.Block,
  title = "Sourcing",
  isScheduled = false,
  isActive = false,
  isInactive = false,
  onClickStatus = {},
  textDate = "22 Aug, 11: 30 PM",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "job-status-block")}
      tag="div"
      {...onClickStatus}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "text-sm",
          "fw-semibold",
          "text-kale-600"
        )}
        tag="div"
      >
        {title}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "job-status-info")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "job-status-icon-block")}
          tag="div"
        >
          {isScheduled ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2013%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200.59375C2.69%200.59375%200%203.28375%200%206.59375C0%209.90375%202.69%2012.5938%206%2012.5938C9.31%2012.5938%2012%209.90375%2012%206.59375C12%203.28375%209.31%200.59375%206%200.59375ZM8%207.59375H5.5C5.22%207.59375%205%207.37375%205%207.09375V3.59375C5%203.31375%205.22%203.09375%205.5%203.09375C5.78%203.09375%206%203.31375%206%203.59375V6.59375H8C8.28%206.59375%208.5%206.81375%208.5%207.09375C8.5%207.37375%208.28%207.59375%208%207.59375Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
          {isActive ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200C2.69%200%200%202.69%200%206C0%209.31%202.69%2012%206%2012C9.31%2012%2012%209.31%2012%206C12%202.69%209.31%200%206%200ZM9.44%204.94L5.94%208.44C5.82%208.56%205.66%208.62%205.5%208.62C5.34%208.62%205.18%208.56%205.06%208.44L3.06%206.44C2.82%206.2%202.82%205.8%203.06%205.56C3.3%205.32%203.7%205.32%203.94%205.56L5.5%207.12L8.56%204.06C8.8%203.82%209.2%203.82%209.44%204.06C9.69%204.3%209.69%204.7%209.44%204.94Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
          {isInactive ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.5%2012C2.46%2012%200%209.54%200%206.5C0%203.46%202.46%201%205.5%201C8.54%201%2011%203.46%2011%206.5C11%209.54%208.54%2012%205.5%2012ZM5%209.5C5%209.78%205.22%2010%205.5%2010C5.78%2010%206%209.78%206%209.5V6.5C6%206.22%205.78%206%205.5%206C5.22%206%205%206.22%205%206.5V9.5ZM5.5%203C4.95%203%204.5%203.45%204.5%204C4.5%204.55%204.95%205%205.5%205C6.05%205%206.5%204.55%206.5%204C6.5%203.45%206.05%203%205.5%203Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-kale-800")}
          tag="div"
        >
          {textDate}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
