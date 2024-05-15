import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CreateJobLoader.module.css";

export function CreateJobLoader({
  as: _Component = _Builtin.Block,
  slotLottie,
}) {
  return (
    <_Component className={_utils.cx(_styles, "creating_job")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "lottie")} tag="div">
        {slotLottie}
      </_Builtin.Block>
      <_Builtin.Block tag="div">{"Creating Job.."}</_Builtin.Block>
    </_Component>
  );
}
