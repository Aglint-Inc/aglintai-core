import React from "react";
import * as _Builtin from "./_Builtin";
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
              className={_utils.cx(_styles, "div-block-456")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-433")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-435")}
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
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-lg", "text-grey-700")}
                      tag="div"
                    >
                      {textCompanyName}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-lg", "fw-semibold")}
                      tag="div"
                    >
                      {textRole}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-grey-600")}
                      tag="div"
                    >
                      {textCompanyLocation}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-434")}
                  tag="div"
                  {...onClickApplyNow}
                >
                  <_Builtin.Block tag="div">{"Apply Now"}</_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block tag="div">{slotDescription}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "slot-appl-job-form")}
                tag="div"
              >
                {slotApplyForThisJob}
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
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-xl", "fw-semibold")}
                      tag="div"
                    >
                      {textCompanyName}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "job-company-info-wrappers"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "div-block-425")}
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M19.9944%2019.0693C20.0481%2019.5264%2019.7212%2019.9405%2019.2641%2019.9943C18.807%2020.0481%2018.3929%2019.7211%2018.3391%2019.264C18.0548%2016.8471%2015.907%2015%2013.3334%2015C10.7599%2015%208.61205%2016.8471%208.32771%2019.264C8.27393%2019.7211%207.8598%2020.0481%207.40271%2019.9943C6.94563%2019.9405%206.61868%2019.5264%206.67245%2019.0693C7.05696%2015.801%209.92635%2013.3333%2013.3334%2013.3333C16.7405%2013.3333%2019.6099%2015.801%2019.9944%2019.0693ZM1.65337%2012.6491C1.57104%2013.1019%201.13722%2013.4022%200.684407%2013.3199C0.231593%2013.2376%20-0.0687435%2012.8037%200.0135862%2012.3509C0.422542%2010.1017%202.61772%208.33333%205.00014%208.33333C7.38257%208.33333%209.57775%2010.1017%209.9867%2012.3509C10.069%2012.8037%209.7687%2013.2376%209.31588%2013.3199C8.86307%2013.4022%208.42925%2013.1019%208.34692%2012.6491C8.08428%2011.2045%206.58899%2010%205.00014%2010C3.4113%2010%201.91601%2011.2045%201.65337%2012.6491ZM5%206.66667C3.15905%206.66667%201.66667%205.17428%201.66667%203.33333C1.66667%201.49238%203.15905%200%205%200C6.84095%200%208.33333%201.49238%208.33333%203.33333C8.33333%205.17428%206.84095%206.66667%205%206.66667ZM5%205C5.92047%205%206.66667%204.25381%206.66667%203.33333C6.66667%202.41286%205.92047%201.66667%205%201.66667C4.07953%201.66667%203.33333%202.41286%203.33333%203.33333C3.33333%204.25381%204.07953%205%205%205ZM13.3333%2011.6667C11.0321%2011.6667%209.16667%209.80119%209.16667%207.5C9.16667%205.19881%2011.0321%203.33333%2013.3333%203.33333C15.6345%203.33333%2017.5%205.19881%2017.5%207.5C17.5%209.80119%2015.6345%2011.6667%2013.3333%2011.6667ZM13.3333%2010C14.714%2010%2015.8333%208.88071%2015.8333%207.5C15.8333%206.11929%2014.714%205%2013.3333%205C11.9526%205%2010.8333%206.11929%2010.8333%207.5C10.8333%208.88071%2011.9526%2010%2013.3333%2010Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "fw-semibold")}
                          tag="div"
                        >
                          {textEmployeeCount}
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "div-block-425")}
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M3%2019.0002V5.70058C3%205.28007%203.26307%204.90449%203.65826%204.76079L13.3291%201.24411C13.5886%201.14974%2013.8755%201.28361%2013.9699%201.54313C13.9898%201.5979%2014%201.65573%2014%201.714V6.66682L20.3162%208.77223C20.7246%208.90834%2021%209.29048%2021%209.72091V19.0002H23V21.0002H1V19.0002H3ZM5%2019.0002H12V3.85555L5%206.40101V19.0002ZM19%2019.0002V10.4417L14%208.77501V19.0002H19Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                        <_Builtin.Block
                          className={_utils.cx(_styles, "fw-semibold")}
                          tag="div"
                        >
                          {textCompanyType}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  {textCompanyDescription}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "company-list-link-wrappers")}
                  tag="div"
                >
                  {slotLinks}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-444")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "text-blue-600",
                      "cursor-pointer"
                    )}
                    tag="div"
                    {...onClickViewMore}
                  >
                    {"View More"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-467")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-445")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-xl")}
                      tag="div"
                    >
                      {"Other open jobs from"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-xl")}
                      tag="div"
                    >
                      {textCompanyName}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot-job-listing-open-card")}
                    tag="div"
                  >
                    {slotOpenJobListing}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-438")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-442")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "share-job-wrappers")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold")}
                    tag="div"
                  >
                    {"Share this job"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-436")}
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
                  className={_utils.cx(_styles, "share-job-wrappers")}
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
      <_Builtin.Block
        className={_utils.cx(_styles, "job-listing-container")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "aglint-powered-footer")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-432")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-473")}
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
              {"© 2023 Aglint Inc. All Rights Reserved"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
