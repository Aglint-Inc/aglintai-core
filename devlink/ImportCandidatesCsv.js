import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonPrimaryLarge } from "./ButtonPrimaryLarge";
import * as _utils from "./utils";
import _styles from "./ImportCandidatesCsv.module.css";

export function ImportCandidatesCsv({
  as: _Component = _Builtin.Block,
  onClickDownloadSample = {},
  onClickBrowse = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "ic-import-body-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ic-import-body-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ic-text-content", "gap-5")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-blue-800")}
            tag="div"
          >
            {"Drag CSV file to start importing"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ic-divider-block", "_2")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ic-hr-line")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-700-2")}
            tag="div"
          >
            {"OR"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ic-hr-line")}
            tag="div"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ic-import-button-wrapper")}
          tag="div"
          {...onClickBrowse}
        >
          <ButtonPrimaryLarge textLabel="Browse" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
