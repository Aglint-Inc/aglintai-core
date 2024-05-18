"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NewTabPill.module.css";

export function NewTabPill({
  as: _Component = _Builtin.Block,
  isPillActive = false,
  onClickPill = {},
  textLabel = "Job Description",
  slotStartIcon,
  slotEndIcon,
  isEndIconVisible = false,
  isStartIconVisible = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1681")}
      tag="div"
      {...onClickPill}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1680")}
        tag="div"
      >
        {isStartIconVisible ? (
          <_Builtin.Block tag="div">{slotStartIcon}</_Builtin.Block>
        ) : null}
        <_Builtin.Block tag="div">{textLabel}</_Builtin.Block>
        {isEndIconVisible ? (
          <_Builtin.Block tag="div">{slotEndIcon}</_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isPillActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1682")}
          tag="div"
        >
          {isStartIconVisible ? (
            <_Builtin.Block tag="div">{slotStartIcon}</_Builtin.Block>
          ) : null}
          <_Builtin.Block tag="div">{textLabel}</_Builtin.Block>
          {isEndIconVisible ? (
            <_Builtin.Block tag="div">{slotEndIcon}</_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
