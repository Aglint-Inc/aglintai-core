"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ButtonGrey.module.css";

export function ButtonGrey({
  as: _Component = _Builtin.Block,
  textLabel = "This is some text inside of a div block.",
  onClickButton = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "button_primary", "greay_btn")}
      tag="div"
      {...onClickButton}
    >
      <Text content={textLabel} weight="" />
    </_Component>
  );
}
