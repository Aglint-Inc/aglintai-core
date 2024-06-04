"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { NewScheduleCard } from "./NewScheduleCard";
import { ButtonGhost } from "./ButtonGhost";
import * as _utils from "./utils";
import _styles from "./YourSchedules.module.css";

export function YourSchedules({
  as: _Component = _Builtin.Block,
  slotScheduleCard,
  onClickViewSchedules = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "my-schedules")}
      id={_utils.cx(
        _styles,
        "w-node-eb3cd8e1-cb61-973f-0a51-f6ba34f8287c-34f8287c"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1466")}
        tag="div"
      >
        <Text content="My Schedules" />
        <_Builtin.Block
          className={_utils.cx(_styles, "my-schedules-card-wrapper")}
          tag="div"
        >
          {slotScheduleCard ?? <NewScheduleCard />}
        </_Builtin.Block>
      </_Builtin.Block>
      <ButtonGhost
        onClickButton={onClickViewSchedules}
        size="1"
        textButton="View all"
      />
    </_Component>
  );
}
