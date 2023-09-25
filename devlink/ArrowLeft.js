import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ArrowLeft.module.css";

export function ArrowLeft({
  as: _Component = _Builtin.Block,
  onClickArrowLeft = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "side_menu_collapse")}
      tag="div"
      id="arrow-left"
      {...onClickArrowLeft}
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_flex", "rotate")}
        value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewbox%3D%220%200%2010%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.03879%208.62796C2.89415%208.48332%202.87808%208.2588%202.99057%208.09641L3.03879%208.03871L6.07758%205L3.03879%201.96129C2.89415%201.81666%202.87808%201.59214%202.99057%201.42975L3.03879%201.37204C3.18343%201.2274%203.40795%201.21133%203.57034%201.32383L3.62804%201.37204L6.96138%204.70537C7.10601%204.85001%207.12209%205.07453%207.00959%205.23692L6.96138%205.29463L3.62804%208.62796C3.46532%208.79068%203.20151%208.79068%203.03879%208.62796Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
      />
    </_Component>
  );
}
