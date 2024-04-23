import React from "react";
import * as _Builtin from "./_Builtin";
import { TimeRangeRequested } from "./TimeRangeRequested";
import * as _utils from "./utils";
import _styles from "./GroupedSlots.module.css";

export function GroupedSlots({
  as: _Component = _Builtin.Block,
  slotTimeRange,
  textDate = "February 17 Monday",
}) {
  return (
    <_Component className={_utils.cx(_styles, "grouped_slotlist")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "text-gray-600")} tag="div">
        {textDate}
      </_Builtin.Block>
      <_Builtin.Grid className={_utils.cx(_styles, "slots_layout")} tag="div">
        {slotTimeRange ?? (
          <>
            <TimeRangeRequested />
            <TimeRangeRequested />
            <TimeRangeRequested />
            <TimeRangeRequested />
          </>
        )}
      </_Builtin.Grid>
    </_Component>
  );
}
