"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./InterviewWorkloadList.module.css";

export function InterviewWorkloadList({
  as: _Component = _Builtin.Block,
  slotWorkloadGraph,
  slotImage,
  textName = "Floyd Miles",
  textRole = "Software developer",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "interviewer-avail-body-list")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "interviewer-avail-body-item")}
        id={_utils.cx(
          _styles,
          "w-node-dcdcf301-b1b7-393d-4360-0d2d322ee158-322ee157"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ia-profile-image")}
          tag="div"
        >
          {slotImage}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <Text content={textName} weight="regular" />
          <Text content={textRole} weight="regular" color="neutral" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-ia-body-item")}
        id={_utils.cx(
          _styles,
          "w-node-dcdcf301-b1b7-393d-4360-0d2d322ee15f-322ee157"
        )}
        tag="div"
      >
        {slotWorkloadGraph}
      </_Builtin.Block>
    </_Component>
  );
}
