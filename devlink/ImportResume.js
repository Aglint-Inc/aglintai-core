import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonPrimaryLarge } from "./ButtonPrimaryLarge";
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
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-blue-800")}
            tag="div"
          >
            {"Drag candidates resume(s)"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600-3")}
            tag="div"
          >
            {
              "Resumes should be in PDF/DOCX format and maximum file size of each should be less than 5 MB"
            }
          </_Builtin.Block>
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
          <ButtonPrimaryLarge textLabel="Browse" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
