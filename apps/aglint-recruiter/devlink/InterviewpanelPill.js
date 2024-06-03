"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewpanelPill.module.css";

export function InterviewpanelPill({
  as: _Component = _Builtin.Block,
  slotProfileImage,
  textName = "Adam Willians",
  isSelected = false,
  isOptional = true,
  isNotSelected = true,
  onClickPill = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-854")}
      tag="div"
      {...onClickPill}
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-855")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-856")}
          tag="div"
        >
          {slotProfileImage}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{textName}</_Builtin.Block>
      </_Builtin.Block>
      {isSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "active-panel")}
          tag="div"
        />
      ) : null}
      {isNotSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "dash-line-active")}
          tag="div"
        />
      ) : null}
      {isOptional ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "disable-panel")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
