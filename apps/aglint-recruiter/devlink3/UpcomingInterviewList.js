"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithIcon } from "./TextWithIcon";
import * as _utils from "./utils";
import _styles from "./UpcomingInterviewList.module.css";

export function UpcomingInterviewList({
  as: _Component = _Builtin.Block,
  slotPanelIcon,
  textPanelName = "This is a global text component",
  textDate = "This is a global text component",
  textTime = "This is a global text component",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "interviewer-detail-right-wrap")}
      tag="div"
    >
      <TextWithIcon slotIcon={slotPanelIcon} textContent={textPanelName} />
      <_Builtin.Block
        className={_utils.cx(_styles, "interviewer-text-icon")}
        tag="div"
      >
        <TextWithIcon
          textContent={textDate}
          iconName="calendar_today"
          iconSize="4"
        />
        <TextWithIcon textContent={textTime} iconName="schedule" iconSize="4" />
      </_Builtin.Block>
    </_Component>
  );
}
