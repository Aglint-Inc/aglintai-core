import React from "react";
import * as _Builtin from "./_Builtin";
import { InsightTagEmpty } from "./InsightTagEmpty";
import * as _utils from "./utils";
import _styles from "./TopCandidateListItem.module.css";

export function TopCandidateListItem({
  as: _Component = _Builtin.Block,
  onclickSelect = {},
  isChecked = false,
  slotScores,
  name = "Dianne Russell",
  strength = "Eike led software as a Senior System Software Engineer at NVIDIA Corporation, specializing in autonomous vehicles.",
  weakness = "Eike led software as a Senior System Software Engineer at NVIDIA Corporation, specializing in autonomous vehicles.",
  summary = "--",
  onclickCandidate = {},
  isHighlighted = false,
  slotInsights,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cv-list-row", "top-can")}
      tag="div"
    >
      {isHighlighted ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "top-can-highlight")}
          tag="div"
        />
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-column-wrapper", "width-auto")}
        tag="div"
      >
        {isHighlighted ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "top-can-highlight")}
            tag="div"
          />
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column")}
          tag="div"
          {...onclickSelect}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-checkbox")}
            tag="div"
          >
            {isChecked ? (
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
        className={_utils.cx(_styles, "cv-list-row-main", "pointer")}
        tag="div"
        {...onclickCandidate}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column-wrapper")}
          tag="div"
        >
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "top-can-highlight")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cv-list-column",
              "name",
              "top-can",
              "overflow-none"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "top-can-info")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-list-profile-image")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold", "line-clamp-1")}
                tag="div"
              >
                {name}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "top-can-info")}
              tag="div"
            >
              {slotScores}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column-wrapper", "z-10")}
          tag="div"
        >
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "top-can-highlight")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "insights")}
            tag="div"
          >
            {slotInsights ?? <InsightTagEmpty />}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column-wrapper")}
          tag="div"
        >
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "top-can-highlight")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "summary")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {summary}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
