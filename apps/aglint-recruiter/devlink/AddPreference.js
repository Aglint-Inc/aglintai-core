"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
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
      box-shadow="4"
      {...onClickAddPreference}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "preference-header")}
        tag="div"
      >
        <Text content={textPreference} />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "preferernce-body")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ap-text-desc")}
          tag="div"
        >
          <Text content="Press" />
          <_Builtin.Block
            className={_utils.cx(_styles, "ap-enter-wrap")}
            tag="div"
          >
            <Text weight="medium" content="Enter" />
          </_Builtin.Block>
          <Text content="to add this to the preference" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
