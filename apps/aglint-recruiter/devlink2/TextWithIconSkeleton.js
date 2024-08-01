"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Skeleton } from "./Skeleton";
import * as _utils from "./utils";
import _styles from "./TextWithIconSkeleton.module.css";

export function TextWithIconSkeleton({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "text-with-icon-skeleton")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "icon-skeleton-wrap")}
        tag="div"
      >
        <Skeleton />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-skeleton-wrap")}
        tag="div"
      >
        <Skeleton />
      </_Builtin.Block>
    </_Component>
  );
}
