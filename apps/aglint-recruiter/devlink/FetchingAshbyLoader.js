import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FetchingAshbyLoader.module.css";

export function FetchingAshbyLoader({
  as: _Component = _Builtin.Block,
  slotLottie,
}) {
  return (
    <_Component className={_utils.cx(_styles, "fetching-candi")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "fetching-candi-sub-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotLottie}</_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Getting Candidates from ashby."}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "color-grey-600")}
          tag="div"
        >
          {"This may take a while"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
