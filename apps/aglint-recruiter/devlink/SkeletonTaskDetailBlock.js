"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SkeletonTaskDetailBlock.module.css";

export function SkeletonTaskDetailBlock({
  as: _Component = _Builtin.Block,
  slotSkeleton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "task-detail-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "task-detail-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "td-header-left")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-979")}
            tag="div"
          >
            {slotSkeleton ?? (
              <_Builtin.Block
                className={_utils.cx(_styles, "dummy_skeleton")}
                tag="div"
              />
            )}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ske_text_regular", "width_500")}
            tag="div"
          >
            {slotSkeleton ?? (
              <_Builtin.Block
                className={_utils.cx(_styles, "dummy_skeleton")}
                tag="div"
              />
            )}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ske_badge", "width_60px")}
          tag="div"
        >
          {slotSkeleton ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_skeleton")}
              tag="div"
            />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "ske_text_small", "width_100")}
          tag="div"
        >
          {slotSkeleton ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_skeleton")}
              tag="div"
            />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
