"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { CandidateFilterBody } from "./CandidateFilterBody";
import * as _utils from "./utils";
import _styles from "./CandidateFilter.module.css";

export function CandidateFilter({
  as: _Component = _Builtin.Block,
  filterCount = "1",
  filterHeaderProps = {},
  isFilterBodyVisible = false,
  isCountVisible = false,
  slotBody,
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
          {...filterHeaderProps}
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
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.4999%205.78034L0.74723%202.02768C0.532642%201.80879%200.471494%201.48632%200.589579%201.20751C0.707664%200.9287%200.981816%200.748241%201.28239%200.750013L10.7302%200.75005C11.0302%200.754265%2011.2989%200.936931%2011.4131%201.21441C11.5274%201.4919%2011.4653%201.81077%2011.2526%202.02768L7.4999%205.78034V9.93001C7.4999%2010.1841%207.37623%2010.4232%207.16755%2010.5573L5.66791%2011.5545C5.17055%2011.8861%204.4999%2011.5262%204.4999%2010.9275V5.78034ZM1.28038%201.5001L5.25008%205.46977V10.9276C5.25008%2010.9278%206.75729%209.92966%206.75729%209.92966C6.75064%209.93393%206.75008%205.46977%206.75008%205.46977L6.85991%205.35994L10.7198%201.50006L1.28038%201.5001Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block tag="div">{"Filter"}</_Builtin.Block>
          </_Builtin.Block>
          {isCountVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cl-filters-count")}
              tag="div"
            >
              {filterCount}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        {isFilterBodyVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cl-filters-content")}
            tag="div"
          >
            {slotBody ?? <CandidateFilterBody />}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
