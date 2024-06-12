"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./RcCheckbox.module.css";

export function RcCheckbox({
  as: _Component = _Builtin.Block,
  isChecked = false,
  text = "This is some text inside of a div block.",
  onclickCheck = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "sl-checkbox-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "sl-checkbox")}
        tag="div"
        {...onclickCheck}
      >
        <GlobalIcon iconName="" color="#EC9455" size="2" />
        {isChecked ? (
          <_Builtin.Block tag="div">
            <GlobalIcon iconName="check_box" color="accent-8" size="2" />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <Text content={text} weight="" />
    </_Component>
  );
}
