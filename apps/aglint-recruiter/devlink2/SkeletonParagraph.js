"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Skeleton } from "./Skeleton";
import * as _utils from "./utils";
import _styles from "./SkeletonParagraph.module.css";

export function SkeletonParagraph({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "paragraph_skeletopn")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "text_md_line", "_60")}
        tag="div"
      >
        <Skeleton />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text_md_line", "_30")}
        tag="div"
      >
        <Skeleton />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text_md_line", "_80")}
        tag="div"
      >
        <Skeleton />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text_md_line", "_90")}
        tag="div"
      >
        <Skeleton />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text_md_line", "_60")}
        tag="div"
      >
        <Skeleton />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text_md_line", "_70")}
        tag="div"
      >
        <Skeleton />
      </_Builtin.Block>
    </_Component>
  );
}
