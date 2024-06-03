"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ImportCandidatesCsv } from "./ImportCandidatesCsv";
import { ButtonPrimaryRegular } from "./ButtonPrimaryRegular";
import * as _utils from "./utils";
import _styles from "./ImportCsv.module.css";

export function ImportCsv({
  as: _Component = _Builtin.Block,
  isListingCountVisible = false,
  textListingCount = "Listing 320 candidates",
  onClickReupload = {},
  isImportDescVisible = true,
  textCountExistinJob = "130 candidates already exists in this job",
  onClickImportRemaining = {},
  slotImportCandidatesCsv,
  slotReuploadButton,
  isExistWarningVisible = true,
  onClickImport = {},
  isImportButtonVisible = false,
}) {
  return (
    <_Component tag="div">
      {isListingCountVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-723")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {textListingCount}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotReuploadButton}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isImportDescVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-524")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "color-grey-700")}
            tag="div"
          >
            {
              "Import applicants by uploading a CSV or XLSX file containing First Name, Last Name, Email, and a link to their resume (PDF, DOC, or TXT format). Simply drag and drop your file or click to upload."
            }
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "div-block-727")} tag="div">
        {slotImportCandidatesCsv ?? <ImportCandidatesCsv />}
      </_Builtin.Block>
      {isListingCountVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-725")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            {isExistWarningVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-724")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.5%2016C3.36%2016%200%2012.64%200%208.5C0%204.36%203.36%201%207.5%201C11.64%201%2015%204.36%2015%208.5C15%2012.64%2011.64%2016%207.5%2016ZM7%2012.5C7%2012.78%207.22%2013%207.5%2013C7.78%2013%208%2012.78%208%2012.5V8C8%207.72%207.78%207.5%207.5%207.5C7.22%207.5%207%207.72%207%208V12.5ZM7.5%204C6.95%204%206.5%204.45%206.5%205C6.5%205.55%206.95%206%207.5%206C8.05%206%208.5%205.55%208.5%205C8.5%204.45%208.05%204%207.5%204Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-yellow-800")}
                  tag="div"
                >
                  {textCountExistinJob}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-730")}
            tag="div"
            {...onClickImportRemaining}
          >
            <ButtonPrimaryRegular textLabel="Import Remaining" />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isImportButtonVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-725")}
          tag="div"
        >
          <_Builtin.Block tag="div" />
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-730")}
            tag="div"
            {...onClickImport}
          >
            <ButtonPrimaryRegular textLabel="Import" />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
