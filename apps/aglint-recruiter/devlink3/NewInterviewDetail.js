"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
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
      className={_utils.cx(_styles, "sd_widget_wrapper")}
      id={_utils.cx(
        _styles,
        "w-node-d536e2aa-02b2-ec82-0c9c-981b92ab7f22-92ab7f22"
      )}
      tag="div"
      col-span="2"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "sd_widget_header")}
        tag="div"
      >
        <Text content={textHeading} weight="medium" />
        <_Builtin.Block tag="div">
          {slotDropdownButton ?? <SlotComp componentNeme="dropdown" />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_interview_detail_pill")}
        tag="div"
      >
        {slotInterviewDetailPill ?? (
          <SlotComp componentNeme="InterviewDetailPill" />
        )}
      </_Builtin.Block>
    </_Component>
  );
}
