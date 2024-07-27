"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { TextWithIcon } from "./TextWithIcon";
import * as _utils from "./utils";
import _styles from "./UploadCandidate.module.css";

export function UploadCandidate({
  as: _Component = _Builtin.Block,
  slotButton,
  textResumeName = "This is a global text component",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "upload-candidate-resume")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "ucr-sub-wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "ucr-text-wrap")}
          tag="div"
        >
          <Text content="Click on the button below to start scoring" />
          <Text
            weight="regular"
            content="Make sure that you are uploading the correct resume and on click of the start button candidate will be scored. It might take few minutes."
            color="neutral"
            align="center"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ucr-template-wrap")}
          tag="div"
        >
          <TextWithIcon
            textContent={textResumeName}
            iconName="draft"
            iconSize="4"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ucr-btn-wrap")}
          tag="div"
        >
          {slotButton}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
