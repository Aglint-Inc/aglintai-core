import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ViewMoreSkills.module.css";

export function ViewMoreSkills({
  as: _Component = _Builtin.Block,
  isViewLessVisible = false,
  isViewMoreVisible = true,
  onClickViewMore = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cd-view-more-wrap")}
      tag="div"
      id="viewmore"
      {...onClickViewMore}
    >
      {isViewMoreVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "view-more-text")}
          tag="div"
        >
          {"View more.."}
        </_Builtin.Block>
      ) : null}
      {isViewLessVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "view-less-text")}
          tag="div"
        >
          {"View less.."}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
