"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewModuleStatsCard.module.css";

export function InterviewModuleStatsCard({
  as: _Component = _Builtin.Block,
  textInterviewModule = "C++ Coding",
  textQualifiedMember = "10",
  textTraineeShadow = "2",
  textTraineeReverse = "5",
  textTraining = "2",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1507")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1508")}
        id={_utils.cx(
          _styles,
          "w-node-d9f49c54-5ee8-46e0-b97b-44884a741008-4a741007"
        )}
        tag="div"
      >
        <_Builtin.Block tag="div">{textInterviewModule}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1508")}
        id={_utils.cx(
          _styles,
          "w-node-d9f49c54-5ee8-46e0-b97b-44884a74100b-4a741007"
        )}
        tag="div"
      >
        <_Builtin.Block tag="div">{textQualifiedMember}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1508")}
        id={_utils.cx(
          _styles,
          "w-node-d9f49c54-5ee8-46e0-b97b-44884a74100e-4a741007"
        )}
        tag="div"
      >
        <_Builtin.Block tag="div">{textTraining}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
