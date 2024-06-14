"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./DelJobBtn.module.css";

export function DelJobBtn({ as: _Component = _Builtin.Block, onClick = {} }) {
  return (
    <_Component
      className={_utils.cx(_styles, "close-job")}
      tag="div"
      {...onClick}
    >
      <GlobalIcon iconName="block" size="6" color="error-12" />
      <Text color="error" content="Permanently close this job" />
    </_Component>
  );
}
