"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { EmailOutReach } from "./EmailOutReach";
import { AddToList } from "./AddToList";
import { AddJobButton } from "./AddJobButton";
import { SlotComp } from "./SlotComp";
import { CandidateDetails } from "./CandidateDetails";
import { AddedJobList } from "./AddedJobList";
import * as _utils from "./utils";
import _styles from "./CandidateDialog.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1488":{"id":"e-1488","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-548","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1489"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"654b355347005c93ed379d62|0d26e87f-95e3-6bcf-86af-5280f37c33ba","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"654b355347005c93ed379d62|0d26e87f-95e3-6bcf-86af-5280f37c33ba","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701670348007},"e-1489":{"id":"e-1489","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-549","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1488"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"654b355347005c93ed379d62|0d26e87f-95e3-6bcf-86af-5280f37c33ba","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"654b355347005c93ed379d62|0d26e87f-95e3-6bcf-86af-5280f37c33ba","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701670348007},"e-1516":{"id":"e-1516","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-548","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1517"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|e3fae023-3e6b-3c2a-e3b6-398557d7e127","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|e3fae023-3e6b-3c2a-e3b6-398557d7e127","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705402229709},"e-1517":{"id":"e-1517","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-549","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1516"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|e3fae023-3e6b-3c2a-e3b6-398557d7e127","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|e3fae023-3e6b-3c2a-e3b6-398557d7e127","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705402229709},"e-1518":{"id":"e-1518","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-548","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1519"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|a353f5cf-77c9-88c7-46c4-61b7fa5af90b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|a353f5cf-77c9-88c7-46c4-61b7fa5af90b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705402560906},"e-1519":{"id":"e-1519","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-549","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1518"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|a353f5cf-77c9-88c7-46c4-61b7fa5af90b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|a353f5cf-77c9-88c7-46c4-61b7fa5af90b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705402560906},"e-1520":{"id":"e-1520","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-548","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1521"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|3c6c43f6-97a2-071f-676f-9919d9194c79","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|3c6c43f6-97a2-071f-676f-9919d9194c79","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705402562063},"e-1521":{"id":"e-1521","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-549","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1520"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|3c6c43f6-97a2-071f-676f-9919d9194c79","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|3c6c43f6-97a2-071f-676f-9919d9194c79","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705402562063},"e-1528":{"id":"e-1528","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-518","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1529"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d30c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d30c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706537534253},"e-1529":{"id":"e-1529","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-519","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1528"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d30c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d30c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706537534253},"e-1530":{"id":"e-1530","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-518","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1531"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d311","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d311","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706537534253},"e-1531":{"id":"e-1531","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-519","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1530"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d311","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"654b355347005c93ed379d62|c444856c-2729-4453-1f48-2d50bb33d311","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706537534253},"e-1532":{"id":"e-1532","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-528","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1533"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706608341816},"e-1533":{"id":"e-1533","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-529","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1532"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706608341816},"e-1534":{"id":"e-1534","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-528","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1535"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706608341816},"e-1535":{"id":"e-1535","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-529","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1534"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|840c608d-dbe7-5e20-c606-4b4bf94edae8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706608341816},"e-1538":{"id":"e-1538","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-546","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1539"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|061011c9-b1c7-658e-5c98-d8d6abd9c6b2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|061011c9-b1c7-658e-5c98-d8d6abd9c6b2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706767811542},"e-1539":{"id":"e-1539","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-547","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1538"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|061011c9-b1c7-658e-5c98-d8d6abd9c6b2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|061011c9-b1c7-658e-5c98-d8d6abd9c6b2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706767811542},"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-548":{"id":"a-548","title":"phone hover in CD","actionItemGroups":[{"actionItems":[{"id":"a-548-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".devlink-copy-text","selectorGuids":["b6c7a400-9844-cd7e-e5ed-a8fa4f736c6f"]},"value":0,"unit":""}},{"id":"a-548-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".devlink-copy-text","selectorGuids":["b6c7a400-9844-cd7e-e5ed-a8fa4f736c6f"]},"value":"none"}}]},{"actionItems":[{"id":"a-548-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".devlink-copy-text","selectorGuids":["b6c7a400-9844-cd7e-e5ed-a8fa4f736c6f"]},"value":"flex"}},{"id":"a-548-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".devlink-copy-text","selectorGuids":["b6c7a400-9844-cd7e-e5ed-a8fa4f736c6f"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1701667288663},"a-549":{"id":"a-549","title":"phone hover out CD","actionItemGroups":[{"actionItems":[{"id":"a-549-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".devlink-copy-text","selectorGuids":["b6c7a400-9844-cd7e-e5ed-a8fa4f736c6f"]},"value":0,"unit":""}},{"id":"a-549-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".devlink-copy-text","selectorGuids":["b6c7a400-9844-cd7e-e5ed-a8fa4f736c6f"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1701667288663},"a-518":{"id":"a-518","title":"Job Candidate tooltip hover in","actionItemGroups":[{"actionItems":[{"id":"a-518-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}},{"id":"a-518-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-518-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":1,"unit":""}},{"id":"a-518-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699284626581},"a-519":{"id":"a-519","title":"Job Candidate tooltip hover in 2","actionItemGroups":[{"actionItems":[{"id":"a-519-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}},{"id":"a-519-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699284626581},"a-528":{"id":"a-528","title":"Job Candidate tooltip hover in 3","actionItemGroups":[{"actionItems":[{"id":"a-528-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}},{"id":"a-528-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-528-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":1,"unit":""}},{"id":"a-528-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699284626581},"a-529":{"id":"a-529","title":"Job Candidate tooltip hover in 4","actionItemGroups":[{"actionItems":[{"id":"a-529-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":0,"unit":""}},{"id":"a-529-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".arrow-tooltips-drawer","selectorGuids":["75304b5d-e0de-79ea-e833-822d545330ec"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699284626581},"a-546":{"id":"a-546","title":"link copy tool tip hover in","actionItemGroups":[{"actionItems":[{"id":"a-546-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"id":"061011c9-b1c7-658e-5c98-d8d6abd9c6b4"},"value":"none"}},{"id":"a-546-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"061011c9-b1c7-658e-5c98-d8d6abd9c6b4"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-546-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"id":"061011c9-b1c7-658e-5c98-d8d6abd9c6b4"},"value":1,"unit":""}},{"id":"a-546-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"id":"061011c9-b1c7-658e-5c98-d8d6abd9c6b4"},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1701412230363},"a-547":{"id":"a-547","title":"link copy tool tip hover out","actionItemGroups":[{"actionItems":[{"id":"a-547-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"id":"061011c9-b1c7-658e-5c98-d8d6abd9c6b4"},"value":0,"unit":""}},{"id":"a-547-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"id":"061011c9-b1c7-658e-5c98-d8d6abd9c6b4"},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1701412230363},"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateDialog({
  as: _Component = _Builtin.Block,
  onClickPrev = {},
  onClickNext = {},
  onClickCopy = {},
  onClickClose = {},
  slotAvatar,
  textName = "Dianne Russell",
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
  isViewResumeVisible = true,
  isPhoneVisible = true,
  textPhone = "8078081250",
  onClickGit = {},
  isGitVisible = true,
  onClickFacebook = {},
  isFacebookVisible = true,
  onClickTwitter = {},
  isTwitterVisible = true,
  slotEmailOutReach,
  slotAddtoList,
  isAddListVisible = false,
  onClickPhoneScreening = {},
  isPhoneScreeningVisible = false,
  textPhoneScreening = "Phone Screening",
  slotButton,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(
        _styles,
        "candiate-side-drawer-wrapper",
        "justify-start",
        "dialog"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-sidebar-header-wrap", "dial")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cd-header-right-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cvs-intro-profile-image", "hide")}
            tag="div"
          >
            {slotAvatar}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2223.5%22%20height%3D%2223.5%22%20rx%3D%2211.75%22%20fill%3D%22%23F8F9F9%22%2F%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2223.5%22%20height%3D%2223.5%22%20rx%3D%2211.75%22%20stroke%3D%22%23D8DCDE%22%20stroke-width%3D%220.5%22%2F%3E%0A%3Cpath%20d%3D%22M12%2012C11.4531%2012%2010.9531%2011.8672%2010.5%2011.6016C10.0469%2011.3359%209.67969%2010.9688%209.39844%2010.5C9.13281%2010.0312%209%209.53125%209%209C9%208.46875%209.13281%207.96875%209.39844%207.5C9.67969%207.03125%2010.0469%206.66406%2010.5%206.39844C10.9531%206.13281%2011.4531%206%2012%206C12.5469%206%2013.0469%206.13281%2013.5%206.39844C13.9531%206.66406%2014.3203%207.03125%2014.6016%207.5C14.8672%207.96875%2015%208.46875%2015%209C15%209.53125%2014.8672%2010.0312%2014.6016%2010.5C14.3203%2010.9688%2013.9531%2011.3359%2013.5%2011.6016C13.0469%2011.8672%2012.5469%2012%2012%2012ZM10.9219%2013.125H13.0781C14.25%2013.1562%2015.2344%2013.5625%2016.0312%2014.3438C16.8125%2015.1406%2017.2188%2016.125%2017.25%2017.2969C17.25%2017.5%2017.1797%2017.6641%2017.0391%2017.7891C16.9141%2017.9297%2016.75%2018%2016.5469%2018H7.45312C7.25%2018%207.08594%2017.9297%206.96094%2017.7891C6.82031%2017.6641%206.75%2017.5%206.75%2017.2969C6.78125%2016.125%207.1875%2015.1406%207.96875%2014.3438C8.76562%2013.5625%209.75%2013.1562%2010.9219%2013.125Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <Text content={textName} weight="medium" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cd-header-left-wrap")}
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
              data-w-id="840c608d-dbe7-5e20-c606-4b4bf94edae3"
              tag="div"
              {...onClickPrev}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%2219%22%20height%3D%2218%22%20viewbox%3D%220%200%2019%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.99082%208.71016C4.80332%208.50391%204.80332%208.29766%204.99082%208.09141L10.3908%202.69141C10.5971%202.50391%2010.8033%202.50391%2011.0096%202.69141C11.1971%202.89766%2011.1971%203.10391%2011.0096%203.31016L5.94707%208.40078L11.0096%2013.4914C11.1971%2013.6977%2011.1971%2013.9039%2011.0096%2014.1102C10.8033%2014.2977%2010.5971%2014.2977%2010.3908%2014.1102L4.99082%208.71016Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
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
              data-w-id="840c608d-dbe7-5e20-c606-4b4bf94edae8"
              tag="div"
              {...onClickNext}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%2219%22%20height%3D%2218%22%20viewbox%3D%220%200%2019%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.8096%208.09141C12.9971%208.29766%2012.9971%208.50391%2012.8096%208.71016L7.40957%2014.1102C7.20332%2014.2977%206.99707%2014.2977%206.79082%2014.1102C6.60332%2013.9039%206.60332%2013.6977%206.79082%2013.4914L11.8533%208.40078L6.79082%203.31016C6.60332%203.10391%206.60332%202.89766%206.79082%202.69141C6.99707%202.50391%207.20332%202.50391%207.40957%202.69141L12.8096%208.09141Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "arrow-tooltips-drawer")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Shift + →"}</_Builtin.Block>
              </_Builtin.Block>
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
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_3498_23410%22%20style%3D%22mask-type%3Aluminance%22%20maskunits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_3498_23410)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
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
              className={_utils.cx(_styles, "cd-details-wrap")}
              tag="div"
            >
              {isPhoneVisible ? (
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "loc-wrap-detail",
                    "cursor-pointer"
                  )}
                  tag="div"
                  {...onClickPhone}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewbox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.0249%206.21562L11.4749%207.26562C11.6645%207.35312%2011.8103%207.49167%2011.9124%207.68125C11.9999%207.85625%2012.0218%208.04583%2011.978%208.25L11.453%2010.7C11.3364%2011.1375%2011.052%2011.3708%2010.5999%2011.4C10.4687%2011.4%2010.3374%2011.4%2010.2062%2011.4C10.1041%2011.3854%2010.002%2011.3781%209.8999%2011.3781C8.19365%2011.2323%206.65511%2010.7146%205.28428%209.825C3.91344%208.93542%202.82699%207.77604%202.0249%206.34687C1.22282%204.93229%200.814485%203.35%200.799902%201.6C0.829069%201.14792%201.0624%200.863541%201.4999%200.746874L3.9499%200.221874C4.15407%200.178124%204.34365%200.207291%204.51865%200.309374C4.70824%200.396874%204.84678%200.535416%204.93428%200.724999L5.98428%203.175C6.13011%203.56875%206.04261%203.91146%205.72178%204.20312L4.84678%204.925C5.44469%205.94583%206.25407%206.75521%207.2749%207.35312L7.99678%206.47812C8.28844%206.15729%208.63115%206.06979%209.0249%206.21562ZM10.5999%2010.7C10.6874%2010.7%2010.7457%2010.6563%2010.7749%2010.5688L11.2999%208.11875C11.3145%208.01667%2011.278%207.95104%2011.1905%207.92187L8.74053%206.87187C8.66761%206.84271%208.60199%206.85729%208.54365%206.91562L7.82178%207.8125C7.55928%208.075%207.26032%208.12604%206.9249%207.96562C5.7874%207.30937%204.89053%206.4125%204.23428%205.275C4.07386%204.93958%204.1249%204.64062%204.3874%204.37812L5.28428%203.65625C5.34261%203.59792%205.35719%203.53229%205.32803%203.45937L4.27803%201.00937C4.23428%200.921874%204.16865%200.885416%204.08115%200.899999L1.63115%201.425C1.54365%201.45417%201.4999%201.5125%201.4999%201.6C1.51449%203.29167%201.93011%204.82292%202.74678%206.19375C3.54886%207.56458%204.63532%208.65104%206.00615%209.45312C7.37699%2010.2698%208.90824%2010.6854%2010.5999%2010.7Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">{textPhone}</_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              {isLocationVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "loc-wrap-detail")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2211%22%20height%3D%2215%22%20viewbox%3D%220%200%2011%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.87695%206C9.84049%204.76042%209.41211%203.73047%208.5918%202.91016C7.77148%202.08984%206.74154%201.66146%205.50195%201.625C4.26237%201.66146%203.23242%202.08984%202.41211%202.91016C1.5918%203.73047%201.16341%204.76042%201.12695%206C1.12695%206.4375%201.2819%207.01172%201.5918%207.72266C1.90169%208.45182%202.29362%209.20833%202.76758%209.99219C3.24154%2010.7578%203.72461%2011.4687%204.2168%2012.125C4.70898%2012.7995%205.13737%2013.3646%205.50195%2013.8203C5.86654%2013.3646%206.29492%2012.7995%206.78711%2012.125C7.2793%2011.4687%207.76237%2010.7578%208.23633%209.99219C8.72852%209.20833%209.12956%208.45182%209.43945%207.72266C9.73112%207.01172%209.87695%206.4375%209.87695%206ZM10.752%206C10.7155%206.82031%2010.4238%207.76823%209.87695%208.84375C9.31185%209.91927%208.67383%2010.9583%207.96289%2011.9609C7.25195%2012.9818%206.65039%2013.793%206.1582%2014.3945C5.97591%2014.6133%205.75716%2014.7227%205.50195%2014.7227C5.24674%2014.7227%205.02799%2014.6133%204.8457%2014.3945C4.35352%2013.793%203.75195%2012.9818%203.04102%2011.9609C2.33008%2010.9583%201.69206%209.91927%201.12695%208.84375C0.580078%207.76823%200.288411%206.82031%200.251953%206C0.288411%204.50521%200.798828%203.26562%201.7832%202.28125C2.76758%201.29687%204.00716%200.786458%205.50195%200.749999C6.99674%200.786458%208.23633%201.29687%209.2207%202.28125C10.2051%203.26562%2010.7155%204.50521%2010.752%206ZM4.18945%206C4.20768%206.49219%204.42643%206.875%204.8457%207.14844C5.2832%207.36719%205.7207%207.36719%206.1582%207.14844C6.57747%206.875%206.79622%206.49219%206.81445%206C6.79622%205.50781%206.57747%205.125%206.1582%204.85156C5.7207%204.63281%205.2832%204.63281%204.8457%204.85156C4.42643%205.125%204.20768%205.50781%204.18945%206ZM5.50195%208.1875C4.68164%208.16927%204.05273%207.80469%203.61523%207.09375C3.21419%206.36458%203.21419%205.63542%203.61523%204.90625C4.05273%204.19531%204.68164%203.83073%205.50195%203.8125C6.32227%203.83073%206.95117%204.19531%207.38867%204.90625C7.78971%205.63542%207.78971%206.36458%207.38867%207.09375C6.95117%207.80469%206.32227%208.16927%205.50195%208.1875Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">{textLocation}</_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              <_Builtin.Block
                className={_utils.cx(_styles, "loc-wrap-detail")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2215%22%20height%3D%2214%22%20viewbox%3D%220%200%2015%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.87695%202.0625V3.375H10.127V2.0625C10.1087%201.78906%209.96289%201.64323%209.68945%201.625H5.31445C5.04102%201.64323%204.89518%201.78906%204.87695%202.0625ZM4.00195%203.375V2.0625C4.02018%201.69792%204.14779%201.38802%204.38477%201.13281C4.63997%200.895833%204.94987%200.768228%205.31445%200.749999H9.68945C10.054%200.768228%2010.3639%200.895833%2010.6191%201.13281C10.8561%201.38802%2010.9837%201.69792%2011.002%202.0625V3.375H12.752C13.2441%203.39323%2013.6543%203.56641%2013.9824%203.89453C14.3105%204.22266%2014.4837%204.63281%2014.502%205.125V12.125C14.4837%2012.6172%2014.3105%2013.0273%2013.9824%2013.3555C13.6543%2013.6836%2013.2441%2013.8568%2012.752%2013.875H2.25195C1.75977%2013.8568%201.34961%2013.6836%201.02148%2013.3555C0.693359%2013.0273%200.520182%2012.6172%200.501953%2012.125V5.125C0.520182%204.63281%200.693359%204.22266%201.02148%203.89453C1.34961%203.56641%201.75977%203.39323%202.25195%203.375H4.00195ZM10.5645%204.25H4.43945H2.25195C1.99674%204.25%201.78711%204.33203%201.62305%204.49609C1.45898%204.66016%201.37695%204.86979%201.37695%205.125V7.75H5.31445H6.18945H8.81445H9.68945H13.627V5.125C13.627%204.86979%2013.5449%204.66016%2013.3809%204.49609C13.2168%204.33203%2013.0072%204.25%2012.752%204.25H10.5645ZM13.627%208.625H9.68945V9.9375C9.68945%2010.1927%209.60742%2010.4023%209.44336%2010.5664C9.2793%2010.7305%209.06966%2010.8125%208.81445%2010.8125H6.18945C5.93424%2010.8125%205.72461%2010.7305%205.56055%2010.5664C5.39648%2010.4023%205.31445%2010.1927%205.31445%209.9375V8.625H1.37695V12.125C1.37695%2012.3802%201.45898%2012.5898%201.62305%2012.7539C1.78711%2012.918%201.99674%2013%202.25195%2013H12.752C13.0072%2013%2013.2168%2012.918%2013.3809%2012.7539C13.5449%2012.5898%2013.627%2012.3802%2013.627%2012.125V8.625ZM6.18945%208.625V9.9375H8.81445V8.625H6.18945Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block tag="div">
                  {textJobRoleAtCompany}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "cvs-intro-profile-candi",
                "mt-10",
                "center"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cvs-intro-profile-info")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-629")}
                  tag="div"
                >
                  {isLinkedinVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "pointer")}
                      tag="div"
                      {...onClickLinkedin}
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2222%22%20height%3D%2222%22%20viewbox%3D%220%200%2022%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2222%22%20height%3D%2222%22%20rx%3D%223%22%20fill%3D%22%23347FBC%22%20style%3D%22fill%3A%23347FBC%3Bfill%3Acolor(display-p3%200.2039%200.4980%200.7373)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3Crect%20x%3D%223%22%20y%3D%223%22%20width%3D%2216%22%20height%3D%2215%22%20fill%3D%22white%22%20style%3D%22fill%3Awhite%3Bfill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_6323_44447)%22%3E%0A%3Cpath%20d%3D%22M19.2857%202H3.32552C2.5942%202%202%202.60251%202%203.34214V19.2732C2%2020.0129%202.5942%2020.6154%203.32552%2020.6154H19.2857C20.017%2020.6154%2020.6154%2020.0129%2020.6154%2019.2732V3.34214C20.6154%202.60251%2020.017%202%2019.2857%202ZM7.62617%2017.956H4.8671V9.07218H7.63032V17.956H7.62617ZM6.24663%207.85886C5.36157%207.85886%204.64687%207.14001%204.64687%206.2591C4.64687%205.37819%205.36157%204.65934%206.24663%204.65934C7.12754%204.65934%207.84639%205.37819%207.84639%206.2591C7.84639%207.14416%207.1317%207.85886%206.24663%207.85886ZM17.9685%2017.956H15.2094V13.6346C15.2094%2012.6041%2015.1887%2011.2786%2013.7759%2011.2786C12.3382%2011.2786%2012.118%2012.4005%2012.118%2013.5598V17.956H9.35889V9.07218H12.0058V10.2855H12.0432C12.413%209.58743%2013.3147%208.85196%2014.6568%208.85196C17.4491%208.85196%2017.9685%2010.6927%2017.9685%2013.0861V17.956Z%22%20fill%3D%22%23347FBC%22%20style%3D%22fill%3A%23347FBC%3Bfill%3Acolor(display-p3%200.2039%200.4980%200.7373)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cclippath%20id%3D%22clip0_6323_44447%22%3E%0A%3Crect%20x%3D%222%22%20y%3D%222%22%20width%3D%2218.6154%22%20height%3D%2218.6154%22%20rx%3D%221.69231%22%20fill%3D%22white%22%20style%3D%22fill%3Awhite%3Bfill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                  ) : null}
                  {isGitVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "phone-icon-wraps",
                        "pointer",
                        "hide"
                      )}
                      data-w-id="e3fae023-3e6b-3c2a-e3b6-398557d7e127"
                      tag="div"
                      {...onClickGit}
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.00007%200.00292969C3.58233%200.00292969%200%203.5846%200%208.00299C0%2011.5376%202.29226%2014.5364%205.47093%2015.5942C5.87075%2015.6683%206.01754%2015.4207%206.01754%2015.2094C6.01754%2015.0186%206.01012%2014.3884%206.00667%2013.7199C3.78105%2014.2039%203.31141%2012.776%203.31141%2012.776C2.9475%2011.8513%202.42315%2011.6055%202.42315%2011.6055C1.6973%2011.1089%202.47786%2011.1191%202.47786%2011.1191C3.28121%2011.1756%203.70421%2011.9435%203.70421%2011.9435C4.41774%2013.1666%205.57572%2012.813%206.03224%2012.6086C6.10404%2012.0915%206.31137%2011.7386%206.54016%2011.5388C4.76324%2011.3365%202.8953%2010.6506%202.8953%207.58516C2.8953%206.71173%203.20782%205.99808%203.71958%205.43783C3.63651%205.23633%203.36268%204.42265%203.79708%203.3207C3.79708%203.3207%204.46887%203.10569%205.99766%204.14074C6.63581%203.96348%207.32019%203.87459%208.00007%203.87154C8.67994%203.87459%209.36485%203.96348%2010.0042%204.14074C11.5311%203.10569%2012.202%203.3207%2012.202%203.3207C12.6375%204.42265%2012.3635%205.23633%2012.2804%205.43783C12.7934%205.99808%2013.1038%206.71173%2013.1038%207.58516C13.1038%2010.6578%2011.2323%2011.3344%209.45083%2011.5325C9.73778%2011.7807%209.99346%2012.2676%209.99346%2013.014C9.99346%2014.0844%209.98419%2014.9459%209.98419%2015.2094C9.98419%2015.4223%2010.1282%2015.6717%2010.5337%2015.5932C13.7107%2014.5341%2016%2011.5364%2016%208.00299C16%203.5846%2012.4182%200.00292969%208.00007%200.00292969ZM2.99628%2011.3992C2.97867%2011.4389%202.91614%2011.4509%202.85917%2011.4236C2.80115%2011.3975%202.76856%2011.3433%202.78737%2011.3034C2.80459%2011.2625%202.86725%2011.2511%202.92514%2011.2785C2.9833%2011.3046%203.01642%2011.3593%202.99628%2011.3992ZM3.3898%2011.7503C3.35165%2011.7857%203.27706%2011.7693%203.22645%2011.7134C3.17413%2011.6576%203.16432%2011.583%203.20301%2011.5471C3.24235%2011.5117%203.31468%2011.5283%203.36715%2011.5841C3.41947%2011.6405%203.42968%2011.7146%203.3898%2011.7503ZM3.65977%2012.1996C3.61075%2012.2336%203.5306%2012.2017%203.48105%2012.1306C3.43204%2012.0594%203.43204%2011.9741%203.48211%2011.9399C3.53179%2011.9057%203.61075%2011.9365%203.66096%2012.0071C3.70984%2012.0794%203.70984%2012.1647%203.65977%2012.1996ZM4.11633%2012.7199C4.07248%2012.7682%203.97909%2012.7552%203.91073%2012.6893C3.84078%2012.6248%203.82131%2012.5332%203.86529%2012.4849C3.90967%2012.4364%204.0036%2012.45%204.07248%2012.5155C4.1419%2012.5798%204.1631%2012.6721%204.11633%2012.7199ZM4.70641%2012.8955C4.68707%2012.9582%204.59711%2012.9867%204.5065%2012.96C4.41602%2012.9326%204.3568%2012.8592%204.37508%2012.7959C4.39389%2012.7328%204.48424%2012.7032%204.57552%2012.7317C4.66587%2012.7589%204.72522%2012.8318%204.70641%2012.8955ZM5.37793%2012.97C5.38019%2013.036%205.30335%2013.0907%205.20823%2013.0919C5.11258%2013.094%205.03521%2013.0406%205.03415%2012.9757C5.03415%2012.9091%205.10927%2012.8549%205.20492%2012.8533C5.30004%2012.8515%205.37793%2012.9045%205.37793%2012.97ZM6.03763%2012.9447C6.04903%2013.0091%205.98292%2013.0752%205.88846%2013.0929C5.7956%2013.1098%205.70962%2013.0701%205.69783%2013.0062C5.6863%2012.9402%205.7536%2012.8741%205.84634%2012.857C5.94093%2012.8406%206.02558%2012.8793%206.03763%2012.9447Z%22%20fill%3D%22%23161614%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                      <_Builtin.Block
                        className={_utils.cx(_styles, "devlink-copy-text")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "text-xsm")}
                          tag="div"
                        >
                          {"Copy Link"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                  {isFacebookVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "phone-icon-wraps",
                        "pointer",
                        "hide"
                      )}
                      data-w-id="a353f5cf-77c9-88c7-46c4-61b7fa5af90b"
                      tag="div"
                      {...onClickFacebook}
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2217%22%20height%3D%2217%22%20viewbox%3D%220%200%2017%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_2833_35590)%22%3E%0A%3Cpath%20d%3D%22M16.2109%208.17238C16.2109%203.7541%2012.6292%200.172381%208.21094%200.172381C3.79266%200.172381%200.210938%203.7541%200.210938%208.17238C0.210938%2012.1654%203.13642%2015.475%206.96094%2016.0752V10.4849H4.92969V8.17238H6.96094V6.40988C6.96094%204.40488%208.15528%203.29738%209.98266%203.29738C10.8579%203.29738%2011.7734%203.45363%2011.7734%203.45363V5.42238H10.7647C9.77086%205.42238%209.46094%206.03905%209.46094%206.67171V8.17238H11.6797L11.325%2010.4849H9.46094V16.0752C13.2855%2015.475%2016.2109%2012.1654%2016.2109%208.17238Z%22%20fill%3D%22%231877F2%22%2F%3E%0A%3Cpath%20d%3D%22M11.325%2010.4844L11.6797%208.17188H9.46094V6.6712C9.46094%206.03855%209.77086%205.42188%2010.7647%205.42188H11.7734V3.45312C11.7734%203.45312%2010.8579%203.29688%209.98266%203.29688C8.15528%203.29688%206.96094%204.40438%206.96094%206.40938V8.17188H4.92969V10.4844H6.96094V16.0747C7.36823%2016.1386%207.78569%2016.1719%208.21094%2016.1719C8.63619%2016.1719%209.05364%2016.1386%209.46094%2016.0747V10.4844H11.325Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cclippath%20id%3D%22clip0_2833_35590%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%20transform%3D%22translate(0.210938%200.171875)%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                      />
                      <_Builtin.Block
                        className={_utils.cx(_styles, "devlink-copy-text")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "text-xsm")}
                          tag="div"
                        >
                          {"Copy Link"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                  {isTwitterVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "phone-icon-wraps",
                        "pointer",
                        "hide"
                      )}
                      data-w-id="3c6c43f6-97a2-071f-676f-9919d9194c79"
                      tag="div"
                      {...onClickTwitter}
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2212%22%20height%3D%2211%22%20viewbox%3D%220%200%2012%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_2833_35596)%22%3E%0A%3Cpath%20d%3D%22M9.44578%200.118164H11.2771L7.27711%204.72057L12%2010.9615H8.28916L5.39759%207.17841L2.07229%2010.9615H0.240964L4.53012%206.04588L0%200.118164H3.80723L6.43374%203.58804L9.44578%200.118164ZM8.79518%209.8531H9.80723L3.25301%201.15431H2.14458L8.79518%209.8531Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cclippath%20id%3D%22clip0_2833_35596%22%3E%0A%3Crect%20width%3D%2212%22%20height%3D%2210.8434%22%20fill%3D%22white%22%20transform%3D%22translate(0%200.120117)%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                      />
                      <_Builtin.Block
                        className={_utils.cx(_styles, "devlink-copy-text")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "text-xsm")}
                          tag="div"
                        >
                          {"Copy Link"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                  <_Builtin.Block tag="div">
                    {slotEmailOutReach ?? <EmailOutReach />}
                  </_Builtin.Block>
                  {isPhoneScreeningVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "relative")}
                      tag="div"
                      {...onClickPhoneScreening}
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "email-outreach-button")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "text-email-out")}
                          tag="div"
                        >
                          {textPhoneScreening}
                        </_Builtin.Block>
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewbox%3D%220%200%206%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.66328%200.225C5.82734%200.235937%205.91484%200.323437%205.92578%200.4875V4.1625C5.91484%204.32656%205.82734%204.41406%205.66328%204.425C5.49922%204.41406%205.41172%204.32656%205.40078%204.1625V1.12734L1.11875%205.39297C0.998437%205.50234%200.878125%205.50234%200.757812%205.39297C0.648437%205.27266%200.648437%205.15234%200.757812%205.03203L5.02344%200.75H1.98828C1.82422%200.739062%201.73672%200.651562%201.72578%200.4875C1.73672%200.323437%201.82422%200.235937%201.98828%200.225H5.66328Z%22%20fill%3D%22%23A81897%22%20style%3D%22fill%3A%23A81897%3Bfill%3Acolor(display-p3%200.6588%200.0941%200.5922)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      </_Builtin.Block>
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
                      value="%3Csvg%20width%3D%2211%22%20height%3D%2215%22%20viewbox%3D%220%200%2011%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.249999%202.0625C0.268228%201.69792%200.395832%201.38802%200.632812%201.13281C0.88802%200.895832%201.19792%200.768228%201.5625%200.749998H9.4375C9.80208%200.768228%2010.112%200.895832%2010.3672%201.13281C10.6042%201.38802%2010.7318%201.69792%2010.75%202.0625V14.1484C10.7135%2014.513%2010.513%2014.7135%2010.1484%2014.75C10.0208%2014.75%209.91146%2014.7135%209.82031%2014.6406L5.5%2011.7695L1.17969%2014.6406C1.08854%2014.7135%200.979166%2014.75%200.851562%2014.75C0.486978%2014.7135%200.286457%2014.513%200.249999%2014.1484V2.0625ZM1.5625%201.625C1.28906%201.64323%201.14323%201.78906%201.125%202.0625V13.6289L5.25391%2010.8945C5.41797%2010.7852%205.58203%2010.7852%205.74609%2010.8945L9.875%2013.6289V2.0625C9.85677%201.78906%209.71094%201.64323%209.4375%201.625H1.5625Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                    {isStarActive ? (
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon-embed", "absolute")}
                        value="%3Csvg%20width%3D%2211%22%20height%3D%2215%22%20viewbox%3D%220%200%2011%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.249999%202.0625C0.268228%201.69792%200.395832%201.38802%200.632812%201.13281C0.88802%200.895832%201.19792%200.768228%201.5625%200.749998H9.4375C9.80208%200.768228%2010.112%200.895832%2010.3672%201.13281C10.6042%201.38802%2010.7318%201.69792%2010.75%202.0625V14.0938C10.7135%2014.4948%2010.4948%2014.7135%2010.0938%2014.75C9.94792%2014.75%209.82031%2014.7135%209.71094%2014.6406L5.5%2011.6875L1.28906%2014.6406C1.17969%2014.7135%201.05208%2014.75%200.906249%2014.75C0.505207%2014.7135%200.286457%2014.4948%200.249999%2014.0938V2.0625Z%22%20fill%3D%22%23F79A3E%22%20style%3D%22fill%3A%23F79A3E%3Bfill%3Acolor(display-p3%200.9686%200.6039%200.2431)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    ) : null}
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              <_Builtin.Block
                className={_utils.cx(_styles, "cvs-header-copy-add-wrap")}
                tag="div"
              >
                {isCopyLinkVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cvs-header-copy-candi")}
                    data-w-id="061011c9-b1c7-658e-5c98-d8d6abd9c6b2"
                    tag="div"
                    {...onClickCopy}
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon-embed")}
                      value="%3Csvg%20width%3D%2214%22%20height%3D%2210%22%20viewbox%3D%220%200%2014%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.8523%204.8L10.118%207.5125C9.53464%208.06667%208.87109%208.34375%208.12734%208.34375C7.38359%208.34375%206.72734%208.06667%206.15859%207.5125C5.63359%206.97292%205.3638%206.35312%205.34922%205.65312C5.32005%204.93854%205.54609%204.28958%206.02734%203.70625L6.13672%203.575C6.29714%203.42917%206.46484%203.42187%206.63984%203.55312C6.78568%203.69896%206.79297%203.85937%206.66172%204.03437L6.55234%204.16562C6.18776%204.60312%206.02005%205.09167%206.04922%205.63125C6.0638%206.15625%206.26797%206.62292%206.66172%207.03125C7.08464%207.43958%207.58047%207.64375%208.14922%207.64375C8.70339%207.64375%209.19193%207.43958%209.61484%207.03125L12.3492%204.29687C12.7576%203.87396%2012.9617%203.38542%2012.9617%202.83125C12.9617%202.2625%2012.7576%201.76667%2012.3492%201.34375C11.9117%200.920833%2011.4159%200.709374%2010.8617%200.709374C10.3076%200.709374%209.81172%200.920833%209.37422%201.34375L8.89297%201.825C8.71797%201.97083%208.55026%201.97083%208.38984%201.825C8.25859%201.66458%208.25859%201.50417%208.38984%201.34375L8.89297%200.840624C9.46172%200.301041%2010.118%200.0312494%2010.8617%200.0312494C11.6055%200.0312494%2012.269%200.301041%2012.8523%200.840624C13.3919%201.40937%2013.6617%202.07292%2013.6617%202.83125C13.6617%203.575%2013.3919%204.23125%2012.8523%204.8ZM0.974218%204.8L3.68672%202.06562C4.25547%201.52604%204.91172%201.25625%205.65547%201.25625C6.39922%201.25625%207.06276%201.53333%207.64609%202.0875C8.17109%202.62708%208.44089%203.24687%208.45547%203.94687C8.48464%204.66146%208.25859%205.31042%207.77734%205.89375L7.66797%206.025C7.50755%206.17083%207.33984%206.17812%207.16484%206.04687C7.01901%205.90104%207.01172%205.74062%207.14297%205.56562L7.25234%205.43437C7.61693%204.99687%207.78464%204.51562%207.75547%203.99062C7.74089%203.45104%207.53672%202.97708%207.14297%202.56875C6.72005%202.16042%206.22422%201.95625%205.65547%201.95625C5.1013%201.95625%204.61276%202.16042%204.18984%202.56875L1.45547%205.30312C1.04714%205.72604%200.842968%206.22187%200.842968%206.79062C0.842968%207.34479%201.04714%207.83333%201.45547%208.25625C1.89297%208.67917%202.3888%208.89062%202.94297%208.89062C3.49714%208.89062%203.99297%208.67917%204.43047%208.25625L4.93359%207.775C5.09401%207.64375%205.25443%207.64375%205.41484%207.775C5.54609%207.93542%205.54609%208.09583%205.41484%208.25625L4.93359%208.75937C4.35026%209.31354%203.68672%209.59063%202.94297%209.59063C2.19922%209.59063%201.54297%209.31354%200.974218%208.75937C0.420052%208.19062%200.142968%207.53437%200.142968%206.79062C0.142968%206.03229%200.420052%205.36875%200.974218%204.8Z%22%20fill%3D%22black%22%20style%3D%22fill%3Ablack%3Bfill%3Ablack%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "link-copy-tooltip")}
                      data-w-id="061011c9-b1c7-658e-5c98-d8d6abd9c6b4"
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
                {isAddListVisible ? (
                  <_Builtin.Block tag="div">
                    {slotAddtoList ?? <AddToList />}
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "cdb-select-dropdown",
                  "dropdown"
                )}
                tag="div"
              >
                {slotAddJob ?? <AddJobButton />}
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
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_3341_29934)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12.667%206.00008L13.5003%204.16675L15.3337%203.33341L13.5003%202.50008L12.667%200.666748L11.8337%202.50008L10.0003%203.33341L11.8337%204.16675L12.667%206.00008ZM7.66699%206.33342L6.00033%202.66675L4.33366%206.33342L0.666992%208.00008L4.33366%209.66675L6.00033%2013.3334L7.66699%209.66675L11.3337%208.00008L7.66699%206.33342ZM12.667%2010.0001L11.8337%2011.8334L10.0003%2012.6667L11.8337%2013.5001L12.667%2015.3334L13.5003%2013.5001L15.3337%2012.6667L13.5003%2011.8334L12.667%2010.0001Z%22%20fill%3D%22%2317494D%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cclippath%20id%3D%22clip0_3341_29934%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2Fclippath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
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
            {isViewResumeVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-642")}
                tag="div"
              >
                {slotButton ?? (
                  <>
                    <SlotComp componentName="ButtonGhost" />
                    <SlotComp componentName="ButtonGhost" />
                  </>
                )}
              </_Builtin.Block>
            ) : null}
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
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200C2.69%200%200%202.69%200%206C0%209.31%202.69%2012%206%2012C9.31%2012%2012%209.31%2012%206C12%202.69%209.31%200%206%200ZM9.44%204.94L5.94%208.44C5.82%208.56%205.66%208.62%205.5%208.62C5.34%208.62%205.18%208.56%205.06%208.44L3.06%206.44C2.82%206.2%202.82%205.8%203.06%205.56C3.3%205.32%203.7%205.32%203.94%205.56L5.5%207.12L8.56%204.06C8.8%203.82%209.2%203.82%209.44%204.06C9.69%204.3%209.69%204.7%209.44%204.94Z%22%20fill%3D%22%23228F67%22%20style%3D%22fill%3A%23228F67%3Bfill%3Acolor(display-p3%200.1333%200.5608%200.4039)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "job-icon-count-wrap")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewbox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.05937%201.18099C4.94878%201.19678%204.88559%201.25998%204.86979%201.37057V2.31849H8.66146V1.37057C8.64566%201.25998%208.58247%201.19678%208.47188%201.18099H5.05937ZM3.73229%201.37057C3.74809%200.991402%203.87448%200.675429%204.11146%200.422652C4.36424%200.185672%204.68021%200.0592833%205.05937%200.0434847H8.47188C8.85104%200.0592833%209.16701%200.185672%209.41979%200.422652C9.65677%200.675429%209.78316%200.991402%209.79896%201.37057V2.31849H11.3156C11.7422%202.33428%2012.0977%202.48437%2012.382%202.76875C12.6664%203.05312%2012.8165%203.40859%2012.8323%203.83515V6.11015H8.28229H5.24896H0.698956V3.83515C0.714754%203.40859%200.864841%203.05312%201.14922%202.76875C1.43359%202.48437%201.78906%202.33428%202.21562%202.31849H3.73229V1.37057ZM12.8323%206.86849V9.90182C12.8165%2010.3284%2012.6664%2010.6839%2012.382%2010.9682C12.0977%2011.2526%2011.7422%2011.4027%2011.3156%2011.4185H2.21562C1.78906%2011.4027%201.43359%2011.2526%201.14922%2010.9682C0.864841%2010.6839%200.714754%2010.3284%200.698956%209.90182V6.86849H5.24896V7.62682C5.24896%207.848%205.32005%208.02969%205.46224%208.17187C5.60443%208.31406%205.78611%208.38516%206.00729%208.38516H7.52396C7.74514%208.38516%207.92682%208.31406%208.06901%208.17187C8.2112%208.02969%208.28229%207.848%208.28229%207.62682V6.86849H12.8323Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
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
