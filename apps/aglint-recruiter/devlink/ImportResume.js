"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonOutlined } from "./ButtonOutlined";
import * as _utils from "./utils";
import _styles from "./ImportResume.module.css";

export function ImportResume({
  as: _Component = _Builtin.Block,
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
          className={_utils.cx(_styles, "ic-text-content")}
          tag="div"
        >
          <Text weight="bold" content="Drag and drop candidates resume" />
          <Text
            content="Resumes should be in PDF/DOCX format and maximum file size of each should be less than 5 MB"
            color="neutral"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ic-divider-block")}
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
          <ButtonOutlined
            size="2"
            textButton="Browse"
            isLeftIcon={false}
            isRightIcon={false}
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
