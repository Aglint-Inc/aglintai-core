import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonOutlinedDark } from "./ButtonOutlinedDark";
import * as _utils from "./utils";
import _styles from "./EditJob.module.css";

export function EditJob({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  slotDetails,
  onClickDetails = {},
  onClickEmailTemplates = {},
  onClickApplyForm = {},
  onClickScreeningQuestion = {},
  onClickWorkFlows = {},
  slotLoaderSaving,
  isWarningVisibles = true,
  isDetailsActive = true,
  isEmailTemplatesActive = false,
  isScreeningQuestionsActive = false,
  isWorkflowActive = false,
  onClickGotIt = {},
  slotSaveStatus,
}) {
  return (
    <_Component className={_utils.cx(_styles, "job-post-side")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-452")} tag="div">
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
              {slotSaveStatus}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "clickable")}
              tag="div"
              {...onClickClose}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed-icon")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_3068_17554%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_3068_17554)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-404")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-422")}
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
                  {isDetailsActive ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "fake-color-div")}
                      tag="div"
                    />
                  ) : null}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "company-tab-link")}
                  tag="div"
                  {...onClickEmailTemplates}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold", "relative")}
                    tag="div"
                  >
                    {"Email Templates"}
                  </_Builtin.Block>
                  {isEmailTemplatesActive ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "fake-color-div")}
                      tag="div"
                    />
                  ) : null}
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
                    className={_utils.cx(_styles, "fw-semibold", "relative")}
                    tag="div"
                  >
                    {"Screening Questions"}
                  </_Builtin.Block>
                  {isScreeningQuestionsActive ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "fake-color-div")}
                      tag="div"
                    />
                  ) : null}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "company-tab-link")}
                  tag="div"
                  {...onClickWorkFlows}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold", "relative")}
                    tag="div"
                  >
                    {"Workflows"}
                  </_Builtin.Block>
                  {isWorkflowActive ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "fake-color-div")}
                      tag="div"
                    />
                  ) : null}
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
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-423")}
                  tag="div"
                >
                  <_Builtin.Block tag="div" {...onClickGotIt}>
                    <ButtonOutlinedDark textLabel="Got it" />
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-details-job")}
        tag="div"
      >
        {slotDetails}
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%5Bclass*%3D%22EditJob_slot-details-job__%22%5D%7B%0Aheight%3Acalc(100vh%20-%20200px)%3B%0A%7D%0A%0A%5Bclass*%3D%22EditJob_slot-details-job__%22%5D%3A%3A-webkit-scrollbar%0A%20%7B%0A%20display%3A%20none%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
