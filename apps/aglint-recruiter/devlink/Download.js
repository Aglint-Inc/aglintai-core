"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./Download.module.css";

export function Download({
  as: _Component = _Builtin.Block,
  onClickDownload = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "download-icon-wrap")}
      tag="div"
      {...onClickDownload}
    >
      <GlobalIcon iconName="download" size="4" />
    </_Component>
  );
}
