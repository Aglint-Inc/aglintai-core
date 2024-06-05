"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonSolid } from "./ButtonSolid";
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
          <Text
            content="Drag and drop CSV file to start importing"
            weight="medium"
          />
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
        <ButtonSolid
          onClickButton={onClickBrowse}
          isLeftIcon={false}
          isRightIcon={false}
          textButton="Browse"
          size="2"
        />
      </_Builtin.Block>
    </_Component>
  );
}
