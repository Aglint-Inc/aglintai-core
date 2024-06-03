"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AnalysisPill.module.css";

export function AnalysisPill({
  as: _Component = _Builtin.Block,
  isHigh = true,
  isAverage = false,
  isPoor = false,
  score = "--",
  scoreProps = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "analysis-pill")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "icon-block", "_8x8")}
        tag="div"
      >
        {isHigh ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "svg-icon")}
            value="%3Csvg%20width%3D%228%22%20height%3D%228%22%20viewbox%3D%220%200%208%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4%200.5L7.4641%207.25H0.535898L4%200.5Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        ) : null}
        {isAverage ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "svg-icon")}
            value="%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewbox%3D%220%200%206%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%226%22%20height%3D%226%22%20transform%3D%22matrix(-1%200%200%20-1%206%206)%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        ) : null}
        {isPoor ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "svg-icon")}
            value="%3Csvg%20width%3D%228%22%20height%3D%228%22%20viewbox%3D%220%200%208%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4%207.5L0.535898%200.75L7.4641%200.75L4%207.5Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-sm")}
        tag="div"
        {...scoreProps}
      >
        {score}
      </_Builtin.Block>
    </_Component>
  );
}
