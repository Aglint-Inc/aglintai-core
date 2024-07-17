"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonSolid } from "./ButtonSolid";
import { GlobalIcon } from "./GlobalIcon";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonPrimarySmall } from "./ButtonPrimarySmall";
import * as _utils from "./utils";
import _styles from "./JobListing.module.css";

export function JobListing({
  as: _Component = _Builtin.Block,
  slotCompanyLogo,
  textCompanyName = "This is some text inside of a div block.",
  textRole = "This is some text inside of a div block.",
  textCompanyLocation = "This is some text inside of a div block.",
  onClickApplyNow = {},
  slotApplyForThisJob,
  onClickShareLink = {},
  onClickLinkedIn = {},
  onClickFacebook = {},
  onClickInstagram = {},
  onClickTwitter = {},
  slotImageAskJob,
  textAboutJob = "This is some text inside of a div block.",
  onClickAskNow = {},
  slotInputForm,
  onClickNotifyMe = {},
  textEmployeeCount = "20 - 30 Employees",
  textCompanyType = "Information and technology",
  textCompanyDescription = "This is some text inside of a div block.",
  slotLinks,
  onClickViewMore = {},
  slotOpenJobListing,
  slotDescription,
  slotSocialLink,
  isDiscriptionEmpty = true,
  isOtherOpenJobVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "all-job-listingwrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "upper-job-listing")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "job-listing-container")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "job-listing-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "jl-left-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "jl-apply-job-wrap")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "jl-left-top-wrap")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "jl-top-left-wrap")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "job-listing-image--slot")}
                      tag="div"
                    >
                      {slotCompanyLogo}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "lefet-name--job")}
                      tag="div"
                    >
                      <Text content={textCompanyName} color="neutral" />
                      <Text
                        content={textRole}
                        color="neutral-12"
                        size="3"
                        weight="medium"
                      />
                      <Text content={textCompanyLocation} color="neutral" />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <ButtonSolid
                    onClickButton={onClickApplyNow}
                    textButton="Apply Now"
                    size="2"
                  />
                </_Builtin.Block>
                <_Builtin.Block tag="div">{slotDescription}</_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "slot-appl-job-form")}
                  tag="div"
                >
                  {slotApplyForThisJob}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "about-company-wrapper-job")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-440")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "job-listing-company-slots")}
                    tag="div"
                  >
                    {slotCompanyLogo}
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">
                    <Text
                      content={textCompanyName}
                      color="neutral-12"
                      size="3"
                      weight="medium"
                    />
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "job-company-info-wrappers"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cl-header-item")}
                        tag="div"
                      >
                        <GlobalIcon iconName="people" size="4" />
                        <Text
                          content={textEmployeeCount}
                          color="neutral"
                          size="2"
                          weight=""
                        />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cl-header-item")}
                        tag="div"
                      >
                        <GlobalIcon iconName="domain" size="4" />
                        <Text
                          content={textCompanyType}
                          color="neutral"
                          size="2"
                          weight=""
                        />
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <Text
                  content={textCompanyDescription}
                  color="neutral"
                  size="2"
                  weight=""
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "company-list-link-wrappers")}
                  tag="div"
                >
                  {slotLinks}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "jl-view-btn-wrap")}
                  tag="div"
                >
                  <ButtonSoft
                    onClickButton={onClickViewMore}
                    textButton="View More"
                    size="2"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
              {isOtherOpenJobVisible ? (
                <_Builtin.Block tag="div">
                  <_Builtin.Block
                    className={_utils.cx(_styles, "jl-other-open-wrap")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-445")}
                      tag="div"
                    >
                      <Text
                        content="Other open jobs from"
                        color="neutral-12"
                        size="2"
                        weight=""
                      />
                      <Text
                        content={textCompanyName}
                        color="neutral-12"
                        size="2"
                        weight="medium"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "slot-job-listing-open-card"
                      )}
                      tag="div"
                    >
                      {slotOpenJobListing}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "jl-right-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "jl-sticky-right-wrap")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "share-job-wrappers")}
                  tag="div"
                >
                  <Text weight="medium" size="2" content="Share Job via:" />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "jl-social-wrap")}
                    tag="div"
                  >
                    {slotSocialLink}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "ask-about-job-wrappers")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold")}
                    tag="div"
                  >
                    {"Ask about this job"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-437")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "slot-image-about")}
                      tag="div"
                    >
                      {slotImageAskJob}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "color-grey-600")}
                      tag="div"
                    >
                      {textAboutJob}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-443")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "text-blue-600",
                        "cursor-pointer"
                      )}
                      tag="div"
                      {...onClickAskNow}
                    >
                      {"Ask Now"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "share-job-wrappers", "hide")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold")}
                    tag="div"
                  >
                    {"Get notified with similar job posts"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "news-job-post")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-grey-600",
                        "inline-text"
                      )}
                      tag="div"
                    >
                      {
                        "Get notified with similar posts and also the new jobs from "
                      }
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-block-26")}
                      tag="div"
                    >
                      {textCompanyName}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot-input-fomr")}
                    tag="div"
                  >
                    {slotInputForm}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-439")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div" {...onClickNotifyMe}>
                      <ButtonPrimarySmall textLabel="Notify Me" />
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
