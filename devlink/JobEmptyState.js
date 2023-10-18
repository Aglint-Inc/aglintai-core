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
          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890235_Exam_Flat.svg"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {"No jobs posted."}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Span
            className={_utils.cx(_styles, "text-blue-500", "cursor-pointer")}
            {...onClickHere}
          >
            {"Click here"}
          </_Builtin.Span>
          {" to create a new job post"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
