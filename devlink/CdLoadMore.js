import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CdLoadMore.module.css";

export function CdLoadMore({
  as: _Component = _Builtin.Block,
  onClickLoad = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-771")}
      tag="div"
      {...onClickLoad}
    >
      <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
        {"Load More.."}
      </_Builtin.Block>
    </_Component>
  );
}
