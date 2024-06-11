"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonGhost } from "./ButtonGhost";

export function AddMoreResumeButton({
  as: _Component = _Builtin.Block,
  onClickButton = {},
}) {
  return (
    <_Component tag="div">
      <ButtonGhost
        onClickButton={onClickButton}
        isRightIcon={false}
        textButton="Add More Resume"
        size="2"
        isLeftIcon={false}
      />
    </_Component>
  );
}
