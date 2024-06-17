"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./CandidateInterviewButton.module.css";

export function CandidateInterviewButton({
  as: _Component = _Builtin.Block,
  onClickButton = {},
  textButton = "Interview",
  slotIcon,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "candidate-interview-button")}
      tag="div"
      {...onClickButton}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate-interview-text")}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotIcon}</_Builtin.Block>
        <Text content={textButton} color="accent" weight="medium" />
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "icons")}
        value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.25781%209.25781C6.08594%209.41406%205.91406%209.41406%205.74219%209.25781L1.24219%204.75781C1.08594%204.58594%201.08594%204.41406%201.24219%204.24219C1.41406%204.08594%201.58594%204.08594%201.75781%204.24219L6%208.46094L10.2422%204.24219C10.4141%204.08594%2010.5859%204.08594%2010.7578%204.24219C10.9141%204.41406%2010.9141%204.58594%2010.7578%204.75781L6.25781%209.25781Z%22%20fill%3D%22var(--accent-a9)%22%2F%3E%0A%3C%2Fsvg%3E"
      />
    </_Component>
  );
}
