import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { CloseJobButton } from "./CloseJobButton";
import { JobUnpublishDisclaimer } from "./JobUnpublishDisclaimer";
import { ScreeningQuestion } from "./ScreeningQuestion";
import { AssessmentEpilogue } from "./AssessmentEpilogue";
import { AssessmentQuestion } from "./AssessmentQuestion";
import { WelcomeMessage } from "./WelcomeMessage";
import { AssessmentSetting } from "./AssessmentSetting";
import * as _utils from "./utils";
import _styles from "./CreateNewJob.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1352":{"id":"e-1352","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1353"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365602},"e-1353":{"id":"e-1353","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1352"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365605},"e-1382":{"id":"e-1382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-489","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1383":{"id":"e-1383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-490","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1386":{"id":"e-1386","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1387"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976388},"e-1387":{"id":"e-1387","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1386"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976390},"e-1512":{"id":"e-1512","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-556","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1513"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"af67fb4f-a9fb-f6f7-781e-044a962dea29","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"af67fb4f-a9fb-f6f7-781e-044a962dea29","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1704964117132},"e-1513":{"id":"e-1513","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-557","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1512"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"af67fb4f-a9fb-f6f7-781e-044a962dea29","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"af67fb4f-a9fb-f6f7-781e-044a962dea29","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1704964117136}},"actionLists":{"a-471":{"id":"a-471","title":"Email Interaction Hover In","actionItemGroups":[{"actionItems":[{"id":"a-471-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-471-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-471-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-471-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-471-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-471-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-472":{"id":"a-472","title":"Email Interaction Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-472-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-472-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-472-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-489":{"id":"a-489","title":"Email Interaction Hover In 2","actionItemGroups":[{"actionItems":[{"id":"a-489-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-489-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-489-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-489-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-489-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-489-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-490":{"id":"a-490","title":"Email Interaction Hover Out 2","actionItemGroups":[{"actionItems":[{"id":"a-490-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-490-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-490-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-556":{"id":"a-556","title":"job discard changes hover in","actionItemGroups":[{"actionItems":[{"id":"a-556-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".discard-wrap","selectorGuids":["c678d266-0b67-e6c5-2b53-f0de8dd97aab"]},"value":"none"}},{"id":"a-556-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".discard-wrap","selectorGuids":["c678d266-0b67-e6c5-2b53-f0de8dd97aab"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-556-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".discard-wrap","selectorGuids":["c678d266-0b67-e6c5-2b53-f0de8dd97aab"]},"value":"flex"}},{"id":"a-556-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".discard-wrap","selectorGuids":["c678d266-0b67-e6c5-2b53-f0de8dd97aab"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1704436221392},"a-557":{"id":"a-557","title":"job discard changes hover out","actionItemGroups":[{"actionItems":[{"id":"a-557-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".discard-wrap","selectorGuids":["c678d266-0b67-e6c5-2b53-f0de8dd97aab"]},"value":"none"}},{"id":"a-557-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".discard-wrap","selectorGuids":["c678d266-0b67-e6c5-2b53-f0de8dd97aab"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1704436221392}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CreateNewJob({
  as: _Component = _Builtin.Block,
  onClickBack = {},
  onClickPreview = {},
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
  slotCloseJob,
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
  isAssessmentPreviewVisible = false,
  onClickAssessmentPreview = {},
  onClickDisableAssessment = {},
  isProceedDisable = true,
  onClickProceed = {},
  isProceedVisible = true,
  slotWarning,
  textProceed = "Proceed to Email Templates",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "new-create-job")} tag="div">
      <_Builtin.Block tag="div">
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
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {textJobName}
              </_Builtin.Block>
              {isPreviewVisible ? (
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-sm",
                    "text-blue-500",
                    "cursor-pointer"
                  )}
                  tag="div"
                  {...onClickPreview}
                >
                  {"Preview"}
                </_Builtin.Block>
              ) : null}
              <_Builtin.Block tag="div">{slotAtsBadge}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "create-job-header-right")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotSavedChanges}</_Builtin.Block>
            {isUnpublishWarningVisible ? (
              <_Builtin.Block tag="div">
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-558")}
                  data-w-id="af67fb4f-a9fb-f6f7-781e-044a962dea29"
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "discard-wrap")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "color-grey-600")}
                      tag="div"
                    >
                      {"You have unpublished changes."}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cursor-pointer",
                      "discard-job"
                    )}
                    tag="div"
                    {...onClickDiscardChanges}
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.5%2016C3.36%2016%200%2012.64%200%208.5C0%204.36%203.36%201%207.5%201C11.64%201%2015%204.36%2015%208.5C15%2012.64%2011.64%2016%207.5%2016ZM7%2012.5C7%2012.78%207.22%2013%207.5%2013C7.78%2013%208%2012.78%208%2012.5V8C8%207.72%207.78%207.5%207.5%207.5C7.22%207.5%207%207.72%207%208V12.5ZM7.5%204C6.95%204%206.5%204.45%206.5%205C6.5%205.55%206.95%206%207.5%206C8.05%206%208.5%205.55%208.5%205C8.5%204.45%208.05%204%207.5%204Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
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
              <_Builtin.Block className={_utils.cx(_styles, "ml-12")} tag="div">
                {slotCloseJobButton ?? <CloseJobButton />}
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
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
          <_Builtin.Block
            className={_utils.cx(_styles, "new-layout-sublink")}
            tag="div"
          >
            {slotNavSublink}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "height-scroll")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-create-job-new-wrapper")}
              tag="div"
            >
              {slotCreateJob ?? (
                <>
                  <ScreeningQuestion />
                  <AssessmentEpilogue />
                  <AssessmentQuestion />
                  <WelcomeMessage />
                  <AssessmentSetting />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
          {isAssessmentPreviewVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "assessment-side-panel")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-711")}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  {
                    "Preview how candidates will be taking interview in real time."
                  }
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "div-block-712",
                    "cursor-pointer"
                  )}
                  tag="div"
                  {...onClickAssessmentPreview}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2215%22%20height%3D%2212%22%20viewBox%3D%220%200%2015%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.49219%203.1875C2.99219%203.67188%202.57031%204.16406%202.22656%204.66406C1.89844%205.16406%201.65625%205.60938%201.5%206C1.65625%206.39062%201.89844%206.83594%202.22656%207.33594C2.57031%207.83594%202.99219%208.32812%203.49219%208.8125C4.00781%209.29688%204.59375%209.69531%205.25%2010.0078C5.92188%2010.3203%206.67188%2010.4844%207.5%2010.5C8.32812%2010.4844%209.07812%2010.3203%209.75%2010.0078C10.4062%209.69531%2010.9922%209.29688%2011.5078%208.8125C12.0078%208.32812%2012.4297%207.83594%2012.7734%207.33594C13.1016%206.83594%2013.3438%206.39062%2013.5%206C13.3438%205.60938%2013.1016%205.16406%2012.7734%204.66406C12.4297%204.16406%2012.0078%203.67188%2011.5078%203.1875C10.9922%202.70312%2010.4062%202.30469%209.75%201.99219C9.07812%201.67969%208.32812%201.51563%207.5%201.5C6.67188%201.51563%205.92188%201.67969%205.25%201.99219C4.59375%202.30469%204.00781%202.70312%203.49219%203.1875ZM7.5%200.75C8.45312%200.765625%209.30469%200.953125%2010.0547%201.3125C10.8047%201.67187%2011.4609%202.11719%2012.0234%202.64844C12.5703%203.16406%2013.0234%203.69531%2013.3828%204.24219C13.7422%204.78906%2014.0156%205.28125%2014.2031%205.71875C14.2812%205.90625%2014.2812%206.09375%2014.2031%206.28125C14.0156%206.71875%2013.7422%207.21094%2013.3828%207.75781C13.0234%208.30469%2012.5703%208.83594%2012.0234%209.35156C11.4609%209.88281%2010.8047%2010.3281%2010.0547%2010.6875C9.30469%2011.0469%208.45312%2011.2344%207.5%2011.25C6.54688%2011.2344%205.69531%2011.0469%204.94531%2010.6875C4.19531%2010.3281%203.53906%209.88281%202.97656%209.35156C2.42969%208.83594%201.97656%208.30469%201.61719%207.75781C1.25781%207.21094%200.992188%206.71875%200.820312%206.28125C0.742188%206.09375%200.742188%205.90625%200.820312%205.71875C0.992188%205.28125%201.25781%204.78906%201.61719%204.24219C1.97656%203.69531%202.42969%203.16406%202.97656%202.64844C3.53906%202.11719%204.19531%201.67187%204.94531%201.3125C5.69531%200.953125%206.54688%200.765625%207.5%200.75ZM5.25%206C5.25%206.40625%205.35156%206.78125%205.55469%207.125C5.75781%207.46875%206.03125%207.74219%206.375%207.94531C6.73438%208.14844%207.10938%208.25%207.5%208.25C7.89062%208.25%208.26562%208.14844%208.625%207.94531C8.96875%207.74219%209.24219%207.46875%209.44531%207.125C9.64844%206.78125%209.75%206.40625%209.75%206C9.75%205.59375%209.64844%205.21875%209.44531%204.875C9.24219%204.53125%208.96875%204.25781%208.625%204.05469C8.26562%203.85156%207.89062%203.75%207.5%203.75C7.10938%203.75%206.73438%203.85156%206.375%204.05469C6.03125%204.25781%205.75781%204.53125%205.55469%204.875C5.35156%205.21875%205.25%205.59375%205.25%206ZM10.5%206C10.5%206.54688%2010.3672%207.04688%2010.1016%207.5C9.83594%207.95312%209.46875%208.32031%209%208.60156C8.53125%208.86719%208.03125%209%207.5%209C6.96875%209%206.46875%208.86719%206%208.60156C5.53125%208.32031%205.16406%207.95312%204.89844%207.5C4.63281%207.04688%204.5%206.54688%204.5%206C4.5%205.45312%204.63281%204.95312%204.89844%204.5C5.16406%204.04688%205.53125%203.67969%206%203.39844C6.46875%203.13281%206.96875%203%207.5%203C8.03125%203%208.53125%203.13281%209%203.39844C9.46875%203.67969%209.83594%204.04688%2010.1016%204.5C10.3672%204.95312%2010.5%205.45312%2010.5%206Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">{"Preview"}</_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-711")}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  {
                    "Disable this process if you don’t want to use assessment for the candidate."
                  }
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-red-500",
                    "cursor-pointer"
                  )}
                  tag="div"
                >
                  <_Builtin.Block tag="div" {...onClickDisableAssessment}>
                    {"Disable Assesment"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%5Bclass*%3D%22CreateNewJob_height-scroll__%22%5D%7B%0Aheight%3Acalc(100vh%20-%20172px)%3B%0A%7D%0A%3C%2Fstyle%3E"
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
                className={_utils.cx(_styles, "fw-semibold", "text-blue-800")}
                tag="div"
              >
                {textProceed}
              </_Builtin.Block>
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2210%22%20height%3D%2216%22%20viewBox%3D%220%200%2010%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.53125%207.46875C9.82292%207.82292%209.82292%208.17708%209.53125%208.53125L3.53125%2014.5312C3.17708%2014.8229%202.82292%2014.8229%202.46875%2014.5312C2.17708%2014.1771%202.17708%2013.8229%202.46875%2013.4688L7.9375%208L2.46875%202.53125C2.17708%202.17708%202.17708%201.82292%202.46875%201.46875C2.82292%201.17708%203.17708%201.17708%203.53125%201.46875L9.53125%207.46875Z%22%20fill%3D%22%230F3554%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            {isProceedDisable ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "proceed-to-btn", "disable")}
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
                  value="%3Csvg%20width%3D%2210%22%20height%3D%2216%22%20viewBox%3D%220%200%2010%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.53125%207.46875C9.82292%207.82292%209.82292%208.17708%209.53125%208.53125L3.53125%2014.5312C3.17708%2014.8229%202.82292%2014.8229%202.46875%2014.5312C2.17708%2014.1771%202.17708%2013.8229%202.46875%2013.4688L7.9375%208L2.46875%202.53125C2.17708%202.17708%202.17708%201.82292%202.46875%201.46875C2.82292%201.17708%203.17708%201.17708%203.53125%201.46875L9.53125%207.46875Z%22%20fill%3D%22%23C2C8CC%22%2F%3E%0A%3C%2Fsvg%3E"
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
