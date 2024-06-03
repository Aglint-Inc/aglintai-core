"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TicketTimeDivider.module.css";

export function TicketTimeDivider({
  as: _Component = _Builtin.Block,
  textDate = "Jul 27",
}) {
  return (
    <_Component className={_utils.cx(_styles, "inde-chat-divider")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "hr-2", "grey-400")}
        tag="div"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "text-sm", "text-grey-500")}
        tag="div"
      >
        {textDate}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "hr-2", "grey-400")}
        tag="div"
      />
    </_Component>
  );
}
