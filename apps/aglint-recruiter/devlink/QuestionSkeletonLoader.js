import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./QuestionSkeletonLoader.module.css";

export function QuestionSkeletonLoader({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "question-loading-skeleton-wrappers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "skeleton-width-100")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "skeleton-item")}
          tag="div"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "skeleton-width-60")}
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
