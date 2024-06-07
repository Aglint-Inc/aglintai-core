"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./CandidateEmpty.module.css";

export function CandidateEmpty({
  as: _Component = _Builtin.Block,
  slotLottie,
}) {
  return (
    <_Component className={_utils.cx(_styles, "database-empty")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "database-subempty")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-607")}
          tag="div"
        >
          {slotLottie}
        </_Builtin.Block>
        <Text
          content="No Matching Candidate found. Try modifying filter."
          color="neutral"
        />
      </_Builtin.Block>
    </_Component>
  );
}
