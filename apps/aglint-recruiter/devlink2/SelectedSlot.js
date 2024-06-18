"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import { GlobalBadge } from "./GlobalBadge";
import * as _utils from "./utils";
import _styles from "./SelectedSlot.module.css";

export function SelectedSlot({
  as: _Component = _Builtin.Block,
  textDate = "24 June 2024",
  slotBadge,
}) {
  return (
    <_Component className={_utils.cx(_styles, "selectedslot")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "icon_text_grid", "width_300")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "icon_fix_wrap")}
          id={_utils.cx(
            _styles,
            "w-node-_03e87da1-2623-d1b9-20fd-f85ba0aba0b5-6aafe2d8"
          )}
          tag="div"
        >
          <GlobalIcon iconName="event" size="4" weight="light" />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "hr_wrap_4")} tag="div">
          <Text content={textDate} />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "icon_text_grid")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "icon_fix_wrap")}
          tag="div"
        >
          <GlobalIcon iconName="schedule" size="4" weight="light" />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "hr_wrap_4")} tag="div">
          {slotBadge ?? (
            <>
              <GlobalBadge color="warning" textBadge="09:00 AM - 10:00 AM" />
              <GlobalBadge color="warning" textBadge="09:00 AM - 10:00 AM" />
              <GlobalBadge color="warning" textBadge="09:00 AM - 10:00 AM" />
              <GlobalBadge color="warning" textBadge="09:00 AM - 10:00 AM" />
              <GlobalBadge color="warning" textBadge="09:00 AM - 10:00 AM" />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
