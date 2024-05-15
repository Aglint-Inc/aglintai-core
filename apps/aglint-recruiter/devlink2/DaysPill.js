import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DaysPill.module.css";

export function DaysPill({
  as: _Component = _Builtin.Block,
  textDay = "Day 1",
  onClickDay = {},
  isActive = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1308")}
      tag="div"
      {...onClickDay}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1305")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textDay}</_Builtin.Block>
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1309")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
