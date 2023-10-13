import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./WorkflowRangeBlock.module.css";

export function WorkflowRangeBlock({
  as: _Component = _Builtin.Block,
  slotRange,
  rangeText = "This is some text inside of a div block.",
  rangeTextProps = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "_wf-radio-range-block")}
      tag="div"
    >
      <_Builtin.Block tag="div">{slotRange}</_Builtin.Block>
      <_Builtin.Block tag="div" {...rangeTextProps}>
        {rangeText}
      </_Builtin.Block>
    </_Component>
  );
}
