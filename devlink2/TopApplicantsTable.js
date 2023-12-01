import React from "react";
import * as _Builtin from "./_Builtin";
import { TopCandidateListItem } from "./TopCandidateListItem";
import * as _utils from "./utils";
import _styles from "./TopApplicantsTable.module.css";

export function TopApplicantsTable({
  as: _Component = _Builtin.Block,
  slotList,
  onclickSelectAll = {},
  isAllSelected = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "cv-list")} tag="div">
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "cv-list-row",
          "top",
          "top-can",
          "z-index-20"
        )}
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
              {isAllSelected ? (
                <_Builtin.Image
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/6530fd234c567296fc1dc71f_Frame%201%20(2).png"
                />
              ) : null}
            </_Builtin.Block>
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
              className={_utils.cx(_styles, "cv-list-column", "top", "name")}
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
              className={_utils.cx(
                _styles,
                "cv-list-column",
                "top",
                "insights"
              )}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Insights"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column-wrapper", "top")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-column", "top", "summary")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Summary"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "cv-list-body")} tag="div">
        {slotList ?? <TopCandidateListItem />}
      </_Builtin.Block>
    </_Component>
  );
}
