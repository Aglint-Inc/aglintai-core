import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JobsListingCard.module.css";

export function JobsListingCard({
  as: _Component = _Builtin.Block,
  textJobRole = "Software Developer",
  textCompanyLocation = "Microsoft, California, United States",
  slotCompanyLogo,
  textPostedDate = "Posted 2 months ago",
  applicantCount = "0",
  interviewingCount = "0",
  shortlistedCount = "0",
  slotPostedCompany,
  postedCompanyName = "Aglint",
  bgColorProps = {},
  textJobsStatus = "Draft",
  textColorProps = {},
  onClickCard = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "rd-job-list-item")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "rd-job-info-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-company-info-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "rd-company-icon-block")}
            tag="div"
          >
            {slotCompanyLogo}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "job-details")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              dyn={{
                bind: {},
              }}
              tag="div"
            >
              {textJobRole}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "tittle-company-location")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "company-location")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-sm",
                    "fw-semibold",
                    "text-grey-600"
                  )}
                  dyn={{
                    bind: {},
                  }}
                  tag="div"
                >
                  {textCompanyLocation}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "color-grey-500")}
          dyn={{
            bind: {},
          }}
          tag="div"
        >
          {textPostedDate}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "applicants-number-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "applicants-number")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-24")}
            dyn={{
              bind: {},
            }}
            tag="div"
          >
            {applicantCount}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "",
              "text-sm",
              "fw-semibold",
              "text-grey-600"
            )}
            tag="div"
          >
            {"Applicants"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "applicants-number")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-24")}
            dyn={{
              bind: {},
            }}
            tag="div"
          >
            {interviewingCount}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "",
              "text-sm",
              "fw-semibold",
              "text-grey-600"
            )}
            tag="div"
          >
            {"Interviewing"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "applicants-number")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-24")}
            dyn={{
              bind: {},
            }}
            tag="div"
          >
            {shortlistedCount}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "",
              "text-sm",
              "fw-semibold",
              "text-grey-600"
            )}
            tag="div"
          >
            {"Shortlisted"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "rd-platform-info")}
        id={_utils.cx(
          _styles,
          "w-node-_4c8f5e59-2551-ecd2-b94c-afc3e4f6dd25-e4f6dd07"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-platform-icon-block")}
          tag="div"
        >
          {slotPostedCompany}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-platform-details")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-269")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-xsm",
                "color-grey-600",
                "inline-text"
              )}
              tag="div"
            >
              {"Posted via "}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xsm", "color-grey-600")}
              dyn={{
                bind: {},
              }}
              tag="div"
            >
              {postedCompanyName}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "rd-sync-block")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed-icon")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20d%3D%22M6%202C7.3743%202%208.58745%202.69313%209.3078%203.75H8V4.75H11V1.75H10V2.99968C9.0881%201.78583%207.6362%201%206%201C3.23857%201%201%203.23857%201%206H2C2%203.79086%203.79086%202%206%202ZM10%206C10%208.20915%208.20915%2010%206%2010C4.62572%2010%203.41254%209.30685%202.69221%208.25H4V7.25H1V10.25H2V9.0003C2.91191%2010.2142%204.36382%2011%206%2011C8.7614%2011%2011%208.7614%2011%206H10Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xsm", "fw-semibold")}
              tag="div"
            >
              {"Sync"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "rd-status-badge")}
        dyn={{
          bind: {},
        }}
        tag="div"
        {...bgColorProps}
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "text-sm",
            "fw-semibold",
            "text-kale-800"
          )}
          dyn={{
            bind: {},
          }}
          tag="div"
          {...textColorProps}
        >
          {textJobsStatus}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
