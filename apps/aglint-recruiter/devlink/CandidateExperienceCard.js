"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./CandidateExperienceCard.module.css";

export function CandidateExperienceCard({
  as: _Component = _Builtin.Block,
  slotLogo,
  textRole = "Senior Software Engineer",
  textCompany = "Google",
  textDate = "May 2017",
  isBadgeVisible = false,
  isCurrentVisible = false,
  isLogoVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cvs-experiences-block")}
      tag="div"
    >
      {isLogoVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cec-logo-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cvs-company-logo",
              "div-block-990",
              "div-block-991"
            )}
            tag="div"
          >
            {slotLogo}
          </_Builtin.Block>
          {isCurrentVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cec-current-wrap")}
              tag="div"
            >
              <Text size="1" content="Current" />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "cvs-company-info-block",
          "one-line-clamp"
        )}
        tag="div"
      >
        <Text content={textRole} />
        <Text content={textCompany} color="neutral" size="2" />
        <Text content={textDate} size="1" color="neutral" weight="medium" />
      </_Builtin.Block>
      {isBadgeVisible ? (
        <_Builtin.Block className={_utils.cx(_styles, "book-badge")} tag="div">
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/65688607b7bfaa9734b192a5_%F0%9F%92%BC.svg"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
