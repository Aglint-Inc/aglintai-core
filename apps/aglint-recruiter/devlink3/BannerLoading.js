"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./BannerLoading.module.css";

export function BannerLoading({ as: _Component = _Builtin.Block, slotLoader }) {
  return (
    <_Component
      className={_utils.cx(_styles, "discard-btn-score", "grey-copy")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-699")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "loading_icon")}
          tag="div"
        >
          {slotLoader}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {"Generating profile score. Please wait before publishing."}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "right_buttons")}
        tag="div"
      />
    </_Component>
  );
}
