import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Pagination.module.css";

export function Pagination({
  as: _Component = _Builtin.Block,
  onClickPrev = {},
  onClickNext = {},
  textCurrentPageCount = "1",
  textTotalPageCount = "12",
  textCurrentCandidateCount = "100",
  textTotalCandidateCount = "450",
}) {
  return (
    <_Component className={_utils.cx(_styles, "jp-nav-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "jp-nav-block", "gap-8")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "jb-nav-icon")}
          tag="div"
          {...onClickPrev}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon-embed")}
            value="%3Csvg%20width%3D%225%22%20height%3D%229%22%20viewbox%3D%220%200%205%209%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.549479%204.70052C0.427951%204.56684%200.427951%204.43316%200.549479%204.29948L4.04948%200.799479C4.18316%200.677951%204.31684%200.677951%204.45052%200.799479C4.57205%200.93316%204.57205%201.06684%204.45052%201.20052L1.16927%204.5L4.45052%207.79948C4.57205%207.93316%204.57205%208.06684%204.45052%208.20052C4.31684%208.32205%204.18316%208.32205%204.04948%208.20052L0.549479%204.70052Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block tag="div">{"Page"}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "jb-nav-page-count")}
          tag="div"
        >
          <_Builtin.Block tag="div">{textCurrentPageCount}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "inline-block")}
            tag="div"
          >
            {"of"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "inline-block", "ml-6")}
            tag="div"
          >
            {textTotalPageCount}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "jb-nav-icon")}
          tag="div"
          {...onClickNext}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon-embed")}
            value="%3Csvg%20width%3D%225%22%20height%3D%229%22%20viewbox%3D%220%200%205%209%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.45052%204.29948C4.57205%204.43316%204.57205%204.56684%204.45052%204.70052L0.950521%208.20052C0.81684%208.32205%200.68316%208.32205%200.549479%208.20052C0.427951%208.06684%200.427951%207.93316%200.549479%207.79948L3.83073%204.5L0.549479%201.20052C0.427951%201.06684%200.427951%200.933159%200.549479%200.799479C0.68316%200.677951%200.81684%200.677951%200.950521%200.799479L4.45052%204.29948Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "jp-nav-block")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "inline-block", "text-grey-600")}
          tag="div"
        >
          {"Showing"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "inline-block", "text-grey-600")}
          tag="div"
        >
          {textCurrentCandidateCount}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "inline-block", "text-grey-600")}
          tag="div"
        >
          {"of"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "inline-block", "text-grey-600")}
          tag="div"
        >
          {textTotalCandidateCount}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "inline-block", "text-grey-600")}
          tag="div"
        >
          {"candidates"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
