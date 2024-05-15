"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CloseNewTask.module.css";

export function CloseNewTask({
  as: _Component = _Builtin.Block,
  onClickSave = {},
  onClickClose = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1356")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1355", "cursor-pointer")}
        tag="div"
        {...onClickSave}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2216%22%20height%3D%2211%22%20viewBox%3D%220%200%2016%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.8438%200.65625C15.0521%200.885417%2015.0521%201.11458%2014.8438%201.34375L6.34375%209.84375C6.11458%2010.0521%205.88542%2010.0521%205.65625%209.84375L1.15625%205.34375C0.947917%205.11458%200.947917%204.88542%201.15625%204.65625C1.38542%204.44792%201.61458%204.44792%201.84375%204.65625L6%208.78125L14.1562%200.65625C14.3854%200.447917%2014.6146%200.447917%2014.8438%200.65625Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "div-block-1355",
          "red",
          "cursor-pointer"
        )}
        tag="div"
        {...onClickClose}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2211%22%20viewBox%3D%220%200%2012%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.1562%2010.3438L6%206.21875L1.875%2010.3438C1.625%2010.5312%201.38542%2010.5312%201.15625%2010.3438C0.96875%2010.1146%200.96875%209.88542%201.15625%209.65625L5.28125%205.5L1.15625%201.375C0.96875%201.125%200.96875%200.885417%201.15625%200.65625C1.38542%200.46875%201.625%200.46875%201.875%200.65625L6%204.78125L10.1562%200.65625C10.3854%200.46875%2010.6146%200.46875%2010.8438%200.65625C11.0312%200.885417%2011.0312%201.125%2010.8438%201.375L6.71875%205.5L10.8438%209.65625C11.0312%209.88542%2011.0312%2010.1146%2010.8438%2010.3438C10.6146%2010.5312%2010.3854%2010.5312%2010.1562%2010.3438Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
    </_Component>
  );
}
