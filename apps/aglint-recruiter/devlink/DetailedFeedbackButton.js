"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DetailedFeedbackButton.module.css";

export function DetailedFeedbackButton({
  as: _Component = _Builtin.Block,
  onClickDetailedFeedback = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cvs-score-detail-btn", "clickable")}
      tag="div"
      {...onClickDetailedFeedback}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "text-blue-600-2")}
        tag="div"
      >
        {"Detailed feedback"}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icon-embed")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2213%22%20viewbox%3D%220%200%2012%2013%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M11.625%202.7478C11.8091%202.7478%2011.9622%202.88046%2011.994%203.0554L12%203.1228V6.1228C12%206.32991%2011.8321%206.4978%2011.625%206.4978C11.4409%206.4978%2011.2878%206.36515%2011.256%206.19021L11.25%206.1228V4.0273L7.39017%207.88797C7.25999%208.01814%207.05792%208.03261%206.91177%207.93136L6.85983%207.88797L4.875%205.90305L0.640165%2010.138C0.50999%2010.2681%200.307922%2010.2826%200.161771%2010.1814L0.109835%2010.138C-0.0203398%2010.0078%20-0.0348037%209.80572%200.0664434%209.65957L0.109835%209.60764L4.60984%205.10764C4.74001%204.97746%204.94208%204.963%205.08823%205.06425L5.14016%205.10764L7.125%207.09255L10.719%203.4978H8.625C8.4409%203.4978%208.28779%203.36515%208.25604%203.19021L8.25%203.1228C8.25%202.93871%208.38266%202.7856%208.55759%202.75384L8.625%202.7478H11.625Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
    </_Component>
  );
}
