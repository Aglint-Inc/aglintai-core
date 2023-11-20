import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Checkbox } from "./Checkbox";
import { ButtonPrimaryRegular } from "./ButtonPrimaryRegular";
import * as _utils from "./utils";
import _styles from "./InboxContactSupport.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-948":{"id":"e-948","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-386","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-949"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"},"targets":[{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694910129600},"e-1352":{"id":"e-1352","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1353"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365602},"e-1353":{"id":"e-1353","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1352"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365605},"e-1382":{"id":"e-1382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-489","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1383":{"id":"e-1383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-490","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1386":{"id":"e-1386","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1387"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976388},"e-1387":{"id":"e-1387","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1386"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976390},"e-1474":{"id":"e-1474","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-538","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1475"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4160f0cc-545d-c5e3-e01d-484c7a8ac9e8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4160f0cc-545d-c5e3-e01d-484c7a8ac9e8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700206216610},"e-1476":{"id":"e-1476","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-539","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1477"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a3c2938d-2bbd-9096-5e92-472a3d1e2ce5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a3c2938d-2bbd-9096-5e92-472a3d1e2ce5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700206230806}},"actionLists":{"a-386":{"id":"a-386","title":"email-temp-editor-[close]","actionItemGroups":[{"actionItems":[{"id":"a-386-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":0,"unit":""}},{"id":"a-386-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"selector":".rd-email-edit-wrapper","selectorGuids":["2295ead5-85e1-b9a6-3337-5728082f803c"]},"xValue":500,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-386-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":600,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694910134507},"a-471":{"id":"a-471","title":"Email Interaction Hover In","actionItemGroups":[{"actionItems":[{"id":"a-471-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-471-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-471-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-471-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-471-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-471-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-472":{"id":"a-472","title":"Email Interaction Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-472-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-472-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-472-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-489":{"id":"a-489","title":"Email Interaction Hover In 2","actionItemGroups":[{"actionItems":[{"id":"a-489-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-489-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-489-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-489-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-489-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-489-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-490":{"id":"a-490","title":"Email Interaction Hover Out 2","actionItemGroups":[{"actionItems":[{"id":"a-490-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-490-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-490-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-538":{"id":"a-538","title":"Chat Bubble Open","actionItemGroups":[{"actionItems":[{"id":"a-538-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"flex"}},{"id":"a-538-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":30,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-538-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":0,"unit":""}},{"id":"a-538-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"none"}},{"id":"a-538-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"none"}},{"id":"a-538-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":0,"unit":""}},{"id":"a-538-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":1,"unit":""}}]},{"actionItems":[{"id":"a-538-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":0,"unit":""}},{"id":"a-538-n-15","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".div-block-588","selectorGuids":["a61e8d58-3cd9-bc7c-d748-888ff47ed4db"]},"xValue":0.9,"yValue":0.9,"locked":true}},{"id":"a-538-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"block"}},{"id":"a-538-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":1,"unit":""}},{"id":"a-538-n-12","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-538-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"none"}},{"id":"a-538-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":100,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":1,"unit":""}},{"id":"a-538-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":100,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700132612161},"a-539":{"id":"a-539","title":"Chat Bubble Close","actionItemGroups":[{"actionItems":[{"id":"a-539-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":1,"unit":""}},{"id":"a-539-n-15","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".div-block-588","selectorGuids":["a61e8d58-3cd9-bc7c-d748-888ff47ed4db"]},"xValue":1,"yValue":1,"locked":true}},{"id":"a-539-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":0,"unit":""}},{"id":"a-539-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":30,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-539-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":100,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"none"}},{"id":"a-539-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":100,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":0,"unit":""}},{"id":"a-539-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"none"}},{"id":"a-539-n-12","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700132612161}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InboxContactSupport({
  as: _Component = _Builtin.Block,
  textJobRole = "This is some text inside of a div block.",
  textJobCompanyLocations = "This is some text inside of a div block.",
  slotFormSupport,
  slotCheckbox,
  onClickReport = {},
  isTicketSubmitSuccessfully = false,
  onClickCopyLinkToTicket = {},
  slotLogo,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "contact-support-wrappers-inbox")}
      tag="div"
    >
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-509")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-company-logosupport")}
            tag="div"
          >
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/653a4f0772ec5dfeaf85b44a_Frame%201717.svg"
            />
            <_Builtin.Block tag="div">
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed-icon")}
                value="%3Csvg%20width%3D%2290%22%20height%3D%2229%22%20viewBox%3D%220%200%20150%2029%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%0A%3Cpath%20d%3D%22M41.3695%2022.8818C40.4082%2022.8818%2039.5109%2022.7109%2038.6777%2022.3691C37.866%2022.0059%2037.2037%2021.4825%2036.691%2020.7989C36.1996%2020.0939%2035.954%2019.218%2035.954%2018.1712C35.954%2016.6758%2036.4774%2015.4795%2037.5241%2014.5823C38.5923%2013.685%2040.1625%2013.2364%2042.2347%2013.2364H46.7209V12.8198C46.7209%2011.8798%2046.4539%2011.2176%2045.9198%2010.833C45.4071%2010.4485%2044.3603%2010.2562%2042.7794%2010.2562C41.049%2010.2562%2039.3827%2010.5233%2037.7805%2011.0574V8.01313C38.4855%207.73541%2039.34%207.5111%2040.3441%207.3402C41.3695%207.14793%2042.4804%207.05179%2043.6767%207.05179C45.9625%207.05179%2047.725%207.52178%2048.964%208.46175C50.2245%209.38036%2050.8547%2010.8651%2050.8547%2012.9159V22.5613H47.1055L46.8811%2021.1834C46.283%2021.7175%2045.546%2022.1341%2044.6701%2022.4332C43.7942%2022.7323%2042.694%2022.8818%2041.3695%2022.8818ZM42.5551%2020.0298C43.5165%2020.0298%2044.3496%2019.8696%2045.0546%2019.5492C45.7596%2019.2287%2046.315%2018.8228%2046.7209%2018.3315V15.9281H42.3308C40.6432%2015.9281%2039.7993%2016.6224%2039.7993%2018.011C39.7993%2019.3569%2040.7179%2020.0298%2042.5551%2020.0298Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M61.0676%2028.2012C59.9354%2028.2012%2058.7711%2028.1264%2057.5748%2027.9769C56.3998%2027.8273%2055.4064%2027.6137%2054.5946%2027.336V24.0995C55.4491%2024.3772%2056.4532%2024.5908%2057.6068%2024.7404C58.7604%2024.9113%2059.8392%2024.9967%2060.8433%2024.9967C62.3173%2024.9967%2063.3855%2024.9113%2064.0478%2024.7404C64.71%2024.5908%2065.0411%2024.3131%2065.0411%2023.9072C65.0411%2023.5654%2064.8916%2023.3304%2064.5925%2023.2022C64.3148%2023.0741%2063.7166%2023.01%2062.798%2023.01H58.6643C55.9512%2023.01%2054.5946%2022.0059%2054.5946%2019.9978C54.5946%2019.3783%2054.7655%2018.8121%2055.1073%2018.2994C55.4491%2017.7867%2055.9939%2017.3808%2056.7416%2017.0817C55.0112%2016.2059%2054.146%2014.7318%2054.146%2012.6596C54.146%2010.6942%2054.7548%209.27355%2055.9725%208.39767C57.1902%207.50042%2058.9954%207.05179%2061.3881%207.05179C61.8794%207.05179%2062.4135%207.09452%2062.9903%207.17997C63.5884%207.24406%2064.0371%207.30815%2064.3362%207.37224H70.0401L69.944%2010.096H67.5406C68.2029%2010.7156%2068.534%2011.5808%2068.534%2012.6916C68.534%2014.2511%2068.0426%2015.5009%2067.0599%2016.4408C66.0772%2017.3595%2064.6246%2017.8188%2062.7019%2017.8188C62.3601%2017.8188%2062.0289%2017.8081%2061.7085%2017.7867C61.4094%2017.744%2061.0997%2017.7013%2060.7792%2017.6585C60.1383%2017.744%2059.5936%2017.8935%2059.1449%2018.1072C58.7177%2018.3208%2058.504%2018.6092%2058.504%2018.9724C58.504%2019.4637%2058.942%2019.7094%2059.8179%2019.7094H64.1118C65.65%2019.7094%2066.8356%2020.0619%2067.6688%2020.7669C68.5019%2021.4505%2068.9185%2022.4545%2068.9185%2023.779C68.9185%2025.2745%2068.2456%2026.3853%2066.8997%2027.1117C65.5538%2027.838%2063.6098%2028.2012%2061.0676%2028.2012ZM61.4201%2015.3834C62.7019%2015.3834%2063.5884%2015.1697%2064.0798%2014.7425C64.5925%2014.2939%2064.8489%2013.5462%2064.8489%2012.4994C64.8489%2011.4526%2064.5925%2010.6942%2064.0798%2010.2242C63.5884%209.75422%2062.7019%209.51922%2061.4201%209.51922C60.2024%209.51922%2059.3265%209.75422%2058.7925%2010.2242C58.2584%2010.6728%2057.9913%2011.4312%2057.9913%2012.4994C57.9913%2013.4821%2058.237%2014.2084%2058.7284%2014.6784C59.2411%2015.1484%2060.1383%2015.3834%2061.4201%2015.3834Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M77.2028%2022.8818C75.7287%2022.8818%2074.6499%2022.54%2073.9663%2021.8564C73.304%2021.1728%2072.9729%2020.0832%2072.9729%2018.5878V0.963335H77.2989V18.2353C77.2989%2018.7694%2077.4057%2019.1433%2077.6194%2019.3569C77.833%2019.5492%2078.1428%2019.6453%2078.5487%2019.6453C79.1041%2019.6453%2079.6061%2019.5705%2080.0547%2019.421V22.4011C79.243%2022.7216%2078.2923%2022.8818%2077.2028%2022.8818Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M82.7688%204.58437V1.18765H87.4793V4.58437H82.7688ZM83.1213%2022.5613V10.5767H80.8461L81.2306%207.37224H87.4473V22.5613H83.1213Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M91.4511%2022.5613V7.37224H95.4567L95.6169%208.81424C96.2364%208.34426%2097.0162%207.93836%2097.9561%207.59655C98.9175%207.23338%2099.9215%207.05179%20100.968%207.05179C102.976%207.05179%20104.44%207.52178%20105.358%208.46175C106.277%209.40173%20106.736%2010.8544%20106.736%2012.8198V22.5613H102.41V13.0441C102.41%2012.0187%20102.197%2011.2924%20101.769%2010.8651C101.364%2010.4378%20100.594%2010.2242%2099.4622%2010.2242C98.8%2010.2242%2098.127%2010.3737%2097.4434%2010.6728C96.7812%2010.9719%2096.2257%2011.3458%2095.7771%2011.7944V22.5613H91.4511Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M116.603%2022.8818C114.852%2022.8818%20113.548%2022.4225%20112.694%2021.5039C111.861%2020.5853%20111.444%2019.3355%20111.444%2017.7547V10.7049H109.297V7.37224H111.444V4.1037L115.77%202.82192V7.37224H119.615L119.359%2010.7049H115.77V17.4663C115.77%2018.2994%20115.962%2018.8762%20116.347%2019.1967C116.731%2019.4958%20117.33%2019.6453%20118.141%2019.6453C118.74%2019.6453%20119.359%2019.5385%20120%2019.3249V22.305C119.53%2022.4973%20119.017%2022.6361%20118.462%2022.7216C117.906%2022.8284%20117.287%2022.8818%20116.603%2022.8818Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "contact-support-header-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-xl", "fw-semibold")}
            tag="div"
          >
            {"Contact Support"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {
              "Please ask your questions/issues here, and our dedicated representative will contact you shortly."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-contact-form-support")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Job"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "job-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-image-support")}
              tag="div"
            >
              {slotLogo}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-510")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {textJobRole}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "text-sm",
                  "fw-semibold",
                  "color-grey-600"
                )}
                tag="div"
              >
                {textJobCompanyLocations}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-form-contact")}
            tag="div"
          >
            {slotFormSupport}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "support-check-wrappers")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {slotCheckbox ?? <Checkbox />}
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
              {"Send updates via email"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-412")}
            tag="div"
          >
            <_Builtin.Block tag="div" {...onClickReport}>
              <ButtonPrimaryRegular textLabel="Submit" />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "int-completed-bottom")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-xsm-2", "text-grey-600")}
          tag="div"
        >
          {"Powered by"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon-embed")}
            value="%3Csvg%20width%3D%2272%22%20height%3D%2218%22%20viewBox%3D%220%200%2072%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.5203%207.9098C12.6063%207.43018%2011.647%207.19481%2010.9854%206.53312C10.3237%205.86699%2010.0883%204.9122%209.60867%202.99818L8.90257%200.178223L8.19646%202.99818C7.71684%204.9122%207.48148%205.87143%206.81978%206.53312C6.15364%207.19481%205.19885%207.43018%203.28482%207.9098L0.464844%208.6159L3.28482%209.322C5.19885%209.80161%206.15809%2010.037%206.81978%2010.6987C7.48148%2011.3648%207.71684%2012.3196%208.19646%2014.2336L8.90257%2017.0536L9.60867%2014.2336C10.0883%2012.3196%2010.3237%2011.3604%2010.9854%2010.6987C11.6515%2010.037%2012.6063%209.80161%2014.5203%209.322L17.3403%208.6159L14.5203%207.9098Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3Cpath%20d%3D%22M23.1775%2013.7579C22.5819%2013.7579%2022.026%2013.652%2021.5098%2013.4403C21.0069%2013.2153%2020.5966%2012.891%2020.2789%2012.4674C19.9745%2012.0307%2019.8223%2011.488%2019.8223%2010.8395C19.8223%209.91298%2020.1465%209.17179%2020.7951%208.6159C21.4569%208.06%2022.4297%207.78206%2023.7135%207.78206H26.493V7.52396C26.493%206.9416%2026.3276%206.5313%2025.9967%206.29306C25.679%206.05482%2025.0305%205.9357%2024.0511%205.9357C22.979%205.9357%2021.9466%206.10114%2020.9539%206.43203V4.54596C21.3907%204.3739%2021.9201%204.23492%2022.5422%204.12904C23.1775%204.00992%2023.8658%203.95036%2024.607%203.95036C26.0232%203.95036%2027.1151%204.24154%2027.8828%204.82391C28.6637%205.39304%2029.0541%206.31291%2029.0541%207.58352V13.5594H26.7313L26.5923%2012.7057C26.2217%2013.0366%2025.7651%2013.2947%2025.2224%2013.48C24.6797%2013.6653%2023.9981%2013.7579%2023.1775%2013.7579ZM23.9121%2011.991C24.5077%2011.991%2025.0239%2011.8917%2025.4606%2011.6932C25.8974%2011.4946%2026.2416%2011.2432%2026.493%2010.9387V9.44974H23.7731C22.7275%209.44974%2022.2047%209.87989%2022.2047%2010.7402C22.2047%2011.574%2022.7738%2011.991%2023.9121%2011.991Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M35.3816%2017.0536C34.6802%2017.0536%2033.9588%2017.0072%2033.2176%2016.9146C32.4897%2016.822%2031.8742%2016.6896%2031.3712%2016.5175V14.5123C31.9007%2014.6844%2032.5227%2014.8168%2033.2375%2014.9094C33.9522%2015.0153%2034.6206%2015.0682%2035.2427%2015.0682C36.1559%2015.0682%2036.8177%2015.0153%2037.228%2014.9094C37.6383%2014.8168%2037.8435%2014.6447%2037.8435%2014.3932C37.8435%2014.1815%2037.7508%2014.0359%2037.5655%2013.9564C37.3935%2013.877%2037.0229%2013.8373%2036.4537%2013.8373H33.8926C32.2117%2013.8373%2031.3712%2013.2153%2031.3712%2011.9711C31.3712%2011.5873%2031.4771%2011.2365%2031.6889%2010.9189C31.9007%2010.6012%2032.2382%2010.3498%2032.7014%2010.1645C31.6293%209.6218%2031.0933%208.70855%2031.0933%207.4247C31.0933%206.20702%2031.4705%205.32686%2032.2249%204.7842C32.9794%204.22831%2034.0978%203.95036%2035.5802%203.95036C35.8846%203.95036%2036.2155%203.97683%2036.5728%204.02977C36.9434%204.06948%2037.2214%204.10919%2037.4067%204.14889H40.9406L40.8811%205.83643H39.392C39.8023%206.22026%2040.0075%206.7563%2040.0075%207.44455C40.0075%208.41075%2039.7031%209.18503%2039.0942%209.76739C38.4854%2010.3365%2037.5854%2010.6211%2036.3942%2010.6211C36.1824%2010.6211%2035.9772%2010.6145%2035.7787%2010.6012C35.5934%2010.5748%2035.4015%2010.5483%2035.203%2010.5218C34.8059%2010.5748%2034.4684%2010.6674%2034.1904%2010.7998C33.9257%2010.9321%2033.7934%2011.1108%2033.7934%2011.3358C33.7934%2011.6402%2034.0647%2011.7924%2034.6074%2011.7924H37.2677C38.2207%2011.7924%2038.9553%2012.0108%2039.4715%2012.4476C39.9876%2012.8711%2040.2457%2013.4932%2040.2457%2014.3138C40.2457%2015.2403%2039.8288%2015.9285%2038.995%2016.3786C38.1611%2016.8286%2036.9567%2017.0536%2035.3816%2017.0536ZM35.6%209.11223C36.3942%209.11223%2036.9434%208.97988%2037.2479%208.71516C37.5655%208.43722%2037.7244%207.97397%2037.7244%207.32543C37.7244%206.67689%2037.5655%206.20702%2037.2479%205.91584C36.9434%205.62466%2036.3942%205.47907%2035.6%205.47907C34.8456%205.47907%2034.3029%205.62466%2033.972%205.91584C33.6412%206.19379%2033.4757%206.66365%2033.4757%207.32543C33.4757%207.93427%2033.6279%208.38428%2033.9323%208.67546C34.25%208.96664%2034.8059%209.11223%2035.6%209.11223Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M45.3783%2013.7579C44.4651%2013.7579%2043.7967%2013.5461%2043.3731%2013.1226C42.9628%2012.6991%2042.7577%2012.0241%2042.7577%2011.0976V0.178223H45.4379V10.8792C45.4379%2011.2101%2045.5041%2011.4417%2045.6364%2011.574C45.7688%2011.6932%2045.9607%2011.7527%2046.2122%2011.7527C46.5563%2011.7527%2046.8673%2011.7064%2047.1453%2011.6138V13.4601C46.6423%2013.6586%2046.0533%2013.7579%2045.3783%2013.7579Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M48.8268%202.42165V0.317196H51.7452V2.42165H48.8268ZM49.0452%2013.5594V6.13423H47.6356L47.8738%204.14889H51.7254V13.5594H49.0452Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M54.206%2013.5594V4.14889H56.6877L56.7869%205.04229C57.1708%204.75111%2057.6539%204.49964%2058.2362%204.28787C58.8318%204.06286%2059.4539%203.95036%2060.1025%203.95036C61.3466%203.95036%2062.2533%204.24154%2062.8224%204.82391C63.3915%205.40627%2063.6761%206.30629%2063.6761%207.52396V13.5594H60.9959V7.66294C60.9959%207.02763%2060.8635%206.57762%2060.5988%206.31291C60.3473%206.0482%2059.8708%205.91584%2059.1693%205.91584C58.759%205.91584%2058.3421%206.00849%2057.9186%206.19379C57.5083%206.37909%2057.1641%206.61071%2056.8862%206.88866V13.5594H54.206Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M69.7892%2013.7579C68.7039%2013.7579%2067.8965%2013.4734%2067.3671%2012.9042C66.8509%2012.3351%2066.5928%2011.5608%2066.5928%2010.5814V6.21364H65.2627V4.14889H66.5928V2.12385L69.2731%201.32972V4.14889H71.6555L71.4966%206.21364H69.2731V10.4027C69.2731%2010.9189%2069.3922%2011.2762%2069.6304%2011.4748C69.8687%2011.6601%2070.2393%2011.7527%2070.7422%2011.7527C71.1128%2011.7527%2071.4966%2011.6865%2071.8937%2011.5542V13.4006C71.6025%2013.5197%2071.2849%2013.6057%2070.9407%2013.6586C70.5966%2013.7248%2070.2128%2013.7579%2069.7892%2013.7579Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-xsm-2", "text-grey-600")}
          tag="div"
        >
          {"© 2023 Aglint Inc. All Rights Reserved"}
        </_Builtin.Block>
      </_Builtin.Block>
      {isTicketSubmitSuccessfully ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "ticket-successfully-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-509")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-company-logosupport")}
              tag="div"
            >
              {slotLogo}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ticket-successfuly")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M28.8215%2013.8215C29.4724%2013.1706%2030.5276%2013.1706%2031.1785%2013.8215C31.8294%2014.4724%2031.8294%2015.5276%2031.1785%2016.1785L19.5118%2027.8452C18.861%2028.496%2017.8057%2028.496%2017.1548%2027.8452L10.4882%2021.1785C9.83728%2020.5276%209.83728%2019.4724%2010.4882%2018.8215C11.139%2018.1706%2012.1943%2018.1706%2012.8452%2018.8215L18.3333%2024.3096L28.8215%2013.8215ZM20%2040C8.9543%2040%200%2031.0457%200%2020C0%208.9543%208.9543%200%2020%200C31.0457%200%2040%208.9543%2040%2020C40%2031.0457%2031.0457%2040%2020%2040ZM20%2036.6667C29.2047%2036.6667%2036.6667%2029.2047%2036.6667%2020C36.6667%2010.7953%2029.2047%203.33333%2020%203.33333C10.7953%203.33333%203.33333%2010.7953%203.33333%2020C3.33333%2029.2047%2010.7953%2036.6667%2020%2036.6667Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-413")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-xl", "fw-semibold")}
                tag="div"
              >
                {"Your issue submitted successfully"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-xl", "fw-semibold")}
                tag="div"
              >
                {"Ticket ID #9120i123"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-414")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {
                  "You will receive an email containing the ticket details, and a dedicated representative will be in contact with you shortly."
                }
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-415")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "aui-button-wrap")}
                  tag="div"
                  tabIndex=""
                  {...onClickCopyLinkToTicket}
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "aui-button",
                      "is-small",
                      "is-button-outlined"
                    )}
                    tag="div"
                    tabIndex=""
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "button-icon", "is-large")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon")}
                        value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%207.5C3%207.22386%202.77614%207%202.5%207H1V1H7V2.5C7%202.77614%207.22386%203%207.5%203C7.77614%203%208%202.77614%208%202.5V1C8%200.447715%207.55228%200%207%200H1C0.447715%200%200%200.447715%200%201V7C0%207.55228%200.447715%208%201%208H2.5C2.77614%208%203%207.77614%203%207.5ZM12%205C12%204.44772%2011.5523%204%2011%204H5C4.44772%204%204%204.44772%204%205V11C4%2011.5523%204.44772%2012%205%2012H11C11.5523%2012%2012%2011.5523%2012%2011V5ZM5%2011V5H11V11H5Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_2456_113832%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%207.5C3%207.22386%202.77614%207%202.5%207H1V1H7V2.5C7%202.77614%207.22386%203%207.5%203C7.77614%203%208%202.77614%208%202.5V1C8%200.447715%207.55228%200%207%200H1C0.447715%200%200%200.447715%200%201V7C0%207.55228%200.447715%208%201%208H2.5C2.77614%208%203%207.77614%203%207.5ZM12%205C12%204.44772%2011.5523%204%2011%204H5C4.44772%204%204%204.44772%204%205V11C4%2011.5523%204.44772%2012%205%2012H11C11.5523%2012%2012%2011.5523%2012%2011V5ZM5%2011V5H11V11H5Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_2456_113832)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block tag="div">
                      {"Copy link to the ticket"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "int-completed-bottom")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xsm-2", "text-grey-600")}
              tag="div"
            >
              {"Powered by"}
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%2272%22%20height%3D%2218%22%20viewBox%3D%220%200%2072%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.5203%207.9098C12.6063%207.43018%2011.647%207.19481%2010.9854%206.53312C10.3237%205.86699%2010.0883%204.9122%209.60867%202.99818L8.90257%200.178223L8.19646%202.99818C7.71684%204.9122%207.48148%205.87143%206.81978%206.53312C6.15364%207.19481%205.19885%207.43018%203.28482%207.9098L0.464844%208.6159L3.28482%209.322C5.19885%209.80161%206.15809%2010.037%206.81978%2010.6987C7.48148%2011.3648%207.71684%2012.3196%208.19646%2014.2336L8.90257%2017.0536L9.60867%2014.2336C10.0883%2012.3196%2010.3237%2011.3604%2010.9854%2010.6987C11.6515%2010.037%2012.6063%209.80161%2014.5203%209.322L17.3403%208.6159L14.5203%207.9098Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3Cpath%20d%3D%22M23.1775%2013.7579C22.5819%2013.7579%2022.026%2013.652%2021.5098%2013.4403C21.0069%2013.2153%2020.5966%2012.891%2020.2789%2012.4674C19.9745%2012.0307%2019.8223%2011.488%2019.8223%2010.8395C19.8223%209.91298%2020.1465%209.17179%2020.7951%208.6159C21.4569%208.06%2022.4297%207.78206%2023.7135%207.78206H26.493V7.52396C26.493%206.9416%2026.3276%206.5313%2025.9967%206.29306C25.679%206.05482%2025.0305%205.9357%2024.0511%205.9357C22.979%205.9357%2021.9466%206.10114%2020.9539%206.43203V4.54596C21.3907%204.3739%2021.9201%204.23492%2022.5422%204.12904C23.1775%204.00992%2023.8658%203.95036%2024.607%203.95036C26.0232%203.95036%2027.1151%204.24154%2027.8828%204.82391C28.6637%205.39304%2029.0541%206.31291%2029.0541%207.58352V13.5594H26.7313L26.5923%2012.7057C26.2217%2013.0366%2025.7651%2013.2947%2025.2224%2013.48C24.6797%2013.6653%2023.9981%2013.7579%2023.1775%2013.7579ZM23.9121%2011.991C24.5077%2011.991%2025.0239%2011.8917%2025.4606%2011.6932C25.8974%2011.4946%2026.2416%2011.2432%2026.493%2010.9387V9.44974H23.7731C22.7275%209.44974%2022.2047%209.87989%2022.2047%2010.7402C22.2047%2011.574%2022.7738%2011.991%2023.9121%2011.991Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M35.3816%2017.0536C34.6802%2017.0536%2033.9588%2017.0072%2033.2176%2016.9146C32.4897%2016.822%2031.8742%2016.6896%2031.3712%2016.5175V14.5123C31.9007%2014.6844%2032.5227%2014.8168%2033.2375%2014.9094C33.9522%2015.0153%2034.6206%2015.0682%2035.2427%2015.0682C36.1559%2015.0682%2036.8177%2015.0153%2037.228%2014.9094C37.6383%2014.8168%2037.8435%2014.6447%2037.8435%2014.3932C37.8435%2014.1815%2037.7508%2014.0359%2037.5655%2013.9564C37.3935%2013.877%2037.0229%2013.8373%2036.4537%2013.8373H33.8926C32.2117%2013.8373%2031.3712%2013.2153%2031.3712%2011.9711C31.3712%2011.5873%2031.4771%2011.2365%2031.6889%2010.9189C31.9007%2010.6012%2032.2382%2010.3498%2032.7014%2010.1645C31.6293%209.6218%2031.0933%208.70855%2031.0933%207.4247C31.0933%206.20702%2031.4705%205.32686%2032.2249%204.7842C32.9794%204.22831%2034.0978%203.95036%2035.5802%203.95036C35.8846%203.95036%2036.2155%203.97683%2036.5728%204.02977C36.9434%204.06948%2037.2214%204.10919%2037.4067%204.14889H40.9406L40.8811%205.83643H39.392C39.8023%206.22026%2040.0075%206.7563%2040.0075%207.44455C40.0075%208.41075%2039.7031%209.18503%2039.0942%209.76739C38.4854%2010.3365%2037.5854%2010.6211%2036.3942%2010.6211C36.1824%2010.6211%2035.9772%2010.6145%2035.7787%2010.6012C35.5934%2010.5748%2035.4015%2010.5483%2035.203%2010.5218C34.8059%2010.5748%2034.4684%2010.6674%2034.1904%2010.7998C33.9257%2010.9321%2033.7934%2011.1108%2033.7934%2011.3358C33.7934%2011.6402%2034.0647%2011.7924%2034.6074%2011.7924H37.2677C38.2207%2011.7924%2038.9553%2012.0108%2039.4715%2012.4476C39.9876%2012.8711%2040.2457%2013.4932%2040.2457%2014.3138C40.2457%2015.2403%2039.8288%2015.9285%2038.995%2016.3786C38.1611%2016.8286%2036.9567%2017.0536%2035.3816%2017.0536ZM35.6%209.11223C36.3942%209.11223%2036.9434%208.97988%2037.2479%208.71516C37.5655%208.43722%2037.7244%207.97397%2037.7244%207.32543C37.7244%206.67689%2037.5655%206.20702%2037.2479%205.91584C36.9434%205.62466%2036.3942%205.47907%2035.6%205.47907C34.8456%205.47907%2034.3029%205.62466%2033.972%205.91584C33.6412%206.19379%2033.4757%206.66365%2033.4757%207.32543C33.4757%207.93427%2033.6279%208.38428%2033.9323%208.67546C34.25%208.96664%2034.8059%209.11223%2035.6%209.11223Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M45.3783%2013.7579C44.4651%2013.7579%2043.7967%2013.5461%2043.3731%2013.1226C42.9628%2012.6991%2042.7577%2012.0241%2042.7577%2011.0976V0.178223H45.4379V10.8792C45.4379%2011.2101%2045.5041%2011.4417%2045.6364%2011.574C45.7688%2011.6932%2045.9607%2011.7527%2046.2122%2011.7527C46.5563%2011.7527%2046.8673%2011.7064%2047.1453%2011.6138V13.4601C46.6423%2013.6586%2046.0533%2013.7579%2045.3783%2013.7579Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M48.8268%202.42165V0.317196H51.7452V2.42165H48.8268ZM49.0452%2013.5594V6.13423H47.6356L47.8738%204.14889H51.7254V13.5594H49.0452Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M54.206%2013.5594V4.14889H56.6877L56.7869%205.04229C57.1708%204.75111%2057.6539%204.49964%2058.2362%204.28787C58.8318%204.06286%2059.4539%203.95036%2060.1025%203.95036C61.3466%203.95036%2062.2533%204.24154%2062.8224%204.82391C63.3915%205.40627%2063.6761%206.30629%2063.6761%207.52396V13.5594H60.9959V7.66294C60.9959%207.02763%2060.8635%206.57762%2060.5988%206.31291C60.3473%206.0482%2059.8708%205.91584%2059.1693%205.91584C58.759%205.91584%2058.3421%206.00849%2057.9186%206.19379C57.5083%206.37909%2057.1641%206.61071%2056.8862%206.88866V13.5594H54.206Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3Cpath%20d%3D%22M69.7892%2013.7579C68.7039%2013.7579%2067.8965%2013.4734%2067.3671%2012.9042C66.8509%2012.3351%2066.5928%2011.5608%2066.5928%2010.5814V6.21364H65.2627V4.14889H66.5928V2.12385L69.2731%201.32972V4.14889H71.6555L71.4966%206.21364H69.2731V10.4027C69.2731%2010.9189%2069.3922%2011.2762%2069.6304%2011.4748C69.8687%2011.6601%2070.2393%2011.7527%2070.7422%2011.7527C71.1128%2011.7527%2071.4966%2011.6865%2071.8937%2011.5542V13.4006C71.6025%2013.5197%2071.2849%2013.6057%2070.9407%2013.6586C70.5966%2013.7248%2070.2128%2013.7579%2069.7892%2013.7579Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xsm-2", "text-grey-600")}
              tag="div"
            >
              {"© 2023 Aglint Inc. All Rights Reserved"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
