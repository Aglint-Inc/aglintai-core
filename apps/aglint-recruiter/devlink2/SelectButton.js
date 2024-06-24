"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SelectButton.module.css";

export function SelectButton({
  as: _Component = _Builtin.Block,
  isSelected = false,
  textButton = "Add",
  onClickButton = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "select_btn")}
      tag="div"
      {...onClickButton}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "select_button", "default")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2211%22%20height%3D%2210%22%20viewbox%3D%220%200%2011%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.0625%200.6875V4.4375H9.8125C10.1562%204.46875%2010.3438%204.65625%2010.375%205C10.3438%205.34375%2010.1562%205.53125%209.8125%205.5625H6.0625V9.3125C6.03125%209.65625%205.84375%209.84375%205.5%209.875C5.15625%209.84375%204.96875%209.65625%204.9375%209.3125V5.5625H1.1875C0.84375%205.53125%200.65625%205.34375%200.625%205C0.65625%204.65625%200.84375%204.46875%201.1875%204.4375H4.9375V0.6875C4.96875%200.34375%205.15625%200.15625%205.5%200.125C5.84375%200.15625%206.03125%200.34375%206.0625%200.6875Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "text-blue-500")}
          tag="div"
        >
          {textButton}
        </_Builtin.Block>
      </_Builtin.Block>
      {isSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "select_button", "is_selected")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewbox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.4609%202.41406C11.6797%202.67969%2011.6797%202.94531%2011.4609%203.21094L5.27344%209.39844C5.00781%209.61719%204.74219%209.61719%204.47656%209.39844L1.28906%206.21094C1.07031%205.94531%201.07031%205.67969%201.28906%205.41406C1.55469%205.19531%201.82031%205.19531%202.08594%205.41406L4.875%208.20312L10.6641%202.41406C10.9297%202.19531%2011.1953%202.19531%2011.4609%202.41406Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-500")}
            tag="div"
          >
            {textButton}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
