import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TicketEmptyState.module.css";

export function TicketEmptyState({
  as: _Component = _Builtin.Block,
  slotLottie,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "il-empty-state-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "il-empty-lottie")}
        tag="div"
      >
        {slotLottie}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-grey-600", "fw-semibold")}
        tag="div"
      >
        {"No Tickets found"}
      </_Builtin.Block>
    </_Component>
  );
}
