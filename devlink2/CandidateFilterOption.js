import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateFilterOption.module.css";

export function CandidateFilterOption({
  as: _Component = _Builtin.Block,
  onclickRemove = {},
  slotInputs,
}) {
  return (
    <_Component className={_utils.cx(_styles, "cl-filter-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cl-filter-inputs-wrapper")}
        tag="div"
      >
        {slotInputs}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cl-filter-option-close")}
        tag="div"
        {...onclickRemove}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icon-embed")}
          value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewbox%3D%220%200%2010%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.71126%200.627653L5.22676%204.11672L8.71582%200.627653C8.92728%200.469059%209.12993%200.469059%209.32376%200.627653C9.48236%200.82149%209.48236%201.01533%209.32376%201.20916L5.8347%204.72466L9.32376%208.21372C9.48236%208.42518%209.48236%208.62783%209.32376%208.82166C9.12993%208.98026%208.92728%208.98026%208.71582%208.82166L5.22676%205.3326L1.71126%208.82166C1.51743%208.98026%201.32359%208.98026%201.12975%208.82166C0.97116%208.62783%200.97116%208.42518%201.12975%208.21372L4.61882%204.72466L1.12975%201.20916C0.97116%201.01533%200.97116%200.82149%201.12975%200.627653C1.32359%200.469059%201.51743%200.469059%201.71126%200.627653Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
    </_Component>
  );
}
