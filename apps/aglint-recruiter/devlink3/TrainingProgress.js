"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./TrainingProgress.module.css";

export function TrainingProgress({
  as: _Component = _Builtin.Block,
  onClickViewAllInterviewers = {},
  slotTrainingProgressList,
  isViewAllVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1487", "height-430")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1488")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Training Progress"}
        </_Builtin.Block>
        {isViewAllVisible ? (
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-blue-500",
              "text-underline",
              "cursor-pointer"
            )}
            tag="div"
            {...onClickViewAllInterviewers}
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
          className={_utils.cx(_styles, "div-block-1507", "progress")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1508")}
            id={_utils.cx(
              _styles,
              "w-node-f51aea9e-3a98-2b3d-2e1f-0f944d5a854c-4d5a8544"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Interviewer"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1508")}
            id={_utils.cx(
              _styles,
              "w-node-f51aea9e-3a98-2b3d-2e1f-0f944d5a854f-4d5a8544"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Interview Type"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1508")}
            id={_utils.cx(
              _styles,
              "w-node-f51aea9e-3a98-2b3d-2e1f-0f944d5a8552-4d5a8544"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-500")}
              tag="div"
            >
              {"Training History"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotTrainingProgressList ?? (
            <>
              <SlotComp componentNeme="TrainingProgressList" />
              <SlotComp componentNeme="TrainingProgressLoader" />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
