"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./NewInterviewDetail.module.css";

export function NewInterviewDetail({
  as: _Component = _Builtin.Block,
  slotInterviewDetailPill,
  slotDropdownButton,
  textHeading = "Interviews Detail",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1469")}
      id={_utils.cx(
        _styles,
        "w-node-d536e2aa-02b2-ec82-0c9c-981b92ab7f22-92ab7f22"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1596")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "p-lr-16")}
          tag="div"
        >
          {textHeading}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotDropdownButton}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1499")}
        tag="div"
      >
        {slotInterviewDetailPill ?? (
          <SlotComp componentNeme="InterviewDetailPill" />
        )}
      </_Builtin.Block>
    </_Component>
  );
}
