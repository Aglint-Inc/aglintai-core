import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ScheduleInfoBlock.module.css";

export function ScheduleInfoBlock({
  as: _Component = _Builtin.Block,
  isDuration = false,
  textDuration = "30 Minitues",
  textMeetingType = "Google Meet",
  textDateTimeOrSlots = "2024 Feb 20 at 09:30 AM",
  slotScheduleTypeIcon,
}) {
  return (
    <_Component className={_utils.cx(_styles, "schedule_info")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "meeting_type")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "schedule_type_logo")}
          tag="div"
        >
          {slotScheduleTypeIcon}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{textMeetingType}</_Builtin.Block>
        {isDuration ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {textDuration}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block tag="div">{textDateTimeOrSlots}</_Builtin.Block>
    </_Component>
  );
}
