"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";

export function SectionHeader({
  as: _Component = _Builtin.Block,
  headingText = "This is a page header",
}) {
  return (
    <_Component tag="div">
      <Text content={headingText} size="4" weight="bold" />
      <Text
        size="2"
        weight=""
        content="This is a lead text"
        color="neutral"
        highContrast="true"
        align=""
      />
    </_Component>
  );
}
