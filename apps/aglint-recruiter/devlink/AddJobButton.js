"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AddJobButton.module.css";

export function AddJobButton({
  as: _Component = _Builtin.Block,
  onClickAddJob = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-732")}
      tag="div"
      {...onClickAddJob}
    >
      <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
        {"Add to Job"}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icon-embed")}
          value="%3Csvg%20width%3D%2211%22%20height%3D%227%22%20viewbox%3D%220%200%2011%207%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.64102%205.84062C5.4806%205.98646%205.32018%205.98646%205.15977%205.84062L0.959765%201.64062C0.813932%201.48021%200.813932%201.31979%200.959765%201.15937C1.12018%201.01354%201.2806%201.01354%201.44102%201.15937L5.40039%205.09687L9.35977%201.15937C9.52018%201.01354%209.6806%201.01354%209.84102%201.15937C9.98685%201.31979%209.98685%201.48021%209.84102%201.64062L5.64102%205.84062Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
    </_Component>
  );
}
