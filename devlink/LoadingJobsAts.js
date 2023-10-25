import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./LoadingJobsAts.module.css";

export function LoadingJobsAts({
  as: _Component = _Builtin.Block,
  slotLottie,
  textJobCount = "5 jobs",
  textAtsCompany = "lever...",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-535")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "loading-modal-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-lottie-loading")}
          tag="div"
        >
          {slotLottie}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-532")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Imporing"}</_Builtin.Block>
          <_Builtin.Block tag="div">{textJobCount}</_Builtin.Block>
          <_Builtin.Block tag="div">{"from"}</_Builtin.Block>
          <_Builtin.Block tag="div">{textAtsCompany}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "color-grey-600")}
          tag="div"
        >
          {"This may take a while."}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
