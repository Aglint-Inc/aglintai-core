"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./NoData.module.css";

export function NoData({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "empty")} tag="div">
      <_Builtin.Block tag="div" icon-size="xxl">
        {"monitoring"}
      </_Builtin.Block>
      <Text weight="" color="neutral-11" content="No Data Available" />
    </_Component>
  );
}
