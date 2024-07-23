"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ScheduleSelectPill.module.css";

export function ScheduleSelectPill({
  as: _Component = _Builtin.Block,
  slotIcons,
  textScheduleName = "Company Indroduction",
  onClickClose = {},
  textTime = "1 Hour",
  isCloseVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "schedule-select-pill-wrap")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "ssp-content")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "ssp-header-wrap")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotIcons}</_Builtin.Block>
          <Text content={textScheduleName} weight="" />
        </_Builtin.Block>
        <Text content={textTime} size="1" weight="" color="neutral" />
      </_Builtin.Block>
      {isCloseVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "ssp-close-wrap", "cursor-pointer")}
          tag="div"
          {...onClickClose}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%226%22%20height%3D%228%22%20viewbox%3D%220%200%206%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.07812%206.42188L3%204.35938L0.9375%206.42188C0.8125%206.51562%200.692708%206.51562%200.578125%206.42188C0.484375%206.30729%200.484375%206.19271%200.578125%206.07812L2.64062%204L0.578125%201.9375C0.484375%201.8125%200.484375%201.69271%200.578125%201.57812C0.692708%201.48438%200.8125%201.48438%200.9375%201.57812L3%203.64062L5.07812%201.57812C5.19271%201.48438%205.30729%201.48438%205.42188%201.57812C5.51562%201.69271%205.51562%201.8125%205.42188%201.9375L3.35938%204L5.42188%206.07812C5.51562%206.19271%205.51562%206.30729%205.42188%206.42188C5.30729%206.51562%205.19271%206.51562%205.07812%206.42188Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
