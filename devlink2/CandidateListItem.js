import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateListItem.module.css";

export function CandidateListItem({
  as: _Component = _Builtin.Block,
  onclickSelect = {},
  isChecked = false,
  slotProfileImage,
  name = "Dianne Russell",
  jobTitle = "Assosiate software engineer",
  email = "sara.cruz@example.com",
  phone = "(704) 555-0127",
  isInterviewVisible = false,
  slotResumeScore,
  slotInterviewScore,
  isHighlighted = false,
  appliedDate = "17 Aug 2023 11:30PM",
  onclickCandidate = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "cv-list-row", "item")} tag="div">
      {isHighlighted ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-item-highlight")}
          tag="div"
        />
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-column", "checkbox")}
        tag="div"
        {...onclickSelect}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-checkbox")}
          tag="div"
        >
          {isChecked ? (
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
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-row-main")}
        tag="div"
        {...onclickCandidate}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "name")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-profile-image")}
            tag="div"
          >
            {slotProfileImage}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{name}</_Builtin.Block>
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-item-highlight")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "title")}
          tag="div"
        >
          <_Builtin.Block tag="div">{jobTitle}</_Builtin.Block>
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-item-highlight")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "score")}
          tag="div"
        >
          {slotResumeScore ??
            (isHighlighted ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-list-item-highlight")}
                tag="div"
              />
            ) : null)}
        </_Builtin.Block>
        {isInterviewVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "score")}
            tag="div"
          >
            {slotInterviewScore ??
              (isHighlighted ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "cv-list-item-highlight")}
                  tag="div"
                />
              ) : null)}
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "email")}
          tag="div"
        >
          <_Builtin.Block tag="div">{email}</_Builtin.Block>
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-item-highlight")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "phone")}
          tag="div"
        >
          <_Builtin.Block tag="div">{phone}</_Builtin.Block>
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-item-highlight")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "date")}
          tag="div"
        >
          <_Builtin.Block tag="div">{appliedDate}</_Builtin.Block>
          {isHighlighted ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-item-highlight")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
