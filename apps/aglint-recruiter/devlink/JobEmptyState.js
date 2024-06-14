"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./JobEmptyState.module.css";

export function JobEmptyState({
  as: _Component = _Builtin.Block,
  onClickHere = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "no-jobs-to-show")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "no-job-wrappers")}
        tag="div"
      >
        <_Builtin.Image
          width="auto"
          height="auto"
          loading="lazy"
          alt=""
          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6544fa5b6dd00169fa44e84b_%EF%A1%AD.svg"
        />
        <Text content="No jobs found" weight="" color="neutral-11" />
      </_Builtin.Block>
    </_Component>
  );
}
