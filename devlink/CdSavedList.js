import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CdSavedList.module.css";

export function CdSavedList({
  as: _Component = _Builtin.Block,
  onClickViewSavedList = {},
  isSavetoListVisible = false,
  isViewSavedVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-726")}
      tag="div"
      {...onClickViewSavedList}
    >
      {isSavetoListVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "text-blue-700")}
          tag="div"
        >
          {"Save to list"}
        </_Builtin.Block>
      ) : null}
      {isViewSavedVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "text-blue-700")}
          tag="div"
        >
          {"View saved lists"}
        </_Builtin.Block>
      ) : null}
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "icons")}
        value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.75781%2011.2578C7.58594%2011.4141%207.41406%2011.4141%207.24219%2011.2578L2.74219%206.75781C2.58594%206.58594%202.58594%206.41406%202.74219%206.24219C2.91406%206.08594%203.08594%206.08594%203.25781%206.24219L7.5%2010.4609L11.7422%206.24219C11.9141%206.08594%2012.0859%206.08594%2012.2578%206.24219C12.4141%206.41406%2012.4141%206.58594%2012.2578%206.75781L7.75781%2011.2578Z%22%20fill%3D%22%23144A75%22%2F%3E%0A%3C%2Fsvg%3E"
      />
    </_Component>
  );
}
