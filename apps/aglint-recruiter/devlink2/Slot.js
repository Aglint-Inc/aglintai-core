"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function Slot({ as: _Component = _Builtin.Block }) {
  return (
    <_Component tag="div">
      <_Builtin.Block tag="div" />
    </_Component>
  );
}
