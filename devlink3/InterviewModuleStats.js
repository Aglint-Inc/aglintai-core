"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { InterviewModuleStatsCard } from "./InterviewModuleStatsCard";
import * as _utils from "./utils";
import _styles from "./InterviewModuleStats.module.css";

export function InterviewModuleStats({
  as: _Component = _Builtin.Block,
  slotInterviewModuleStatsCard,
  onClickViewAllModules = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1487")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1488")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Interview module stats"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "text-blue-500",
            "text-underline",
            "cursor-pointer"
          )}
          tag="div"
          {...onClickViewAllModules}
        >
          {"View all modules"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1514")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1507")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1508")}
            id={_utils.cx(
              _styles,
              "w-node-d0086500-dc7e-dd71-8fe3-288597e9f586-97e9f57e"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Interview Module"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1508")}
            id={_utils.cx(
              _styles,
              "w-node-d0086500-dc7e-dd71-8fe3-288597e9f589-97e9f57e"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Qualified members"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1508")}
            id={_utils.cx(
              _styles,
              "w-node-d0086500-dc7e-dd71-8fe3-288597e9f58c-97e9f57e"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Trainees in shadow"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1508")}
            id={_utils.cx(
              _styles,
              "w-node-d0086500-dc7e-dd71-8fe3-288597e9f58f-97e9f57e"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Trainees in reverse shadow"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotInterviewModuleStatsCard ?? (
            <>
              <InterviewModuleStatsCard />
              <InterviewModuleStatsCard />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
