import React from "react";
import * as _Builtin from "./_Builtin";
import { UploadCsv } from "./UploadCsv";
import * as _utils from "./utils";
import _styles from "./ImportCandidate.module.css";

export function ImportCandidate({
  as: _Component = _Builtin.Block,
  slotUpload,
  isImportDisable = true,
  onClickImport = {},
  onClickClose = {},
  slotDownload,
  slotReuploadBtn,
}) {
  return (
    <_Component className={_utils.cx(_styles, "cdd-popup-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cdd-popup-upload-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cdd-popup-close-btn", "clickable")}
          tag="div"
          {...onClickClose}
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "vectors-wrapper-48")}
            loading="lazy"
            width={16}
            height={16}
            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/650579a6f5ad07724ccef247_Vectors-Wrapper.svg"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cdd-popup-upload-header")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-lg",
              "fw-semibold",
              "color-black"
            )}
            tag="div"
          >
            {"Import Candidates"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-332")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "medium-default-15")}
              tag="div"
            >
              {
                "Please use CSV format with key headers like 'Name,' 'Contact,' 'LinkedIn,' 'Experience,' and 'Skills.' Any extra details can go in the 'Notes' section."
              }
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-download")}
              tag="div"
            >
              {slotDownload}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cdd-file-upload-wrapper")}
          tag="div"
        >
          {slotUpload ?? <UploadCsv />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-295")}
          tag="div"
        >
          {isImportDisable ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cdd-import-btn", "disabled")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "content-9")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "label-10")}
                  tag="div"
                >
                  {"Import"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "cdd-import-btn", "active")}
            tag="div"
            {...onClickImport}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "content-9")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "label-10")}
                tag="div"
              >
                {"Import"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-reupload-btn")}
            tag="div"
          >
            {slotReuploadBtn}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
