import React from "react";
import * as _Builtin from "./_Builtin";
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
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600", "fw-semibold")}
          tag="div"
        >
          {"No jobs found"}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "hide")} tag="div">
          {"Click here to "}
          <_Builtin.Span
            className={_utils.cx(
              _styles,
              "text-blue-500",
              "text-underline",
              "cursor-pointer"
            )}
            {...onClickHere}
          >
            {"Add Job"}
          </_Builtin.Span>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
