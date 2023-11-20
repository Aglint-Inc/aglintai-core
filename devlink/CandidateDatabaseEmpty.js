import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./CandidateDatabaseEmpty.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1352":{"id":"e-1352","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1353"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365602},"e-1353":{"id":"e-1353","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1352"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365605},"e-1382":{"id":"e-1382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-489","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1383":{"id":"e-1383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-490","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1386":{"id":"e-1386","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1387"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976388},"e-1387":{"id":"e-1387","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1386"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976390},"e-1474":{"id":"e-1474","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-538","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1475"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4160f0cc-545d-c5e3-e01d-484c7a8ac9e8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4160f0cc-545d-c5e3-e01d-484c7a8ac9e8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700206216610},"e-1476":{"id":"e-1476","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-539","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1477"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a3c2938d-2bbd-9096-5e92-472a3d1e2ce5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a3c2938d-2bbd-9096-5e92-472a3d1e2ce5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700206230806}},"actionLists":{"a-471":{"id":"a-471","title":"Email Interaction Hover In","actionItemGroups":[{"actionItems":[{"id":"a-471-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-471-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-471-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-471-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-471-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-471-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-472":{"id":"a-472","title":"Email Interaction Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-472-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-472-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-472-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-489":{"id":"a-489","title":"Email Interaction Hover In 2","actionItemGroups":[{"actionItems":[{"id":"a-489-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-489-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-489-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-489-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-489-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-489-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-490":{"id":"a-490","title":"Email Interaction Hover Out 2","actionItemGroups":[{"actionItems":[{"id":"a-490-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-490-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-490-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-538":{"id":"a-538","title":"Chat Bubble Open","actionItemGroups":[{"actionItems":[{"id":"a-538-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"flex"}},{"id":"a-538-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":30,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-538-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":0,"unit":""}},{"id":"a-538-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"none"}},{"id":"a-538-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"none"}},{"id":"a-538-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":0,"unit":""}},{"id":"a-538-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":1,"unit":""}}]},{"actionItems":[{"id":"a-538-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":0,"unit":""}},{"id":"a-538-n-15","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".div-block-588","selectorGuids":["a61e8d58-3cd9-bc7c-d748-888ff47ed4db"]},"xValue":0.9,"yValue":0.9,"locked":true}},{"id":"a-538-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"block"}},{"id":"a-538-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":1,"unit":""}},{"id":"a-538-n-12","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-538-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"none"}},{"id":"a-538-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":100,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":1,"unit":""}},{"id":"a-538-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":100,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700132612161},"a-539":{"id":"a-539","title":"Chat Bubble Close","actionItemGroups":[{"actionItems":[{"id":"a-539-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":1,"unit":""}},{"id":"a-539-n-15","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".div-block-588","selectorGuids":["a61e8d58-3cd9-bc7c-d748-888ff47ed4db"]},"xValue":1,"yValue":1,"locked":true}},{"id":"a-539-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":0,"unit":""}},{"id":"a-539-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":30,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-539-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":100,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"none"}},{"id":"a-539-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":100,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":0,"unit":""}},{"id":"a-539-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"none"}},{"id":"a-539-n-12","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700132612161}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateDatabaseEmpty({
  as: _Component = _Builtin.Block,
  onClickImportCandidates = {},
  onClickLeverImport = {},
  onClickGreenHouseImport = {},
  onClickAshbyImport = {},
  onClickDbRequest = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "job-dashboard-empty-landing-wrappers")}
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
          className={_utils.cx(_styles, "div-block-274")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-option-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {
                "Import Candidates by uploading resumes or import CSV file or add manually."
              }
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "cj-option-block-white",
                "for-candidate"
              )}
              tag="div"
              {...onClickImportCandidates}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "large-icon-wrap")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2229%22%20height%3D%2229%22%20viewBox%3D%220%200%2029%2029%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M26.752%2025V11H20.627C19.8978%2010.9635%2019.278%2010.7083%2018.7676%2010.2344C18.2936%209.72396%2018.0384%209.10417%2018.002%208.375V2.25H11.002C10.4915%202.25%2010.0723%202.41406%209.74414%202.74219C9.41602%203.07031%209.25195%203.48958%209.25195%204V14.5H7.50195V4C7.53841%203.01562%207.88477%202.19531%208.54102%201.53906C9.19727%200.882811%2010.0176%200.536457%2011.002%200.499998H19.5332C20.2624%200.499998%2020.8822%200.755207%2021.3926%201.26562L27.7363%207.60937C28.2467%208.11979%2028.502%208.73958%2028.502%209.46875V25C28.4655%2025.9844%2028.1191%2026.8047%2027.4629%2027.4609C26.8066%2028.1172%2025.9863%2028.4635%2025.002%2028.5H11.002C10.0176%2028.4635%209.19727%2028.1172%208.54102%2027.4609C7.88477%2026.8047%207.53841%2025.9844%207.50195%2025V20.625H9.25195V25C9.25195%2025.5104%209.41602%2025.9297%209.74414%2026.2578C10.0723%2026.5859%2010.4915%2026.75%2011.002%2026.75H25.002C25.5124%2026.75%2025.9316%2026.5859%2026.2598%2026.2578C26.5879%2025.9297%2026.752%2025.5104%2026.752%2025ZM26.752%209.25C26.679%209.10417%2026.5879%208.97656%2026.4785%208.86719L20.1348%202.52344C20.0254%202.41406%2019.8978%202.34114%2019.752%202.30469V8.375C19.7884%208.92187%2020.0801%209.21354%2020.627%209.25H26.752ZM15.9785%2012.1484L21.2285%2017.3984C21.5931%2017.7995%2021.5931%2018.2005%2021.2285%2018.6016L15.9785%2023.8516C15.5775%2024.2161%2015.1764%2024.2161%2014.7754%2023.8516C14.4108%2023.4505%2014.4108%2023.0495%2014.7754%2022.6484L18.4941%2018.875H1.37695C0.830077%2018.8385%200.538411%2018.5469%200.501952%2018C0.538411%2017.4531%200.830077%2017.1615%201.37695%2017.125H18.4941L14.7754%2013.3516C14.4108%2012.9505%2014.4108%2012.5495%2014.7754%2012.1484C15.1764%2011.7839%2015.5775%2011.7839%2015.9785%2012.1484Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-option-info")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Import Candidates"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-imports-wrapper", "import")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-375")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Or import with your Applicant Tracking System (ATS)"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-imports-options", "import")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-option-block", "grey-100")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cj-option-icon-block",
                      "large"
                    )}
                    tag="div"
                  >
                    <_Builtin.Image
                      className={_utils.cx(_styles, "image-38")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt=""
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/65155ad803eafe8aa1c3b68c_lever_rgb_logo_standard%201%20(2).svg"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-option-info")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "fw-semibold",
                        "text-kale-800"
                      )}
                      tag="div"
                    >
                      {"Import Candidates from Lever"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "click-fake-div")}
                    tag="div"
                    {...onClickLeverImport}
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-option-block", "grey")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cj-option-icon-block",
                      "large",
                      "relative-block"
                    )}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2232%22%20viewBox%3D%220%200%2016%2032%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_2425_14921)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M8.26568%2031.4574C4.15195%2031.5176%200.79769%2027.9891%200.87484%2023.912C0.907438%2021.951%201.71299%2020.0821%203.11628%2018.7119C4.51958%2017.3417%206.4071%2016.581%208.36832%2016.5953C12.2867%2016.6059%2015.5673%2019.9688%2015.6381%2023.8908C15.7132%2028.0457%2012.2881%2031.5211%208.26568%2031.4574ZM14.3138%2024.0734C14.3386%2020.7056%2011.6461%2017.9564%208.29754%2017.9309C4.94894%2017.9055%202.21966%2020.6136%202.19135%2023.9807C2.17398%2025.5989%202.79991%2027.1579%203.93154%2028.3147C5.06316%2029.4716%206.60786%2030.1318%208.22605%2030.1501C11.5378%2030.1918%2014.2891%2027.4455%2014.3138%2024.0734ZM0.889704%208.95081C0.883169%208.14682%201.03572%207.34948%201.33859%206.6047C1.64145%205.85991%202.08864%205.18239%202.65441%204.61115C3.22018%204.0399%203.89335%203.58621%204.63517%203.2762C5.37698%202.96619%206.17279%202.80597%206.97678%202.80479C10.3176%202.79842%2013.0695%205.55751%2013.0745%208.91754C13.0801%2012.3257%2010.3714%2015.0848%207.01076%2015.0947C3.60058%2015.1039%200.899613%2012.3915%200.889704%208.95081ZM2.22815%208.91258C2.22206%209.53578%202.33878%2010.1541%202.57164%2010.7322C2.80449%2011.3103%203.14893%2011.8368%203.58528%2012.2818C4.02163%2012.7268%204.54135%2013.0814%205.11476%2013.3256C5.68818%2013.5697%206.30405%2013.6984%206.92724%2013.7045C7.55042%2013.7106%208.16869%2013.5939%208.74677%2013.361C9.32484%2013.1282%209.85139%2012.7837%2010.2963%2012.3474C10.7413%2011.911%2011.096%2011.3913%2011.3401%2010.8178C11.5842%2010.2444%2011.713%209.62851%2011.719%209.00531C11.736%206.34885%209.63386%204.18292%207.01925%204.16168C4.39119%204.14328%202.24868%206.26674%202.22815%208.91258ZM10.5781%201.24192C10.5803%200.91133%2010.7138%200.595179%2010.9491%200.363013C11.0657%200.248056%2011.2037%200.157178%2011.3554%200.095567C11.507%200.0339563%2011.6693%200.00281976%2011.833%200.00393519C11.9967%200.00505062%2012.1585%200.0383961%2012.3093%200.102068C12.4601%200.16574%2012.5969%200.258491%2012.7119%200.375025C12.8268%200.49156%2012.9177%200.629596%2012.9793%200.781252C13.0409%200.932908%2013.0721%201.09521%2013.0709%201.2589C13.0727%201.42424%2013.0415%201.58826%2012.979%201.74134C12.9165%201.89442%2012.8241%202.03347%2012.7071%202.15032C12.5901%202.26717%2012.451%202.35946%2012.2978%202.42177C12.1447%202.48408%2011.9806%202.51515%2011.8153%202.51316C11.1146%202.50821%2010.5781%201.95611%2010.5781%201.24192Z%22%20fill%3D%22%2338B2A7%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CclipPath%20id%3D%22clip0_2425_14921%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2216%22%20height%3D%2231.5219%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2FclipPath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                    />
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "coming-soon-badges",
                        "import"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "text-grow",
                          "text-xsm",
                          "line-height-14"
                        )}
                        tag="div"
                      >
                        {"Coming Soon"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-option-info")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "fw-semibold",
                        "new-greenhouse"
                      )}
                      tag="div"
                    >
                      {"Import Candidates from Greenhouse"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "click-fake-div")}
                    tag="div"
                    {...onClickGreenHouseImport}
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-option-block", "asley")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cj-option-icon-block",
                      "asby",
                      "large",
                      "relative-block"
                    )}
                    tag="div"
                  >
                    <_Builtin.Image
                      className={_utils.cx(_styles, "asby-image", "large")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt=""
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/65438807454d4544425709f4_ash%20-%20png.svg"
                    />
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "coming-soon-badges",
                        "import"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "text-grow",
                          "text-xsm",
                          "line-height-14"
                        )}
                        tag="div"
                      >
                        {"Coming Soon"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-option-info")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "fw-semibold",
                        "new-greenhouse"
                      )}
                      tag="div"
                    >
                      {"Import Candidates from Ashby"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "click-fake-div")}
                    tag="div"
                    {...onClickAshbyImport}
                  />
                </_Builtin.Block>
              </_Builtin.Block>
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
