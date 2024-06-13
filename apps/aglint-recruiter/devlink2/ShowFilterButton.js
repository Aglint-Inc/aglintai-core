"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ShowFilterButton.module.css";

export function ShowFilterButton({
  as: _Component = _Builtin.Block,
  onClickFilter = {},
  isShowTextVisible = true,
  isHideTextVisible = false,
  isDotVisible = true,
  propsArrowRotate = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1691")}
      tag="div"
      {...onClickFilter}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1692")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.17188%208.17188C6.05729%208.27604%205.94271%208.27604%205.82812%208.17188L2.82813%205.17187C2.72396%205.05729%202.72396%204.94271%202.82813%204.82812C2.94271%204.72396%203.05729%204.72396%203.17188%204.82812L6%207.64062L8.82812%204.82812C8.94271%204.72396%209.05729%204.72396%209.17188%204.82812C9.27604%204.94271%209.27604%205.05729%209.17188%205.17188L6.17188%208.17188Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          {...propsArrowRotate}
        />
        {isDotVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1693")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      {isShowTextVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {"Show filters"}
        </_Builtin.Block>
      ) : null}
      {isHideTextVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {"Hide filters"}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
