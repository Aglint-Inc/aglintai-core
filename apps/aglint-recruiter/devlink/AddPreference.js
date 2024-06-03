"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AddPreference.module.css";

export function AddPreference({
  as: _Component = _Builtin.Block,
  textPreference = "This is some text inside of a div block.",
  onClickAddPreference = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "add-preference-wrap")}
      tag="div"
      {...onClickAddPreference}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "preference-header")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textPreference}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "preferernce-body")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-prefernce")}
          tag="div"
        >
          {"Press"}
          <_Builtin.Span className={_utils.cx(_styles, "text-enter-prefernce")}>
            {" Enter"}
          </_Builtin.Span>
          {" to add this to the preference"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
