import React from "react";
import * as _Builtin from "./_Builtin";
import { JobsListingCard } from "./JobsListingCard";
import * as _utils from "./utils";
import _styles from "./JobsDashboard.module.css";

export function JobsDashboard({
  as: _Component = _Builtin.Block,
  onClickCreateNewJob = {},
  slotAllJobs,
  slotSearchInputJob,
  jobCount = "0",
  textJobsHeader = "All Jobs",
  isJobCountTagVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "rd-main-wrapper")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-271")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-jobs-header-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-372")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-lg", "fw-semibold")}
              tag="div"
            >
              {textJobsHeader}
            </_Builtin.Block>
            {isJobCountTagVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-373")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {jobCount}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-371")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-input-search-job")}
              tag="div"
            >
              {slotSearchInputJob}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "rd-job-create-btn")}
              tag="div"
              {...onClickCreateNewJob}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M4.08317%202.91732V1.16732C4.08317%200.845154%204.34434%200.583984%204.6665%200.583984H9.33317C9.65534%200.583984%209.9165%200.845154%209.9165%201.16732V2.91732H12.2498C12.572%202.91732%2012.8332%203.17849%2012.8332%203.50065V11.6673C12.8332%2011.9895%2012.572%2012.2507%2012.2498%2012.2507H1.74984C1.42767%2012.2507%201.1665%2011.9895%201.1665%2011.6673V3.50065C1.1665%203.17849%201.42767%202.91732%201.74984%202.91732H4.08317ZM2.33317%209.33398V11.084H11.6665V9.33398H2.33317ZM2.33317%208.16732H11.6665V4.08398H2.33317V8.16732ZM5.24984%201.75065V2.91732H8.74984V1.75065H5.24984ZM6.4165%206.41732H7.58317V7.58398H6.4165V6.41732Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Add Job"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "rd-jobs-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "all-job-list")}
          tag="div"
        >
          {slotAllJobs ?? <JobsListingCard />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
