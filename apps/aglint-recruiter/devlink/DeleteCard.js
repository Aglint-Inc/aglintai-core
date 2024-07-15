"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./DeleteCard.module.css";

export function DeleteCard({
  as: _Component = _Builtin.Block,
  textHeading = "Delete this job",
  textDesc = "By deleting this entire job data will be erased from the system.",
  slotButton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "close-delete-wrap")}
      tag="div"
      box-shadow="6"
    >
      <_Builtin.Block tag="div">
        <Text content={textHeading} weight="medium" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "delete-desc-wrap")}
        tag="div"
      >
        <Text content={textDesc} weight="" color="neutral" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "close-job-btn-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotButton}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
