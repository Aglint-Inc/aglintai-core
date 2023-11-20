import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { ButtonOutlinedRegular } from "./ButtonOutlinedRegular";
import { CandidateHistoryCard } from "./CandidateHistoryCard";
import * as _utils from "./utils";
import _styles from "./CandidateDatabaseSearch.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1352":{"id":"e-1352","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1353"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365602},"e-1353":{"id":"e-1353","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1352"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365605},"e-1382":{"id":"e-1382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-489","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1383":{"id":"e-1383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-490","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1386":{"id":"e-1386","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1387"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976388},"e-1387":{"id":"e-1387","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1386"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976390},"e-1474":{"id":"e-1474","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-538","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1475"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4160f0cc-545d-c5e3-e01d-484c7a8ac9e8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4160f0cc-545d-c5e3-e01d-484c7a8ac9e8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700206216610},"e-1476":{"id":"e-1476","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-539","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1477"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a3c2938d-2bbd-9096-5e92-472a3d1e2ce5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a3c2938d-2bbd-9096-5e92-472a3d1e2ce5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700206230806}},"actionLists":{"a-471":{"id":"a-471","title":"Email Interaction Hover In","actionItemGroups":[{"actionItems":[{"id":"a-471-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-471-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-471-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-471-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-471-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-471-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-472":{"id":"a-472","title":"Email Interaction Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-472-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-472-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-472-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-489":{"id":"a-489","title":"Email Interaction Hover In 2","actionItemGroups":[{"actionItems":[{"id":"a-489-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-489-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-489-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-489-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-489-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-489-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-490":{"id":"a-490","title":"Email Interaction Hover Out 2","actionItemGroups":[{"actionItems":[{"id":"a-490-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-490-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-490-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-538":{"id":"a-538","title":"Chat Bubble Open","actionItemGroups":[{"actionItems":[{"id":"a-538-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"flex"}},{"id":"a-538-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":30,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-538-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":0,"unit":""}},{"id":"a-538-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"none"}},{"id":"a-538-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"none"}},{"id":"a-538-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":0,"unit":""}},{"id":"a-538-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":1,"unit":""}}]},{"actionItems":[{"id":"a-538-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":0,"unit":""}},{"id":"a-538-n-15","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".div-block-588","selectorGuids":["a61e8d58-3cd9-bc7c-d748-888ff47ed4db"]},"xValue":0.9,"yValue":0.9,"locked":true}},{"id":"a-538-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"block"}},{"id":"a-538-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":1,"unit":""}},{"id":"a-538-n-12","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-538-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"none"}},{"id":"a-538-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":100,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":1,"unit":""}},{"id":"a-538-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":100,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700132612161},"a-539":{"id":"a-539","title":"Chat Bubble Close","actionItemGroups":[{"actionItems":[{"id":"a-539-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":1,"unit":""}},{"id":"a-539-n-15","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".div-block-588","selectorGuids":["a61e8d58-3cd9-bc7c-d748-888ff47ed4db"]},"xValue":1,"yValue":1,"locked":true}},{"id":"a-539-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":0,"unit":""}},{"id":"a-539-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":30,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-539-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":100,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"none"}},{"id":"a-539-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":100,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":0,"unit":""}},{"id":"a-539-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"none"}},{"id":"a-539-n-12","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700132612161}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateDatabaseSearch({
  as: _Component = _Builtin.Block,
  onClickAllCandidate = {},
  onClickDbRequest = {},
  onClickSearchJobDescription = {},
  slotInputSearch,
  isClearHistoryVisible = true,
  onClickClearHistory = {},
  slotCandidateHistoryCard,
  onClickSearch = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "search-wrap-candidate")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "job-header-empty", "no-sticky")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {"Candidate Database"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate-empty-landing-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "search-left-wrap-candidate")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "search-candidate-wrap")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {"Search candidates by typing in your requirement"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-597")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "input-search-candidate")}
                tag="div"
              >
                {slotInputSearch}
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.Block
                  className={_utils.cx(_styles, "candidate-search-btn")}
                  tag="div"
                  {...onClickSearch}
                >
                  <_Builtin.Block tag="div">{"Search"}</_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "search-job-desc")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-375")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                {"Or search candidates by uploading the job description"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block tag="div" {...onClickSearchJobDescription}>
              <ButtonOutlinedRegular
                textLabel={
                  <>
                    {"Search with job description"}
                    <br />
                  </>
                }
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "all-search-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "search-history-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "history-wrap-candidate")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewBox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.37695%204.35937C1.99674%203.26562%202.83529%202.39062%203.89258%201.73437C4.9681%201.09635%206.17122%200.768228%207.50195%200.749999C8.81445%200.768228%209.99023%201.08724%2011.0293%201.70703C12.0866%202.32682%2012.9251%203.16536%2013.5449%204.22266C14.1647%205.26172%2014.4837%206.4375%2014.502%207.75C14.4837%209.0625%2014.1647%2010.2383%2013.5449%2011.2773C12.9251%2012.3346%2012.0866%2013.1732%2011.0293%2013.793C9.99023%2014.4128%208.81445%2014.7318%207.50195%2014.75C6.35352%2014.7318%205.29622%2014.4766%204.33008%2013.9844C3.36393%2013.4922%202.55273%2012.8177%201.89648%2011.9609C1.76888%2011.724%201.79622%2011.5143%201.97852%2011.332C2.21549%2011.2044%202.42513%2011.2318%202.60742%2011.4141C3.17253%2012.1797%203.87435%2012.7812%204.71289%2013.2188C5.56966%2013.6563%206.49935%2013.875%207.50195%2013.875C8.65039%2013.8568%209.68034%2013.5742%2010.5918%2013.0273C11.5215%2012.4987%2012.2507%2011.7695%2012.7793%2010.8398C13.3262%209.92839%2013.6087%208.89844%2013.627%207.75C13.6087%206.60156%2013.3262%205.57161%2012.7793%204.66016C12.2507%203.73047%2011.5215%203.0013%2010.5918%202.47266C9.68034%201.92578%208.65039%201.64323%207.50195%201.625C6.26237%201.64323%205.15951%201.97135%204.19336%202.60937C3.20898%203.22917%202.4707%204.06771%201.97852%205.125H4.43945C4.71289%205.14323%204.85872%205.28906%204.87695%205.5625C4.85872%205.83594%204.71289%205.98177%204.43945%206H0.939453C0.666015%205.98177%200.520182%205.83594%200.501953%205.5625V2.0625C0.520182%201.78906%200.666015%201.64323%200.939453%201.625C1.21289%201.64323%201.35872%201.78906%201.37695%202.0625V4.35937ZM7.50195%204.25C7.77539%204.26823%207.92122%204.41406%207.93945%204.6875V7.55859L9.99023%209.63672C10.1725%209.83724%2010.1725%2010.0378%209.99023%2010.2383C9.78971%2010.4206%209.58919%2010.4206%209.38867%2010.2383L7.20117%208.05078C7.11003%207.97786%207.06445%207.8776%207.06445%207.75V4.6875C7.08268%204.41406%207.22852%204.26823%207.50195%204.25Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Search History"}
                </_Builtin.Block>
              </_Builtin.Block>
              {isClearHistoryVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "history-wrap-candidate")}
                  tag="div"
                  {...onClickClearHistory}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2213%22%20height%3D%2215%22%20viewBox%3D%220%200%2013%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.24414%201.625C5.08008%201.625%204.95247%201.69792%204.86133%201.84375L4.45117%202.5H8.55273L8.14258%201.84375C8.05143%201.69792%207.92383%201.625%207.75977%201.625H5.24414ZM9.5918%202.5H10.877H11.752H12.1895C12.4629%202.51823%2012.6087%202.66406%2012.627%202.9375C12.6087%203.21094%2012.4629%203.35677%2012.1895%203.375H11.6973L10.9863%2013.1367C10.9499%2013.5924%2010.7676%2013.9753%2010.4395%2014.2852C10.1113%2014.5768%209.71029%2014.7318%209.23633%2014.75H3.76758C3.29362%2014.7318%202.89258%2014.5768%202.56445%2014.2852C2.23633%2013.9753%202.05404%2013.5924%202.01758%2013.1367L1.30664%203.375H0.814453C0.541015%203.35677%200.395182%203.21094%200.376953%202.9375C0.395182%202.66406%200.541015%202.51823%200.814453%202.5H1.25195H2.12695H3.41211L4.12305%201.37891C4.39648%200.977864%204.77018%200.768228%205.24414%200.749999H7.75977C8.23372%200.768228%208.60742%200.977864%208.88086%201.37891L9.5918%202.5ZM10.8223%203.375H2.18164L2.89258%2013.0547C2.91081%2013.2917%203.00195%2013.4831%203.16602%2013.6289C3.33008%2013.793%203.5306%2013.875%203.76758%2013.875H9.23633C9.47331%2013.875%209.67383%2013.793%209.83789%2013.6289C10.002%2013.4831%2010.0931%2013.2917%2010.1113%2013.0547L10.8223%203.375Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">{"Clear history"}</_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-candidate-history-card")}
              tag="div"
            >
              {slotCandidateHistoryCard ?? <CandidateHistoryCard />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "db-rquest-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "db--request")}
            tag="div"
            {...onClickAllCandidate}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "candidate-all-icon-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "relative")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2222%22%20viewBox%3D%220%200%2020%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M17.877%203.90625C17.877%203.8789%2017.7949%203.7832%2017.6309%203.61914C17.3301%203.37305%2016.8105%203.11328%2016.0723%202.83984C14.5137%202.26562%2012.4902%201.96484%2010.002%201.9375C7.51367%201.96484%205.49023%202.26562%203.93164%202.83984C3.19336%203.11328%202.67383%203.37305%202.37305%203.61914C2.20898%203.7832%202.12695%203.8789%202.12695%203.90625V8.08984C2.72851%208.52734%203.67187%208.91016%204.95703%209.23828C6.40625%209.62109%208.08789%209.8125%2010.002%209.8125C11.916%209.8125%2013.5977%209.62109%2015.0469%209.23828C16.332%208.91016%2017.2754%208.52734%2017.877%208.08984V3.90625ZM17.877%209.64844C17.166%2010.0039%2016.332%2010.3047%2015.375%2010.5508C13.7891%2010.9336%2011.998%2011.125%2010.002%2011.125C8.00586%2011.125%206.21484%2010.9199%204.62891%2010.5098C3.67187%2010.291%202.83789%2010.0039%202.12695%209.64844V13.3398C2.72851%2013.8047%203.67187%2014.1875%204.95703%2014.4883C6.40625%2014.8711%208.08789%2015.0625%2010.002%2015.0625C11.916%2015.0625%2013.5977%2014.8711%2015.0469%2014.4883C16.332%2014.1602%2017.2754%2013.7773%2017.877%2013.3398V9.64844ZM2.12695%2018.3437C2.12695%2018.3711%202.20898%2018.4668%202.37305%2018.6309C2.67383%2018.877%203.19336%2019.1367%203.93164%2019.4102C5.49023%2019.9844%207.51367%2020.2852%2010.002%2020.3125C12.4902%2020.2852%2014.5137%2019.9844%2016.0723%2019.4102C16.8105%2019.1367%2017.3301%2018.877%2017.6309%2018.6309C17.7949%2018.4668%2017.877%2018.3711%2017.877%2018.3437V14.8984C17.166%2015.2539%2016.332%2015.5547%2015.375%2015.8008C13.7891%2016.1836%2011.998%2016.375%2010.002%2016.375C8.00586%2016.375%206.21484%2016.1836%204.62891%2015.8008C3.67187%2015.5547%202.83789%2015.2539%202.12695%2014.8984V18.3437ZM2.12695%203.94726C2.12695%203.91992%202.12695%203.91992%202.12695%203.94726V3.94726ZM19.1895%2018.3437C19.1348%2019.2734%2018.2324%2020.0527%2016.4824%2020.6816C14.7598%2021.2832%2012.5996%2021.5977%2010.002%2021.625C7.4043%2021.5977%205.24414%2021.2832%203.52148%2020.6816C1.77148%2020.0527%200.86914%2019.2734%200.814452%2018.3437V3.90625C0.86914%202.97656%201.77148%202.19726%203.52148%201.56836C5.24414%200.966795%207.4043%200.652342%2010.002%200.624998C12.5996%200.652342%2014.7598%200.966795%2016.4824%201.56836C18.2324%202.19726%2019.1348%202.97656%2019.1895%203.90625V18.3437Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "db-req-text-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"All Candidates - 10344"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "color-grey-600")}
                tag="div"
              >
                {
                  "All candidates who have submitted their applications and been successfully imported into the system will be displayed and listed here."
                }
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "db--request")}
            tag="div"
            {...onClickDbRequest}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "db-req-icon-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "relative")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2222%22%20viewBox%3D%220%200%2020%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M17.877%203.90625C17.877%203.8789%2017.7949%203.7832%2017.6309%203.61914C17.3301%203.37305%2016.8105%203.11328%2016.0723%202.83984C14.5137%202.26562%2012.4902%201.96484%2010.002%201.9375C7.51367%201.96484%205.49023%202.26562%203.93164%202.83984C3.19336%203.11328%202.67383%203.37305%202.37305%203.61914C2.20898%203.7832%202.12695%203.8789%202.12695%203.90625V8.08984C2.72851%208.52734%203.67187%208.91016%204.95703%209.23828C6.40625%209.62109%208.08789%209.8125%2010.002%209.8125C11.916%209.8125%2013.5977%209.62109%2015.0469%209.23828C16.332%208.91016%2017.2754%208.52734%2017.877%208.08984V3.90625ZM17.877%209.64844C17.166%2010.0039%2016.332%2010.3047%2015.375%2010.5508C13.7891%2010.9336%2011.998%2011.125%2010.002%2011.125C8.00586%2011.125%206.21484%2010.9199%204.62891%2010.5098C3.67187%2010.291%202.83789%2010.0039%202.12695%209.64844V13.3398C2.72851%2013.8047%203.67187%2014.1875%204.95703%2014.4883C6.40625%2014.8711%208.08789%2015.0625%2010.002%2015.0625C11.916%2015.0625%2013.5977%2014.8711%2015.0469%2014.4883C16.332%2014.1602%2017.2754%2013.7773%2017.877%2013.3398V9.64844ZM2.12695%2018.3437C2.12695%2018.3711%202.20898%2018.4668%202.37305%2018.6309C2.67383%2018.877%203.19336%2019.1367%203.93164%2019.4102C5.49023%2019.9844%207.51367%2020.2852%2010.002%2020.3125C12.4902%2020.2852%2014.5137%2019.9844%2016.0723%2019.4102C16.8105%2019.1367%2017.3301%2018.877%2017.6309%2018.6309C17.7949%2018.4668%2017.877%2018.3711%2017.877%2018.3437V14.8984C17.166%2015.2539%2016.332%2015.5547%2015.375%2015.8008C13.7891%2016.1836%2011.998%2016.375%2010.002%2016.375C8.00586%2016.375%206.21484%2016.1836%204.62891%2015.8008C3.67187%2015.5547%202.83789%2015.2539%202.12695%2014.8984V18.3437ZM2.12695%203.94726C2.12695%203.91992%202.12695%203.91992%202.12695%203.94726V3.94726ZM19.1895%2018.3437C19.1348%2019.2734%2018.2324%2020.0527%2016.4824%2020.6816C14.7598%2021.2832%2012.5996%2021.5977%2010.002%2021.625C7.4043%2021.5977%205.24414%2021.2832%203.52148%2020.6816C1.77148%2020.0527%200.86914%2019.2734%200.814452%2018.3437V3.90625C0.86914%202.97656%201.77148%202.19726%203.52148%201.56836C5.24414%200.966795%207.4043%200.652342%2010.002%200.624998C12.5996%200.652342%2014.7598%200.966795%2016.4824%201.56836C18.2324%202.19726%2019.1348%202.97656%2019.1895%203.90625V18.3437Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons", "db-star-icons")}
                  value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2010%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.63477%204.66871C6.73685%204.44371%206.28685%204.33329%205.97643%204.02288C5.66602%203.71038%205.5556%203.26246%205.3306%202.36454L4.99935%201.04163L4.6681%202.36454C4.4431%203.26246%204.33268%203.71246%204.02227%204.02288C3.70977%204.33329%203.26185%204.44371%202.36393%204.66871L1.04102%204.99996L2.36393%205.33121C3.26185%205.55621%203.71185%205.66663%204.02227%205.97704C4.33268%206.28954%204.4431%206.73746%204.6681%207.63538L4.99935%208.95829L5.3306%207.63538C5.5556%206.73746%205.66602%206.28746%205.97643%205.97704C6.28893%205.66663%206.73685%205.55621%207.63477%205.33121L8.95768%204.99996L7.63477%204.66871Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "db-req-text-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Search Aglint DB (400M candidates)"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "color-grey-600")}
                tag="div"
              >
                {
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "req-acess-badge")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm")}
                tag="div"
              >
                {"Request Access"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
