"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./LoginAtsInfo.module.css";

export function LoginAtsInfo({
  as: _Component = _Builtin.Block,
  slotRadioButtons,
  slotAdditionalInfo,
  slotOthers,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "sl-ats-wrapper", "sl-ats-padding")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {"Are you currently using any ATS system?"}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-388")}
          tag="div"
        >
          {slotRadioButtons ?? <SlotComp componentName="Radio Group" />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-425")}
          tag="div"
        >
          {slotOthers ?? <SlotComp componentName="slotOther" />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-414")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-389")}
          tag="div"
        >
          {slotAdditionalInfo ?? <SlotComp componentName="Aditinal Info" />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
