"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./InterviewLoadCard.module.css";

export function InterviewLoadCard({
  as: _Component = _Builtin.Block,
  textHeading = "This Week",
  textInterviewCounts = "2/3",
  textLabel = "Interviews",
}) {
  return (
    <_Component className={_utils.cx(_styles, "ild-card-wrap")} tag="div">
      <Text content={textHeading} size="1" weight="regular" color="neutral" />
      <_Builtin.Block
        className={_utils.cx(_styles, "ild-number-wrapper")}
        tag="div"
      >
        <Text content={textInterviewCounts} />
        <Text content={textLabel} weight="regular" color="neutral" />
      </_Builtin.Block>
    </_Component>
  );
}
