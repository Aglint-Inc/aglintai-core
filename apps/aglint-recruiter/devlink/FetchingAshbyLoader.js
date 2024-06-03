"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./FetchingAshbyLoader.module.css";

export function FetchingAshbyLoader({
  as: _Component = _Builtin.Block,
  slotLottie,
}) {
  return (
    <_Component className={_utils.cx(_styles, "fetching-candi")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "fetching-candi-sub-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotLottie}</_Builtin.Block>
        <Text content="Getting Candidates from ashby." weight="bold" />
        <Text content="This may take a while" color="neutral" />
      </_Builtin.Block>
    </_Component>
  );
}
