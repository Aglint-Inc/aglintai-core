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
        className={_utils.cx(_styles, "skeletion-line")}
        tag="div"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "skeletion-line", "width-60")}
        tag="div"
      />
    </_Component>
  );
}
