"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SettingSkeleton.module.css";

export function SettingSkeleton({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-677")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "skeleton-width-80", "height-28")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "skeleton-item")}
          tag="div"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "skeleton-width-60", "height-28")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "skeleton-item")}
          tag="div"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "skeleton-width-40", "height-28")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "skeleton-item")}
          tag="div"
        />
      </_Builtin.Block>
    </_Component>
  );
}
