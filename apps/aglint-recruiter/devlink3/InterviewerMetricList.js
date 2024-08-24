"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./InterviewerMetricList.module.css";

export function InterviewerMetricList({
  as: _Component = _Builtin.Block,
  slotImage,
  textName = "This is a global text component",
  textRole = "This is a global text component",
  textCount = "1.",
  countHours = "24",
  countInterviews = "24",
  countDeclines = "24",
  onClickCard = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "metrics-table-body-item")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "metrics-body-item-left")}
        tag="div"
      >
        <Text content={textCount} />
        <_Builtin.Block
          className={_utils.cx(_styles, "metrics-table-user-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "metrics-image-table")}
            tag="div"
          >
            {slotImage}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <Text content={textName} size="1" />
            <Text
              content={textRole}
              size="1"
              weight="regular"
              color="neutral"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "metrics-table-right-body")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "metrics-table-count-wrap")}
          tag="div"
        >
          <Text content={countHours} size="1" />
          <_Builtin.Block
            className={_utils.cx(_styles, "metrics-unit")}
            tag="div"
          >
            {"Hours"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "metrics-table-count-wrap")}
          tag="div"
        >
          <Text content={countInterviews} size="1" color="success" />
          <_Builtin.Block
            className={_utils.cx(_styles, "metrics-unit")}
            tag="div"
          >
            {"Interviews"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "metrics-table-count-wrap")}
          tag="div"
        >
          <Text content={countDeclines} size="1" color="error" />
          <_Builtin.Block
            className={_utils.cx(_styles, "metrics-unit")}
            tag="div"
          >
            {"Declines"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
