"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./UploadedResume.module.css";

export function UploadedResume({
  as: _Component = _Builtin.Block,
  textCountDocument = "24 documents",
  slotPrimaryButton,
  slotUploadResumeList,
  slotSecondaryButton,
  onClickAddMore = {},
  isAddMoreVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "upload-resume-list")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "upload-resume-body")}
        tag="div"
      >
        {slotUploadResumeList ?? (
          <SlotComp componentName="UploadedResumeList" />
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "resume-upload-bottom")}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotSecondaryButton}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "upload-resume-bottom-right")}
          tag="div"
        >
          <Text content={textCountDocument} color="neutral" />
          <_Builtin.Block tag="div">{slotPrimaryButton}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
