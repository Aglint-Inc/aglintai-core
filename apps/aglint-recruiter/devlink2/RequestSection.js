"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { RequestCard } from "./RequestCard";
import * as _utils from "./utils";
import _styles from "./RequestSection.module.css";

export function RequestSection({
  as: _Component = _Builtin.Block,
  slotRequestCard,
  textSectionHeader = "This is a global text component",
}) {
  return (
    <_Component className={_utils.cx(_styles, "req-left-body-card")} tag="div">
      <Text content={textSectionHeader} />
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-req-card-wrapper")}
        tag="div"
      >
        {slotRequestCard ?? <RequestCard />}
      </_Builtin.Block>
    </_Component>
  );
}
