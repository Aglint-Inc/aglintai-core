"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ConfirmScheduleListCard } from "./ConfirmScheduleListCard";
import * as _utils from "./utils";
import _styles from "./ConfirmScheduleList.module.css";

export function ConfirmScheduleList({
  as: _Component = _Builtin.Block,
  textDate = "This is some text inside of a div block.",
  slotIconPanel,
  slotConfirmScheduleList,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1760")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1761")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textDate}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1762")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1763")}
          tag="div"
        >
          {slotConfirmScheduleList ?? (
            <>
              <ConfirmScheduleListCard />
              <ConfirmScheduleListCard />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
