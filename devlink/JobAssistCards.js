import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JobAssistCards.module.css";

export function JobAssistCards({
  as: _Component = _Builtin.Block,
  textDesc = "List all candidates with a bachelor's degree in Computer Science.",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "initial-prompt-block")}
      tag="div"
    >
      <_Builtin.Block tag="div">{textDesc}</_Builtin.Block>
    </_Component>
  );
}
