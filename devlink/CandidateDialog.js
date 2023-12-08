import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { AddJobButton } from "./AddJobButton";
import { CandidateDetails } from "./CandidateDetails";
import { AddedJobList } from "./AddedJobList";
import * as _utils from "./utils";
import _styles from "./CandidateDialog.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1440":{"id":"e-1440","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-518","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1441"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f48177e-f948-6cb4-f8f5-030771445e6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f48177e-f948-6cb4-f8f5-030771445e6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699284623076},"e-1441":{"id":"e-1441","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-519","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1440"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f48177e-f948-6cb4-f8f5-030771445e6a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f48177e-f948-6cb4-f8f5-030771445e6a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699284623078},"e-1442":{"id":"e-1442","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-518","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1443"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f48177e-f948-6cb4-f8f5-030771445e68","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f48177e-f948-6cb4-f8f5-030771445e68","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699284775571},"e-1443":{"id":"e-1443","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-519","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1442"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f48177e-f948-6cb4-f8f5-030771445e68","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f48177e-f948-6cb4-f8f5-030771445e68","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699284775574},"e-1454":{"id":"e-1454","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-528","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1455"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad94","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad94","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700038932960},"e-1455":{"id":"e-1455","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-529","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1454"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad94","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad94","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700038932960},"e-1456":{"id":"e-1456","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-528","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1457"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad8f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad8f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700038932960},"e-1457":{"id":"e-1457","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-529","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1456"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad8f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad8f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700038932960},"e-1482":{"id":"e-1482","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-546","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1483"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad9b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad9b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701412225972},"e-1483":{"id":"e-1483","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-547","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1482"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad9b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad9b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701412225976},"e-1484":{"id":"e-1484","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-548","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1485"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6d0b1d6b-d33f-696b-2dd2-444ee6b076f6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6d0b1d6b-d33f-696b-2dd2-444ee6b076f6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701667278081},"e-1485":{"id":"e-1485","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-549","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1484"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6d0b1d6b-d33f-696b-2dd2-444ee6b076f6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6d0b1d6b-d33f-696b-2dd2-444ee6b076f6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701667278084},"e-1486":{"id":"e-1486","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-548","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1487"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3f08f391-0538-359f-07a6-ab1395acb028","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3f08f391-0538-359f-07a6-ab1395acb028","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701667617347},"e-1487":{"id":"e-1487","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-549","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1486"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3f08f391-0538-359f-07a6-ab1395acb028","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3f08f391-0538-359f-07a6-ab1395acb028","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701667617350},"e-1488":{"id":"e-1488","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-548","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1489"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"654b355347005c93ed379d62|0d26e87f-95e3-6bcf-86af-5280f37c33ba","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"654b355347005c93ed379d62|0d26e87f-95e3-6bcf-86af-5280f37c33ba","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701670348007},"e-1489":{"id":"e-1489","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-549","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1488"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"654b355347005c93ed379d62|0d26e87f-95e3-6bcf-86af-5280f37c33ba","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"654b355347005c93ed379d62|0d26e87f-95e3-6bcf-86af-5280f37c33ba","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701670348007},"e-1492":{"id":"e-1492","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-548","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1493"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2ae2704c-30c1-b568-9799-4c8f3b24e366","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2ae2704c-30c1-b568-9799-4c8f3b24e366","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701948733387},"e-1493":{"id":"e-1493","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-549","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1492"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2ae2704c-30c1-b568-9799-4c8f3b24e366","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2ae2704c-30c1-b568-9799-4c8f3b24e366","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701948733389},"e-1494":{"id":"e-1494","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-548","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1495"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0d26e87f-95e3-6bcf-86af-5280f37c33bf","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0d26e87f-95e3-6bcf-86af-5280f37c33bf","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701948760597},"e-1495":{"id":"e-1495","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-549","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1494"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0d26e87f-95e3-6bcf-86af-5280f37c33bf","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0d26e87f-95e3-6bcf-86af-5280f37c33bf","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701948760599}},"actionLists":{"a-518":{"id":"a-518","title":"Job Candidate tooltip hover in","actionItemGroups":[{"actionItems":[{"id":"a-518-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}},{"id":"a-518-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-518-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":1,"unit":""}},{"id":"a-518-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699284626581},"a-519":{"id":"a-519","title":"Job Candidate tooltip hover in 2","actionItemGroups":[{"actionItems":[{"id":"a-519-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}},{"id":"a-519-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699284626581},"a-528":{"id":"a-528","title":"Job Candidate tooltip hover in 3","actionItemGroups":[{"actionItems":[{"id":"a-528-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}},{"id":"a-528-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-528-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":1,"unit":""}},{"id":"a-528-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699284626581},"a-529":{"id":"a-529","title":"Job Candidate tooltip hover in 4","actionItemGroups":[{"actionItems":[{"id":"a-529-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}},{"id":"a-529-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699284626581},"a-546":{"id":"a-546","title":"link copy tool tip hover in","actionItemGroups":[{"actionItems":[{"id":"a-546-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".link-copy-tooltip","selectorGuids":["8988e26b-f07d-2bba-7712-d84ee4e00fc5"]},"value":"none"}},{"id":"a-546-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".link-copy-tooltip","selectorGuids":["8988e26b-f07d-2bba-7712-d84ee4e00fc5"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-546-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".link-copy-tooltip","selectorGuids":["8988e26b-f07d-2bba-7712-d84ee4e00fc5"]},"value":1,"unit":""}},{"id":"a-546-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".link-copy-tooltip","selectorGuids":["8988e26b-f07d-2bba-7712-d84ee4e00fc5"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1701412230363},"a-547":{"id":"a-547","title":"link copy tool tip hover out","actionItemGroups":[{"actionItems":[{"id":"a-547-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".link-copy-tooltip","selectorGuids":["8988e26b-f07d-2bba-7712-d84ee4e00fc5"]},"value":0,"unit":""}},{"id":"a-547-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".link-copy-tooltip","selectorGuids":["8988e26b-f07d-2bba-7712-d84ee4e00fc5"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1701412230363},"a-548":{"id":"a-548","title":"phone hover in CD","actionItemGroups":[{"actionItems":[{"id":"a-548-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".devlink-copy-text","selectorGuids":["b6c7a400-9844-cd7e-e5ed-a8fa4f736c6f"]},"value":0,"unit":""}},{"id":"a-548-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".devlink-copy-text","selectorGuids":["b6c7a400-9844-cd7e-e5ed-a8fa4f736c6f"]},"value":"none"}}]},{"actionItems":[{"id":"a-548-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".devlink-copy-text","selectorGuids":["b6c7a400-9844-cd7e-e5ed-a8fa4f736c6f"]},"value":"flex"}},{"id":"a-548-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".devlink-copy-text","selectorGuids":["b6c7a400-9844-cd7e-e5ed-a8fa4f736c6f"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1701667288663},"a-549":{"id":"a-549","title":"phone hover out CD","actionItemGroups":[{"actionItems":[{"id":"a-549-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".devlink-copy-text","selectorGuids":["b6c7a400-9844-cd7e-e5ed-a8fa4f736c6f"]},"value":0,"unit":""}},{"id":"a-549-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".devlink-copy-text","selectorGuids":["b6c7a400-9844-cd7e-e5ed-a8fa4f736c6f"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1701667288663}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateDialog({
  as: _Component = _Builtin.Block,
  onClickPrev = {},
  onClickNext = {},
  onClickCopy = {},
  onClickClose = {},
  slotAvatar,
  textName = "Dianne Russell",
  textMail = "dianerussel@example.com",
  onClickLinkedin = {},
  textOverview = "Eike led software as a Senior System Software Engineer at NVIDIA Corporation, specializing in autonomous vehicles.",
  isOverviewVisible = true,
  textLocation = "Berlin, germany",
  textJobRoleAtCompany = "Software Engineer at Aglint",
  slotDetails,
  isStarActive = false,
  onClickStar = {},
  onClickViewResume = {},
  slotAddJob,
  isLinkedinVisible = true,
  isLocationVisible = true,
  slotAddedJobList,
  textJobCountwithJob = "1 job ",
  textJobCount = "1",
  isAddedToJobVisible = true,
  onClickDownloadResume = {},
  isBookmarkVisible = true,
  isCloseButtonVisible = true,
  isCopyLinkVisible = false,
  onClickPhone = {},
  onClickMail = {},
  isCopiedTooltipVisible = true,
  isCopiedMailTooltipVisible = true,
  onClickEmailOutreach = {},
  isEmailOutreachVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "candiate-side-drawer-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-sidebar-header-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cvs-header-nav-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cvs-header-nav-icon",
              "clickable",
              "bg-white"
            )}
            data-w-id="8678ceb8-a929-4369-7ec7-1eaf5f29ad8f"
            tag="div"
            {...onClickPrev}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20width%3D%227%22%20height%3D%2213%22%20viewBox%3D%220%200%207%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.242188%206.41406C0.169271%206.30469%200.169271%206.19531%200.242188%206.08594L6.14844%200.179688C6.25781%200.106771%206.36719%200.106771%206.47656%200.179688C6.54948%200.289062%206.54948%200.398438%206.47656%200.507812L0.707031%206.25L6.47656%2011.9922C6.54948%2012.1016%206.54948%2012.2109%206.47656%2012.3203C6.36719%2012.3932%206.25781%2012.3932%206.14844%2012.3203L0.242188%206.41406Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "arrow-tooltips-drawer")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Shift + ←"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "cvs-header-nav-icon",
              "clickable",
              "bg-white"
            )}
            data-w-id="8678ceb8-a929-4369-7ec7-1eaf5f29ad94"
            tag="div"
            {...onClickNext}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20width%3D%227%22%20height%3D%2213%22%20viewBox%3D%220%200%207%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.75781%206.58594C6.83073%206.69531%206.83073%206.80469%206.75781%206.91406L0.851562%2012.8203C0.742188%2012.8932%200.632812%2012.8932%200.523438%2012.8203C0.450521%2012.7109%200.450521%2012.6016%200.523438%2012.4922L6.29297%206.75L0.523438%201.00781C0.450521%200.898438%200.450521%200.789062%200.523438%200.679688C0.632812%200.606771%200.742188%200.606771%200.851562%200.679688L6.75781%206.58594Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "arrow-tooltips-drawer")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Shift + →"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-577")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cvs-header-copy-add-wrap")}
            tag="div"
          >
            {isCopyLinkVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cvs-header-copy-candi")}
                data-w-id="8678ceb8-a929-4369-7ec7-1eaf5f29ad9b"
                tag="div"
                {...onClickCopy}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icon-embed")}
                  value="%3Csvg%20width%3D%2214%22%20height%3D%2210%22%20viewBox%3D%220%200%2014%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.8523%204.8L10.118%207.5125C9.53464%208.06667%208.87109%208.34375%208.12734%208.34375C7.38359%208.34375%206.72734%208.06667%206.15859%207.5125C5.63359%206.97292%205.3638%206.35312%205.34922%205.65312C5.32005%204.93854%205.54609%204.28958%206.02734%203.70625L6.13672%203.575C6.29714%203.42917%206.46484%203.42187%206.63984%203.55312C6.78568%203.69896%206.79297%203.85937%206.66172%204.03437L6.55234%204.16562C6.18776%204.60312%206.02005%205.09167%206.04922%205.63125C6.0638%206.15625%206.26797%206.62292%206.66172%207.03125C7.08464%207.43958%207.58047%207.64375%208.14922%207.64375C8.70339%207.64375%209.19193%207.43958%209.61484%207.03125L12.3492%204.29687C12.7576%203.87396%2012.9617%203.38542%2012.9617%202.83125C12.9617%202.2625%2012.7576%201.76667%2012.3492%201.34375C11.9117%200.920833%2011.4159%200.709374%2010.8617%200.709374C10.3076%200.709374%209.81172%200.920833%209.37422%201.34375L8.89297%201.825C8.71797%201.97083%208.55026%201.97083%208.38984%201.825C8.25859%201.66458%208.25859%201.50417%208.38984%201.34375L8.89297%200.840624C9.46172%200.301041%2010.118%200.0312494%2010.8617%200.0312494C11.6055%200.0312494%2012.269%200.301041%2012.8523%200.840624C13.3919%201.40937%2013.6617%202.07292%2013.6617%202.83125C13.6617%203.575%2013.3919%204.23125%2012.8523%204.8ZM0.974218%204.8L3.68672%202.06562C4.25547%201.52604%204.91172%201.25625%205.65547%201.25625C6.39922%201.25625%207.06276%201.53333%207.64609%202.0875C8.17109%202.62708%208.44089%203.24687%208.45547%203.94687C8.48464%204.66146%208.25859%205.31042%207.77734%205.89375L7.66797%206.025C7.50755%206.17083%207.33984%206.17812%207.16484%206.04687C7.01901%205.90104%207.01172%205.74062%207.14297%205.56562L7.25234%205.43437C7.61693%204.99687%207.78464%204.51562%207.75547%203.99062C7.74089%203.45104%207.53672%202.97708%207.14297%202.56875C6.72005%202.16042%206.22422%201.95625%205.65547%201.95625C5.1013%201.95625%204.61276%202.16042%204.18984%202.56875L1.45547%205.30312C1.04714%205.72604%200.842968%206.22187%200.842968%206.79062C0.842968%207.34479%201.04714%207.83333%201.45547%208.25625C1.89297%208.67917%202.3888%208.89062%202.94297%208.89062C3.49714%208.89062%203.99297%208.67917%204.43047%208.25625L4.93359%207.775C5.09401%207.64375%205.25443%207.64375%205.41484%207.775C5.54609%207.93542%205.54609%208.09583%205.41484%208.25625L4.93359%208.75937C4.35026%209.31354%203.68672%209.59063%202.94297%209.59063C2.19922%209.59063%201.54297%209.31354%200.974218%208.75937C0.420052%208.19062%200.142968%207.53437%200.142968%206.79062C0.142968%206.03229%200.420052%205.36875%200.974218%204.8Z%22%20fill%3D%22black%22%20style%3D%22fill%3Ablack%3Bfill%3Ablack%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "link-copy-tooltip")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-xsm")}
                    tag="div"
                  >
                    {"View Profile"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "cdb-select-dropdown", "dropdown")}
              tag="div"
            >
              {slotAddJob ?? <AddJobButton />}
            </_Builtin.Block>
          </_Builtin.Block>
          {isCloseButtonVisible ? (
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "cvs-header-close-button",
                "cursor-pointer"
              )}
              tag="div"
              {...onClickClose}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_3498_23410%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_3498_23410)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-candiate-profile")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-sidebar-intro-wrapper-candi")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cvs-intro-profile-candi")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cvs-intro-profile-image")}
                tag="div"
              >
                {slotAvatar}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cvs-intro-profile-info")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-490")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "fw-semibold",
                      "one-line-clamp"
                    )}
                    tag="div"
                  >
                    {textName}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-629")}
                  tag="div"
                >
                  {isLinkedinVisible ? (
                    <_Builtin.Block tag="div" {...onClickLinkedin}>
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2222%22%20height%3D%2222%22%20viewBox%3D%220%200%2022%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2222%22%20height%3D%2222%22%20rx%3D%223%22%20fill%3D%22%23347FBC%22%20style%3D%22fill%3A%23347FBC%3Bfill%3Acolor(display-p3%200.2039%200.4980%200.7373)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3Crect%20x%3D%223%22%20y%3D%223%22%20width%3D%2216%22%20height%3D%2215%22%20fill%3D%22white%22%20style%3D%22fill%3Awhite%3Bfill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_6323_44447)%22%3E%0A%3Cpath%20d%3D%22M19.2857%202H3.32552C2.5942%202%202%202.60251%202%203.34214V19.2732C2%2020.0129%202.5942%2020.6154%203.32552%2020.6154H19.2857C20.017%2020.6154%2020.6154%2020.0129%2020.6154%2019.2732V3.34214C20.6154%202.60251%2020.017%202%2019.2857%202ZM7.62617%2017.956H4.8671V9.07218H7.63032V17.956H7.62617ZM6.24663%207.85886C5.36157%207.85886%204.64687%207.14001%204.64687%206.2591C4.64687%205.37819%205.36157%204.65934%206.24663%204.65934C7.12754%204.65934%207.84639%205.37819%207.84639%206.2591C7.84639%207.14416%207.1317%207.85886%206.24663%207.85886ZM17.9685%2017.956H15.2094V13.6346C15.2094%2012.6041%2015.1887%2011.2786%2013.7759%2011.2786C12.3382%2011.2786%2012.118%2012.4005%2012.118%2013.5598V17.956H9.35889V9.07218H12.0058V10.2855H12.0432C12.413%209.58743%2013.3147%208.85196%2014.6568%208.85196C17.4491%208.85196%2017.9685%2010.6927%2017.9685%2013.0861V17.956Z%22%20fill%3D%22%23347FBC%22%20style%3D%22fill%3A%23347FBC%3Bfill%3Acolor(display-p3%200.2039%200.4980%200.7373)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_6323_44447%22%3E%0A%3Crect%20x%3D%222%22%20y%3D%222%22%20width%3D%2218.6154%22%20height%3D%2218.6154%22%20rx%3D%221.69231%22%20fill%3D%22white%22%20style%3D%22fill%3Awhite%3Bfill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  ) : null}
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "phone-icon-wraps",
                      "pointer"
                    )}
                    data-w-id="6d0b1d6b-d33f-696b-2dd2-444ee6b076f6"
                    tag="div"
                    {...onClickPhone}
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2212%22%20height%3D%2211%22%20viewBox%3D%220%200%2012%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.21042%200.851952L5.0125%202.77695C5.13281%203.13789%205.0526%203.44535%204.77187%203.69935L3.78932%204.50143C4.12352%205.20994%204.56467%205.84492%205.11276%206.40638C5.67422%206.95447%206.3092%207.39562%207.01771%207.72982L7.81979%206.74727C8.07379%206.46654%208.38125%206.38633%208.74219%206.50664L10.6672%207.30872C10.8677%207.38893%2011.0081%207.51593%2011.0883%207.68971C11.1685%207.87687%2011.1885%208.0707%2011.1484%208.27122L10.6672%2010.0358C10.5335%2010.3967%2010.2728%2010.5906%209.88516%2010.6173C8.21415%2010.6039%206.70356%2010.1962%205.35339%209.39414C4.00321%208.59206%202.92708%207.51593%202.125%206.16575C1.32292%204.81558%200.91519%203.30499%200.901822%201.63398C0.928558%201.24631%201.1224%200.985632%201.48333%200.851952L3.24792%200.370702C3.44844%200.330598%203.64227%200.35065%203.82943%200.430858C4.00321%200.511066%204.13021%200.651431%204.21042%200.851952Z%22%20fill%3D%22black%22%20style%3D%22fill%3Ablack%3Bfill%3Ablack%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "devlink-copy-text")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-xsm")}
                        tag="div"
                      >
                        {"Copy Phone"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "phone-icon-wraps",
                      "pointer"
                    )}
                    data-w-id="3f08f391-0538-359f-07a6-ab1395acb028"
                    tag="div"
                    {...onClickMail}
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2212%22%20height%3D%229%22%20viewBox%3D%220%200%2012%209%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.86432%200.633983H10.206C10.4734%200.647351%2010.7006%200.740928%2010.8878%200.914712C11.0615%201.10187%2011.1551%201.32912%2011.1685%201.59648C11.1551%201.91732%2011.0281%202.17131%2010.7875%202.35846L6.41615%205.647C6.16215%205.80742%205.90816%205.80742%205.65417%205.647L1.28281%202.35846C1.04219%202.17131%200.91519%201.91732%200.901822%201.59648C0.91519%201.32912%201.00877%201.10187%201.18255%200.914712C1.3697%200.740928%201.59696%200.647351%201.86432%200.633983ZM0.901822%202.87982L5.27318%206.14831C5.50043%206.32209%205.75443%206.40898%206.03516%206.40898C6.31589%206.40898%206.56988%206.32209%206.79714%206.14831L11.1685%202.87982V7.05065C11.1551%207.41159%2011.0281%207.71237%2010.7875%207.95299C10.5469%208.19362%2010.2461%208.32062%209.88516%208.33398H2.18516C1.82422%208.32062%201.52344%208.19362%201.28281%207.95299C1.04219%207.71237%200.91519%207.41159%200.901822%207.05065V2.87982Z%22%20fill%3D%22black%22%20style%3D%22fill%3Ablack%3Bfill%3Ablack%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "devlink-copy-text")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-xsm")}
                        tag="div"
                      >
                        {"Copy Mail"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  {isEmailOutreachVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "email-outreach-button")}
                      tag="div"
                      {...onClickEmailOutreach}
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-email-out")}
                        tag="div"
                      >
                        {"Email outreach"}
                      </_Builtin.Block>
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.66328%200.225C5.82734%200.235937%205.91484%200.323437%205.92578%200.4875V4.1625C5.91484%204.32656%205.82734%204.41406%205.66328%204.425C5.49922%204.41406%205.41172%204.32656%205.40078%204.1625V1.12734L1.11875%205.39297C0.998437%205.50234%200.878125%205.50234%200.757812%205.39297C0.648437%205.27266%200.648437%205.15234%200.757812%205.03203L5.02344%200.75H1.98828C1.82422%200.739062%201.73672%200.651562%201.72578%200.4875C1.73672%200.323437%201.82422%200.235937%201.98828%200.225H5.66328Z%22%20fill%3D%22%23A81897%22%20style%3D%22fill%3A%23A81897%3Bfill%3Acolor(display-p3%200.6588%200.0941%200.5922)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
              </_Builtin.Block>
              {isBookmarkVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "cdb-card-header-right-candi")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cdb-star-block")}
                    tag="div"
                    {...onClickStar}
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon-embed")}
                      value="%3Csvg%20width%3D%2211%22%20height%3D%2215%22%20viewBox%3D%220%200%2011%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.249999%202.0625C0.268228%201.69792%200.395832%201.38802%200.632812%201.13281C0.88802%200.895832%201.19792%200.768228%201.5625%200.749998H9.4375C9.80208%200.768228%2010.112%200.895832%2010.3672%201.13281C10.6042%201.38802%2010.7318%201.69792%2010.75%202.0625V14.1484C10.7135%2014.513%2010.513%2014.7135%2010.1484%2014.75C10.0208%2014.75%209.91146%2014.7135%209.82031%2014.6406L5.5%2011.7695L1.17969%2014.6406C1.08854%2014.7135%200.979166%2014.75%200.851562%2014.75C0.486978%2014.7135%200.286457%2014.513%200.249999%2014.1484V2.0625ZM1.5625%201.625C1.28906%201.64323%201.14323%201.78906%201.125%202.0625V13.6289L5.25391%2010.8945C5.41797%2010.7852%205.58203%2010.7852%205.74609%2010.8945L9.875%2013.6289V2.0625C9.85677%201.78906%209.71094%201.64323%209.4375%201.625H1.5625Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                    {isStarActive ? (
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon-embed", "absolute")}
                        value="%3Csvg%20width%3D%2211%22%20height%3D%2215%22%20viewBox%3D%220%200%2011%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.249999%202.0625C0.268228%201.69792%200.395832%201.38802%200.632812%201.13281C0.88802%200.895832%201.19792%200.768228%201.5625%200.749998H9.4375C9.80208%200.768228%2010.112%200.895832%2010.3672%201.13281C10.6042%201.38802%2010.7318%201.69792%2010.75%202.0625V14.0938C10.7135%2014.4948%2010.4948%2014.7135%2010.0938%2014.75C9.94792%2014.75%209.82031%2014.7135%209.71094%2014.6406L5.5%2011.6875L1.28906%2014.6406C1.17969%2014.7135%201.05208%2014.75%200.906249%2014.75C0.505207%2014.7135%200.286457%2014.4948%200.249999%2014.0938V2.0625Z%22%20fill%3D%22%23F79A3E%22%20style%3D%22fill%3A%23F79A3E%3Bfill%3Acolor(display-p3%200.9686%200.6039%200.2431)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    ) : null}
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-599")}
              tag="div"
            >
              {isLocationVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "loc-wrap-detail")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2211%22%20height%3D%2215%22%20viewBox%3D%220%200%2011%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.87695%206C9.84049%204.76042%209.41211%203.73047%208.5918%202.91016C7.77148%202.08984%206.74154%201.66146%205.50195%201.625C4.26237%201.66146%203.23242%202.08984%202.41211%202.91016C1.5918%203.73047%201.16341%204.76042%201.12695%206C1.12695%206.4375%201.2819%207.01172%201.5918%207.72266C1.90169%208.45182%202.29362%209.20833%202.76758%209.99219C3.24154%2010.7578%203.72461%2011.4687%204.2168%2012.125C4.70898%2012.7995%205.13737%2013.3646%205.50195%2013.8203C5.86654%2013.3646%206.29492%2012.7995%206.78711%2012.125C7.2793%2011.4687%207.76237%2010.7578%208.23633%209.99219C8.72852%209.20833%209.12956%208.45182%209.43945%207.72266C9.73112%207.01172%209.87695%206.4375%209.87695%206ZM10.752%206C10.7155%206.82031%2010.4238%207.76823%209.87695%208.84375C9.31185%209.91927%208.67383%2010.9583%207.96289%2011.9609C7.25195%2012.9818%206.65039%2013.793%206.1582%2014.3945C5.97591%2014.6133%205.75716%2014.7227%205.50195%2014.7227C5.24674%2014.7227%205.02799%2014.6133%204.8457%2014.3945C4.35352%2013.793%203.75195%2012.9818%203.04102%2011.9609C2.33008%2010.9583%201.69206%209.91927%201.12695%208.84375C0.580078%207.76823%200.288411%206.82031%200.251953%206C0.288411%204.50521%200.798828%203.26562%201.7832%202.28125C2.76758%201.29687%204.00716%200.786458%205.50195%200.749999C6.99674%200.786458%208.23633%201.29687%209.2207%202.28125C10.2051%203.26562%2010.7155%204.50521%2010.752%206ZM4.18945%206C4.20768%206.49219%204.42643%206.875%204.8457%207.14844C5.2832%207.36719%205.7207%207.36719%206.1582%207.14844C6.57747%206.875%206.79622%206.49219%206.81445%206C6.79622%205.50781%206.57747%205.125%206.1582%204.85156C5.7207%204.63281%205.2832%204.63281%204.8457%204.85156C4.42643%205.125%204.20768%205.50781%204.18945%206ZM5.50195%208.1875C4.68164%208.16927%204.05273%207.80469%203.61523%207.09375C3.21419%206.36458%203.21419%205.63542%203.61523%204.90625C4.05273%204.19531%204.68164%203.83073%205.50195%203.8125C6.32227%203.83073%206.95117%204.19531%207.38867%204.90625C7.78971%205.63542%207.78971%206.36458%207.38867%207.09375C6.95117%207.80469%206.32227%208.16927%205.50195%208.1875Z%22%20fill%3D%22currentColor%22%20%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">{textLocation}</_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              <_Builtin.Block
                className={_utils.cx(_styles, "loc-wrap-detail", "mt-10")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2215%22%20height%3D%2214%22%20viewBox%3D%220%200%2015%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.87695%202.0625V3.375H10.127V2.0625C10.1087%201.78906%209.96289%201.64323%209.68945%201.625H5.31445C5.04102%201.64323%204.89518%201.78906%204.87695%202.0625ZM4.00195%203.375V2.0625C4.02018%201.69792%204.14779%201.38802%204.38477%201.13281C4.63997%200.895833%204.94987%200.768228%205.31445%200.749999H9.68945C10.054%200.768228%2010.3639%200.895833%2010.6191%201.13281C10.8561%201.38802%2010.9837%201.69792%2011.002%202.0625V3.375H12.752C13.2441%203.39323%2013.6543%203.56641%2013.9824%203.89453C14.3105%204.22266%2014.4837%204.63281%2014.502%205.125V12.125C14.4837%2012.6172%2014.3105%2013.0273%2013.9824%2013.3555C13.6543%2013.6836%2013.2441%2013.8568%2012.752%2013.875H2.25195C1.75977%2013.8568%201.34961%2013.6836%201.02148%2013.3555C0.693359%2013.0273%200.520182%2012.6172%200.501953%2012.125V5.125C0.520182%204.63281%200.693359%204.22266%201.02148%203.89453C1.34961%203.56641%201.75977%203.39323%202.25195%203.375H4.00195ZM10.5645%204.25H4.43945H2.25195C1.99674%204.25%201.78711%204.33203%201.62305%204.49609C1.45898%204.66016%201.37695%204.86979%201.37695%205.125V7.75H5.31445H6.18945H8.81445H9.68945H13.627V5.125C13.627%204.86979%2013.5449%204.66016%2013.3809%204.49609C13.2168%204.33203%2013.0072%204.25%2012.752%204.25H10.5645ZM13.627%208.625H9.68945V9.9375C9.68945%2010.1927%209.60742%2010.4023%209.44336%2010.5664C9.2793%2010.7305%209.06966%2010.8125%208.81445%2010.8125H6.18945C5.93424%2010.8125%205.72461%2010.7305%205.56055%2010.5664C5.39648%2010.4023%205.31445%2010.1927%205.31445%209.9375V8.625H1.37695V12.125C1.37695%2012.3802%201.45898%2012.5898%201.62305%2012.7539C1.78711%2012.918%201.99674%2013%202.25195%2013H12.752C13.0072%2013%2013.2168%2012.918%2013.3809%2012.7539C13.5449%2012.5898%2013.627%2012.3802%2013.627%2012.125V8.625ZM6.18945%208.625V9.9375H8.81445V8.625H6.18945Z%22%20fill%3D%22currentColor%22%20%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block tag="div">
                  {textJobRoleAtCompany}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            {isOverviewVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cvs-intro-overview-candi")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cvs-intro-top")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "icon-block-2")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon-embed")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_3341_29934)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12.667%206.00008L13.5003%204.16675L15.3337%203.33341L13.5003%202.50008L12.667%200.666748L11.8337%202.50008L10.0003%203.33341L11.8337%204.16675L12.667%206.00008ZM7.66699%206.33342L6.00033%202.66675L4.33366%206.33342L0.666992%208.00008L4.33366%209.66675L6.00033%2013.3334L7.66699%209.66675L11.3337%208.00008L7.66699%206.33342ZM12.667%2010.0001L11.8337%2011.8334L10.0003%2012.6667L11.8337%2013.5001L12.667%2015.3334L13.5003%2013.5001L15.3337%2012.6667L13.5003%2011.8334L12.667%2010.0001Z%22%20fill%3D%22%2317494D%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CclipPath%20id%3D%22clip0_3341_29934%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2FclipPath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-kale-800-2")}
                    tag="div"
                  >
                    {"Overview"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Paragraph
                  className={_utils.cx(_styles, "text-kale-600-2")}
                >
                  {textOverview}
                </_Builtin.Paragraph>
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-642")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "cd-view-resume",
                  "cursor-pointer",
                  "mt-0",
                  "p-2"
                )}
                tag="div"
                {...onClickViewResume}
              >
                <_Builtin.Block tag="div">
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icon-embed")}
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2213%22%20viewBox%3D%220%200%2012%2013%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.99986%2010.5022C3.49288%2010.5022%201.5331%209.05872%200.209412%207.16773C-0.0709987%206.76464%20-0.0709987%206.23204%200.208768%205.84759C1.51713%203.95774%203.48959%202.5022%205.99986%202.5022C8.50685%202.5022%2010.4666%203.94567%2011.7903%205.83666C12.0695%206.23794%2012.0707%206.76756%2011.7881%207.16095C10.4797%209.04879%208.5083%2010.5022%205.99986%2010.5022ZM10.9688%206.58759C11.009%206.53204%2011.009%206.46464%2010.9702%206.40893C9.81544%204.7592%208.10883%203.5022%205.99986%203.5022C3.88855%203.5022%202.17163%204.76916%201.02423%206.42628C0.990728%206.47235%200.990728%206.53976%201.02948%206.59547C2.18429%208.2452%203.89089%209.5022%205.99986%209.5022C8.11118%209.5022%209.8281%208.23523%2010.9688%206.58759ZM5.99986%208.5022C4.8953%208.5022%203.99986%207.60677%203.99986%206.5022C3.99986%205.39763%204.8953%204.5022%205.99986%204.5022C7.10443%204.5022%207.99986%205.39763%207.99986%206.5022C7.99986%207.60677%207.10443%208.5022%205.99986%208.5022ZM5.99986%207.5022C6.55215%207.5022%206.99986%207.05448%206.99986%206.5022C6.99986%205.94991%206.55215%205.5022%205.99986%205.5022C5.44758%205.5022%204.99986%205.94991%204.99986%206.5022C4.99986%207.05448%205.44758%207.5022%205.99986%207.5022Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-blue-600-2")}
                  tag="div"
                >
                  {"View Resume"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "cd-download-resume",
                    "cursor-pointer",
                    "mt-0"
                  )}
                  tag="div"
                  {...onClickDownloadResume}
                >
                  <_Builtin.Block tag="div">
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon-embed")}
                      value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewBox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.5%208.19509L9.04645%205.64864C9.24171%205.45338%209.55829%205.45338%209.75355%205.64864C9.94882%205.84391%209.94882%206.16049%209.75355%206.35575L6.65355%209.45575C6.25829%209.85101%205.64171%209.85101%205.24645%209.45575L2.14645%206.35575C1.95118%206.16049%201.95118%205.84391%202.14645%205.64864C2.34171%205.45338%202.65829%205.45338%202.85355%205.64864L5.5%208.29509V1.0022C5.5%200.726055%205.72386%200.502197%206%200.502197C6.27614%200.502197%206.5%200.726055%206.5%201.0022V8.19509ZM1.5%2012.5022C1.22386%2012.5022%201%2012.2783%201%2012.0022C1%2011.7261%201.22386%2011.5022%201.5%2011.5022H10.5C10.7761%2011.5022%2011%2011.7261%2011%2012.0022C11%2012.2783%2010.7761%2012.5022%2010.5%2012.5022H1.5Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-blue-600-2")}
                    tag="div"
                  >
                    {"Download Resume"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-candidate-details", "cd-details")}
        tag="div"
      >
        {slotDetails ?? <CandidateDetails />}
      </_Builtin.Block>
      {isAddedToJobVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cd-added-job-list")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-605")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cd-job-count-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "color-grey-600")}
                tag="div"
              >
                {"Candidate added to"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "color-grey-600")}
                tag="div"
              >
                {textJobCountwithJob}
              </_Builtin.Block>
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons", "ml-5")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200C2.69%200%200%202.69%200%206C0%209.31%202.69%2012%206%2012C9.31%2012%2012%209.31%2012%206C12%202.69%209.31%200%206%200ZM9.44%204.94L5.94%208.44C5.82%208.56%205.66%208.62%205.5%208.62C5.34%208.62%205.18%208.56%205.06%208.44L3.06%206.44C2.82%206.2%202.82%205.8%203.06%205.56C3.3%205.32%203.7%205.32%203.94%205.56L5.5%207.12L8.56%204.06C8.8%203.82%209.2%203.82%209.44%204.06C9.69%204.3%209.69%204.7%209.44%204.94Z%22%20fill%3D%22%23228F67%22%20style%3D%22fill%3A%23228F67%3Bfill%3Acolor(display-p3%200.1333%200.5608%200.4039)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "job-icon-count-wrap")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewBox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.05937%201.18099C4.94878%201.19678%204.88559%201.25998%204.86979%201.37057V2.31849H8.66146V1.37057C8.64566%201.25998%208.58247%201.19678%208.47188%201.18099H5.05937ZM3.73229%201.37057C3.74809%200.991402%203.87448%200.675429%204.11146%200.422652C4.36424%200.185672%204.68021%200.0592833%205.05937%200.0434847H8.47188C8.85104%200.0592833%209.16701%200.185672%209.41979%200.422652C9.65677%200.675429%209.78316%200.991402%209.79896%201.37057V2.31849H11.3156C11.7422%202.33428%2012.0977%202.48437%2012.382%202.76875C12.6664%203.05312%2012.8165%203.40859%2012.8323%203.83515V6.11015H8.28229H5.24896H0.698956V3.83515C0.714754%203.40859%200.864841%203.05312%201.14922%202.76875C1.43359%202.48437%201.78906%202.33428%202.21562%202.31849H3.73229V1.37057ZM12.8323%206.86849V9.90182C12.8165%2010.3284%2012.6664%2010.6839%2012.382%2010.9682C12.0977%2011.2526%2011.7422%2011.4027%2011.3156%2011.4185H2.21562C1.78906%2011.4027%201.43359%2011.2526%201.14922%2010.9682C0.864841%2010.6839%200.714754%2010.3284%200.698956%209.90182V6.86849H5.24896V7.62682C5.24896%207.848%205.32005%208.02969%205.46224%208.17187C5.60443%208.31406%205.78611%208.38516%206.00729%208.38516H7.52396C7.74514%208.38516%207.92682%208.31406%208.06901%208.17187C8.2112%208.02969%208.28229%207.848%208.28229%207.62682V6.86849H12.8323Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{textJobCount}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-606")}
            tag="div"
          >
            {slotAddedJobList ?? <AddedJobList />}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
