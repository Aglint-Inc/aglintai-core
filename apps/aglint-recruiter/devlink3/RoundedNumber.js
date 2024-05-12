import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RoundedNumber.module.css";

export function RoundedNumber({
  as: _Component = _Builtin.Block,
  isActive = false,
  textNumber = "1",
  onClickRound = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "round_pill")}
      tag="div"
      {...onClickRound}
    >
      <_Builtin.Block tag="div">{textNumber}</_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "round_pill", "active-pill")}
          tag="div"
        >
          <_Builtin.Block tag="div">{textNumber}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
