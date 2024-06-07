"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonGhost } from "./ButtonGhost";

export function BackButton({
  as: _Component = _Builtin.Block,
  onclickProps = {},
}) {
  return (
    <_Component tag="div" {...onclickProps}>
      <ButtonGhost
        onClickButton={onclickProps}
        isRightIcon={false}
        isLeftIcon={false}
        size="2"
        textButton="Back"
        color="neutral"
      />
    </_Component>
  );
}
