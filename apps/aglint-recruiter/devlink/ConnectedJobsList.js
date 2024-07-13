"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ConnectedJobsList.module.css";

export function ConnectedJobsList({
  as: _Component = _Builtin.Block,
  slotTextWithIcon,
}) {
  return (
    <_Component className={_utils.cx(_styles, "connected_jobs")} tag="div">
      <Text content="Connected Jobs" color="neutral" />
      <_Builtin.Block tag="div">{slotTextWithIcon}</_Builtin.Block>
    </_Component>
  );
}
