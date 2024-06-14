"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./UploadedResumeList.module.css";

export function UploadedResumeList({
  as: _Component = _Builtin.Block,
  textName = "resume_name_of_candidate.Pdf",
  textSize = "360 kb",
  isPdfIconVisible = true,
  isDocVisible = false,
  onClickDelete = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "upload-resume-card")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "upload-resume-left")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <GlobalIcon iconName="" size="6" weight="thin" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "upload-resume-left-text")}
          tag="div"
        >
          <Text content={textName} />
          <Text content={textSize} color="neutral" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div" {...onClickDelete}>
        <GlobalIcon iconName="close" size="4" weight="thin" />
      </_Builtin.Block>
    </_Component>
  );
}
