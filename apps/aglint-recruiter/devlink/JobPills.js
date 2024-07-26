"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./JobPills.module.css";

export function JobPills({
  as: _Component = _Builtin.Block,
  onClickDelete = {},
  textJob = "Software Engineer",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "job-pills-wrap")}
      tag="div"
      {...onClickDelete}
    >
      <Text content={textJob} />
      <_Builtin.Block
        className={_utils.cx(_styles, "jp-close-wrap")}
        tag="div"
        {...onClickDelete}
      >
        <GlobalIcon iconName="close" />
      </_Builtin.Block>
    </_Component>
  );
}
