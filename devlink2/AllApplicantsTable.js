import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AllApplicantsTable.module.css";

export function AllApplicantsTable({
  as: _Component = _Builtin.Block,
  onclickSelectAll = {},
  isAllChecked = false,
  isInterviewVisible = false,
  slotCandidatesList,
}) {
  return (
    <_Component className={_utils.cx(_styles, "cv-list")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-row", "top")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "cv-list-column-wrapper",
            "top",
            "width-auto"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "p-2")}
            tag="div"
            {...onclickSelectAll}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-checkbox")}
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
          className={_utils.cx(_styles, "cv-list-row-main")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column-wrapper", "top")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-column", "name")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Candidate"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column-wrapper", "top")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-column", "resume")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Resume Match"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          {isInterviewVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-column-wrapper", "top")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-list-column", "assessment")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Assessment Score"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column-wrapper", "top")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-column", "job")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Current Job Title"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column-wrapper", "top")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-column", "location")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Location"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column-wrapper", "top")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-column", "date")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Applied Date"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "cv-list-body")} tag="div">
        {slotCandidatesList}
      </_Builtin.Block>
    </_Component>
  );
}
