"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./AvailabilityEmpty.module.css";

export function AvailabilityEmpty({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "ae-wrapper")} tag="div">
      <Text content="" weight="" color="neutral" />
    </_Component>
  );
}
