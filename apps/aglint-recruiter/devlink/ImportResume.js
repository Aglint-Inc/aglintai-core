"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonSolid } from "./ButtonSolid";
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
          <Text
            content="Drag and drop candidates resume"
            weight="medium"
            size="2"
          />
          <Text
            content="Resumes should be in PDF/DOCX format and maximum file size of each should be less than 4 MB"
            align="center"
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
          <Text content="OR" color="neutral" />
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
          <ButtonSolid
            isRightIcon={false}
            isLeftIcon={false}
            textButton="Browse"
            size="2"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
