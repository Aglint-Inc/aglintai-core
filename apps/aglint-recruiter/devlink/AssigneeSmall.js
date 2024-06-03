"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AssigneeSmall.module.css";

export function AssigneeSmall({
  as: _Component = _Builtin.Block,
  slotAssignedToImage,
  textAssignedtoName = "Otis Milburn",
}) {
  return (
    <_Component className={_utils.cx(_styles, "inde-assignee-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "inde-assignee-image")}
        tag="div"
      >
        {slotAssignedToImage}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-sm", "color-black")}
        tag="div"
      >
        {textAssignedtoName}
      </_Builtin.Block>
    </_Component>
  );
}
