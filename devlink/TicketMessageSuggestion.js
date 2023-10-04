import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TicketMessageSuggestion.module.css";

export function TicketMessageSuggestion({
  as: _Component = _Builtin.Block,
  textMessageSuggestion = "Thank You",
  onClickSuggestion = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "inde-chat-compose-option")}
      tag="div"
      {...onClickSuggestion}
    >
      {textMessageSuggestion}
    </_Component>
  );
}
