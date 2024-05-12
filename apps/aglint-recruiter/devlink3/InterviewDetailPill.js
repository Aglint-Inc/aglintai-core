"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewDetailPill.module.css";

export function InterviewDetailPill({
  as: _Component = _Builtin.Block,
  propsWidthGreen = {},
  propsWidthGrey = {},
  textMonth = "Jan",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1500")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "text-grey_600", "width-80px")}
        tag="div"
      >
        {textMonth}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1502")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1501")}
          tag="div"
          {...propsWidthGreen}
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1503")}
          tag="div"
          {...propsWidthGrey}
        />
      </_Builtin.Block>
    </_Component>
  );
}
