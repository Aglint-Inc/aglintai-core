"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TaskStatus.module.css";

export function TaskStatus({
  as: _Component = _Builtin.Block,
  textStatus = "Done",
  bgColorProps = {},
  textColorProps = {},
  isDropIconVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1353")}
      tag="div"
      {...bgColorProps}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1351")}
        tag="div"
        {...textColorProps}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%223%22%20cy%3D%223%22%20r%3D%223%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
          {textStatus}
        </_Builtin.Block>
        {isDropIconVisible ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%228%22%20height%3D%228%22%20viewBox%3D%220%200%208%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.73438%206.26562L0.734375%203.26562C0.588542%203.08854%200.588542%202.91146%200.734375%202.73438C0.911458%202.58854%201.08854%202.58854%201.26562%202.73438L4%205.46875L6.73438%202.73438C6.91146%202.58854%207.08854%202.58854%207.26562%202.73438C7.41146%202.91146%207.41146%203.08854%207.26562%203.26562L4.26562%206.26562C4.08854%206.41146%203.91146%206.41146%203.73438%206.26562Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
