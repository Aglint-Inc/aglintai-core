"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { CompanyListingLinks } from "./CompanyListingLinks";
import { OpenJobListingCard } from "./OpenJobListingCard";
import { OfficeLocationCard } from "./OfficeLocationCard";
import * as _utils from "./utils";
import _styles from "./CompanyListing.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

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
  _interactions.useInteractions(_interactionsData, _styles);

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
          <Text content={textCompanyName} size="8" weight="medium" />
          <_Builtin.Block
            className={_utils.cx(_styles, "company-info-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cl-header-item")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M19.9944%2019.0693C20.0481%2019.5264%2019.7212%2019.9405%2019.2641%2019.9943C18.807%2020.0481%2018.3929%2019.7211%2018.3391%2019.264C18.0548%2016.8471%2015.907%2015%2013.3334%2015C10.7599%2015%208.61205%2016.8471%208.32771%2019.264C8.27393%2019.7211%207.8598%2020.0481%207.40271%2019.9943C6.94563%2019.9405%206.61868%2019.5264%206.67245%2019.0693C7.05696%2015.801%209.92635%2013.3333%2013.3334%2013.3333C16.7405%2013.3333%2019.6099%2015.801%2019.9944%2019.0693ZM1.65337%2012.6491C1.57104%2013.1019%201.13722%2013.4022%200.684407%2013.3199C0.231593%2013.2376%20-0.0687435%2012.8037%200.0135862%2012.3509C0.422542%2010.1017%202.61772%208.33333%205.00014%208.33333C7.38257%208.33333%209.57775%2010.1017%209.9867%2012.3509C10.069%2012.8037%209.7687%2013.2376%209.31588%2013.3199C8.86307%2013.4022%208.42925%2013.1019%208.34692%2012.6491C8.08428%2011.2045%206.58899%2010%205.00014%2010C3.4113%2010%201.91601%2011.2045%201.65337%2012.6491ZM5%206.66667C3.15905%206.66667%201.66667%205.17428%201.66667%203.33333C1.66667%201.49238%203.15905%200%205%200C6.84095%200%208.33333%201.49238%208.33333%203.33333C8.33333%205.17428%206.84095%206.66667%205%206.66667ZM5%205C5.92047%205%206.66667%204.25381%206.66667%203.33333C6.66667%202.41286%205.92047%201.66667%205%201.66667C4.07953%201.66667%203.33333%202.41286%203.33333%203.33333C3.33333%204.25381%204.07953%205%205%205ZM13.3333%2011.6667C11.0321%2011.6667%209.16667%209.80119%209.16667%207.5C9.16667%205.19881%2011.0321%203.33333%2013.3333%203.33333C15.6345%203.33333%2017.5%205.19881%2017.5%207.5C17.5%209.80119%2015.6345%2011.6667%2013.3333%2011.6667ZM13.3333%2010C14.714%2010%2015.8333%208.88071%2015.8333%207.5C15.8333%206.11929%2014.714%205%2013.3333%205C11.9526%205%2010.8333%206.11929%2010.8333%207.5C10.8333%208.88071%2011.9526%2010%2013.3333%2010Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <Text content={textEmployeeCount} size="4" weight="medium" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cl-header-item")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M3%2019.0002V5.70058C3%205.28007%203.26307%204.90449%203.65826%204.76079L13.3291%201.24411C13.5886%201.14974%2013.8755%201.28361%2013.9699%201.54313C13.9898%201.5979%2014%201.65573%2014%201.714V6.66682L20.3162%208.77223C20.7246%208.90834%2021%209.29048%2021%209.72091V19.0002H23V21.0002H1V19.0002H3ZM5%2019.0002H12V3.85555L5%206.40101V19.0002ZM19%2019.0002V10.4417L14%208.77501V19.0002H19Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-lg", "fw-semibold")}
                tag="div"
              >
                {textCompanyType}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          {isHeaderDescriptionVisible ? (
            <_Builtin.Block tag="div">{textHeaderDiscription}</_Builtin.Block>
          ) : null}
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
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "open-jobs-sticky-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "container-1216")}
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
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-xl", "fw-semibold")}
                      tag="div"
                    >
                      {"Open Jobs"}
                    </_Builtin.Block>
                    {isOpenJobCountVisible ? (
                      <_Builtin.Block
                        className={_utils.cx(_styles, "div-block-427")}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          {textOpenJobCount}
                        </_Builtin.Block>
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
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-xl", "fw-semibold")}
                    tag="div"
                  >
                    {"About"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-xl", "fw-semibold")}
                    tag="div"
                  >
                    {textCompanyName}
                  </_Builtin.Block>
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
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-xl", "fw-semibold")}
                  tag="div"
                >
                  {"Office Locations"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-429")}
                  tag="div"
                >
                  {slotOfficeLocaionCard ?? <OfficeLocationCard />}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "aglint-powered-footer", "pt-100")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-432")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-933")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-sm", "color-grey-600")}
                  tag="div"
                >
                  {"Powered By"}
                </_Builtin.Block>
                <_Builtin.Image
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6515c71a265110c954626cb3_Frame%202%20(1).svg"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "text-grey-600")}
                tag="div"
              >
                {"© 2024 Aglint Inc. All Rights Reserved"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
