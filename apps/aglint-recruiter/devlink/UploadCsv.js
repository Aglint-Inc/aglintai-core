import React from "react";
import * as _Builtin from "./_Builtin";
import { CsvIcon } from "./CsvIcon";
import * as _utils from "./utils";
import _styles from "./UploadCsv.module.css";

export function UploadCsv({
  as: _Component = _Builtin.Block,
  onClickImportFile = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cdd-upload-file-block")}
      tag="div"
    >
      <CsvIcon />
      <_Builtin.Block
        className={_utils.cx(_styles, "small-default-8", "text-align-center")}
        tag="div"
      >
        {"Drag and drop CSV file here or import from files"}
        <br />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cdd-btn-primary")}
        tag="div"
        {...onClickImportFile}
      >
        <_Builtin.Block className={_utils.cx(_styles, "content-8")} tag="div">
          <_Builtin.Block className={_utils.cx(_styles, "label-9")} tag="div">
            {"Import from files"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
