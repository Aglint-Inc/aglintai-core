"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./JobDescriptionModal.module.css";

export function JobDescriptionModal({
  as: _Component = _Builtin.Block,
  slotJobDescription,
  slotButtonPrimaryRegular,
  slotClose,
}) {
  return (
    <_Component className={_utils.cx(_styles, "candidate-job-modal")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "jdm-header-wrap")}
        tag="div"
      >
        <Text content="Paste your job description" weight="medium" />
        <_Builtin.Block tag="div">{slotClose}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-input-job-description")}
        tag="div"
      >
        {slotJobDescription}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "search-wrap-job")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-992")}
          tag="div"
        >
          {slotButtonPrimaryRegular}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
