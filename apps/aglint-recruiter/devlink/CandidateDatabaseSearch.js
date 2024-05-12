import React from "react";
import * as _Builtin from "./_Builtin";
import { SearchAglintCd } from "./SearchAglintCd";
import * as _utils from "./utils";
import _styles from "./CandidateDatabaseSearch.module.css";

export function CandidateDatabaseSearch({
  as: _Component = _Builtin.Block,
  slotNavSublink,
  slotSearchAglintCd,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "search-wrap-candidate")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "job-header-empty", "beta-flex")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Sourcing Hub"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate-empty-landing-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "new-layout-sublink")}
          tag="div"
        >
          {slotNavSublink}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-824")}
          tag="div"
        >
          {slotSearchAglintCd ?? <SearchAglintCd />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%5Bclass*%3D%22CandidateDatabaseSearch_candidate-empty-landing-wrappers__%22%5D%7B%0Aheight%3Acalc(100vh%20-%2058.59px)%3B%0A%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
