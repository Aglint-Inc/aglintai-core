"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { InterviewModuleCard } from "./InterviewModuleCard";
import * as _utils from "./utils";
import _styles from "./InterviewModuleTable.module.css";

export function InterviewModuleTable({
  as: _Component = _Builtin.Block,
  slotInterviewModuleCard,
  slotFilter,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1064")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1317")}
        tag="div"
      >
        {slotFilter}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "header-body-sublink")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "header-col")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Interview Type"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "header-col")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Members"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "header-col", "center")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Upcoming"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "header-col", "center")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Completed"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1068")}
        tag="div"
      >
        {slotInterviewModuleCard ?? <InterviewModuleCard />}
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%2F*%0A%5Bclass*%3D%22InterviewModuleTable_div-block-1068__%22%5D%7B%0Aheight%3Acalc(100v)%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
