"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AddCustomQuestion.module.css";

export function AddCustomQuestion({
  as: _Component = _Builtin.Block,
  onClickAdd,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "add_custom_question")}
      tag="div"
      {...onClickAdd}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "scr-option-innner", "gap_10")}
        tag="div"
      >
        <_Builtin.Block tag="div">{"Add Custom Question"}</_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "svg-icon")}
            value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.75%204.25V9.25H15.75C16.2083%209.29167%2016.4583%209.54167%2016.5%2010C16.4583%2010.4583%2016.2083%2010.7083%2015.75%2010.75H10.75V15.75C10.7083%2016.2083%2010.4583%2016.4583%2010%2016.5C9.54167%2016.4583%209.29167%2016.2083%209.25%2015.75V10.75H4.25C3.79167%2010.7083%203.54167%2010.4583%203.5%2010C3.54167%209.54167%203.79167%209.29167%204.25%209.25H9.25V4.25C9.29167%203.79167%209.54167%203.54167%2010%203.5C10.4583%203.54167%2010.7083%203.79167%2010.75%204.25Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
