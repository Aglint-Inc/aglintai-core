"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./ModuleCard.module.css";

export function ModuleCard({
  as: _Component = _Builtin.Block,
  textName = "Screening",
  onClickCard = {},
  slotIcon,
  slotEnableDisable,
  isWarning = false,
  isAlert = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "module_card")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block className={_utils.cx(_styles, "module_name")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "icon")}
          id={_utils.cx(
            _styles,
            "w-node-_53814ccb-8d37-a9f3-f6e2-d636ceebd158-c0766ccb"
          )}
          tag="div"
        >
          {slotIcon}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textName}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_enable_disable")}
          id={_utils.cx(
            _styles,
            "w-node-ccf07a20-7102-e196-63d2-1a42a3a4a063-c0766ccb"
          )}
          tag="div"
        >
          {slotEnableDisable}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "module_params")}
          tag="div"
        >
          {isAlert ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "errorr_warning-copy")}
              tag="div"
            >
              <GlobalIcon iconName="info" size="5" />
            </_Builtin.Block>
          ) : null}
          {isWarning ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "errorr_warning")}
              tag="div"
            >
              <GlobalIcon iconName="warning" color="error" size="5" />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
