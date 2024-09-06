"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./CandidateSatisfactionRate.module.css";

export function CandidateSatisfactionRate({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "cd-satisfaction-rate")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "satisfaction-sub-wrap")}
        tag="div"
      >
        <Text align="center" content="" />
        <_Builtin.Block tag="div" />
        <Text
          weight="regular"
          color="neutral"
          align="center"
          content="Candidate satisfaction rate out of 5 from feedback submission collected after the interviews"
        />
      </_Builtin.Block>
    </_Component>
  );
}
