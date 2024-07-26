"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { AtsCard } from "./AtsCard";
import * as _utils from "./utils";
import _styles from "./GreenhouseAts.module.css";

export function GreenhouseAts({
  as: _Component = _Builtin.Block,
  onClickAll = {},
  onClickActive = {},
  onClickClosed = {},
  slotSearch,
  textNumberofJobs = "This is some text inside of a div block.",
  onClickImport = {},
  isImportDisable = false,
  isAllActive = false,
  isActiveActive = false,
  isLiveActive = false,
  slotAtsCard,
  isSelected = false,
  onClickLive = {},
  isClosedActive = false,
  isAtsMenuVisible = true,
  slotNewTab,
}) {
  return (
    <_Component className={_utils.cx(_styles, "ats-wrappers-outer")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "ga-ats-wrap")} tag="div">
        <Text
          content="Select a job from Greenhouse for import."
          weight="medium"
        />
        {isAtsMenuVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "ats-import-wrappers")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotNewTab}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "relative-1")}
              tag="div"
            >
              <Text content={textNumberofJobs} color="neutral" />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
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
