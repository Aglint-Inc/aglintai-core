"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Skeleton } from "./Skeleton";
import * as _utils from "./utils";
import _styles from "./AssessmentListCardLoader.module.css";

export function AssessmentListCardLoader({
  as: _Component = _Builtin.Block,
  border,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1053-copy")}
      tag="div"
      borders={border}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1054")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1057", "relative")}
          tag="div"
        >
          <Skeleton />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1059")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text_md_line", "_70")}
            tag="div"
          >
            <Skeleton />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1055")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text_md_line", "_20")}
              tag="div"
            >
              <Skeleton />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text_md_line", "_20")}
              tag="div"
            >
              <Skeleton />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%5Bborders%3D'none'%5D%7B%0Aborder-style%3Anone%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
