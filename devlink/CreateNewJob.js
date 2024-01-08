import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { CloseJobButton } from "./CloseJobButton";
import { JobUnpublishDisclaimer } from "./JobUnpublishDisclaimer";
import { ScreeningQuestion } from "./ScreeningQuestion";
import * as _utils from "./utils";
import _styles from "./CreateNewJob.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1352":{"id":"e-1352","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1353"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365602},"e-1353":{"id":"e-1353","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1352"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365605},"e-1382":{"id":"e-1382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-489","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1383":{"id":"e-1383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-490","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1386":{"id":"e-1386","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1387"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976388},"e-1387":{"id":"e-1387","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1386"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976390},"e-1502":{"id":"e-1502","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-556","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1503"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2dc8f549-ad81-9164-85a3-087b8aa5976f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2dc8f549-ad81-9164-85a3-087b8aa5976f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1704436214448},"e-1503":{"id":"e-1503","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-557","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1502"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2dc8f549-ad81-9164-85a3-087b8aa5976f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2dc8f549-ad81-9164-85a3-087b8aa5976f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1704436214450}},"actionLists":{"a-471":{"id":"a-471","title":"Email Interaction Hover In","actionItemGroups":[{"actionItems":[{"id":"a-471-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-471-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-471-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-471-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-471-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-471-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-472":{"id":"a-472","title":"Email Interaction Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-472-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-472-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-472-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-489":{"id":"a-489","title":"Email Interaction Hover In 2","actionItemGroups":[{"actionItems":[{"id":"a-489-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-489-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-489-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-489-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-489-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-489-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-490":{"id":"a-490","title":"Email Interaction Hover Out 2","actionItemGroups":[{"actionItems":[{"id":"a-490-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-490-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-490-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-556":{"id":"a-556","title":"job discard changes hover in","actionItemGroups":[{"actionItems":[{"id":"a-556-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".discard-wrap","selectorGuids":["c678d266-0b67-e6c5-2b53-f0de8dd97aab"]},"value":"none"}},{"id":"a-556-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".discard-wrap","selectorGuids":["c678d266-0b67-e6c5-2b53-f0de8dd97aab"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-556-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".discard-wrap","selectorGuids":["c678d266-0b67-e6c5-2b53-f0de8dd97aab"]},"value":"flex"}},{"id":"a-556-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".discard-wrap","selectorGuids":["c678d266-0b67-e6c5-2b53-f0de8dd97aab"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1704436221392},"a-557":{"id":"a-557","title":"job discard changes hover out","actionItemGroups":[{"actionItems":[{"id":"a-557-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".discard-wrap","selectorGuids":["c678d266-0b67-e6c5-2b53-f0de8dd97aab"]},"value":"none"}},{"id":"a-557-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".discard-wrap","selectorGuids":["c678d266-0b67-e6c5-2b53-f0de8dd97aab"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1704436221392}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
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
                className={_utils.cx(_styles, "text-lg", "fw-semibold")}
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
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-480")}
              tag="div"
            >
              {slotPublishButton}
            </_Builtin.Block>
            {isUnpublishWarningVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-668")}
                data-w-id="2dc8f549-ad81-9164-85a3-087b8aa5976f"
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M18.2125%2016.925L10.4875%202.03749C10.0625%201.19999%208.70001%201.19999%208.26251%202.03749L0.537508%2016.925C0.337508%2017.3125%200.350008%2017.775%200.575008%2018.15C0.800008%2018.525%201.21251%2018.75%201.65001%2018.75H17.1C17.5375%2018.75%2017.9375%2018.525%2018.1625%2018.15C18.3875%2017.775%2018.4125%2017.3125%2018.2125%2016.925ZM8.75%207.5C8.75%207.15%209.025%206.875%209.375%206.875C9.725%206.875%2010%207.15%2010%207.5V11.875C10%2012.225%209.725%2012.5%209.375%2012.5C9.025%2012.5%208.75%2012.225%208.75%2011.875V7.5ZM9.375%2016.25C8.6875%2016.25%208.125%2015.6875%208.125%2015C8.125%2014.3125%208.6875%2013.75%209.375%2013.75C10.0625%2013.75%2010.625%2014.3125%2010.625%2015C10.625%2015.6875%2010.0625%2016.25%209.375%2016.25Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
                />
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
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-558")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cursor-pointer")}
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
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block className={_utils.cx(_styles, "ml-12")} tag="div">
              {slotCloseJobButton ?? <CloseJobButton />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-503")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-unpublish-disclaimer", "hide")}
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
          className={_utils.cx(_styles, "height-scroll")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-create-job-new-wrapper")}
            tag="div"
          >
            {slotCreateJob ?? <ScreeningQuestion />}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "relative", "zindex-3")}
            tag="div"
          >
            {slotCloseJob}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%5Bclass*%3D%22CreateNewJob_height-scroll__%22%5D%7B%0Aheight%3Acalc(100vh%20-%20172px)%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
