"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { CloseJobButton } from "./CloseJobButton";
import { JobUnpublishDisclaimer } from "./JobUnpublishDisclaimer";
import * as _utils from "./utils";
import _styles from "./CreateNewJob.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CreateNewJob({
  as: _Component = _Builtin.Block,
  onClickBack = {},
  onClickPreview = {},
  onClickDetails = {},
  isDetailsActive = false,
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
  slotPublishButton,
  slotSavedChanges,
  slotDisclaimerDetails,
  slotDisclaimerApplyForm,
  slotDisclaimerScoreSetting,
  slotEmailDisclaimer,
  slotDisclaimerScreening,
  slotDisclaimerWorkflow,
  isPreviewVisible = true,
  slotAtsBadge,
  onClickPreviewChanges = {},
  slotUnpublishDisclaimer,
  isBetaVisible = true,
  slotCloseJobButton,
  onClickDiscardChanges = {},
  isUnpublishWarningVisible = true,
  isScreeningActive = false,
  onClickScreening = {},
  isProductionVisible = true,
  isDotButtonVisible = true,
  slotNavSublink,
  isAssessmentPreviewVisible = true,
  isProceedDisable = true,
  onClickProceed = {},
  isProceedVisible = true,
  slotWarning,
  textProceed = "Proceed to Email Templates",
  slotSideSection,
  isSideNavVisible = true,
  isHeaderVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "new-create-job")} tag="div">
      <_Builtin.Block tag="div">
        {isHeaderVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "new-create-job-header")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "create-job-header-left")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "div-block-715",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickBack}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.35355%201.64645C8.52712%201.82001%208.5464%202.08944%208.41141%202.28431L8.35355%202.35355L4.707%206L8.35355%209.64645C8.52712%209.82001%208.5464%2010.0894%208.41141%2010.2843L8.35355%2010.3536C8.17999%2010.5271%207.91056%2010.5464%207.71569%2010.4114L7.64645%2010.3536L3.64645%206.35355C3.47288%206.17999%203.4536%205.91056%203.58859%205.71569L3.64645%205.64645L7.64645%201.64645C7.84171%201.45118%208.15829%201.45118%208.35355%201.64645Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-grey-600",
                    "text-sm-default"
                  )}
                  tag="div"
                >
                  {"Back"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-481")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {textJobName}
                </_Builtin.Block>
                {isPreviewVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "div-block-716",
                      "cursor-pointer"
                    )}
                    tag="div"
                    {...onClickPreview}
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-blue-500")}
                      tag="div"
                    >
                      {"Preview"}
                    </_Builtin.Block>
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewbox%3D%220%200%208%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.25%200H7.75C7.90625%200.0104167%207.98958%200.09375%208%200.25V2.75C7.98958%202.90625%207.90625%202.98958%207.75%203C7.59375%202.98958%207.51042%202.90625%207.5%202.75V0.859375L3.67188%204.67188C3.55729%204.77604%203.44271%204.77604%203.32812%204.67188C3.22396%204.55729%203.22396%204.44271%203.32812%204.32812L7.14062%200.5H5.25C5.09375%200.489583%205.01042%200.40625%205%200.25C5.01042%200.09375%205.09375%200.0104167%205.25%200ZM1%200.5H3.25C3.40625%200.510417%203.48958%200.59375%203.5%200.75C3.48958%200.90625%203.40625%200.989583%203.25%201H1C0.854167%201%200.734375%201.04688%200.640625%201.14062C0.546875%201.23438%200.5%201.35417%200.5%201.5V7C0.5%207.14583%200.546875%207.26562%200.640625%207.35938C0.734375%207.45312%200.854167%207.5%201%207.5H6.5C6.64583%207.5%206.76562%207.45312%206.85938%207.35938C6.95312%207.26562%207%207.14583%207%207V4.75C7.01042%204.59375%207.09375%204.51042%207.25%204.5C7.40625%204.51042%207.48958%204.59375%207.5%204.75V7C7.48958%207.28125%207.39062%207.51562%207.20312%207.70312C7.01562%207.89062%206.78125%207.98958%206.5%208H1C0.71875%207.98958%200.484375%207.89062%200.296875%207.70312C0.109375%207.51562%200.0104167%207.28125%200%207V1.5C0.0104167%201.21875%200.109375%200.984375%200.296875%200.796875C0.484375%200.609375%200.71875%200.510417%201%200.5Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                ) : null}
                <_Builtin.Block tag="div">{slotAtsBadge}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "create-job-header-right")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-720")}
                tag="div"
              >
                {slotSavedChanges}
              </_Builtin.Block>
              {isUnpublishWarningVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-721")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "jud-right-text")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "cursor-pointer",
                        "discard-job"
                      )}
                      tag="div"
                      {...onClickDiscardChanges}
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-blue-600")}
                        tag="div"
                      >
                        {"Discard Changes"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-480")}
                tag="div"
              >
                {slotPublishButton}
              </_Builtin.Block>
              {isDotButtonVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "ml-12", "relative-1")}
                  tag="div"
                >
                  {slotCloseJobButton ?? <CloseJobButton />}
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-708")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-503", "hide")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "slot-unpublish-disclaimer",
                "hide"
              )}
              tag="div"
            >
              {slotUnpublishDisclaimer ?? <JobUnpublishDisclaimer />}
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
                  className={_utils.cx(
                    _styles,
                    "fw-semibold",
                    "relative",
                    "zindex-6"
                  )}
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
                <_Builtin.Block
                  className={_utils.cx(_styles, "disclaimer-icons")}
                  tag="div"
                >
                  {slotDisclaimerDetails}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "create-job-menu-wrap")}
                tag="div"
                {...onClickScoreSetting}
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "fw-semibold",
                    "relative",
                    "zindex-6"
                  )}
                  tag="div"
                >
                  {"Profile Score"}
                </_Builtin.Block>
                {isScoreSettingActive ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "white-active-bg")}
                    tag="div"
                  />
                ) : null}
                <_Builtin.Block
                  className={_utils.cx(_styles, "disclaimer-icons")}
                  tag="div"
                >
                  {slotDisclaimerScoreSetting}
                </_Builtin.Block>
              </_Builtin.Block>
              {isProductionVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "create-job-menu-wrap")}
                  tag="div"
                  {...onClickScreening}
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "fw-semibold",
                      "relative",
                      "zindex-6"
                    )}
                    tag="div"
                  >
                    {"Screening "}
                  </_Builtin.Block>
                  {isScreeningActive ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "white-active-bg")}
                      tag="div"
                    />
                  ) : null}
                  <_Builtin.Block
                    className={_utils.cx(_styles, "disclaimer-icons")}
                    tag="div"
                  >
                    {slotDisclaimerApplyForm}
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              {isProductionVisible ? (
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "create-job-menu-wrap",
                    "assessment"
                  )}
                  tag="div"
                  {...onClickScreeningQuestions}
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "fw-semibold",
                      "relative",
                      "zindex-6"
                    )}
                    tag="div"
                  >
                    {"Assessment"}
                  </_Builtin.Block>
                  {isScreeningQuestionsActive ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "white-active-bg")}
                      tag="div"
                    />
                  ) : null}
                  <_Builtin.Block
                    className={_utils.cx(_styles, "disclaimer-icons")}
                    tag="div"
                  >
                    {slotDisclaimerScreening}
                  </_Builtin.Block>
                  {isBetaVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "beta-wrap")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-xsm")}
                        tag="div"
                      >
                        {"Beta"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
              ) : null}
              {isProductionVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "create-job-menu-wrap")}
                  tag="div"
                  {...onClickWorkflows}
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "fw-semibold",
                      "relative",
                      "zindex-6"
                    )}
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
                  <_Builtin.Block
                    className={_utils.cx(_styles, "disclaimer-icons")}
                    tag="div"
                  >
                    {slotDisclaimerWorkflow}
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              {isProductionVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "create-job-menu-wrap")}
                  tag="div"
                  {...onClickEmailTemplates}
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "fw-semibold",
                      "relative",
                      "zindex-6"
                    )}
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
                  <_Builtin.Block
                    className={_utils.cx(_styles, "disclaimer-icons")}
                    tag="div"
                  >
                    {slotEmailDisclaimer}
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "hide")}
              value="%3Cstyle%3E%0A%5Bclass*%3D%22CreateNewJob_create-new-job-menu-wrappers__%22%5D%3A%3A-webkit-scrollbar%7B%0Adisplay%3A%20none%3B%0A%7D%0A%3C%2Fstyle%3E"
            />
          </_Builtin.Block>
          {isSideNavVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "new-layout-sublink")}
              tag="div"
            >
              {slotNavSublink}
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "height-scroll",
              "width-100",
              "scroll-hidden"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-create-job-new-wrapper")}
              tag="div"
            >
              {slotCreateJob}
            </_Builtin.Block>
          </_Builtin.Block>
          {isAssessmentPreviewVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "assessment-side-panel")}
              tag="div"
            >
              {slotSideSection}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%5Bclass*%3D%22CreateNewJob_height-scroll__%22%5D%7B%0Aheight%3Acalc(100vh%20-%2060px)%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
      {isProceedVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "proceed-to-wrap")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "relative")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "proceed-to-btn", "cursor-pointer")}
              tag="div"
              {...onClickProceed}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {textProceed}
              </_Builtin.Block>
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2210%22%20height%3D%2216%22%20viewbox%3D%220%200%2010%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.53125%207.46875C9.82292%207.82292%209.82292%208.17708%209.53125%208.53125L3.53125%2014.5312C3.17708%2014.8229%202.82292%2014.8229%202.46875%2014.5312C2.17708%2014.1771%202.17708%2013.8229%202.46875%2013.4688L7.9375%208L2.46875%202.53125C2.17708%202.17708%202.17708%201.82292%202.46875%201.46875C2.82292%201.17708%203.17708%201.17708%203.53125%201.46875L9.53125%207.46875Z%22%20fill%3D%22%23fff%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            {isProceedDisable ? (
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "proceed-to-btn",
                  "disable",
                  "hide"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold", "text-grey-400")}
                  tag="div"
                >
                  {textProceed}
                </_Builtin.Block>
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2210%22%20height%3D%2216%22%20viewbox%3D%220%200%2010%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.53125%207.46875C9.82292%207.82292%209.82292%208.17708%209.53125%208.53125L3.53125%2014.5312C3.17708%2014.8229%202.82292%2014.8229%202.46875%2014.5312C2.17708%2014.1771%202.17708%2013.8229%202.46875%2013.4688L7.9375%208L2.46875%202.53125C2.17708%202.17708%202.17708%201.82292%202.46875%201.46875C2.82292%201.17708%203.17708%201.17708%203.53125%201.46875L9.53125%207.46875Z%22%20fill%3D%22%23C2C8CC%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "div-warning")}
              tag="div"
            >
              {slotWarning}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
