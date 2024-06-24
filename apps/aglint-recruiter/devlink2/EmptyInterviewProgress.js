"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import { ButtonGhost } from "./ButtonGhost";
import * as _utils from "./utils";
import _styles from "./EmptyInterviewProgress.module.css";

export function EmptyInterviewProgress({
  as: _Component = _Builtin.Block,
  onClickCreateInterviewPlan = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "no-interview-plan")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "no-interview-plan-wrapper")}
        tag="div"
      >
        <GlobalIcon iconName="warning" size="4" color="warning-11" />
        <Text color="neutral" weight="" content="No Interview plan set." />
        <ButtonGhost
          onClickButton={onClickCreateInterviewPlan}
          size="1"
          textButton="Create"
          isLeftIcon={true}
          iconName="add"
        />
      </_Builtin.Block>
    </_Component>
  );
}
