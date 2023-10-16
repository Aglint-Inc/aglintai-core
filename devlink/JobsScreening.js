import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { ScreeningLink } from "./ScreeningLink";
import { EmailTemplate } from "./EmailTemplate";
import * as _utils from "./utils";
import _styles from "./JobsScreening.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1352":{"id":"e-1352","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1353"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"c08cb0d6-e773-39d6-99d2-4bcaadb6be92","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"c08cb0d6-e773-39d6-99d2-4bcaadb6be92","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365602},"e-1353":{"id":"e-1353","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1352"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"c08cb0d6-e773-39d6-99d2-4bcaadb6be92","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"c08cb0d6-e773-39d6-99d2-4bcaadb6be92","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365605}},"actionLists":{"a-471":{"id":"a-471","title":"Email Interaction Hover In","actionItemGroups":[{"actionItems":[{"id":"a-471-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-471-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-471-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-471-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-471-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-471-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-472":{"id":"a-472","title":"Email Interaction Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-472-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-472-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-472-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function JobsScreening({
  as: _Component = _Builtin.Block,
  onClickExportCsv = {},
  onClickSortBy = {},
  onClickResumeMatchAsc = {},
  onClickFilter = {},
  textShowResults = "Showing 19 out of 19 Candidates",
  slotSearchInput,
  slotJobScreeningCards,
  slotScreeningLeft,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "cdd-tab-content-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cdd-tab-content-top")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-285")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {"Screening"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cdd-import-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "content-7", "clickable")}
              tag="div"
              {...onClickExportCsv}
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "vectors-wrapper-41")}
                width="12"
                height="12"
                loading="lazy"
                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65047121f55e98229ef58e02_Vectors-Wrapper.svg"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "label-8")}
                tag="div"
              >
                {"Export CSV"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cdd-search-filter")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cdd-filter-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "rd-filter-block")}
              tag="div"
              {...onClickSortBy}
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "rd-filter-icon")}
                width="12"
                height="12"
                loading="lazy"
                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65030d085ea1a69e3594c991_Vectors-Wrapper.svg"
              />
              <_Builtin.Block tag="div">{"Sort by"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cdd-filter-resume-match")}
              tag="div"
              {...onClickResumeMatchAsc}
            >
              {"Resume Match Asc"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "", "rd-filter-block")}
              tag="div"
              {...onClickFilter}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "filter-token")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "vectors-wrapper-18")}
                  width="10.939278602600098"
                  height="10.930898666381836"
                  loading="lazy"
                  src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65030d090b86d460a1805107_Vectors-Wrapper.svg"
                />
              </_Builtin.Block>
              <_Builtin.Block className={_utils.cx(_styles, "")} tag="div">
                {"Filter"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-284")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "color-grey-600")}
              tag="div"
            >
              {textShowResults}
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "input")} tag="div">
              {slotSearchInput}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cdd-content-main")}
        tag="div"
      >
        <_Builtin.Block
          id={_utils.cx(
            _styles,
            "w-node-f7b883fb-4b7a-c3d8-b462-17d494e1e0cc-94e1e0ad"
          )}
          tag="div"
        >
          {slotJobScreeningCards}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cdd-content-side")}
          tag="div"
        >
          {slotScreeningLeft ?? (
            <>
              <ScreeningLink />
              <EmailTemplate />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
