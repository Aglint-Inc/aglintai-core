"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RecentDeclineList.module.css";

export function RecentDeclineList({
  as: _Component = _Builtin.Block,
  slotImage,
  textDesc = "Medical Emergency ",
  slotIcon,
  textTime = "10 Min ago",
  textName = "Kristin Watson",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1779")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1780")}
        tag="div"
      >
        {slotImage}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1781")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1778")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {textName}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {textTime}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1777")}
          tag="div"
        >
          <_Builtin.Block tag="div">{textDesc}</_Builtin.Block>
          <_Builtin.Block tag="div">{slotIcon}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
