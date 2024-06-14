"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./LoadingGenerate.module.css";

export function LoadingGenerate({
  as: _Component = _Builtin.Block,
  slotLottie,
}) {
  return (
    <_Component className={_utils.cx(_styles, "loading-generate")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "lottie-slot-ai-generate")}
        tag="div"
      >
        {slotLottie}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-kale-800-2")}
        tag="div"
      >
        {"Generating Job description"}
      </_Builtin.Block>
    </_Component>
  );
}
