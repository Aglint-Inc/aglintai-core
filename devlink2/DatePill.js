import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DatePill.module.css";

export function DatePill({
  as: _Component = _Builtin.Block,
  isActive = false,
  textDate = "16 April 2024",
  onClickDate = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1302")}
      tag="div"
      {...onClickDate}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1303")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textDate}
        </_Builtin.Block>
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1304")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
