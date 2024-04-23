import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./LoadedSlotPill.module.css";

export function LoadedSlotPill({
  as: _Component = _Builtin.Block,
  textTime = "09:00 - 09:30 AM",
  slotImage,
  onClickPill = {},
  isSelectedActive = false,
  isNotSelected = true,
  isLineBorderActive = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-862")}
      tag="div"
      {...onClickPill}
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-863")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {textTime}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotImage}</_Builtin.Block>
      </_Builtin.Block>
      {isNotSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-864")}
          tag="div"
        />
      ) : null}
      {isSelectedActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-865")}
          tag="div"
        />
      ) : null}
      {isLineBorderActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-919")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
