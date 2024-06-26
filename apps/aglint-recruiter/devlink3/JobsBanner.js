"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./JobsBanner.module.css";

export function JobsBanner({ as: _Component = _Builtin.Block, slotButton }) {
  return (
    <_Component className={_utils.cx(_styles, "jb-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "jb-content-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "job-content-sub-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "warning-icon-wrap")}
            tag="div"
          >
            <GlobalIcon
              iconName="edit_document"
              color="inherit"
              size="8"
              weight="light"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "jb-desc-wrap")}
            tag="div"
          >
            <Text
              content="This job is in draft state."
              weight="medium"
              color="accent"
            />
            <Text
              size="1"
              color="neutral"
              weight=""
              content="Please publish this job to begin evaluating candidates."
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotButton}</_Builtin.Block>
    </_Component>
  );
}
