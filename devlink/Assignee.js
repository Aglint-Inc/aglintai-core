import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Assignee.module.css";

export function Assignee({
  as: _Component = _Builtin.Block,
  slotAssigneeImage,
  textAssigneeName = "Otis Milburn",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "il-assignee", "content", "assignee")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "il-assignee-image")}
        tag="div"
      >
        {slotAssigneeImage}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-color-black")}
        tag="div"
      >
        {textAssigneeName}
      </_Builtin.Block>
    </_Component>
  );
}
