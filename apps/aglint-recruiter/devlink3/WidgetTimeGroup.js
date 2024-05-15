import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./WidgetTimeGroup.module.css";

export function WidgetTimeGroup({
  as: _Component = _Builtin.Block,
  textTime = "19 Feb 2024",
  slotTimeRange,
}) {
  return (
    <_Component className={_utils.cx(_styles, "widget_time_group")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "text-lg", "fw-semibold")}
        tag="div"
      >
        {textTime}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "time_slot_layoyt")}
        tag="div"
      >
        {slotTimeRange}
      </_Builtin.Block>
    </_Component>
  );
}
