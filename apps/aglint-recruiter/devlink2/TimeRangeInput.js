"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TimeRangeInput.module.css";

export function TimeRangeInput({
  as: _Component = _Builtin.Block,
  slotStartTimeInput,
  slotEndTimeInput,
  onClickRemove = {},
  onClickAdd = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "timerangeinput")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "duration_block")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "time_input")} tag="div">
          {slotStartTimeInput}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{"to"}</_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "time_input")} tag="div">
          {slotEndTimeInput}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "operations", "", "hide")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex", "is_cursor")}
          value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.25%206C2.25%205.78125%202.32031%205.60156%202.46094%205.46094C2.60156%205.32031%202.78125%205.25%203%205.25H9C9.21875%205.25%209.39844%205.32031%209.53906%205.46094C9.67969%205.60156%209.75%205.78125%209.75%206C9.75%206.21875%209.67969%206.39844%209.53906%206.53906C9.39844%206.67969%209.21875%206.75%209%206.75H3C2.78125%206.75%202.60156%206.67969%202.46094%206.53906C2.32031%206.39844%202.25%206.21875%202.25%206Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickRemove}
        />
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex", "is_cursor")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.75%201.875V5.25H10.125C10.3438%205.25%2010.5234%205.32031%2010.6641%205.46094C10.8047%205.60156%2010.875%205.78125%2010.875%206C10.875%206.21875%2010.8047%206.39844%2010.6641%206.53906C10.5234%206.67969%2010.3438%206.75%2010.125%206.75H6.75V10.125C6.75%2010.3438%206.67969%2010.5234%206.53906%2010.6641C6.39844%2010.8047%206.21875%2010.875%206%2010.875C5.78125%2010.875%205.60156%2010.8047%205.46094%2010.6641C5.32031%2010.5234%205.25%2010.3438%205.25%2010.125V6.75H1.875C1.65625%206.75%201.47656%206.67969%201.33594%206.53906C1.19531%206.39844%201.125%206.21875%201.125%206C1.125%205.78125%201.19531%205.60156%201.33594%205.46094C1.47656%205.32031%201.65625%205.25%201.875%205.25H5.25V1.875C5.25%201.65625%205.32031%201.47656%205.46094%201.33594C5.60156%201.19531%205.78125%201.125%206%201.125C6.21875%201.125%206.39844%201.19531%206.53906%201.33594C6.67969%201.47656%206.75%201.65625%206.75%201.875Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickAdd}
        />
      </_Builtin.Block>
    </_Component>
  );
}
