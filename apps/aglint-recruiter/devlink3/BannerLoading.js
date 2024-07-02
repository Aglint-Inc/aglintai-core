"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
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
        <Text
          content="Aglint Ai is generating criteria to score resume"
          weight="medium"
          color="neutral"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "right_buttons")}
        tag="div"
      />
    </_Component>
  );
}
