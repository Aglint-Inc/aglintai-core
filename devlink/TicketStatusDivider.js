import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TicketStatusDivider.module.css";

export function TicketStatusDivider({
  as: _Component = _Builtin.Block,
  statusText = "Received",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "inde-chat-divider", "status")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "text-sm", "text-grey-500")}
        tag="div"
      >
        {statusText}
      </_Builtin.Block>
    </_Component>
  );
}
