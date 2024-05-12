import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TimeRangeDisabled.module.css";

export function TimeRangeDisabled({
  as: _Component = _Builtin.Block,
  textTimeRange = "09:30AM to 10:00AM",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "time_range", "is_disabled")}
      tag="div"
    >
      <_Builtin.Block tag="div">{textTimeRange}</_Builtin.Block>
    </_Component>
  );
}
