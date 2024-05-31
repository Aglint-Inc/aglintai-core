"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Divider.module.css";

export function Divider({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "divider")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "divider_line")}
        tag="div"
      />
      <_Builtin.Block className={_utils.cx(_styles, "spacer_16")} tag="div" />
    </_Component>
  );
}
