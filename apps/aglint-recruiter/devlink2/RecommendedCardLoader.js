"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Skeleton } from "./Skeleton";
import * as _utils from "./utils";
import _styles from "./RecommendedCardLoader.module.css";

export function RecommendedCardLoader({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "question_card", "is_loader-copy")}
      id={_utils.cx(
        _styles,
        "w-node-_8cfbc6de-2353-aeaa-91db-587359335355-59335355"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "question_card_top", "nax_width_70")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-845")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "question_typeicon")}
            tag="div"
          >
            <Skeleton />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text_md_bold_line", "_100")}
            tag="div"
          >
            <Skeleton />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "add_btn", "fixed_width")}
          tag="div"
        >
          <Skeleton />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "question_card_bottom", "skeleton_flex")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text_md_line")}
          tag="div"
        >
          <Skeleton />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text_md_line")}
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
      </_Builtin.Block>
    </_Component>
  );
}
