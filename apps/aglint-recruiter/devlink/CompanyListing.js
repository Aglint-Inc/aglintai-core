"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import { CompanyListingLinks } from "./CompanyListingLinks";
import { OpenJobListingCard } from "./OpenJobListingCard";
import { OfficeLocationCard } from "./OfficeLocationCard";
import * as _utils from "./utils";
import _styles from "./CompanyListing.module.css";

export function CompanyListing({
  as: _Component = _Builtin.Block,
  slotCompanyImage,
  textCompanyName = "This is some text inside of a div block.",
  textEmployeeCount = "20 - 30 Employees",
  textCompanyType = "Information and technology",
  textHeaderDiscription = "Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per",
  slotCompanyLinks,
  isOpenJobCountVisible = true,
  textOpenJobCount = "10",
  slotSearchOpenJob,
  slotOpenJobListing,
  textCompanyAbout = (
    <>
      {
        "Jahr für Jahr verzichten Millionen von Menschen auf die ihnen zustehende Steuerrückerstattung – viele davon aus Respekt vor der Erledigung ihrer Steuererklärung. Taxfix ändert das. Wir möchten es allen ermöglichen, ihre Steuern und Finanzen in die eigenen Hände zu nehmen. Mit unserer intuitiven App kann jede oder jeder – unabhängig von Bildungsgrad und Hintergrundwissen – die Steuererklärung unkompliziert einreichen."
      }
      <br />
      {
        "Das Taxfix-Team, mit Büros in Berlin und Madrid, versteht sich als Gruppe einfühlsamer Problemlöser*innen, die Ideen offen ausspricht und lebhaft miteinander diskutiert. Mit mehr als 500 Teammitgliedern aus über 45 Nationen sind wir reich an vielfältigen Stimmen und Ideen. In fünf Jahren konnten wir mehr als 300 Millionen Euro an Finanzierungsmitteln gewinnen und gleichzeitig vielen Menschen dabei helfen, mehr als 1 Milliarde Euro als Steuererstattungen vom Finanzamt zurückzuholen."
      }
    </>
  ),
  slotGallery,
  slotOfficeLocaionCard,
  isOpenJobsVisible = true,
  isAboutJobVisible = true,
  isOfficeLocationVisible = true,
  isHeaderDescriptionVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "company-listing-wrappers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "gradient-black--hero")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "company-listing-hero")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "company-profile-image-slot")}
            tag="div"
          >
            {slotCompanyImage}
          </_Builtin.Block>
          <Text content={textCompanyName} size="4" weight="medium" />
          <_Builtin.Block
            className={_utils.cx(_styles, "company-info-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cl-header-item")}
              tag="div"
            >
              <GlobalIcon iconName="people" size="4" />
              <Text content={textEmployeeCount} size="2" weight="" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cl-header-item")}
              tag="div"
            >
              <GlobalIcon iconName="domain" size="4" />
              <Text content={textCompanyType} size="2" weight="" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "company-list-link-wrappers")}
            tag="div"
          >
            {slotCompanyLinks ?? (
              <>
                <CompanyListingLinks />
                <CompanyListingLinks />
                <CompanyListingLinks />
                <CompanyListingLinks />
              </>
            )}
          </_Builtin.Block>
          {isHeaderDescriptionVisible ? (
            <_Builtin.Block tag="div">{textHeaderDiscription}</_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "open-jobs-sticky-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cl-detail-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "sticky-header-wrappers", "hide")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-426", "hide")}
              tag="div"
            >
              <_Builtin.Link
                className={_utils.cx(_styles, "header-menu-wrappers")}
                button={false}
                block="inline"
                options={{
                  href: "#open-job",
                }}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Open Jobs"}
                </_Builtin.Block>
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "header-menu-wrappers")}
                button={false}
                block="inline"
                options={{
                  href: "#about",
                }}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"About"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {textCompanyName}
                </_Builtin.Block>
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "header-menu-wrappers", "hide")}
                button={false}
                block="inline"
                options={{
                  href: "#gallery",
                }}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Gallery"}
                </_Builtin.Block>
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "header-menu-wrappers")}
                button={false}
                block="inline"
                options={{
                  href: "#office-location",
                }}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Office Locations"}
                </_Builtin.Block>
              </_Builtin.Link>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cl-wrapper")}
            tag="div"
          >
            {isOpenJobsVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cl-block")}
                tag="div"
                id="open-job"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "search-header-open-jobs")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "open-job-notification")}
                    tag="div"
                  >
                    <Text content="Open Jobs" size="3" weight="medium" />
                    {isOpenJobCountVisible ? (
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cl-count-wrap")}
                        tag="div"
                      >
                        <Text content={textOpenJobCount} size="1" />
                      </_Builtin.Block>
                    ) : null}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot-search-company-list")}
                    tag="div"
                  >
                    {slotSearchOpenJob}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "open-jobs-list")}
                  tag="div"
                >
                  {slotOpenJobListing ?? (
                    <OpenJobListingCard textWorkingType="Internship, On-site" />
                  )}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            {isAboutJobVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cl-block")}
                tag="div"
                id="about"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-441")}
                  tag="div"
                >
                  <Text content="About" weight="medium" size="3" />
                  <Text content={textCompanyName} weight="medium" size="3" />
                </_Builtin.Block>
                <_Builtin.Block tag="div">{textCompanyAbout}</_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "cl-block", "hide")}
              tag="div"
              id="gallery"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-xl", "fw-semibold")}
                tag="div"
              >
                {"Gallery"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "gallery-wrappers")}
                tag="div"
              >
                {slotGallery}
              </_Builtin.Block>
            </_Builtin.Block>
            {isOfficeLocationVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cl-block")}
                tag="div"
                id="office-location"
              >
                <Text content="Office Locations" weight="medium" size="3" />
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-429")}
                  tag="div"
                >
                  {slotOfficeLocaionCard ?? <OfficeLocationCard />}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
