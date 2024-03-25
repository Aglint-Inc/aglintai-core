import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ScheduleCard.module.css";

export function ScheduleCard({
  as: _Component = _Builtin.Block,
  textTitle = "Personality and culture",
  textDuration = "09:00 AM to 11:30 AM",
  textPlatformName = "Google Meet",
  slotPlatformIcon,
  textMonth = "February",
  textDate = "27",
  textDay = "FRIDAY",
  textStatus = "Upcoming",
  colorPropsText = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "schedule_card")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "schedule_dateblcok")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "data_wrap")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule_month")}
            tag="div"
          >
            {textMonth}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "scheduledate")}
            tag="div"
          >
            {textDate}
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "day")} tag="div">
            {textDay}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "schedulestatus")}
          tag="div"
          {...colorPropsText}
        >
          {textStatus}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "schedule_details")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textTitle}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{textDuration}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "meeting_type")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "meeting_type_logo")}
            tag="div"
          >
            {slotPlatformIcon}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{textPlatformName}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
