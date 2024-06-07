"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
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
        <_Builtin.Block tag="div">
          {"No Matching Candidate found. Try modifying filter."}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
