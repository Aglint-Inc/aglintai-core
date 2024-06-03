"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ScreeningStatus.module.css";

export function ScreeningStatus({
  as: _Component = _Builtin.Block,
  slotIcon,
  textStatus = "--",
  textDuration = "--",
  isDurationVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "scr-status-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "icon-block", "_24x24")}
        tag="div"
      >
        {slotIcon}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "scr-status-text-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "fw-semibold")}
          tag="div"
        >
          {textStatus}
        </_Builtin.Block>
        {isDurationVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "text-gray-600")}
            tag="div"
          >
            {textDuration}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
