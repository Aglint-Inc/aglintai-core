"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
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
    <_Component className={_utils.cx(_styles, "module_row")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "sd_table_header_cell")}
        id={_utils.cx(
          _styles,
          "w-node-d9f49c54-5ee8-46e0-b97b-44884a741008-4a741007"
        )}
        tag="div"
      >
        <Text content={textInterviewModule} weight="" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sd_table_header_cell")}
        id={_utils.cx(
          _styles,
          "w-node-d9f49c54-5ee8-46e0-b97b-44884a74100b-4a741007"
        )}
        tag="div"
      >
        <Text content={textQualifiedMember} weight="" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sd_table_header_cell")}
        id={_utils.cx(
          _styles,
          "w-node-d9f49c54-5ee8-46e0-b97b-44884a74100e-4a741007"
        )}
        tag="div"
      >
        <Text content={textTraining} weight="" />
      </_Builtin.Block>
    </_Component>
  );
}
