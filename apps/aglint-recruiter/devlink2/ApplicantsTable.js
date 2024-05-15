"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { CandidateListItem } from "./CandidateListItem";
import { TopCandidateListItem } from "./TopCandidateListItem";
import * as _utils from "./utils";
import _styles from "./ApplicantsTable.module.css";

export function ApplicantsTable({
  as: _Component = _Builtin.Block,
  onClickSelectAll = {},
  isAllChecked = true,
  slotCandidatesList,
  isScreeningVisible = true,
  isInterviewVisible = true,
  isDisqualifiedVisible = true,
  propsDrag = {},
  isDragVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1290")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1291")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "cv-list-column-wrapper",
            "header",
            "width-auto",
            "no_border-copy",
            "gap-12",
            "z-index-6"
          )}
          tag="div"
        >
          {isDragVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1311")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column")}
            tag="div"
            {...onClickSelectAll}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-checkbox", "new-tab")}
              tag="div"
            >
              {isAllChecked ? (
                <_Builtin.Image
                  className={_utils.cx(_styles, "cli-check-image")}
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/6530fd234c567296fc1dc71f_Frame%201%20(2).png"
                />
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-checkbox-ghost", "hide")}
              tag="div"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column-wrapper", "header")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cv-list-column",
              "name",
              "overflow-visible",
              "width-100"
            )}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Candidates"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column-wrapper", "header")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cv-list-column",
              "name",
              "overflow-visible",
              "width-100"
            )}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Resume Match"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isScreeningVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column-wrapper", "header")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "cv-list-column",
                "name",
                "overflow-visible",
                "width-100"
              )}
              tag="div"
            >
              <_Builtin.Block tag="div">
                {"Screening Status"}
                <br />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isInterviewVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column-wrapper", "header")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "cv-list-column",
                "name",
                "overflow-visible",
                "width-100"
              )}
              tag="div"
            >
              <_Builtin.Block tag="div">
                {"Assessment Score"}
                <br />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isDisqualifiedVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column-wrapper", "header")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "cv-list-column",
                "name",
                "overflow-visible",
                "width-100"
              )}
              tag="div"
            >
              <_Builtin.Block tag="div">
                {"Disqualified Email"}
                <br />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column-wrapper", "header")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cv-list-column",
              "name",
              "overflow-visible",
              "width-100"
            )}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {"Current Job Title"}
              <br />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column-wrapper", "header")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cv-list-column",
              "name",
              "overflow-visible",
              "width-100"
            )}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {"Location"}
              <br />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column-wrapper", "header")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cv-list-column",
              "name",
              "overflow-visible",
              "width-100"
            )}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {"Applied Date"}
              <br />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {slotCandidatesList ?? (
          <>
            <CandidateListItem />
            <TopCandidateListItem />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
