import React from "react";
import * as _Builtin from "./_Builtin";
import { JobPublished } from "./JobPublished";
import { ShareableJobLink } from "./ShareableJobLink";
import * as _utils from "./utils";
import _styles from "./NewJobStep4.module.css";

export function NewJobStep4({ as: _Component = _Builtin.Block, slotShareVia }) {
  return (
    <_Component
      className={_utils.cx(_styles, "job-sidebar-main-block", "cj-step-3")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "cj-top-block")} tag="div">
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "text-lg",
            "fw-semibold",
            "text-grey-600"
          )}
          tag="div"
        >
          {"Step 3: Get the Word Out"}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Publish and share your job post to attract more candidates."}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-main-wrapper")}
        tag="div"
      >
        {slotShareVia ?? (
          <>
            <JobPublished />
            <ShareableJobLink />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
