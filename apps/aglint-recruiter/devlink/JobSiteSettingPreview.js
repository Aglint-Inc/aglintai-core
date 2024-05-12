import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JobSiteSettingPreview.module.css";

export function JobSiteSettingPreview({
  as: _Component = _Builtin.Block,
  onClickPreview = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "preview-job-site-wrap")}
      tag="div"
    >
      <_Builtin.Block tag="div">
        {"Check out the preview of company listing."}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "preview-btn-job-site")}
        tag="div"
        {...onClickPreview}
      >
        <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
          {"Preview"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
