import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TimeRangeAvailable.module.css";

export function TimeRangeAvailable({
  as: _Component = _Builtin.Block,
  onClickPill = {},
  textTimeRange = "09:30AM to 10:00AM",
  isSelected = false,
  slotAvatarGroup,
  isAvatarGroup = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "time_range", "is_available")}
      tag="div"
      {...onClickPill}
    >
      <_Builtin.Block className={_utils.cx(_styles, "pill_text")} tag="div">
        {textTimeRange}
      </_Builtin.Block>
      {isAvatarGroup ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "slotavatargroup", "remove_height")}
          tag="div"
        >
          {slotAvatarGroup}
        </_Builtin.Block>
      ) : null}
      {isSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "selected_bg_pill")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "pill_text", "is_selected")}
            tag="div"
          >
            {textTimeRange}
          </_Builtin.Block>
          {isAvatarGroup ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "slotavatargroup")}
              tag="div"
            >
              {slotAvatarGroup}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
