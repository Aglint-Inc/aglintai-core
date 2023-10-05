import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./PrioritySmall.module.css";

export function PrioritySmall({
  as: _Component = _Builtin.Block,
  colorPropsPriorityText = {},
  textPriorityLevel = "High",
  slotPriorityIcon,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-446")} tag="div">
      <_Builtin.Block tag="div" {...colorPropsPriorityText}>
        {textPriorityLevel}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "inde-priority-icon")}
        tag="div"
      >
        {slotPriorityIcon}
      </_Builtin.Block>
    </_Component>
  );
}
