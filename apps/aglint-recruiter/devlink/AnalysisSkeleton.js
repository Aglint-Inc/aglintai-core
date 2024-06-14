"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AnalysisSkeleton.module.css";

export function AnalysisSkeleton({
  as: _Component = _Builtin.Block,
  slotSkeleton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "jd-analysis-item-wrap")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "cd_title")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "ske_text_regular", "width_100")}
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
          className={_utils.cx(_styles, "ske_text_regular", "width_50")}
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
        className={_utils.cx(_styles, "ske_text_small", "width_80")}
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
        className={_utils.cx(_styles, "ske_text_small", "width_90")}
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
        className={_utils.cx(_styles, "ske_text_small", "width_20")}
        tag="div"
      >
        {slotSkeleton ?? (
          <_Builtin.Block
            className={_utils.cx(_styles, "dummy_skeleton")}
            tag="div"
          />
        )}
      </_Builtin.Block>
    </_Component>
  );
}
