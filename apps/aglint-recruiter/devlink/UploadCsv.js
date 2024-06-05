"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { CsvIcon } from "./CsvIcon";
import { Text } from "./Text";
import { ButtonOutlined } from "./ButtonOutlined";
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
      <Text
        content="Drag and drop CSV file here or import from files"
        color="neutral"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "cdd-btn-primary")}
        tag="div"
        {...onClickImportFile}
      >
        <ButtonOutlined
          isLeftIcon={false}
          isRightIcon={false}
          size="2"
          textButton="Browse"
        />
      </_Builtin.Block>
    </_Component>
  );
}
