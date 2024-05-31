"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Placehold.module.css";

export function Placehold({
  as: _Component = _Builtin.Block,
  textBlockText = "this placeholder for schedule",
  slotDocumenter = "This is the default text value",
}) {
  return (
    <_Component className={_utils.cx(_styles, "placeholder_comp")} tag="div">
      <_Builtin.Block tag="div">{textBlockText}</_Builtin.Block>
    </_Component>
  );
}
