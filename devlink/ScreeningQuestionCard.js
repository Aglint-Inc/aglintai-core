import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./ScreeningQuestionCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1352":{"id":"e-1352","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1353"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365602},"e-1353":{"id":"e-1353","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1352"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365605},"e-1382":{"id":"e-1382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-489","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1383":{"id":"e-1383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-490","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1386":{"id":"e-1386","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1387"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976388},"e-1387":{"id":"e-1387","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1386"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976390},"e-1412":{"id":"e-1412","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-497","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1413"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4c72424a-f358-b9d7-3888-f8a31f29b6ec","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4c72424a-f358-b9d7-3888-f8a31f29b6ec","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698919513323},"e-1413":{"id":"e-1413","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-498","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1412"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4c72424a-f358-b9d7-3888-f8a31f29b6ec","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4c72424a-f358-b9d7-3888-f8a31f29b6ec","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698919513326},"e-1420":{"id":"e-1420","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-502","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1421"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5185a2c8-d850-23b5-9d41-285ce5647aab","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5185a2c8-d850-23b5-9d41-285ce5647aab","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698927391146},"e-1422":{"id":"e-1422","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-503","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1423"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"dc064296-d4e2-a081-3cf6-36f11be5417d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"dc064296-d4e2-a081-3cf6-36f11be5417d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698931458264},"e-1444":{"id":"e-1444","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-520","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1445"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890086|e39538f8-eee7-8a26-26cc-1ea2e9fa2b71","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890086|e39538f8-eee7-8a26-26cc-1ea2e9fa2b71","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699453779539},"e-1445":{"id":"e-1445","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-521","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1444"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890086|e39538f8-eee7-8a26-26cc-1ea2e9fa2b71","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890086|e39538f8-eee7-8a26-26cc-1ea2e9fa2b71","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699453779539}},"actionLists":{"a-471":{"id":"a-471","title":"Email Interaction Hover In","actionItemGroups":[{"actionItems":[{"id":"a-471-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-471-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-471-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-471-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-471-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-471-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-472":{"id":"a-472","title":"Email Interaction Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-472-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-472-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-472-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-489":{"id":"a-489","title":"Email Interaction Hover In 2","actionItemGroups":[{"actionItems":[{"id":"a-489-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-489-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-489-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-489-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-489-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-489-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-490":{"id":"a-490","title":"Email Interaction Hover Out 2","actionItemGroups":[{"actionItems":[{"id":"a-490-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-490-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-490-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-497":{"id":"a-497","title":"Assessment Video Overlay hover in","actionItemGroups":[{"actionItems":[{"id":"a-497-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":0,"unit":""}},{"id":"a-497-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":"none"}}]},{"actionItems":[{"id":"a-497-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":1,"unit":""}},{"id":"a-497-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698913183271},"a-498":{"id":"a-498","title":"Assessment Video Overlay hover in 2","actionItemGroups":[{"actionItems":[{"id":"a-498-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":0,"unit":""}},{"id":"a-498-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1698913183271},"a-502":{"id":"a-502","title":"Assessment Video Overlay hover in 4","actionItemGroups":[{"actionItems":[{"id":"a-502-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":0,"unit":""}},{"id":"a-502-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":"none"}}]},{"actionItems":[{"id":"a-502-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":1,"unit":""}},{"id":"a-502-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698913183271},"a-503":{"id":"a-503","title":"Assessment Video Overlay hover in 5","actionItemGroups":[{"actionItems":[{"id":"a-503-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":0,"unit":""}},{"id":"a-503-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":"none"}}]},{"actionItems":[{"id":"a-503-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":1,"unit":""}},{"id":"a-503-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698913183271},"a-520":{"id":"a-520","title":"Assessment Video Overlay hover in 6","actionItemGroups":[{"actionItems":[{"id":"a-520-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":0,"unit":""}},{"id":"a-520-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":"none"}}]},{"actionItems":[{"id":"a-520-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":1,"unit":""}},{"id":"a-520-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698913183271},"a-521":{"id":"a-521","title":"Assessment Video Overlay hover in 7","actionItemGroups":[{"actionItems":[{"id":"a-521-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":0,"unit":""}},{"id":"a-521-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1698913183271}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ScreeningQuestionCard({
  as: _Component = _Builtin.Block,
  slotInput,
  onClickGenerate = {},
  slotVideo,
  isGeneratingLoaderVisible = false,
  slotGeneratingLottie,
  isEditButtonVisible = false,
  isGenerateButtonVisible = true,
  onClickEdit = {},
  onClickDelete = {},
  isSaveButtonVisible = false,
  isGenerateVisible = false,
  onClickGenerateVideo = {},
  isPauseButtonVisible = false,
  isPlayButtonVisible = true,
  onClickPause = {},
  onClickPlay = {},
  onClickSave = {},
  onClickCancel = {},
  isPlayPauseButtonVisible = true,
  isVideoVisible = true,
  onClickRetry = {},
  textError = "Error generating video",
  textButtonError = "Retry",
  isErrorVisible = false,
  isActive = false,
  isVideoIconVisible = true,
  isDeleteVisible = true,
  isMicVisible = true,
  slotAudioAvatar,
  isAudioVisible = false,
  onClickAudioPlayPause = {},
  isAudioPlayVisible = true,
  isAudioPauseVisible = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "new-screening-video-wrap")}
      tag="div"
    >
      {isVideoVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "new-screen-intro-wrap")}
          data-w-id="4c72424a-f358-b9d7-3888-f8a31f29b6ec"
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-video-welcome")}
            tag="div"
          >
            {slotVideo}
          </_Builtin.Block>
          {isGeneratingLoaderVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "generate-overaly", "overlay-abs")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-541")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-540")}
                  tag="div"
                >
                  {slotGeneratingLottie}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-sm")}
                  tag="div"
                >
                  {"Generating Video."}
                  <br />
                  {"This May take a while"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isGenerateVisible ? (
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "generate-overaly",
                "bg-grey-800",
                "new-generate"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "button-white-ai")}
                tag="div"
                {...onClickGenerateVideo}
              >
                <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2214%22%20height%3D%2213%22%20viewBox%3D%220%200%2014%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.8125%200.84375C11.9401%200.861979%2012.013%200.934896%2012.0312%201.0625V2.59375H13.5625C13.6901%202.61198%2013.763%202.6849%2013.7812%202.8125C13.763%202.9401%2013.6901%203.01302%2013.5625%203.03125H12.0312V4.5625C12.013%204.6901%2011.9401%204.76302%2011.8125%204.78125C11.6849%204.76302%2011.612%204.6901%2011.5938%204.5625V3.03125H10.0625C9.9349%203.01302%209.86198%202.9401%209.84375%202.8125C9.86198%202.6849%209.9349%202.61198%2010.0625%202.59375H11.5938V1.0625C11.612%200.934896%2011.6849%200.861979%2011.8125%200.84375ZM11.8125%208.71875C11.9401%208.73698%2012.013%208.8099%2012.0312%208.9375V10.4688H13.5625C13.6901%2010.487%2013.763%2010.5599%2013.7812%2010.6875C13.763%2010.8151%2013.6901%2010.888%2013.5625%2010.9062H12.0312V12.4375C12.013%2012.5651%2011.9401%2012.638%2011.8125%2012.6562C11.6849%2012.638%2011.612%2012.5651%2011.5938%2012.4375V10.9062H10.0625C9.9349%2010.888%209.86198%2010.8151%209.84375%2010.6875C9.86198%2010.5599%209.9349%2010.487%2010.0625%2010.4688H11.5938V8.9375C11.612%208.8099%2011.6849%208.73698%2011.8125%208.71875ZM3.55469%205.27344L0.4375%206.72266L3.55469%208.14453C3.64583%208.19922%203.71875%208.27214%203.77344%208.36328L5.22266%2011.4805L6.64453%208.36328C6.69922%208.27214%206.77214%208.19922%206.86328%208.14453L9.98047%206.72266L6.86328%205.27344C6.77214%205.21875%206.69922%205.14583%206.64453%205.05469L5.22266%201.9375L3.77344%205.05469C3.71875%205.14583%203.64583%205.21875%203.55469%205.27344ZM5.60547%201.74609L7.05469%204.86328L10.1719%206.3125C10.3359%206.40365%2010.418%206.53125%2010.418%206.69531C10.418%206.8776%2010.3359%207.01432%2010.1719%207.10547L7.05469%208.55469L5.60547%2011.6719C5.51432%2011.8359%205.38672%2011.918%205.22266%2011.918C5.04036%2011.918%204.90365%2011.8359%204.8125%2011.6719L3.36328%208.55469L0.246094%207.10547C0.0820312%207.03255%200%206.90495%200%206.72266C0%206.54036%200.0820312%206.40365%200.246094%206.3125L3.36328%204.86328L4.8125%201.74609C4.90365%201.58203%205.04036%201.5%205.22266%201.5C5.40495%201.5%205.53255%201.58203%205.60547%201.74609Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E" />
                <_Builtin.Block tag="div">{"Generate Video"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-empty-video-wrap")}
            tag="div"
          >
            {isPlayPauseButtonVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "generate-overlay")}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  {isPlayButtonVisible ? (
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons", "cursor-pointer")}
                      value="%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20filter%3D%22url(%23filter0_b_3600_33703)%22%3E%0A%3Ccircle%20cx%3D%2215%22%20cy%3D%2215%22%20r%3D%2215%22%20fill%3D%22white%22%20fill-opacity%3D%220.8%22%2F%3E%0A%3C%2Fg%3E%0A%3Cpath%20d%3D%22M20.8569%2014.076C21.523%2014.4618%2021.5216%2015.4241%2020.8544%2015.8081L12.7138%2020.4927C12.0465%2020.8766%2011.2139%2020.3943%2011.215%2019.6245L11.2283%2010.2322C11.2294%209.46236%2012.0634%208.98242%2012.7296%209.36827L20.8569%2014.076Z%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_b_3600_33703%22%20x%3D%22-1.23711%22%20y%3D%22-1.23711%22%20width%3D%2232.4742%22%20height%3D%2232.4742%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%220.618557%22%2F%3E%0A%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_3600_33703%22%2F%3E%0A%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_3600_33703%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                      {...onClickPlay}
                    />
                  ) : null}
                  {isPauseButtonVisible ? (
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons", "cursor-pointer")}
                      value="%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20filter%3D%22url(%23filter0_b_3600_33734)%22%3E%0A%3Ccircle%20cx%3D%2215%22%20cy%3D%2215%22%20r%3D%2215%22%20fill%3D%22white%22%20fill-opacity%3D%220.8%22%2F%3E%0A%3C%2Fg%3E%0A%3Crect%20x%3D%2211%22%20y%3D%2210%22%20width%3D%223%22%20height%3D%2211%22%20rx%3D%221%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%3Crect%20x%3D%2216%22%20y%3D%2210%22%20width%3D%223%22%20height%3D%2211%22%20rx%3D%221%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_b_3600_33734%22%20x%3D%22-1.23711%22%20y%3D%22-1.23711%22%20width%3D%2232.4742%22%20height%3D%2232.4742%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%220.618557%22%2F%3E%0A%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_3600_33734%22%2F%3E%0A%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_3600_33734%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                      {...onClickPause}
                    />
                  ) : null}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          {isErrorVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "generate-overaly", "overlay-abs")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-554")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M14.5112%2013.3273L8.5112%201.99398C8.04453%201.11398%206.61787%201.11398%206.1512%201.99398L0.151199%2013.3273C-0.064667%2013.7426%20-0.0484785%2014.2403%200.193914%2014.6407C0.436307%2015.041%200.869851%2015.2861%201.33787%2015.2873H13.3379C13.8045%2015.2873%2014.2312%2015.0473%2014.4845%2014.6473C14.7259%2014.2429%2014.7361%2013.7411%2014.5112%2013.3273ZM6.67057%205.95378C6.67057%205.58044%206.96391%205.28711%207.33724%205.28711C7.71057%205.28711%208.00391%205.58044%208.00391%205.95378V8.62044C8.00391%208.99378%207.71057%209.28711%207.33724%209.28711C6.96391%209.28711%206.67057%208.99378%206.67057%208.62044V5.95378ZM7.3375%2013.0207C6.75083%2013.0207%206.27083%2012.5407%206.27083%2011.954C6.27083%2011.3674%206.75083%2010.8874%207.3375%2010.8874C7.92417%2010.8874%208.40417%2011.3674%208.40417%2011.954C8.40417%2012.5407%207.92417%2013.0207%207.3375%2013.0207Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-sm", "color-white")}
                  tag="div"
                >
                  {textError}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "button-white-ai")}
                  tag="div"
                  {...onClickRetry}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.5%2011.2344C11.1198%2010.7422%2011.612%2010.1589%2011.9766%209.48438C12.0495%209.375%2012.1497%209.34766%2012.2773%209.40234C12.3867%209.47526%2012.4141%209.57552%2012.3594%209.70312C11.9766%2010.4141%2011.4479%2011.043%2010.7734%2011.5898C9.86198%2012.2643%208.8776%2012.6745%207.82031%2012.8203C6.76302%2012.9661%205.73307%2012.8385%204.73047%2012.4375C3.74609%2012.0547%202.89844%2011.4167%202.1875%2010.5234C1.49479%209.61198%201.07552%208.6276%200.929688%207.57031C0.783854%206.51302%200.911458%205.48307%201.3125%204.48047C1.69531%203.49609%202.33333%202.64844%203.22656%201.9375C4.13802%201.24479%205.1224%200.825521%206.17969%200.679688C7.23698%200.533854%208.26693%200.661458%209.26953%201.0625C10.2539%201.44531%2011.1107%202.08333%2011.8398%202.97656L12.6875%204.125V0.84375C12.7057%200.716146%2012.7786%200.643229%2012.9062%200.625C13.0339%200.643229%2013.1068%200.716146%2013.125%200.84375V4.78125C13.1068%204.90885%2013.0339%204.98177%2012.9062%205H8.96875C8.84115%204.98177%208.76823%204.90885%208.75%204.78125C8.76823%204.65365%208.84115%204.58073%208.96875%204.5625H12.4688L11.4844%203.25C10.4635%202.01042%209.19661%201.29948%207.68359%201.11719C6.1888%200.916667%204.79427%201.29948%203.5%202.26562C2.26042%203.28646%201.54948%204.55339%201.36719%206.06641C1.16667%207.5612%201.54948%208.95573%202.51562%2010.25C3.53646%2011.4896%204.80339%2012.2005%206.31641%2012.3828C7.8112%2012.5833%209.20573%2012.2005%2010.5%2011.2344Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">{textButtonError}</_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isVideoIconVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "video-icon-wrapper")}
              tag="div"
            >
              <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2214%22%20height%3D%2210%22%20viewBox%3D%220%200%2014%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.57497%201.11617C1.3606%201.11617%201.1845%201.18508%201.04669%201.32289C0.908878%201.4607%200.839972%201.6368%200.839972%201.85117V7.73117C0.839972%207.94555%200.908878%208.12164%201.04669%208.25945C1.1845%208.39727%201.3606%208.46617%201.57497%208.46617H7.45497C7.66935%208.46617%207.84544%208.39727%207.98325%208.25945C8.12106%208.12164%208.18997%207.94555%208.18997%207.73117V1.85117C8.18997%201.6368%208.12106%201.4607%207.98325%201.32289C7.84544%201.18508%207.66935%201.11617%207.45497%201.11617H1.57497ZM0.104972%201.85117C0.120284%201.43774%200.265753%201.0932%200.541378%200.817579C0.817003%200.541954%201.16153%200.396486%201.57497%200.381173H7.45497C7.86841%200.396486%208.21294%200.541954%208.48856%200.817579C8.76419%201.0932%208.90966%201.43774%208.92497%201.85117V2.9307V6.65164V7.73117C8.90966%208.14461%208.76419%208.48914%208.48856%208.76477C8.21294%209.04039%207.86841%209.18586%207.45497%209.20117H1.57497C1.16153%209.18586%200.817003%209.04039%200.541378%208.76477C0.265753%208.48914%200.120284%208.14461%200.104972%207.73117V1.85117ZM12.0258%208.35133L9.65997%207.04211V6.21523L12.3933%207.7082C12.4086%207.72352%2012.4315%207.73117%2012.4622%207.73117C12.5387%207.73117%2012.5847%207.68523%2012.6%207.59336V1.98899C12.5847%201.91242%2012.5387%201.86649%2012.4622%201.85117C12.4315%201.85117%2012.4086%201.85883%2012.3933%201.87414L9.65997%203.36711V2.54024L12.0258%201.23102C12.1636%201.15445%2012.309%201.11617%2012.4622%201.11617C12.7072%201.11617%2012.9139%201.20039%2013.0823%201.36883C13.2508%201.53727%2013.335%201.74399%2013.335%201.98899V7.59336C13.335%207.83836%2013.2508%208.04508%2013.0823%208.21352C12.9139%208.38195%2012.7072%208.46617%2012.4622%208.46617C12.309%208.46617%2012.1636%208.42789%2012.0258%208.35133Z%22%20fill%3D%22white%22%20style%3D%22fill%3Awhite%3Bfill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E" />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
      {isAudioVisible ? (
        <_Builtin.Block className={_utils.cx(_styles, "audio-wrap")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "cursor-pointer-audio-indi")}
            tag="div"
            {...onClickAudioPlayPause}
          >
            {isAudioPlayVisible ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons", "avatar-play")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2030%2030%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20filter%3D%22url(%23filter0_b_4384_81316)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2215%22%20cy%3D%2215%22%20r%3D%2215%22%20fill%3D%22%2368737d%22%20fill-opacity%3D%220.8%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cpath%20d%3D%22M20.8569%2014.076C21.523%2014.4618%2021.5216%2015.4241%2020.8544%2015.8081L12.7138%2020.4927C12.0465%2020.8766%2011.2139%2020.3943%2011.215%2019.6245L11.2283%2010.2322C11.2294%209.46236%2012.0634%208.98242%2012.7296%209.36827L20.8569%2014.076Z%22%20fill%3D%22white%22%20fill-opacity%3D%221%22%2F%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cfilter%20id%3D%22filter0_b_4384_81316%22%20x%3D%22-1.23711%22%20y%3D%22-1.23711%22%20width%3D%2232.4742%22%20height%3D%2232.4742%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%20%20%20%20%20%20%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%220.618557%22%2F%3E%0A%20%20%20%20%20%20%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_4384_81316%22%2F%3E%0A%20%20%20%20%20%20%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_4384_81316%22%20result%3D%22shape%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
            {isAudioPauseVisible ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons", "avatar-pause")}
                value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2030%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20filter%3D%22url(%23filter0_b_4384_81289)%22%3E%0A%3Ccircle%20cx%3D%2215%22%20cy%3D%2215%22%20r%3D%2215%22%20fill%3D%22%2368737d%22%20fill-opacity%3D%220.8%22%2F%3E%0A%3C%2Fg%3E%0A%3Crect%20x%3D%2211%22%20y%3D%2210%22%20width%3D%223%22%20height%3D%2211%22%20rx%3D%221%22%20fill%3D%22white%22%20fill-opacity%3D%221%22%2F%3E%0A%3Crect%20x%3D%2216%22%20y%3D%2210%22%20width%3D%223%22%20height%3D%2211%22%20rx%3D%221%22%20fill%3D%22white%22%20fill-opacity%3D%221%22%2F%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_b_4384_81289%22%20x%3D%22-1.23711%22%20y%3D%22-1.23711%22%20width%3D%2232.4742%22%20height%3D%2232.4742%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%220.618557%22%2F%3E%0A%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_4384_81289%22%2F%3E%0A%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_4384_81289%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "audio-avatar-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-573")}
              tag="div"
            >
              {slotAudioAvatar}
            </_Builtin.Block>
          </_Builtin.Block>
          {isMicVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "video-icon-wrapper")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%228%22%20height%3D%2213%22%20viewBox%3D%220%200%208%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.68997%203.11617C5.67466%202.70274%205.52919%202.3582%205.25356%202.08258C4.97794%201.80695%204.63341%201.66149%204.21997%201.64617C3.80653%201.66149%203.462%201.80695%203.18638%202.08258C2.91075%202.3582%202.76528%202.70274%202.74997%203.11617V6.79117C2.76528%207.20461%202.91075%207.54914%203.18638%207.82477C3.462%208.10039%203.80653%208.24586%204.21997%208.26117C4.63341%208.24586%204.97794%208.10039%205.25356%207.82477C5.52919%207.54914%205.67466%207.20461%205.68997%206.79117V3.11617ZM2.01497%203.11617C2.03028%202.48836%202.24466%201.96774%202.6581%201.5543C3.07153%201.14086%203.59216%200.926486%204.21997%200.911173C4.84778%200.926486%205.36841%201.14086%205.78185%201.5543C6.19528%201.96774%206.40966%202.48836%206.42497%203.11617V6.79117C6.40966%207.41898%206.19528%207.93961%205.78185%208.35305C5.36841%208.76648%204.84778%208.98086%204.21997%208.99617C3.59216%208.98086%203.07153%208.76648%202.6581%208.35305C2.24466%207.93961%202.03028%207.41898%202.01497%206.79117V3.11617ZM1.27997%205.68867V6.79117C1.29528%207.61805%201.57856%208.31477%202.12981%208.88133C2.69638%209.43258%203.3931%209.71586%204.21997%209.73117C5.04685%209.71586%205.74356%209.43258%206.31013%208.88133C6.86138%208.31477%207.14466%207.61805%207.15997%206.79117V5.68867C7.17528%205.45899%207.29778%205.33649%207.52747%205.32117C7.75716%205.33649%207.87966%205.45899%207.89497%205.68867V6.79117C7.87966%207.77117%207.5581%208.59805%206.93028%209.2718C6.31778%209.94555%205.53685%2010.336%204.58747%2010.4432V11.9362H6.05747C6.28716%2011.9515%206.40966%2012.074%206.42497%2012.3037C6.40966%2012.5334%206.28716%2012.6559%206.05747%2012.6712H4.21997H2.38247C2.15278%2012.6559%202.03028%2012.5334%202.01497%2012.3037C2.03028%2012.074%202.15278%2011.9515%202.38247%2011.9362H3.85247V10.4432C2.9031%2010.336%202.12216%209.94555%201.50966%209.2718C0.881846%208.59805%200.560284%207.77117%200.544971%206.79117V5.68867C0.560284%205.45899%200.682784%205.33649%200.912471%205.32117C1.14216%205.33649%201.26466%205.45899%201.27997%205.68867Z%22%20fill%3D%22white%22%20style%3D%22fill%3Awhite%3Bfill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "div-block-548")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-input-new-screen")}
          tag="div"
        >
          {slotInput}
        </_Builtin.Block>
        {isGenerateButtonVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-500", "cursor-pointer")}
            tag="div"
            {...onClickGenerate}
          >
            {"Generate"}
          </_Builtin.Block>
        ) : null}
        {isEditButtonVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "edit-delete-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-blue-500", "cursor-pointer")}
              tag="div"
              {...onClickEdit}
            >
              {"Edit"}
            </_Builtin.Block>
            {isDeleteVisible ? (
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "color-grey-600",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickDelete}
              >
                {"Delete"}
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        ) : null}
        {isSaveButtonVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "edit-delete-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-blue-500", "cursor-pointer")}
              tag="div"
              {...onClickSave}
            >
              {"Save"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "color-grey-600", "cursor-pointer")}
              tag="div"
              {...onClickCancel}
            >
              {"Cancel"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "active-screening-card")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
