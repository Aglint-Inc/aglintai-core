import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JobCardSchedule.module.css";

export function JobCardSchedule({
  as: _Component = _Builtin.Block,
  textHeader = "Phase 1: Interview for software engineer",
  textDuration = "30 Minutes",
  slotPlatformIcon,
  textPlatformName = "Google Meet",
  slotMemberImage,
  textPanelMember = "Team Engineering (2 Members)",
  onClickViewScheduler = {},
  textTimeDate = "2024 Feb 20 at 09:30 AM",
  slotStatusBadge,
}) {
  return (
    <_Component className={_utils.cx(_styles, "jobs-card-schedule")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {textHeader}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-985", "hide")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textDuration}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-984")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotPlatformIcon}</_Builtin.Block>
          <_Builtin.Block tag="div">{textPlatformName}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-grey-600", "hide")}
        tag="div"
      >
        {textTimeDate}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-986", "hide")}
        tag="div"
      >
        <_Builtin.Block tag="div">{"Interview Panel"}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-987")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotMemberImage}</_Builtin.Block>
          <_Builtin.Block tag="div">{textPanelMember}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-988")} tag="div">
        <_Builtin.Block tag="div">{slotStatusBadge}</_Builtin.Block>
        <_Builtin.Block tag="div" {...onClickViewScheduler}>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-blue-500",
              "text-underline",
              "cursor-pointer"
            )}
            tag="div"
          >
            {"View in Scheduler"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
