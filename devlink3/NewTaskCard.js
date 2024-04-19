"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NewTaskCard.module.css";

export function NewTaskCard({
  as: _Component = _Builtin.Block,
  slotCheckbox,
  slotStatus,
  slotTaskInput,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1450")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "checkbox-wrap-task")}
        tag="div"
      >
        {slotCheckbox}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1435")}
        tag="div"
      >
        {slotStatus}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1435")}
        tag="div"
      >
        {slotTaskInput}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1449")}
        id={_utils.cx(
          _styles,
          "w-node-_3f7256b9-b895-e8d9-d637-f04a2f0b39b0-2f0b39ac"
        )}
        tag="div"
      />
    </_Component>
  );
}
