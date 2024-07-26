"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { AtsCard } from "./AtsCard";
import * as _utils from "./utils";
import _styles from "./AshbyAtsJob.module.css";

export function AshbyAtsJob({
  as: _Component = _Builtin.Block,
  textNumberOfJobs = "This is some text inside of a div block.",
  isImportDisable = false,
  onClickImport = {},
  onClickAll = {},
  onClickPublished = {},
  onClickClosed = {},
  slotAtsCard,
}) {
  return (
    <_Component className={_utils.cx(_styles, "ats-wrappers-outer")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "aaj-header-wrap")}
        tag="div"
      >
        <Text content="Select a job from Ashby to import." />
        <_Builtin.Block className={_utils.cx(_styles, "relative-1")} tag="div">
          <Text content={textNumberOfJobs} color="neutral-12" size="1" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-ats-cards-wrappers")}
        tag="div"
      >
        {slotAtsCard ?? <AtsCard />}
      </_Builtin.Block>
    </_Component>
  );
}
