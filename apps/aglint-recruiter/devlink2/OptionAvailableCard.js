"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AvailableOptionCardDate } from "./AvailableOptionCardDate";
import * as _utils from "./utils";
import _styles from "./OptionAvailableCard.module.css";

export function OptionAvailableCard({
  as: _Component = _Builtin.Block,
  isActive = true,
  slotCardDate,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1111")}
      id={_utils.cx(
        _styles,
        "w-node-_40ea1610-d770-949a-49ed-f0ed1ad30fda-1ad30fda"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1269")}
        tag="div"
      >
        {slotCardDate ?? <AvailableOptionCardDate />}
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1109")}
          tag="div"
        />
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1268")}
        tag="div"
      />
    </_Component>
  );
}
