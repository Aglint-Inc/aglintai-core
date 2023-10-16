import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CreateNewJob.module.css";

export function CreateNewJob({
  as: _Component = _Builtin.Block,
  onClickBack = {},
  isSavedChangesVisible = true,
  onClickPreview = {},
  onClickPublish = {},
  onClickDetails = {},
  isDetailsActive = false,
  onClickApplyForm = {},
  isApplyFormActive = false,
  onClickScoreSetting = {},
  isScoreSettingActive = false,
  onClickEmailTemplates = {},
  isEmailTemplateActive = false,
  onClickScreeningQuestions = {},
  isScreeningQuestionsActive = false,
  onClickWorkflows = {},
  isWorkflowsActive = false,
  slotCreateJob,
  textJobName = "Untitled",
  textJobEdit = "Create Job",
  slotPublishButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "new-create-job")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "new-create-job-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "create-job-header-left")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "create-new-arrow-back")}
            tag="div"
            {...onClickBack}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%228%22%20height%3D%2212%22%20viewBox%3D%220%200%208%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_3288_37876)%22%3E%0A%3Cpath%20d%3D%22M0.988375%206.45219C0.738375%206.20219%200.738375%205.79619%200.988375%205.54619L4.82838%201.70619C5.07838%201.45619%205.48437%201.45619%205.73437%201.70619C5.98437%201.95619%205.98437%202.36219%205.73437%202.61219L2.34638%206.00019L5.73238%209.38819C5.98238%209.63819%205.98238%2010.0442%205.73238%2010.2942C5.48238%2010.5442%205.07638%2010.5442%204.82638%2010.2942L0.986375%206.45419L0.988375%206.45219Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_3288_37876%22%3E%0A%3Crect%20width%3D%226.4%22%20height%3D%2210.24%22%20fill%3D%22white%22%20transform%3D%22matrix(-1%200%200%20-1%207.2002%2011.1201)%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-481")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-xl",
                "fw-semibold",
                "color-black"
              )}
              tag="div"
            >
              {textJobName}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "create-job-header-right")}
          tag="div"
        >
          {isSavedChangesVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "saved-changes-wrappers")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200C2.69%200%200%202.69%200%206C0%209.31%202.69%2012%206%2012C9.31%2012%2012%209.31%2012%206C12%202.69%209.31%200%206%200ZM9.44%204.94L5.94%208.44C5.82%208.56%205.66%208.62%205.5%208.62C5.34%208.62%205.18%208.56%205.06%208.44L3.06%206.44C2.82%206.2%202.82%205.8%203.06%205.56C3.3%205.32%203.7%205.32%203.94%205.56L5.5%207.12L8.56%204.06C8.8%203.82%209.2%203.82%209.44%204.06C9.69%204.3%209.69%204.7%209.44%204.94Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold", "text-green-500")}
                tag="div"
              >
                {"Saved changes"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "button-grey-line-icons")}
            tag="div"
            {...onClickPreview}
          >
            <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.00015%201.5C8.6962%201.5%2010.9392%203.43988%2011.4094%206C10.9392%208.5601%208.6962%2010.5%206.00015%2010.5C3.30406%2010.5%201.06108%208.5601%200.59082%206C1.06108%203.43988%203.30406%201.5%206.00015%201.5ZM6.00015%209.5C8.11795%209.5%209.93015%208.026%2010.3889%206C9.93015%203.97401%208.11795%202.5%206.00015%202.5C3.8823%202.5%202.07011%203.97401%201.61139%206C2.07011%208.026%203.8823%209.5%206.00015%209.5ZM6.00015%208.25C4.75749%208.25%203.75013%207.24265%203.75013%206C3.75013%204.75736%204.75749%203.75%206.00015%203.75C7.24275%203.75%208.25015%204.75736%208.25015%206C8.25015%207.24265%207.24275%208.25%206.00015%208.25ZM6.00015%207.25C6.6905%207.25%207.25015%206.69035%207.25015%206C7.25015%205.30965%206.6905%204.75%206.00015%204.75C5.3098%204.75%204.75013%205.30965%204.75013%206C4.75013%206.69035%205.3098%207.25%206.00015%207.25Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E" />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "color-grey-600")}
              tag="div"
            >
              {"Preview"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-480")}
            tag="div"
          >
            {slotPublishButton}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "create-new-job-menu-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "create-job-menu-wrap")}
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
              className={_utils.cx(_styles, "white-active-bg")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "create-job-menu-wrap")}
          tag="div"
          {...onClickApplyForm}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "relative")}
            tag="div"
          >
            {"Apply Form"}
          </_Builtin.Block>
          {isApplyFormActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "white-active-bg")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "create-job-menu-wrap")}
          tag="div"
          {...onClickScoreSetting}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "relative")}
            tag="div"
          >
            {"Score Settings"}
          </_Builtin.Block>
          {isScoreSettingActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "white-active-bg")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "create-job-menu-wrap")}
          tag="div"
          {...onClickEmailTemplates}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "relative")}
            tag="div"
          >
            {"Email Templates"}
          </_Builtin.Block>
          {isEmailTemplateActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "white-active-bg")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "create-job-menu-wrap")}
          tag="div"
          {...onClickScreeningQuestions}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "relative")}
            tag="div"
          >
            {"Screening Questions"}
          </_Builtin.Block>
          {isScreeningQuestionsActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "white-active-bg")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "create-job-menu-wrap")}
          tag="div"
          {...onClickWorkflows}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "relative")}
            tag="div"
          >
            {"Workflows"}
          </_Builtin.Block>
          {isWorkflowsActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "white-active-bg")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-create-job-new-wrapper")}
        tag="div"
      >
        {slotCreateJob}
      </_Builtin.Block>
    </_Component>
  );
}
