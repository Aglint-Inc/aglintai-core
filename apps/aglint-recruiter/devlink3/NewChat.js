"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SuggetionCard } from "./SuggetionCard";
import * as _utils from "./utils";
import _styles from "./NewChat.module.css";

export function NewChat({
  as: _Component = _Builtin.Block,
  onClickSchedulerAgent = {},
  slotSuggetionCard,
  slotIcon,
  textTitle = "Hello how can I help you with schedule related things.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "welcome_message")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "title_top")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "task_type_icon-copy")}
          tag="div"
        >
          {slotIcon}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {textTitle}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Grid className={_utils.cx(_styles, "grid-2-copy")} tag="div">
        {slotSuggetionCard ?? (
          <>
            <SuggetionCard />
            <SuggetionCard />
            <SuggetionCard />
            <SuggetionCard />
            <SuggetionCard />
            <SuggetionCard />
          </>
        )}
      </_Builtin.Grid>
    </_Component>
  );
}
