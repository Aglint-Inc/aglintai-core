import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AddToList.module.css";

export function AddToList({
  as: _Component = _Builtin.Block,
  onClickAddtoList = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-732", "cursor-pointer")}
      tag="div"
      {...onClickAddtoList}
    >
      <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
        {"Save to list"}
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "icons")}
        value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.48027%208.13047C6.35996%208.23984%206.23965%208.23984%206.11934%208.13047L2.96934%204.98047C2.85996%204.86016%202.85996%204.73984%202.96934%204.61953C3.08965%204.51016%203.20996%204.51016%203.33027%204.61953L6.2998%207.57266L9.26934%204.61953C9.38965%204.51016%209.50996%204.51016%209.63027%204.61953C9.73965%204.73984%209.73965%204.86016%209.63027%204.98047L6.48027%208.13047Z%22%20fill%3D%22%230F3554%22%2F%3E%0A%3C%2Fsvg%3E"
      />
    </_Component>
  );
}
