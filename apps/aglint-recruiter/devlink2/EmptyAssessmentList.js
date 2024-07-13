"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./EmptyAssessmentList.module.css";

export function EmptyAssessmentList({
  as: _Component = _Builtin.Block,
  onClickBrowseAssessment = {},
  slotButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "job-workflow-setup")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "job-workflow-setup-wraper")}
        tag="div"
      >
        <GlobalIcon iconName="lan" size="7" weight="thin" />
        <Text content="" color="neutral-11" weight="regular" />
        <_Builtin.Block tag="div">
          {slotButton ?? (
            <ButtonSolid
              size="2"
              textButton="Add"
              iconName="bolt"
              isLeftIcon={true}
            />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
