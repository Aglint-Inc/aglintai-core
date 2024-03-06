import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ButtonFilter.module.css";

export function ButtonFilter({
  as: _Component = _Builtin.Block,
  onClickStatus = {},
  slotLeftIcon,
  slotRightIcon,
  textLabel = "Status",
  isDotVisible = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "schedul-type")}
      tag="div"
      {...onClickStatus}
    >
      <_Builtin.Block tag="div">{slotLeftIcon}</_Builtin.Block>
      <_Builtin.Block tag="div">{textLabel}</_Builtin.Block>
      <_Builtin.Block tag="div">{slotRightIcon}</_Builtin.Block>
      {isDotVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "dot-indicator")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
