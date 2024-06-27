"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { ButtonSolid } from "./ButtonSolid";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonPrimarySmall } from "./ButtonPrimarySmall";
import * as _utils from "./utils";
import _styles from "./JobListing.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

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
  _interactions.useInteractions(_interactionsData, _styles);

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
                        size="4"
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
                      size="4"
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
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M19.9944%2019.0693C20.0481%2019.5264%2019.7212%2019.9405%2019.2641%2019.9943C18.807%2020.0481%2018.3929%2019.7211%2018.3391%2019.264C18.0548%2016.8471%2015.907%2015%2013.3334%2015C10.7599%2015%208.61205%2016.8471%208.32771%2019.264C8.27393%2019.7211%207.8598%2020.0481%207.40271%2019.9943C6.94563%2019.9405%206.61868%2019.5264%206.67245%2019.0693C7.05696%2015.801%209.92635%2013.3333%2013.3334%2013.3333C16.7405%2013.3333%2019.6099%2015.801%2019.9944%2019.0693ZM1.65337%2012.6491C1.57104%2013.1019%201.13722%2013.4022%200.684407%2013.3199C0.231593%2013.2376%20-0.0687435%2012.8037%200.0135862%2012.3509C0.422542%2010.1017%202.61772%208.33333%205.00014%208.33333C7.38257%208.33333%209.57775%2010.1017%209.9867%2012.3509C10.069%2012.8037%209.7687%2013.2376%209.31588%2013.3199C8.86307%2013.4022%208.42925%2013.1019%208.34692%2012.6491C8.08428%2011.2045%206.58899%2010%205.00014%2010C3.4113%2010%201.91601%2011.2045%201.65337%2012.6491ZM5%206.66667C3.15905%206.66667%201.66667%205.17428%201.66667%203.33333C1.66667%201.49238%203.15905%200%205%200C6.84095%200%208.33333%201.49238%208.33333%203.33333C8.33333%205.17428%206.84095%206.66667%205%206.66667ZM5%205C5.92047%205%206.66667%204.25381%206.66667%203.33333C6.66667%202.41286%205.92047%201.66667%205%201.66667C4.07953%201.66667%203.33333%202.41286%203.33333%203.33333C3.33333%204.25381%204.07953%205%205%205ZM13.3333%2011.6667C11.0321%2011.6667%209.16667%209.80119%209.16667%207.5C9.16667%205.19881%2011.0321%203.33333%2013.3333%203.33333C15.6345%203.33333%2017.5%205.19881%2017.5%207.5C17.5%209.80119%2015.6345%2011.6667%2013.3333%2011.6667ZM13.3333%2010C14.714%2010%2015.8333%208.88071%2015.8333%207.5C15.8333%206.11929%2014.714%205%2013.3333%205C11.9526%205%2010.8333%206.11929%2010.8333%207.5C10.8333%208.88071%2011.9526%2010%2013.3333%2010Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                        <Text
                          content={textEmployeeCount}
                          color="neutral"
                          size="2"
                          weight="medium"
                        />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cl-header-item")}
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M3%2019.0002V5.70058C3%205.28007%203.26307%204.90449%203.65826%204.76079L13.3291%201.24411C13.5886%201.14974%2013.8755%201.28361%2013.9699%201.54313C13.9898%201.5979%2014%201.65573%2014%201.714V6.66682L20.3162%208.77223C20.7246%208.90834%2021%209.29048%2021%209.72091V19.0002H23V21.0002H1V19.0002H3ZM5%2019.0002H12V3.85555L5%206.40101V19.0002ZM19%2019.0002V10.4417L14%208.77501V19.0002H19Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                        <Text
                          content={textCompanyType}
                          color="neutral"
                          size="2"
                          weight="medium"
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
