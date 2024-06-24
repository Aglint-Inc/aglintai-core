"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./ConfirmScheduleList.module.css";

export function ConfirmScheduleList({
  as: _Component = _Builtin.Block,
  textDate = "This is some text inside of a div block.",
  slotIconPanel,
  slotConfirmScheduleList,
}) {
  return (
    <_Component className={_utils.cx(_styles, "csl-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "csl-top-wrap")} tag="div">
        <Text content={textDate} weight="" color="neutral-11" />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "csl-body-wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "csl-slot-confirm")}
          tag="div"
        >
          {slotConfirmScheduleList ?? (
            <SlotComp componentNeme="Confirmation Schedule List Cards" />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
