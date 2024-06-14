"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ConflictReason.module.css";

export function ConflictReason({
  as: _Component = _Builtin.Block,
  textConflictReason = "some reasons for t",
}) {
  return (
    <_Component className={_utils.cx(_styles, "conflict_reason")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "flex-horizontal", "gap-2")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%228%22%20height%3D%228%22%20viewbox%3D%220%200%208%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4%208C3.27083%207.98958%202.60417%207.8125%202%207.46875C1.39583%207.11458%200.90625%206.625%200.53125%206C0.177083%205.36458%200%204.69792%200%204C0%203.30208%200.177083%202.63542%200.53125%202C0.90625%201.375%201.39583%200.885417%202%200.53125C2.60417%200.1875%203.27083%200.0104167%204%200C4.72917%200.0104167%205.39583%200.1875%206%200.53125C6.60417%200.885417%207.09375%201.375%207.46875%202C7.82292%202.63542%208%203.30208%208%204C8%204.69792%207.82292%205.36458%207.46875%206C7.09375%206.625%206.60417%207.11458%206%207.46875C5.39583%207.8125%204.72917%207.98958%204%208Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <Text content={textConflictReason} weight="" color="neutral-11" />
      </_Builtin.Block>
    </_Component>
  );
}
