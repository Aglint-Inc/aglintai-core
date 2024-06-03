"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./TextWithBg.module.css";

export function TextWithBg({
  as: _Component = _Builtin.Block,
  text = "Product Designer",
}) {
  return (
    <_Component className={_utils.cx(_styles, "textpill")} tag="div">
      <Text content={text} weight="" />
    </_Component>
  );
}
