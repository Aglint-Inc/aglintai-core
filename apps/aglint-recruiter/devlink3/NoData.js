"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./NoData.module.css";

export function NoData({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "empty")} tag="div">
      <GlobalIcon size="9" weight="thin" iconName="monitoring" />
      <Text weight="" color="neutral-11" content="No Data Available" />
    </_Component>
  );
}
