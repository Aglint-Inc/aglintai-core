import React from "react";
import * as _Builtin from "./_Builtin";
import { CandidateSortBody } from "./CandidateSortBody";
import * as _utils from "./utils";
import _styles from "./CandidateSort.module.css";

export function CandidateSort({
  as: _Component = _Builtin.Block,
  isSortBodyVisible = false,
  slotBody,
  onclickSort = {},
  isSortVisible = false,
  sortLabelText = "Resume Match Asc",
}) {
  return (
    <_Component className={_utils.cx(_styles, "cl-filters")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cl-filters-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cl-filters-top")}
          tag="div"
          {...onclickSort}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cl-filters-trigger", "clickable")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "icon-block")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "svg-icon")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.95006%201.25702L2.85355%204.35352C2.65829%204.54878%202.34171%204.54878%202.14645%204.35352C1.95118%204.15826%201.95118%203.84168%202.14645%203.64641L5.24645%200.546414C5.64171%200.151152%206.25829%200.151152%206.6479%200.540847L9.8479%203.64085C10.0462%203.83299%2010.0513%204.14953%209.85912%204.34786C9.66698%204.5462%209.35044%204.55123%209.1521%204.35909L5.95006%201.25702ZM9.1521%207.64085C9.35044%207.44871%209.66698%207.45373%209.85912%207.65207C10.0513%207.85041%2010.0462%208.16695%209.8479%208.35909L6.65355%2011.4535C6.25829%2011.8488%205.64171%2011.8488%205.24645%2011.4535L2.14645%208.35352C1.95118%208.15826%201.95118%207.84168%202.14645%207.64641C2.34171%207.45115%202.65829%207.45115%202.85355%207.64641L5.95017%2010.743C5.95067%2010.7424%209.1521%207.64085%209.1521%207.64085Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block tag="div">{"Sort"}</_Builtin.Block>
          </_Builtin.Block>
          {isSortVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "sort-label-text", "fw-semibold")}
              tag="div"
            >
              {sortLabelText}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        {isSortBodyVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cl-filters-content", "sort")}
            tag="div"
          >
            {slotBody ?? <CandidateSortBody />}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
