import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonOutlinedSmall } from "./ButtonOutlinedSmall";
import * as _utils from "./utils";
import _styles from "./EditJob.module.css";

export function EditJob({
  as: _Component = _Builtin.Block,
  isJobSaved = true,
  onClickClose = {},
  slotDetails,
  onClickDetails = {},
  onClickEmailTemplates = {},
  onClickApplyForm = {},
  onClickScreeningQuestion = {},
  onClickWorkFlows = {},
  slotLoaderSaving,
  isWarningVisibles = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "job-post-side")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "jobpost-header-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {"Edit Job"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-384")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "save-draft")}
            tag="div"
          >
            {isJobSaved ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "save-draft-wrappers")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200C2.69%200%200%202.69%200%206C0%209.31%202.69%2012%206%2012C9.31%2012%2012%209.31%2012%206C12%202.69%209.31%200%206%200ZM9.44%204.94L5.94%208.44C5.82%208.56%205.66%208.62%205.5%208.62C5.34%208.62%205.18%208.56%205.06%208.44L3.06%206.44C2.82%206.2%202.82%205.8%203.06%205.56C3.3%205.32%203.7%205.32%203.94%205.56L5.5%207.12L8.56%204.06C8.8%203.82%209.2%203.82%209.44%204.06C9.69%204.3%209.69%204.7%209.44%204.94Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-sm",
                    "fw-semibold",
                    "text-green-500"
                  )}
                  tag="div"
                >
                  {"Saved Changes"}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "save-draft-load")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "add-icon")}
                tag="div"
              >
                {slotLoaderSaving}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "text-sm",
                  "fw-semibold",
                  "text-grey-400"
                )}
                tag="div"
              >
                {"Saving Changes"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block tag="div" {...onClickClose}>
            <ButtonOutlinedSmall textLabel="Close" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isWarningVisibles ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "job-warning-post")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M9.38215%202.62209C9.38215%202.62209%2017.1024%2017.5054%2017.1049%2017.5054C17.1049%2017.5054%201.65302%2017.5041%201.65304%2017.504C1.65304%2017.504%209.37918%202.61646%209.38215%202.62209ZM8.26992%202.03748L0.542055%2016.9305C0.115971%2017.7576%200.715707%2018.7542%201.64766%2018.7542H17.1102C18.0421%2018.7542%2018.6419%2017.7576%2018.2158%2016.9305L10.4899%202.04134C10.0159%201.14311%208.74195%201.14311%208.26992%202.03748ZM9.99707%2011.875V7.5C9.99707%206.66667%208.74707%206.66667%208.74707%207.5V11.875C8.74707%2012.7083%209.99707%2012.7083%209.99707%2011.875ZM9.37305%2016.25C10.0634%2016.25%2010.623%2015.6904%2010.623%2015C10.623%2014.3096%2010.0634%2013.75%209.37305%2013.75C8.68269%2013.75%208.12305%2014.3096%208.12305%2015C8.12305%2015.6904%208.68269%2016.25%209.37305%2016.25Z%22%20fill%3D%22%23703815%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">
            {
              "Changing job description will not change the screening questions that you setup."
            }
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-404")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "tab-menu-link-edit-jobs")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "company-tab-link")}
              tag="div"
              {...onClickDetails}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold", "relative")}
                tag="div"
              >
                {"Details"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "fake-color-div")}
                tag="div"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "company-tab-link")}
              tag="div"
              {...onClickEmailTemplates}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Email Templates"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "company-tab-link", "hide")}
              tag="div"
              {...onClickApplyForm}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Apply Form"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "company-tab-link")}
              tag="div"
              {...onClickScreeningQuestion}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Screening Questions"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "company-tab-link")}
              tag="div"
              {...onClickWorkFlows}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Workflows"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-details-job")}
          tag="div"
        >
          {slotDetails}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
