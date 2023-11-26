import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AllCandidateListItem.module.css";

export function AllCandidateListItem({
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
          <_Builtin.Block
            className={_utils.cx(_styles, "line-clamp-1")}
            tag="div"
          >
            {name}
          </_Builtin.Block>
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
          <_Builtin.Block
            className={_utils.cx(_styles, "line-clamp-1")}
            tag="div"
          >
            {email}
          </_Builtin.Block>
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
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A.line-clamp-1%20%7B%0Adisplay%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%201%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%20%20%0A%20%20overflow%3A%20hidden%3B%0A%7D%0A%3C%2Fstyle%3E" />
    </_Component>
  );
}
