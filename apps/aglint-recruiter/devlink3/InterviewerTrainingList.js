"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./InterviewerTrainingList.module.css";

export function InterviewerTrainingList({
  as: _Component = _Builtin.Block,
  slotImage,
  textName = "Floyd Miles",
  textRole = "Software developer",
  slotInterviewPool,
  slotTrainingProgress,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "interviewer-trainer-body-list")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "interviewer-avail-body-item")}
        id={_utils.cx(
          _styles,
          "w-node-_8ecc5917-f26d-9769-6310-27e4f1f413e5-f1f413e4"
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
        className={_utils.cx(_styles, "slot-itl-body-item")}
        id={_utils.cx(
          _styles,
          "w-node-_8ecc5917-f26d-9769-6310-27e4f1f413ec-f1f413e4"
        )}
        tag="div"
      >
        {slotInterviewPool}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-itl-body-item")}
        id={_utils.cx(
          _styles,
          "w-node-bd95e31f-9bd6-745d-80b2-014bafd37755-f1f413e4"
        )}
        tag="div"
      >
        {slotTrainingProgress}
      </_Builtin.Block>
    </_Component>
  );
}
