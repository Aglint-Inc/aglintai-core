import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewLoad.module.css";

export function InterviewLoad({
  as: _Component = _Builtin.Block,
  slotDailyLimit,
  slotWeeklyLimit,
}) {
  return (
    <_Component className={_utils.cx(_styles, "schedule_settings")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "setting_wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "setting_title")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Interview Load"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-500")}
            tag="div"
          >
            {"Setup maximum interviews per day and week."}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Grid className={_utils.cx(_styles, "load_grid")} tag="div">
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-_55b24612-1348-951b-c98a-0357678cca00-678cc9f8"
            )}
            tag="div"
          >
            {"Daily Limit"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_hr_input")}
            id={_utils.cx(
              _styles,
              "w-node-_55b24612-1348-951b-c98a-0357678cca02-678cc9f8"
            )}
            tag="div"
          >
            {slotDailyLimit}
          </_Builtin.Block>
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-_55b24612-1348-951b-c98a-0357678cca03-678cc9f8"
            )}
            tag="div"
          >
            {"Weekly Limit"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_hr_input")}
            id={_utils.cx(
              _styles,
              "w-node-_55b24612-1348-951b-c98a-0357678cca05-678cc9f8"
            )}
            tag="div"
          >
            {slotWeeklyLimit}
          </_Builtin.Block>
        </_Builtin.Grid>
      </_Builtin.Block>
    </_Component>
  );
}
