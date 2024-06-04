"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./InterviewModuleStats.module.css";

export function InterviewModuleStats({
  as: _Component = _Builtin.Block,
  slotInterviewModuleStatsCard,
  onClickViewAllModules = {},
  isViewAllVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1487", "over-hidden")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "dashboard-widget-header", "header")}
        tag="div"
      >
        <Text content="" />
        {isViewAllVisible ? (
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
            {"View all"}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1514")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1507", "height-56")}
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
            <Text
              weight="medium"
              size="2"
              color="neutral"
              content="Interview Type"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1508")}
            id={_utils.cx(
              _styles,
              "w-node-d0086500-dc7e-dd71-8fe3-288597e9f589-97e9f57e"
            )}
            tag="div"
          >
            <Text
              weight="medium"
              size="2"
              color="neutral"
              content="Qualified"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1508")}
            id={_utils.cx(
              _styles,
              "w-node-d0086500-dc7e-dd71-8fe3-288597e9f58c-97e9f57e"
            )}
            tag="div"
          >
            <Text weight="medium" size="2" color="neutral" content="Training" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1566")}
          tag="div"
        >
          {slotInterviewModuleStatsCard ?? (
            <>
              <SlotComp componentNeme="InterviewModuleStatsCard" />
              <SlotComp componentNeme="InterviewModuleStatsCard" />
              <SlotComp componentNeme="InterviewStatsLoader" />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
