"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ApplicantsListEmpty.module.css";

export function ApplicantsListEmpty({
  as: _Component = _Builtin.Block,
  slotLottie,
  textEmpty = "No Candidates",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cdd-list-empty-block")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cdd-list-empty-lottie-block")}
        tag="div"
      >
        {slotLottie}
      </_Builtin.Block>
      <Text content={textEmpty} weight="" color="neutral" />
    </_Component>
  );
}
