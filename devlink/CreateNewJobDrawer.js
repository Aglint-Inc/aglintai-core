import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { NewJobStep1 } from "./NewJobStep1";
import { ButtonPrimaryLarge } from "./ButtonPrimaryLarge";
import { CreateBtn } from "./CreateBtn";
import { ShareVia } from "./ShareVia";
import { ToggleDropdown } from "./ToggleDropdown";
import { CjCheckbox } from "./CjCheckbox";
import { IconCheckCircle } from "./IconCheckCircle";
import * as _utils from "./utils";
import _styles from "./CreateNewJobDrawer.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-848":{"id":"e-848","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-849"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694777157161},"e-849":{"id":"e-849","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-848"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694777157165},"e-868":{"id":"e-868","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-869"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-869":{"id":"e-869","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-868"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-870":{"id":"e-870","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-871"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-871":{"id":"e-871","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-870"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-872":{"id":"e-872","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-873"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-873":{"id":"e-873","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-872"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-874":{"id":"e-874","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-875"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-875":{"id":"e-875","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-874"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-960":{"id":"e-960","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-361","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-961"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|860f500b-a81d-7f1a-5153-6e48537d65a4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|860f500b-a81d-7f1a-5153-6e48537d65a4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694976399087},"e-961":{"id":"e-961","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-362","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-960"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|860f500b-a81d-7f1a-5153-6e48537d65a4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|860f500b-a81d-7f1a-5153-6e48537d65a4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694976399087},"e-1028":{"id":"e-1028","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-369","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1029"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|31e952a1-bd32-e5da-aff4-c57eb453e923","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|31e952a1-bd32-e5da-aff4-c57eb453e923","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695121745037},"e-1032":{"id":"e-1032","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-367","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1033"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|f9d9ccce-832a-435f-fd37-6f2d8d450cc8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|f9d9ccce-832a-435f-fd37-6f2d8d450cc8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695121847876},"e-1034":{"id":"e-1034","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-368","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1035"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|f9d9ccce-832a-435f-fd37-6f2d8d450ccc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|f9d9ccce-832a-435f-fd37-6f2d8d450ccc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695121847876},"e-1036":{"id":"e-1036","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-369","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1037"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|a6195c40-655c-42c9-4324-d6cd0ab451ff","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|a6195c40-655c-42c9-4324-d6cd0ab451ff","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695121857587},"e-1040":{"id":"e-1040","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-370","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1041"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|a6195c40-655c-42c9-4324-d6cd0ab45207","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|a6195c40-655c-42c9-4324-d6cd0ab45207","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695121857587},"e-1042":{"id":"e-1042","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-368","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1043"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|9d3001c2-92f9-5833-88b4-073ee2dae222","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|9d3001c2-92f9-5833-88b4-073ee2dae222","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122976730},"e-1044":{"id":"e-1044","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-371","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1045"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|9d3001c2-92f9-5833-88b4-073ee2dae226","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|9d3001c2-92f9-5833-88b4-073ee2dae226","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122976730},"e-1046":{"id":"e-1046","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-370","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1047"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|40b9de57-c70a-2725-04f0-2d05cc1d5d25","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|40b9de57-c70a-2725-04f0-2d05cc1d5d25","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122984977},"e-1048":{"id":"e-1048","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-372","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1049"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|40b9de57-c70a-2725-04f0-2d05cc1d5d29","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|40b9de57-c70a-2725-04f0-2d05cc1d5d29","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122984977},"e-1050":{"id":"e-1050","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1051"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862b3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862b3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1051":{"id":"e-1051","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1050"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862b3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862b3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1052":{"id":"e-1052","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1053"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862c4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862c4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1053":{"id":"e-1053","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1052"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862c4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862c4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1054":{"id":"e-1054","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1055"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862d1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862d1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1055":{"id":"e-1055","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1054"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862d1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862d1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1056":{"id":"e-1056","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1057"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862e4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862e4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1057":{"id":"e-1057","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1056"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862e4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862e4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1058":{"id":"e-1058","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-372","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1059"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862f3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862f3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1060":{"id":"e-1060","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-373","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1061"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1068":{"id":"e-1068","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-392","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1069"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|6d48b2fa-45fa-867f-b77a-8f63c502f02b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|6d48b2fa-45fa-867f-b77a-8f63c502f02b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695123448029},"e-1070":{"id":"e-1070","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-391","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1071"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|6d48b2fa-45fa-867f-b77a-8f63c502f02f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|6d48b2fa-45fa-867f-b77a-8f63c502f02f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695123448029},"e-1072":{"id":"e-1072","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-389","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1073"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|31e952a1-bd32-e5da-aff4-c57eb453e932","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|31e952a1-bd32-e5da-aff4-c57eb453e932","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695123791745},"e-1074":{"id":"e-1074","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-390","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1075"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|3660701a-f887-ae2c-25d7-797cb9213891","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|3660701a-f887-ae2c-25d7-797cb9213891","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695124095935},"e-1076":{"id":"e-1076","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-395","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1077"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|3660701a-f887-ae2c-25d7-797cb9213895","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|3660701a-f887-ae2c-25d7-797cb9213895","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695124095935},"e-1078":{"id":"e-1078","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-394","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1079"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|41684cd6-6474-9407-d2e3-d5fca8877068","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|41684cd6-6474-9407-d2e3-d5fca8877068","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695124934534},"e-1080":{"id":"e-1080","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-393","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1081"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|41684cd6-6474-9407-d2e3-d5fca887706c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|41684cd6-6474-9407-d2e3-d5fca887706c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695124934534},"e-1082":{"id":"e-1082","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-396","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1083"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|726bfe92-f796-cafb-8605-928b8a7c12f7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|726bfe92-f796-cafb-8605-928b8a7c12f7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695127455999},"e-1084":{"id":"e-1084","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-397","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1085"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|726bfe92-f796-cafb-8605-928b8a7c12fb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|726bfe92-f796-cafb-8605-928b8a7c12fb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695127455999},"e-1086":{"id":"e-1086","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-399","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1087"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|49be4dd7-36a2-2bb7-466e-d94e0e84cf8e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|49be4dd7-36a2-2bb7-466e-d94e0e84cf8e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695128388128},"e-1088":{"id":"e-1088","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-398","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1089"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|49be4dd7-36a2-2bb7-466e-d94e0e84cf92","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|49be4dd7-36a2-2bb7-466e-d94e0e84cf92","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695128388128},"e-1090":{"id":"e-1090","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-400","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1091"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|31e952a1-bd32-e5da-aff4-c57eb453e93a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|31e952a1-bd32-e5da-aff4-c57eb453e93a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695130701564},"e-1092":{"id":"e-1092","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-401","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1093"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|31e952a1-bd32-e5da-aff4-c57eb453e942","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|31e952a1-bd32-e5da-aff4-c57eb453e942","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131045596},"e-1094":{"id":"e-1094","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-402","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1095"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|31e952a1-bd32-e5da-aff4-c57eb453e94a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|31e952a1-bd32-e5da-aff4-c57eb453e94a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131666635},"e-1106":{"id":"e-1106","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-392","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1107"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7cf2","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7cf2","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1108":{"id":"e-1108","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-391","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1109"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7cf7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7cf7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1110":{"id":"e-1110","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-390","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1111"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7d37","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7d37","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1112":{"id":"e-1112","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-395","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1113"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7d3b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7d3b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1114":{"id":"e-1114","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-394","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1115"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7dc9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7dc9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1116":{"id":"e-1116","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-393","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1117"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7dcd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7dcd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1118":{"id":"e-1118","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-396","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1119"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7de0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7de0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1120":{"id":"e-1120","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-397","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1121"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7de4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7de4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1122":{"id":"e-1122","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-399","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1123"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7e01","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7e01","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1124":{"id":"e-1124","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-398","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1125"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7e05","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7e05","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1126":{"id":"e-1126","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-367","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1127"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7e58","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7e58","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1128":{"id":"e-1128","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-368","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1129"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7e5c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7e5c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1130":{"id":"e-1130","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-369","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1131"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7ed0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7ed0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1132":{"id":"e-1132","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-370","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1133"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7ed4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7ed4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1134":{"id":"e-1134","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-368","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1135"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7ee7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7ee7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1136":{"id":"e-1136","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-371","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1137"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7eeb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7eeb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1138":{"id":"e-1138","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-370","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1139"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f08","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f08","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1140":{"id":"e-1140","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-372","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1141"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f0c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f0c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1142":{"id":"e-1142","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1143"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f1e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f1e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1143":{"id":"e-1143","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1142"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f1e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f1e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1144":{"id":"e-1144","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1145"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f2f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f2f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1145":{"id":"e-1145","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1144"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f2f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f2f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1146":{"id":"e-1146","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1147"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f3c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f3c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1147":{"id":"e-1147","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1146"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f3c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f3c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1148":{"id":"e-1148","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1149"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f4b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f4b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1149":{"id":"e-1149","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1148"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f4b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f4b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1150":{"id":"e-1150","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-372","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1151"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f5a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f5a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1152":{"id":"e-1152","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-373","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1153"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f5e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f5e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1158":{"id":"e-1158","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-361","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1159"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec43089005f|207412a4-7dc0-6c61-abd3-6d9dfa8cc316","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec43089005f|207412a4-7dc0-6c61-abd3-6d9dfa8cc316","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147074691},"e-1159":{"id":"e-1159","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-362","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec43089005f|207412a4-7dc0-6c61-abd3-6d9dfa8cc316","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec43089005f|207412a4-7dc0-6c61-abd3-6d9dfa8cc316","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147074691},"e-1162":{"id":"e-1162","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-361","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1163"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec43089005f|275e0f98-993e-f480-bbc2-cbe4d445692f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec43089005f|275e0f98-993e-f480-bbc2-cbe4d445692f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147094109},"e-1163":{"id":"e-1163","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-362","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1162"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec43089005f|275e0f98-993e-f480-bbc2-cbe4d445692f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec43089005f|275e0f98-993e-f480-bbc2-cbe4d445692f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147094109},"e-1166":{"id":"e-1166","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-361","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1167"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec43089005f|b2c2d875-7292-8a28-a91d-e8631f16f031","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec43089005f|b2c2d875-7292-8a28-a91d-e8631f16f031","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147113132},"e-1167":{"id":"e-1167","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-362","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1166"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec43089005f|b2c2d875-7292-8a28-a91d-e8631f16f031","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec43089005f|b2c2d875-7292-8a28-a91d-e8631f16f031","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147113132},"e-1174":{"id":"e-1174","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-361","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1175"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|e3403dbb-cce3-6ca4-e716-27dd60a28176","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|e3403dbb-cce3-6ca4-e716-27dd60a28176","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695149517159},"e-1175":{"id":"e-1175","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-362","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1174"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|e3403dbb-cce3-6ca4-e716-27dd60a28176","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|e3403dbb-cce3-6ca4-e716-27dd60a28176","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695149517159},"e-1176":{"id":"e-1176","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-405","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1177"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7cf9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7cf9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695157767363},"e-1178":{"id":"e-1178","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-406","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1179"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7cfb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7cfb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695158481480},"e-1216":{"id":"e-1216","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-368","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1217"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a08743","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a08743","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1218":{"id":"e-1218","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-371","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1219"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a08747","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a08747","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1220":{"id":"e-1220","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-370","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1221"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a08764","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a08764","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1222":{"id":"e-1222","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-372","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1223"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a08768","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a08768","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1224":{"id":"e-1224","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1225"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a0877a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a0877a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1225":{"id":"e-1225","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1224"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a0877a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a0877a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1226":{"id":"e-1226","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1227"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a0878b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a0878b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1227":{"id":"e-1227","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1226"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a0878b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a0878b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1228":{"id":"e-1228","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1229"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a08798","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a08798","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1229":{"id":"e-1229","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1228"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a08798","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a08798","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1230":{"id":"e-1230","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1231"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a087a7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a087a7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1231":{"id":"e-1231","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1230"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a087a7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a087a7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1232":{"id":"e-1232","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-372","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1233"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a087b6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a087b6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1234":{"id":"e-1234","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-373","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1235"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a087ba","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890086|5c42cd1c-c631-55aa-1d5d-8c78b9a087ba","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869}},"actionLists":{"a-352":{"id":"a-352","title":"toggle-dropdown-[open]","actionItemGroups":[{"actionItems":[{"id":"a-352-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-352-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-352-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-352-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859},"a-353":{"id":"a-353","title":"toggle-dropdown-[close]","actionItemGroups":[{"actionItems":[{"id":"a-353-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-353-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859},"a-354":{"id":"a-354","title":"toggle-dropdown-[open] 2","actionItemGroups":[{"actionItems":[{"id":"a-354-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-354-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-354-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-354-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859},"a-355":{"id":"a-355","title":"toggle-dropdown-[close] 2","actionItemGroups":[{"actionItems":[{"id":"a-355-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-355-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859},"a-361":{"id":"a-361","title":"toggle-dropdown-[open] 3","actionItemGroups":[{"actionItems":[{"id":"a-361-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-361-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-361-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-361-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859},"a-362":{"id":"a-362","title":"toggle-dropdown-[close] 3","actionItemGroups":[{"actionItems":[{"id":"a-362-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-362-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859},"a-369":{"id":"a-369","title":"cj-step-1-[open]","actionItemGroups":[{"actionItems":[{"id":"a-369-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".job-sidebar-main-block.cj-step-1","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","d9201f24-94d3-8640-95fa-5addfeedda66"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-369-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.options","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","6c833a3a-b277-0e09-8f00-4f7417940d9d"]},"value":0,"unit":""}},{"id":"a-369-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".job-sidebar-main-block.cj-step-2","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","177c5459-c176-6753-f33f-839c95ce02ef"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-369-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.options","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","6c833a3a-b277-0e09-8f00-4f7417940d9d"]},"value":"none"}},{"id":"a-369-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".job-sidebar-main-block.cj-step-2","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","177c5459-c176-6753-f33f-839c95ce02ef"]},"value":"none"}},{"id":"a-369-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".job-sidebar-main-block.cj-step-1","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","d9201f24-94d3-8640-95fa-5addfeedda66"]},"value":"flex"}}]},{"actionItems":[{"id":"a-369-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".job-sidebar-main-block.cj-step-1","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","d9201f24-94d3-8640-95fa-5addfeedda66"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-367":{"id":"a-367","title":"cj-options-[open]","actionItemGroups":[{"actionItems":[{"id":"a-367-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.cj-step-1","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","d9201f24-94d3-8640-95fa-5addfeedda66"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-367-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.cj-step-1","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","d9201f24-94d3-8640-95fa-5addfeedda66"]},"value":"none"}},{"id":"a-367-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".job-sidebar-main-block.options","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","6c833a3a-b277-0e09-8f00-4f7417940d9d"]},"value":"flex"}}]},{"actionItems":[{"id":"a-367-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".job-sidebar-main-block.options","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","6c833a3a-b277-0e09-8f00-4f7417940d9d"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694899619373},"a-368":{"id":"a-368","title":"cj-step-2-[open]","actionItemGroups":[{"actionItems":[{"id":"a-368-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".job-sidebar-main-block.cj-step-2","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","177c5459-c176-6753-f33f-839c95ce02ef"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-368-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.cj-step-1","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","d9201f24-94d3-8640-95fa-5addfeedda66"]},"value":0,"unit":""}},{"id":"a-368-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".job-sidebar-main-block.cj-step-3","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","2b82ad7a-6da5-a265-dcf6-021aa93cfecd"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-368-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.cj-step-1","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","d9201f24-94d3-8640-95fa-5addfeedda66"]},"value":"none"}},{"id":"a-368-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".job-sidebar-main-block.cj-step-3","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","2b82ad7a-6da5-a265-dcf6-021aa93cfecd"]},"value":"none"}},{"id":"a-368-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".job-sidebar-main-block.cj-step-2","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","177c5459-c176-6753-f33f-839c95ce02ef"]},"value":"flex"}}]},{"actionItems":[{"id":"a-368-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".job-sidebar-main-block.cj-step-2","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","177c5459-c176-6753-f33f-839c95ce02ef"]},"value":1,"unit":""}},{"id":"a-368-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cj-back-btn-green","selectorGuids":["f9413c1e-9a96-5447-d22b-a3c829986d5c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-370":{"id":"a-370","title":"cj-step-3-[open]","actionItemGroups":[{"actionItems":[{"id":"a-370-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".job-sidebar-main-block.cj-step-3","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","2b82ad7a-6da5-a265-dcf6-021aa93cfecd"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-370-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.cj-step-2","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","177c5459-c176-6753-f33f-839c95ce02ef"]},"value":0,"unit":""}},{"id":"a-370-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".job-sidebar-main-block.cj-step-4","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","f6c1faed-6ec1-7795-7c7d-65b150a450cf"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-370-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.cj-step-2","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","177c5459-c176-6753-f33f-839c95ce02ef"]},"value":"none"}},{"id":"a-370-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".job-sidebar-main-block.cj-step-4","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","f6c1faed-6ec1-7795-7c7d-65b150a450cf"]},"value":"none"}},{"id":"a-370-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".job-sidebar-main-block.cj-step-3","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","2b82ad7a-6da5-a265-dcf6-021aa93cfecd"]},"value":"flex"}}]},{"actionItems":[{"id":"a-370-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".job-sidebar-main-block.cj-step-3","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","2b82ad7a-6da5-a265-dcf6-021aa93cfecd"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-371":{"id":"a-371","title":"cj-step-4-[open]","actionItemGroups":[{"actionItems":[{"id":"a-371-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".job-sidebar-main-block.cj-step-4","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","f6c1faed-6ec1-7795-7c7d-65b150a450cf"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-371-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.cj-step-3","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","2b82ad7a-6da5-a265-dcf6-021aa93cfecd"]},"value":0,"unit":""}},{"id":"a-371-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".job-sidebar-main-block.cj-step-5","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","26709395-828e-054f-90f8-aff73933adf5"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-371-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.cj-step-3","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","2b82ad7a-6da5-a265-dcf6-021aa93cfecd"]},"value":"none"}},{"id":"a-371-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".job-sidebar-main-block.cj-step-5","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","26709395-828e-054f-90f8-aff73933adf5"]},"value":"none"}},{"id":"a-371-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".job-sidebar-main-block.cj-step-4","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","f6c1faed-6ec1-7795-7c7d-65b150a450cf"]},"value":"flex"}}]},{"actionItems":[{"id":"a-371-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".job-sidebar-main-block.cj-step-4","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","f6c1faed-6ec1-7795-7c7d-65b150a450cf"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-372":{"id":"a-372","title":"cj-step-5-[open]","actionItemGroups":[{"actionItems":[{"id":"a-372-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".job-sidebar-main-block.cj-step-5","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","26709395-828e-054f-90f8-aff73933adf5"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-372-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.cj-step-4","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","f6c1faed-6ec1-7795-7c7d-65b150a450cf"]},"value":0,"unit":""}},{"id":"a-372-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".job-sidebar-main-block.success","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","8e6e0fa8-9c14-a19a-d759-4ad8137a7c01"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-372-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.cj-step-4","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","f6c1faed-6ec1-7795-7c7d-65b150a450cf"]},"value":"none"}},{"id":"a-372-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".job-sidebar-main-block.success","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","8e6e0fa8-9c14-a19a-d759-4ad8137a7c01"]},"value":"none"}},{"id":"a-372-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".job-sidebar-main-block.cj-step-5","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","26709395-828e-054f-90f8-aff73933adf5"]},"value":"flex"}}]},{"actionItems":[{"id":"a-372-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".job-sidebar-main-block.cj-step-5","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","26709395-828e-054f-90f8-aff73933adf5"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-373":{"id":"a-373","title":"cj-step-success-[open]","actionItemGroups":[{"actionItems":[{"id":"a-373-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".job-sidebar-main-block.success","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","8e6e0fa8-9c14-a19a-d759-4ad8137a7c01"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-373-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.cj-step-5","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","26709395-828e-054f-90f8-aff73933adf5"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-373-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.cj-step-5","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","26709395-828e-054f-90f8-aff73933adf5"]},"value":"none"}},{"id":"a-373-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".job-sidebar-main-block.success","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","8e6e0fa8-9c14-a19a-d759-4ad8137a7c01"]},"value":"flex"}}]},{"actionItems":[{"id":"a-373-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".job-sidebar-main-block.success","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","8e6e0fa8-9c14-a19a-d759-4ad8137a7c01"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-392":{"id":"a-392","title":"cj-options-[open] green-options","actionItemGroups":[{"actionItems":[{"id":"a-392-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-392-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":"none"}},{"id":"a-392-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".job-sidebar-main-block.options","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","6c833a3a-b277-0e09-8f00-4f7417940d9d"]},"value":"block"}}]},{"actionItems":[{"id":"a-392-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".job-sidebar-main-block.options","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","6c833a3a-b277-0e09-8f00-4f7417940d9d"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694899619373},"a-391":{"id":"a-391","title":"green-step-2","actionItemGroups":[{"actionItems":[{"id":"a-391-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-391-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":0,"unit":""}},{"id":"a-391-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-391-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":"none"}},{"id":"a-391-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":"none"}},{"id":"a-391-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":"block"}}]},{"actionItems":[{"id":"a-391-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-389":{"id":"a-389","title":"cj-step-1-[open] green house","actionItemGroups":[{"actionItems":[{"id":"a-389-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-389-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":"block"}},{"id":"a-389-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":400,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.options","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","6c833a3a-b277-0e09-8f00-4f7417940d9d"]},"value":0,"unit":""}},{"id":"a-389-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.options","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","6c833a3a-b277-0e09-8f00-4f7417940d9d"]},"value":"none"}}]},{"actionItems":[{"id":"a-389-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-390":{"id":"a-390","title":"cj-options-[open] green","actionItemGroups":[{"actionItems":[{"id":"a-390-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-390-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":"none"}},{"id":"a-390-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":"block"}}]},{"actionItems":[{"id":"a-390-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694899619373},"a-395":{"id":"a-395","title":"green-step-3","actionItemGroups":[{"actionItems":[{"id":"a-395-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-395-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":0,"unit":""}},{"id":"a-395-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-395-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":"none"}},{"id":"a-395-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":"none"}},{"id":"a-395-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":"block"}}]},{"actionItems":[{"id":"a-395-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-394":{"id":"a-394","title":"cj-step-1-[open] green-house","actionItemGroups":[{"actionItems":[{"id":"a-394-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-394-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":0,"unit":""}},{"id":"a-394-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-394-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":"none"}},{"id":"a-394-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":"none"}},{"id":"a-394-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":"block"}}]},{"actionItems":[{"id":"a-394-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-393":{"id":"a-393","title":"cj-step-3-[open] green house","actionItemGroups":[{"actionItems":[{"id":"a-393-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".green-house-step-4","selectorGuids":["41685686-f36a-ff8a-a1ab-c42ed6038bdc"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-393-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":0,"unit":""}},{"id":"a-393-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".job-sidebar-main-block.cj-step-4","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","f6c1faed-6ec1-7795-7c7d-65b150a450cf"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-393-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":"none"}},{"id":"a-393-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".job-sidebar-main-block.cj-step-4","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","f6c1faed-6ec1-7795-7c7d-65b150a450cf"]},"value":"none"}},{"id":"a-393-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-4","selectorGuids":["41685686-f36a-ff8a-a1ab-c42ed6038bdc"]},"value":"flex"}}]},{"actionItems":[{"id":"a-393-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-4","selectorGuids":["41685686-f36a-ff8a-a1ab-c42ed6038bdc"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-396":{"id":"a-396","title":"back to green step-3","actionItemGroups":[{"actionItems":[{"id":"a-396-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-396-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":0,"unit":""}},{"id":"a-396-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-4","selectorGuids":["41685686-f36a-ff8a-a1ab-c42ed6038bdc"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-396-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":"none"}},{"id":"a-396-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-4","selectorGuids":["41685686-f36a-ff8a-a1ab-c42ed6038bdc"]},"value":"none"}},{"id":"a-396-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":"flex"}}]},{"actionItems":[{"id":"a-396-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-397":{"id":"a-397","title":"cj-step-4-[open] green house step 5","actionItemGroups":[{"actionItems":[{"id":"a-397-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".green-house-step-5","selectorGuids":["44631e14-8204-3e0d-5b68-ad9be18a8bc1"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-397-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":0,"unit":""}},{"id":"a-397-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-4","selectorGuids":["41685686-f36a-ff8a-a1ab-c42ed6038bdc"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-397-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":"none"}},{"id":"a-397-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-4","selectorGuids":["41685686-f36a-ff8a-a1ab-c42ed6038bdc"]},"value":"none"}},{"id":"a-397-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-5","selectorGuids":["44631e14-8204-3e0d-5b68-ad9be18a8bc1"]},"value":"flex"}}]},{"actionItems":[{"id":"a-397-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-5","selectorGuids":["44631e14-8204-3e0d-5b68-ad9be18a8bc1"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-399":{"id":"a-399","title":"cj-step-3-[open]  greeen house","actionItemGroups":[{"actionItems":[{"id":"a-399-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".green-house-step-4","selectorGuids":["41685686-f36a-ff8a-a1ab-c42ed6038bdc"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-399-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.cj-step-2","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","177c5459-c176-6753-f33f-839c95ce02ef"]},"value":0,"unit":""}},{"id":"a-399-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-5","selectorGuids":["44631e14-8204-3e0d-5b68-ad9be18a8bc1"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-399-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.cj-step-2","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","177c5459-c176-6753-f33f-839c95ce02ef"]},"value":"none"}},{"id":"a-399-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-5","selectorGuids":["44631e14-8204-3e0d-5b68-ad9be18a8bc1"]},"value":"none"}},{"id":"a-399-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-4","selectorGuids":["41685686-f36a-ff8a-a1ab-c42ed6038bdc"]},"value":"flex"}}]},{"actionItems":[{"id":"a-399-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-4","selectorGuids":["41685686-f36a-ff8a-a1ab-c42ed6038bdc"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-398":{"id":"a-398","title":"cj-step-5-[open] green-house\\\\","actionItemGroups":[{"actionItems":[{"id":"a-398-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".job-sidebar-main-block.cj-step-5","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","26709395-828e-054f-90f8-aff73933adf5"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-398-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".green-house-step-5","selectorGuids":["44631e14-8204-3e0d-5b68-ad9be18a8bc1"]},"value":0,"unit":""}},{"id":"a-398-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".job-sidebar-main-block.success","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","8e6e0fa8-9c14-a19a-d759-4ad8137a7c01"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-398-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".green-house-step-5","selectorGuids":["44631e14-8204-3e0d-5b68-ad9be18a8bc1"]},"value":"none"}},{"id":"a-398-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".job-sidebar-main-block.success","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","8e6e0fa8-9c14-a19a-d759-4ad8137a7c01"]},"value":"none"}},{"id":"a-398-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".job-sidebar-main-block.cj-step-5","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","26709395-828e-054f-90f8-aff73933adf5"]},"value":"flex"}}]},{"actionItems":[{"id":"a-398-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".job-sidebar-main-block.cj-step-5","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","26709395-828e-054f-90f8-aff73933adf5"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-400":{"id":"a-400","title":"cj-step-1-[open] indeed","actionItemGroups":[{"actionItems":[{"id":"a-400-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-400-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":"block"}},{"id":"a-400-n-13","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".connect-green-btn-lever","selectorGuids":["37caf3bd-ff19-5511-9b5a-5d16bbee8879"]},"value":"none"}},{"id":"a-400-n-12","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".fw-semibold.lever","selectorGuids":["69827f32-aeaa-fa9d-a591-6700658a8feb","d4eea68b-5eca-9f3f-d669-02e95e837de9"]},"value":"none"}},{"id":"a-400-n-11","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cj-continue-btn.indeed-btn","selectorGuids":["62ba9a8d-4649-ed80-b9a9-807ee418c535","55231887-f746-e1cb-3877-5a229201d9eb"]},"value":"block"}},{"id":"a-400-n-10","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cj-continue-btn","selectorGuids":["62ba9a8d-4649-ed80-b9a9-807ee418c535"]},"value":"none"}},{"id":"a-400-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".fw-semibold.green-house","selectorGuids":["69827f32-aeaa-fa9d-a591-6700658a8feb","c50cfc6f-8a58-c40c-5dc8-9c85f0ec99d4"]},"value":"none"}},{"id":"a-400-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".fw-semibold.indeed","selectorGuids":["69827f32-aeaa-fa9d-a591-6700658a8feb","ca6b01e2-05a8-a7a7-c34f-3d43ecd94e7a"]},"value":"block"}},{"id":"a-400-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".connect-green-btn-blue","selectorGuids":["3e1aeba0-2b84-3c1e-3b43-eb8840661784"]},"value":"flex"}},{"id":"a-400-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".connect-green-btn","selectorGuids":["5c3789b4-d72c-76ed-a675-24ff4018589e"]},"value":"none"}},{"id":"a-400-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":400,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.options","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","6c833a3a-b277-0e09-8f00-4f7417940d9d"]},"value":0,"unit":""}},{"id":"a-400-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.options","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","6c833a3a-b277-0e09-8f00-4f7417940d9d"]},"value":"none"}}]},{"actionItems":[{"id":"a-400-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-401":{"id":"a-401","title":"cj-step-1-[open] lever","actionItemGroups":[{"actionItems":[{"id":"a-401-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-401-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":"block"}},{"id":"a-401-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cj-continue-btn.lever-btn","selectorGuids":["62ba9a8d-4649-ed80-b9a9-807ee418c535","772c19c5-76ed-231a-26bd-d9c9d19d0855"]},"value":"block"}},{"id":"a-401-n-13","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cj-continue-btn.indeed-btn","selectorGuids":["62ba9a8d-4649-ed80-b9a9-807ee418c535","55231887-f746-e1cb-3877-5a229201d9eb"]},"value":"none"}},{"id":"a-401-n-12","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cj-continue-btn","selectorGuids":["62ba9a8d-4649-ed80-b9a9-807ee418c535"]},"value":"none"}},{"id":"a-401-n-11","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".connect-green-btn-lever","selectorGuids":["37caf3bd-ff19-5511-9b5a-5d16bbee8879"]},"value":"flex"}},{"id":"a-401-n-10","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".fw-semibold.lever","selectorGuids":["69827f32-aeaa-fa9d-a591-6700658a8feb","d4eea68b-5eca-9f3f-d669-02e95e837de9"]},"value":"block"}},{"id":"a-401-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".fw-semibold.green-house","selectorGuids":["69827f32-aeaa-fa9d-a591-6700658a8feb","c50cfc6f-8a58-c40c-5dc8-9c85f0ec99d4"]},"value":"none"}},{"id":"a-401-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".fw-semibold.indeed","selectorGuids":["69827f32-aeaa-fa9d-a591-6700658a8feb","ca6b01e2-05a8-a7a7-c34f-3d43ecd94e7a"]},"value":"none"}},{"id":"a-401-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".connect-green-btn-blue","selectorGuids":["3e1aeba0-2b84-3c1e-3b43-eb8840661784"]},"value":"none"}},{"id":"a-401-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".connect-green-btn","selectorGuids":["5c3789b4-d72c-76ed-a675-24ff4018589e"]},"value":"none"}},{"id":"a-401-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":400,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.options","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","6c833a3a-b277-0e09-8f00-4f7417940d9d"]},"value":0,"unit":""}},{"id":"a-401-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.options","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","6c833a3a-b277-0e09-8f00-4f7417940d9d"]},"value":"none"}}]},{"actionItems":[{"id":"a-401-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-402":{"id":"a-402","title":"cj-step-1-[open] workday","actionItemGroups":[{"actionItems":[{"id":"a-402-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-402-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":"block"}},{"id":"a-402-n-13","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".connect-green-btn-workday","selectorGuids":["fcc37e3b-90ca-8032-90ea-bea8b65eda80"]},"value":"flex"}},{"id":"a-402-n-12","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".fw-semibold.workday","selectorGuids":["69827f32-aeaa-fa9d-a591-6700658a8feb","3d67b3e6-f070-7294-cbb5-ec1ae975817b"]},"value":"block"}},{"id":"a-402-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".connect-green-btn-lever","selectorGuids":["37caf3bd-ff19-5511-9b5a-5d16bbee8879"]},"value":"none"}},{"id":"a-402-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".fw-semibold.lever","selectorGuids":["69827f32-aeaa-fa9d-a591-6700658a8feb","d4eea68b-5eca-9f3f-d669-02e95e837de9"]},"value":"none"}},{"id":"a-402-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".fw-semibold.green-house","selectorGuids":["69827f32-aeaa-fa9d-a591-6700658a8feb","c50cfc6f-8a58-c40c-5dc8-9c85f0ec99d4"]},"value":"none"}},{"id":"a-402-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".fw-semibold.indeed","selectorGuids":["69827f32-aeaa-fa9d-a591-6700658a8feb","ca6b01e2-05a8-a7a7-c34f-3d43ecd94e7a"]},"value":"none"}},{"id":"a-402-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".connect-green-btn-blue","selectorGuids":["3e1aeba0-2b84-3c1e-3b43-eb8840661784"]},"value":"none"}},{"id":"a-402-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".connect-green-btn","selectorGuids":["5c3789b4-d72c-76ed-a675-24ff4018589e"]},"value":"none"}},{"id":"a-402-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":400,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.options","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","6c833a3a-b277-0e09-8f00-4f7417940d9d"]},"value":0,"unit":""}},{"id":"a-402-n-10","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".job-sidebar-main-block.options","selectorGuids":["3ac72955-7a42-ebf2-33ee-bf18571527b5","6c833a3a-b277-0e09-8f00-4f7417940d9d"]},"value":"none"}}]},{"actionItems":[{"id":"a-402-n-11","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-405":{"id":"a-405","title":"green-step-2 -indeed","actionItemGroups":[{"actionItems":[{"id":"a-405-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-405-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":0,"unit":""}},{"id":"a-405-n-12","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".cj-continue-btn.lever-btn","selectorGuids":["62ba9a8d-4649-ed80-b9a9-807ee418c535","772c19c5-76ed-231a-26bd-d9c9d19d0855"]},"value":"none"}},{"id":"a-405-n-11","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cj-continue-btn.indeed-btn","selectorGuids":["62ba9a8d-4649-ed80-b9a9-807ee418c535","55231887-f746-e1cb-3877-5a229201d9eb"]},"value":"none"}},{"id":"a-405-n-10","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cj-continue-btn","selectorGuids":["62ba9a8d-4649-ed80-b9a9-807ee418c535"]},"value":"block"}},{"id":"a-405-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".fw-semibold.greenhouse-text","selectorGuids":["69827f32-aeaa-fa9d-a591-6700658a8feb","56dcda8a-5520-6444-3c71-6fd13052a9d3"]},"value":"none"}},{"id":"a-405-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".fw-semibold.indeed-text","selectorGuids":["69827f32-aeaa-fa9d-a591-6700658a8feb","9fa08fd1-fcff-b80f-16ca-4882cc86b26f"]},"value":"block"}},{"id":"a-405-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-405-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":"none"}},{"id":"a-405-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":"none"}},{"id":"a-405-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":"block"}}]},{"actionItems":[{"id":"a-405-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373},"a-406":{"id":"a-406","title":"green-step-2 -lever","actionItemGroups":[{"actionItems":[{"id":"a-406-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-406-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":0,"unit":""}},{"id":"a-406-n-13","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cj-continue-btn.lever-btn","selectorGuids":["62ba9a8d-4649-ed80-b9a9-807ee418c535","772c19c5-76ed-231a-26bd-d9c9d19d0855"]},"value":"none"}},{"id":"a-406-n-12","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".fw-semibold.lever-text","selectorGuids":["69827f32-aeaa-fa9d-a591-6700658a8feb","b72c1408-373d-a5c9-e343-c611d6303960"]},"value":"block"}},{"id":"a-406-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cj-continue-btn.indeed-btn","selectorGuids":["62ba9a8d-4649-ed80-b9a9-807ee418c535","55231887-f746-e1cb-3877-5a229201d9eb"]},"value":"none"}},{"id":"a-406-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".cj-continue-btn","selectorGuids":["62ba9a8d-4649-ed80-b9a9-807ee418c535"]},"value":"block"}},{"id":"a-406-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".fw-semibold.greenhouse-text","selectorGuids":["69827f32-aeaa-fa9d-a591-6700658a8feb","56dcda8a-5520-6444-3c71-6fd13052a9d3"]},"value":"none"}},{"id":"a-406-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".fw-semibold.indeed-text","selectorGuids":["69827f32-aeaa-fa9d-a591-6700658a8feb","9fa08fd1-fcff-b80f-16ca-4882cc86b26f"]},"value":"none"}},{"id":"a-406-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-406-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".green-house-step-1","selectorGuids":["6d80dd4c-c186-8cfb-2de9-263b5f12248d"]},"value":"none"}},{"id":"a-406-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-3","selectorGuids":["16e66835-5424-a2e8-e33e-a4b27075202c"]},"value":"none"}},{"id":"a-406-n-10","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":"block"}}]},{"actionItems":[{"id":"a-406-n-11","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".green-house-step-2","selectorGuids":["333e9022-8e84-0c50-a4a2-6278f461aae1"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694899619373}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CreateNewJobDrawer({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  slotNewJobStep,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "sidebar-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "text-lg", "fw-semibold", "color-black")}
        tag="div"
      >
        {"Create New Job"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "job-sidebar-wrapper")}
        tag="div"
      >
        {slotNewJobStep ?? (
          <>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "hide")}
              value="%3Cstyle%3E%0A.job-sidebar-wrapper%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A.job-sidebar-wrapper%20%7B%0A%20%20-ms-overflow-style%3A%20none%3B%0A%20%20scrollbar-width%3A%20none%3B%0A%7D%0A%3C%2Fstyle%3E"
            />
            <NewJobStep1 />
            <_Builtin.Block
              className={_utils.cx(_styles, "green-house-step-1")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-top-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold", "green-house")}
                  tag="div"
                >
                  {"Connect to your Green House account "}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold", "indeed")}
                  tag="div"
                >
                  {"Connect to your Indeed account "}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold", "lever")}
                  tag="div"
                >
                  {"Connect to your Lever account "}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold", "workday")}
                  tag="div"
                >
                  {"Connect to your Workday account "}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-main-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "connect-green-wrapper")}
                  tag="div"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "connect-green-btn")}
                    button={false}
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons-web")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2232%22%20viewbox%3D%220%200%2016%2032%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_8946_292751)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M8.26559%2031.4574C4.15186%2031.5176%200.797598%2027.9891%200.874748%2023.912C0.907347%2021.951%201.7129%2020.0821%203.11619%2018.7119C4.51948%2017.3417%206.40701%2016.581%208.36822%2016.5953C12.2866%2016.6059%2015.5673%2019.9688%2015.638%2023.8908C15.7131%2028.0457%2012.288%2031.5211%208.26559%2031.4574ZM14.3137%2024.0734C14.3385%2020.7056%2011.646%2017.9564%208.29744%2017.9309C4.94884%2017.9055%202.21957%2020.6136%202.19126%2023.9807C2.17389%2025.5989%202.79982%2027.1579%203.93145%2028.3147C5.06307%2029.4716%206.60777%2030.1318%208.22596%2030.1501C11.5378%2030.1918%2014.289%2027.4455%2014.3137%2024.0734ZM0.889612%208.95081C0.883077%208.14682%201.03563%207.34948%201.3385%206.6047C1.64136%205.85991%202.08855%205.18239%202.65432%204.61115C3.22009%204.0399%203.89326%203.58621%204.63507%203.2762C5.37689%202.96619%206.1727%202.80597%206.97669%202.80479C10.3175%202.79842%2013.0694%205.55751%2013.0744%208.91754C13.08%2012.3257%2010.3713%2015.0848%207.01066%2015.0947C3.60049%2015.1039%200.899521%2012.3915%200.889612%208.95081ZM2.22806%208.91258C2.22197%209.53578%202.33869%2010.1541%202.57155%2010.7322C2.8044%2011.3103%203.14884%2011.8368%203.58519%2012.2818C4.02154%2012.7268%204.54126%2013.0814%205.11467%2013.3256C5.68808%2013.5697%206.30396%2013.6984%206.92714%2013.7045C7.55032%2013.7106%208.1686%2013.5939%208.74668%2013.361C9.32475%2013.1282%209.8513%2012.7837%2010.2963%2012.3474C10.7412%2011.911%2011.0959%2011.3913%2011.34%2010.8178C11.5841%2010.2444%2011.7129%209.62851%2011.7189%209.00531C11.7359%206.34885%209.63377%204.18292%207.01916%204.16168C4.3911%204.14328%202.24859%206.26674%202.22806%208.91258ZM10.578%201.24192C10.5802%200.91133%2010.7137%200.595179%2010.9491%200.363013C11.0656%200.248056%2011.2036%200.157178%2011.3553%200.095567C11.5069%200.0339563%2011.6692%200.00281976%2011.8329%200.00393519C11.9966%200.00505062%2012.1585%200.0383961%2012.3092%200.102068C12.46%200.16574%2012.5968%200.258491%2012.7118%200.375025C12.8267%200.49156%2012.9176%200.629596%2012.9792%200.781252C13.0408%200.932908%2013.072%201.09521%2013.0708%201.2589C13.0726%201.42424%2013.0414%201.58826%2012.9789%201.74134C12.9164%201.89442%2012.824%202.03347%2012.707%202.15032C12.59%202.26717%2012.4509%202.35946%2012.2977%202.42177C12.1446%202.48408%2011.9805%202.51515%2011.8152%202.51316C11.1145%202.50821%2010.578%201.95611%2010.578%201.24192Z%22%20fill%3D%22%2338B2A7%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cclippath%20id%3D%22clip0_8946_292751%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2216%22%20height%3D%2231.5219%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2Fclippath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                    />
                    <_Builtin.Block tag="div">
                      {"Connect to Green House "}
                    </_Builtin.Block>
                  </_Builtin.Link>
                  <_Builtin.Link
                    className={_utils.cx(_styles, "connect-green-btn-blue")}
                    button={false}
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Image
                      className={_utils.cx(_styles, "indeed-logo")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt="__wf_reserved_inherit"
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890227_SVGmix-XJma8a-indeed-member%201.svg"
                    />
                    <_Builtin.Block tag="div">
                      {"Connect to Indeed "}
                    </_Builtin.Block>
                  </_Builtin.Link>
                  <_Builtin.Link
                    className={_utils.cx(_styles, "connect-green-btn-lever")}
                    button={false}
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Image
                      className={_utils.cx(_styles, "indeed-logo")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt="__wf_reserved_inherit"
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890228_lever_rgb_logo_standard%201.svg"
                    />
                    <_Builtin.Block tag="div">
                      {"Connect to Lever "}
                    </_Builtin.Block>
                  </_Builtin.Link>
                  <_Builtin.Link
                    className={_utils.cx(_styles, "connect-green-btn-workday")}
                    button={false}
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Image
                      className={_utils.cx(_styles, "indeed-logo")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt="__wf_reserved_inherit"
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890229_image%201.svg"
                    />
                    <_Builtin.Block tag="div">
                      {"Connect to Workday "}
                    </_Builtin.Block>
                  </_Builtin.Link>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "pd-200")}
                  tag="div"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-bottom-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-form-overlay")}
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-bottom-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-controls-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-back-btn")}
                      data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7cf2"
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon")}
                        value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.79724%2013.8128C6.06169%2013.5566%206.06839%2013.1346%205.8122%2012.8701C5.8122%2012.8701%203.56876%2010.5544%202.38633%209.33398H15.3334C15.7016%209.33398%2016%209.03551%2016%208.66732C16%208.29913%2015.7016%208.00065%2015.3334%208.00065H2.27618L5.80478%204.47206C6.06513%204.21171%206.06513%203.7896%205.80478%203.52925C5.54443%203.2689%205.12232%203.2689%204.86197%203.52925L0.728636%207.66258C0.20162%208.1896%200.20162%209.01171%200.728636%209.53872L4.85455%2013.7978C5.11073%2014.0623%205.53279%2014.069%205.79724%2013.8128Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
                      />
                      <_Builtin.Block tag="div">{"Back"}</_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block tag="div">
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-continue-btn")}
                        data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7cf7"
                        tag="div"
                      >
                        <ButtonPrimaryLarge textLabel="Continue" />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cj-continue-btn",
                          "indeed-btn"
                        )}
                        data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7cf9"
                        tag="div"
                      >
                        <ButtonPrimaryLarge textLabel="Continue" />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cj-continue-btn",
                          "lever-btn"
                        )}
                        data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7cfb"
                        tag="div"
                      >
                        <ButtonPrimaryLarge textLabel="Continue" />
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-progress-bar-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "cj-blue-progress-indicator",
                        "cj-step-1"
                      )}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-steps-info-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "fw-semibold",
                        "text-grey-600"
                      )}
                      tag="div"
                    >
                      {"Step 1 of 5"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "green-house-step-2")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-top-block-green")}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "fw-semibold",
                      "greenhouse-text"
                    )}
                    tag="div"
                  >
                    {"Connected to Green House Successfully "}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold", "indeed-text")}
                    tag="div"
                  >
                    {"Connected to Indeed Successfully "}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold", "lever-text")}
                    tag="div"
                  >
                    {"Connected to Lever Successfully "}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "fw-semibold",
                      "workday-text"
                    )}
                    tag="div"
                  >
                    {"Connected to Workday Successfully "}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "success-icon")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M20%200C8.96667%200%200%208.96667%200%2020C0%2031.0333%208.96667%2040%2020%2040C31.0333%2040%2040%2031.0333%2040%2020C40%208.96667%2031.0333%200%2020%200ZM31.4663%2016.4695L19.7996%2028.1362C19.3996%2028.5362%2018.8663%2028.7362%2018.3329%2028.7362C17.7996%2028.7362%2017.2663%2028.5362%2016.8663%2028.1362L10.1996%2021.4695C9.39961%2020.6695%209.39961%2019.3362%2010.1996%2018.5362C10.9996%2017.7362%2012.3329%2017.7362%2013.1329%2018.5362L18.3329%2023.7362L28.5329%2013.5362C29.3329%2012.7362%2030.6663%2012.7362%2031.4663%2013.5362C32.2996%2014.3362%2032.2996%2015.6695%2031.4663%2016.4695Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-main-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "select-green-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">{"Select one Job"}</_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "job-green-card")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "company-logo-job")}
                      tag="div"
                    >
                      <_Builtin.Image
                        className={_utils.cx(_styles, "job-logo-image")}
                        loading="eager"
                        width="auto"
                        height="auto"
                        alt="__wf_reserved_inherit"
                        src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890226_google%20logo.svg"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "job-right-wrappers")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "fw-semibold")}
                        tag="div"
                      >
                        {"Product Manager"}
                      </_Builtin.Block>
                      <_Builtin.Block tag="div">{"Google"}</_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "job-green-card")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "company-logo-job")}
                      tag="div"
                    >
                      <_Builtin.Image
                        className={_utils.cx(_styles, "job-logo-image")}
                        loading="eager"
                        width="auto"
                        height="auto"
                        alt="__wf_reserved_inherit"
                        src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec43089022f_Nike%20-%20png.svg"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "job-right-wrappers")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "fw-semibold")}
                        tag="div"
                      >
                        {"Sales Manager"}
                      </_Builtin.Block>
                      <_Builtin.Block tag="div">{"Nike"}</_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "job-green-card")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "company-logo-job")}
                      tag="div"
                    >
                      <_Builtin.Image
                        className={_utils.cx(_styles, "job-logo-image")}
                        loading="eager"
                        width="auto"
                        height="auto"
                        alt="__wf_reserved_inherit"
                        src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890230_Microsoft%20-%20png.svg"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "job-right-wrappers")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "fw-semibold")}
                        tag="div"
                      >
                        {"Software Developer"}
                      </_Builtin.Block>
                      <_Builtin.Block tag="div">{"Microsoft"}</_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "job-green-card")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "company-logo-job")}
                      tag="div"
                    >
                      <_Builtin.Image
                        className={_utils.cx(_styles, "job-logo-image")}
                        loading="eager"
                        width="auto"
                        height="auto"
                        alt="__wf_reserved_inherit"
                        src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890231_image%2017.svg"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "job-right-wrappers")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "fw-semibold")}
                        tag="div"
                      >
                        {"Ui Designer"}
                      </_Builtin.Block>
                      <_Builtin.Block tag="div">{"MiniClip"}</_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "pd-200")}
                  tag="div"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-bottom-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-form-overlay")}
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-bottom-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-controls-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-back-btn")}
                      data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7d37"
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon")}
                        value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.79724%2013.8128C6.06169%2013.5566%206.06839%2013.1346%205.8122%2012.8701C5.8122%2012.8701%203.56876%2010.5544%202.38633%209.33398H15.3334C15.7016%209.33398%2016%209.03551%2016%208.66732C16%208.29913%2015.7016%208.00065%2015.3334%208.00065H2.27618L5.80478%204.47206C6.06513%204.21171%206.06513%203.7896%205.80478%203.52925C5.54443%203.2689%205.12232%203.2689%204.86197%203.52925L0.728636%207.66258C0.20162%208.1896%200.20162%209.01171%200.728636%209.53872L4.85455%2013.7978C5.11073%2014.0623%205.53279%2014.069%205.79724%2013.8128Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
                      />
                      <_Builtin.Block tag="div">{"Back"}</_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-continue-btn")}
                      data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7d3b"
                      tag="div"
                    >
                      <ButtonPrimaryLarge textLabel="Continue" />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-progress-bar-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "cj-blue-progress-indicator",
                        "cj-step-1"
                      )}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-steps-info-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "fw-semibold",
                        "text-grey-600"
                      )}
                      tag="div"
                    >
                      {"Step 1 of 5"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "green-house-step-3")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-top-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-sm",
                    "fw-semibold",
                    "text-grey-600"
                  )}
                  tag="div"
                >
                  {"Step 2: Describe The Role"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Help candidates understand what the role involves."}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-main-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-input-wrapper", "pb-200")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">{"Job Description"}</_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-richtext-editor-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-richtext-cotrols")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-rt-paragraph")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "medium-default-11")}
                          tag="div"
                        >
                          {"Paragraph"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "chevron-down---16px-icon"
                          )}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "vectors-wrapper-31")}
                            loading="lazy"
                            width={11.00003719329834}
                            height={5.00001859664917}
                            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504043394863d835c0a86cc_Vectors-Wrapper.svg"
                          />
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-rt-controls-block")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cj-rt-control-icon")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icon")}
                            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%201.5C3%201.22386%203.22386%201%203.5%201H7C9.17614%201%2011%202.82386%2011%205C11%206.31462%2010.3344%207.50068%209.32761%208.23374C10.87%208.79245%2012%2010.2871%2012%2012C12%2014.1761%2010.1761%2016%208%2016H3.5C3.22386%2016%203%2015.7761%203%2015.5V8.5V1.5ZM4%208H7C8.62386%208%2010%206.62386%2010%205C10%203.37614%208.62386%202%207%202H4V8ZM4%209V15H8C9.62386%2015%2011%2013.6239%2011%2012C11%2010.3761%209.62386%209%208%209H7H4Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cj-rt-control-icon")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icon")}
                            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.5%202.0001H8.38151L5.59579%2015.0001H4.5C4.22386%2015.0001%204%2015.224%204%2015.5001C4%2015.7762%204.22386%2016.0001%204.5%2016.0001H5.99031C5.99712%2016.0002%206.0039%2016.0002%206.01067%2016.0001H7.5C7.77614%2016.0001%208%2015.7762%208%2015.5001C8%2015.224%207.77614%2015.0001%207.5%2015.0001H6.61849L9.40421%202.0001H10.5C10.7761%202.0001%2011%201.77625%2011%201.5001C11%201.22396%2010.7761%201.0001%2010.5%201.0001H9.00965C9.00287%200.999965%208.99611%200.999966%208.98937%201.0001H7.5C7.22386%201.0001%207%201.22396%207%201.5001C7%201.77625%207.22386%202.0001%207.5%202.0001Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cj-rt-control-icon")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icon")}
                            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.5%2016C2.22386%2016%202%2015.7761%202%2015.5C2%2015.2239%202.22386%2015%202.5%2015H12.5C12.7761%2015%2013%2015.2239%2013%2015.5C13%2015.7761%2012.7761%2016%2012.5%2016H2.5ZM3%201.5C3%201.22386%203.22386%201%203.5%201C3.77614%201%204%201.22386%204%201.5V9.5C4%2011.4239%205.57614%2013%207.5%2013C9.42386%2013%2011%2011.4239%2011%209.5V1.5C11%201.22386%2011.2239%201%2011.5%201C11.7761%201%2012%201.22386%2012%201.5V9.5C12%2011.9761%209.97614%2014%207.5%2014C5.02386%2014%203%2011.9761%203%209.5V1.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cj-rt-control-icon")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icon")}
                            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M11.6464%205.85369C11.4512%205.65842%2011.4512%205.34184%2011.6464%205.14658C11.8417%204.95132%2012.1583%204.95132%2012.3536%205.14658L14.4536%207.24658C14.8488%207.64184%2014.8488%208.25842%2014.4617%208.64537L12.3617%2010.8454C12.171%2011.0451%2011.8545%2011.0525%2011.6548%2010.8618C11.455%2010.6711%2011.4477%2010.3546%2011.6383%2010.1549L13.743%207.95022L11.6464%205.85369ZM4.36168%2010.1549C4.55235%2010.3546%204.54499%2010.6711%204.34524%2010.8618C4.14549%2011.0525%203.82899%2011.0451%203.63832%2010.8454L1.54645%208.65369C1.15118%208.25842%201.15118%207.64184%201.54645%207.24658L3.64645%205.14658C3.84171%204.95132%204.15829%204.95132%204.35355%205.14658C4.54882%205.34184%204.54882%205.65842%204.35355%205.85369L2.25651%207.95073C2.25794%207.95151%204.36168%2010.1549%204.36168%2010.1549ZM9.53576%202.81444C9.63832%202.55805%209.9293%202.43334%2010.1857%202.53589C10.4421%202.63845%2010.5668%202.92944%2010.4642%203.18583L6.46424%2013.1858C6.36168%2013.4422%206.0707%2013.5669%205.8143%2013.4644C5.55791%2013.3618%205.43321%2013.0708%205.53576%2012.8144L9.53576%202.81444Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-rt-controls-block")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cj-rt-control-icon")}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "vectors-wrapper-33")}
                            loading="lazy"
                            width={14}
                            height={13}
                            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/650406032fb689392940aa9d_Vectors-Wrapper.svg"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "",
                            "cj-rt-control-icon"
                          )}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "vectors-wrapper-34")}
                            loading="lazy"
                            width={13.769068717956543}
                            height={13.850000381469727}
                            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65040604bc4e5ef14157a09d_Vectors-Wrapper.svg"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "",
                            "cj-rt-control-icon"
                          )}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(
                              _styles,
                              "",
                              "vectors-wrapper-33"
                            )}
                            loading="lazy"
                            width={14}
                            height={13}
                            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65040605c8b96fcc667a74b1_Vectors-Wrapper.svg"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "",
                            "cj-rt-control-icon"
                          )}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "vectors-wrapper-32")}
                            loading="lazy"
                            width={14.25}
                            height={13}
                            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504060655c5313f7f217aa2_Vectors-Wrapper.svg"
                          />
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-rt-input-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "paragraph-wrappers")}
                        tag="div"
                      >
                        <_Builtin.Paragraph>
                          <_Builtin.Strong>
                            {"Roles and Responsibilities:"}
                          </_Builtin.Strong>
                          <br />
                          {
                            "• Utilize working experience in real-time OS and embedded systems architecture to develop and optimize software solutions."
                          }
                          <br />
                          {
                            "• Leverage expertise in wireless technologies including 2G, UMTS, CDMA, TD-SCDMA, LTE, and 5G in NSA or SA mode."
                          }
                          <br />
                          {
                            "• Understand and work with 3GPP/3GPP2 wireless protocol layers, including NAS, MAC, RLC, PDCP, RRC, IP, UDP, TCP, HTTP, routing, IMS (IR92/IR94/SIP), and more."
                          }
                          <br />
                          {
                            "• Demonstrate understanding of advanced wireless concepts such as QCRIL, Roaming, Handover, SRVCC, ECC Call, Carrier Aggregation, MIMO, TCP/UDP Throughput, Network Selection, Cell Selection architecture, and issue handling."
                          }
                          <br />
                          {
                            "• Handle GCF/PTCRB conformance and operator certification issues effectively.• Engage in wireless product development, including customer interaction, requirements analysis, feature design and implementation, issue resolution, certification, field testing, and more."
                          }
                          <br />
                          <br />
                          <_Builtin.Strong>
                            {"Skills Required:"}
                          </_Builtin.Strong>
                          <br />
                          {
                            "• Proficiency in working with real-time operating systems and embedded systems architecture."
                          }
                          <br />
                          {
                            "• Proficiency in C/C++ is preferred• Hands-on experience with wireless technologies including LTE, 4G, 5G in both NSA and SA modes."
                          }
                          <br />
                          {
                            "• Understanding of 3GPP/3GPP2 wireless protocol layers, including NAS, MAC, RLC, PDCP, RRC, IP, UDP, TCP, HTTP, routing, IMS (IR92/IR94/SIP), and more."
                          }
                          <br />
                          {
                            "• Familiarity with wireless tools like QXDM, QFill, QCAT, QSPR, and Meta-Tool."
                          }
                          <br />
                          {
                            "• Knowledge of advanced wireless concepts such as QCRIL, Roaming, Handover, SRVCC, ECC Call, Carrier Aggregation, MIMO, TCP/UDP Throughput, Network Selection, Cell Selection architecture, and issue handling."
                          }
                          <br />
                          {
                            "• Experience with GCF/PTCRB conformance and operator certification issues handling."
                          }
                          <br />
                          {
                            "• Involvement in wireless product development, including customer interaction, requirements analysis, feature design and implementation, issue resolution, certification, field testing, and more."
                          }
                          <br />
                          {
                            "• Hands-on experience with network simulators like CMW500, Anritsu, or Keysight for testing and validation."
                          }
                          <br />
                          {
                            "• Willingness to travel, especially if holding existing visas for destinations like the USA, UK, Saudi Arabia, Taiwan, or China.• Proficiency in programming using Embedded C and C++."
                          }
                        </_Builtin.Paragraph>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-rt-generate-block")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "text-kale-800")}
                          tag="div"
                        >
                          {"Generate job description with AI"}
                        </_Builtin.Block>
                        <_Builtin.Link
                          className={_utils.cx(_styles, "cj-rt-generate-btn")}
                          button={false}
                          options={{
                            href: "#",
                            target: "_blank",
                          }}
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "content-4")}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "vectors-wrapper-35"
                              )}
                              loading="lazy"
                              width={12}
                              height={13.1484375}
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65040860ccf792e624636a03_Vectors-Wrapper.svg"
                            />
                            <_Builtin.Block
                              className={_utils.cx(_styles, "label-5")}
                              tag="div"
                            >
                              {"Generate"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Link>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-skills")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-add-skill-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block tag="div">{"Skills"}</_Builtin.Block>
                      <CreateBtn />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-suggested-skills")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cj-suggested-skills-header"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          {"Suggested skills"}
                        </_Builtin.Block>
                        <_Builtin.Image
                          className={_utils.cx(_styles, "image-27")}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          alt="__wf_reserved_inherit"
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890155_Vectors-Wrapper.svg"
                        />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-skills-wrapper")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cj-suggested-skill-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "small-default-4")}
                            tag="div"
                          >
                            {"HTML"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "frame-1091")}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "vectors-wrapper-37"
                              )}
                              loading="lazy"
                              width={10}
                              height={10}
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504162c0e20c3617cb43447_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "",
                            "cj-suggested-skill-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "small-default-4"
                            )}
                            tag="div"
                          >
                            {"CSS"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "plus---12px-icon")}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "vectors-wrapper-36"
                              )}
                              loading="lazy"
                              width={8.333333969116211}
                              height={8.333333969116211}
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504162dfbd2926e27042430_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "",
                            "cj-suggested-skill-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "small-default-4"
                            )}
                            tag="div"
                          >
                            {"Javascript"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "plus---12px-icon"
                            )}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "",
                                "vectors-wrapper-36"
                              )}
                              loading="lazy"
                              width={8.333333969116211}
                              height={8.333333969116211}
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504162d2a9ec9804b855baa_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "",
                            "cj-suggested-skill-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "small-default-4"
                            )}
                            tag="div"
                          >
                            {"Python"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "plus---12px-icon"
                            )}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "",
                                "vectors-wrapper-36"
                              )}
                              loading="lazy"
                              width={8.333333969116211}
                              height={8.333333969116211}
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504162ee1cbef96bcdffc98_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "",
                            "cj-suggested-skill-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "small-default-4"
                            )}
                            tag="div"
                          >
                            {"Mysql"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "plus---12px-icon"
                            )}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "",
                                "vectors-wrapper-36"
                              )}
                              loading="lazy"
                              width={8.333333969116211}
                              height={8.333333969116211}
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504162dfbd2926e27042430_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "",
                            "cj-suggested-skill-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "small-default-4"
                            )}
                            tag="div"
                          >
                            {"Adobe photoshop"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "plus---12px-icon"
                            )}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "",
                                "vectors-wrapper-36"
                              )}
                              loading="lazy"
                              width={8.333333969116211}
                              height={8.333333969116211}
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504162d2a9ec9804b855baa_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "",
                            "cj-suggested-skill-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "small-default-4"
                            )}
                            tag="div"
                          >
                            {"Premier pro"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "plus---12px-icon"
                            )}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "",
                                "vectors-wrapper-36"
                              )}
                              loading="lazy"
                              width={8.333333969116211}
                              height={8.333333969116211}
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504162ee1cbef96bcdffc98_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "",
                            "cj-suggested-skill-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "small-default-4"
                            )}
                            tag="div"
                          >
                            {"Figma"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "plus---12px-icon"
                            )}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "",
                                "vectors-wrapper-36"
                              )}
                              loading="lazy"
                              width={8.333333969116211}
                              height={8.333333969116211}
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504162dfbd2926e27042430_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-bottom-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-form-overlay")}
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-bottom-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-controls-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-back-btn")}
                      data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7dc9"
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon")}
                        value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.79724%2013.8128C6.06169%2013.5566%206.06839%2013.1346%205.8122%2012.8701C5.8122%2012.8701%203.56876%2010.5544%202.38633%209.33398H15.3334C15.7016%209.33398%2016%209.03551%2016%208.66732C16%208.29913%2015.7016%208.00065%2015.3334%208.00065H2.27618L5.80478%204.47206C6.06513%204.21171%206.06513%203.7896%205.80478%203.52925C5.54443%203.2689%205.12232%203.2689%204.86197%203.52925L0.728636%207.66258C0.20162%208.1896%200.20162%209.01171%200.728636%209.53872L4.85455%2013.7978C5.11073%2014.0623%205.53279%2014.069%205.79724%2013.8128Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
                      />
                      <_Builtin.Block tag="div">{"Back"}</_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-continue-btn")}
                      data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7dcd"
                      tag="div"
                    >
                      <ButtonPrimaryLarge textLabel="Continue" />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-progress-bar-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "cj-blue-progress-indicator",
                        "step-2"
                      )}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-steps-info-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "fw-semibold",
                        "text-grey-600"
                      )}
                      tag="div"
                    >
                      {"Step 2 of 5"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "green-house-step-4")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-top-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-sm",
                    "fw-semibold",
                    "text-grey-600"
                  )}
                  tag="div"
                >
                  {"Step 3: Get the Word Out"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Share your job post to attract more candidates."}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-main-wrapper")}
                tag="div"
              >
                <ShareVia />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-bottom-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-form-overlay")}
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-bottom-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-controls-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-back-btn")}
                      data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7de0"
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon")}
                        value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.79724%2013.8128C6.06169%2013.5566%206.06839%2013.1346%205.8122%2012.8701C5.8122%2012.8701%203.56876%2010.5544%202.38633%209.33398H15.3334C15.7016%209.33398%2016%209.03551%2016%208.66732C16%208.29913%2015.7016%208.00065%2015.3334%208.00065H2.27618L5.80478%204.47206C6.06513%204.21171%206.06513%203.7896%205.80478%203.52925C5.54443%203.2689%205.12232%203.2689%204.86197%203.52925L0.728636%207.66258C0.20162%208.1896%200.20162%209.01171%200.728636%209.53872L4.85455%2013.7978C5.11073%2014.0623%205.53279%2014.069%205.79724%2013.8128Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
                      />
                      <_Builtin.Block tag="div">{"Back"}</_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-continue-btn")}
                      data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7de4"
                      tag="div"
                    >
                      <ButtonPrimaryLarge textLabel="Continue" />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-progress-bar-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "cj-blue-progress-indicator",
                        "cj-step-3"
                      )}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-steps-info-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "fw-semibold",
                        "text-grey-600"
                      )}
                      tag="div"
                    >
                      {"Step 3 of 5"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "green-house-step-5")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-top-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-sm",
                    "fw-semibold",
                    "text-grey-600"
                  )}
                  tag="div"
                >
                  {"Step 4: Set Up Screening Questions"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Pre-screen candidates based on essential criteria."}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-main-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-screening-questions-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "fw-semibold",
                      "text-grey-600"
                    )}
                    tag="div"
                  >
                    {"Screening Questions"}
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">
                    {
                      "These questions act as a preliminary filter to ensure that only the most suitable candidates proceed to the interview stage. Tips: Use a mix of question types for a thorough screening."
                    }
                  </_Builtin.Block>
                  <CreateBtn
                    skillText={
                      <>
                        {"Add Custom Question"}
                        <br />
                      </>
                    }
                  />
                </_Builtin.Block>
                <ToggleDropdown />
                <ToggleDropdown toggleHeading="Culture fit" />
                <ToggleDropdown toggleHeading="Personality fit" />
                <ToggleDropdown toggleHeading="Soft skills (communication, team-work, etc.)" />
                <_Builtin.Block
                  className={_utils.cx(_styles, "pd-200")}
                  tag="div"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cj-bottom-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-form-overlay")}
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-bottom-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-controls-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-back-btn")}
                      data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7e01"
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon")}
                        value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.79724%2013.8128C6.06169%2013.5566%206.06839%2013.1346%205.8122%2012.8701C5.8122%2012.8701%203.56876%2010.5544%202.38633%209.33398H15.3334C15.7016%209.33398%2016%209.03551%2016%208.66732C16%208.29913%2015.7016%208.00065%2015.3334%208.00065H2.27618L5.80478%204.47206C6.06513%204.21171%206.06513%203.7896%205.80478%203.52925C5.54443%203.2689%205.12232%203.2689%204.86197%203.52925L0.728636%207.66258C0.20162%208.1896%200.20162%209.01171%200.728636%209.53872L4.85455%2013.7978C5.11073%2014.0623%205.53279%2014.069%205.79724%2013.8128Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
                      />
                      <_Builtin.Block tag="div">{"Back"}</_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-continue-btn")}
                      data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7e05"
                      tag="div"
                    >
                      <ButtonPrimaryLarge textLabel="Continue" />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-progress-bar-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "cj-blue-progress-indicator",
                        "cj-step-4"
                      )}
                      tag="div"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-steps-info-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "fw-semibold",
                        "text-grey-600"
                      )}
                      tag="div"
                    >
                      {"Step 4 of 5"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "all-job-sidebar")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "job-sidebar-main-block",
                  "cj-step-1"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-top-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "text-sm",
                      "fw-semibold",
                      "text-grey-600"
                    )}
                    tag="div"
                  >
                    {"Step 1: Basic Job Information"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold")}
                    tag="div"
                  >
                    {
                      "Fill in the necessary fields to describe the job you're offering."
                    }
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-main-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-input-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">{"Job Title"}</_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-input-field-wrapper")}
                      tag="div"
                    >
                      <_Builtin.FormWrapper
                        className={_utils.cx(_styles, "form-block-3")}
                      >
                        <_Builtin.FormForm
                          className={_utils.cx(_styles, "form-3")}
                          name="email-form"
                          data-name="Email Form"
                          method="get"
                          id="email-form"
                        >
                          <_Builtin.FormTextInput
                            className={_utils.cx(
                              _styles,
                              "company-info-input",
                              "cj"
                            )}
                            autoFocus={false}
                            maxLength={256}
                            name="email-2"
                            data-name="Email 2"
                            placeholder="Ex: Software Developer"
                            type="email"
                            disabled={false}
                            required={false}
                            id="email-2"
                          />
                        </_Builtin.FormForm>
                        <_Builtin.FormSuccessMessage
                          className={_utils.cx(_styles, "hide")}
                        >
                          <_Builtin.Block tag="div">
                            {"Thank you! Your submission has been received!"}
                          </_Builtin.Block>
                        </_Builtin.FormSuccessMessage>
                        <_Builtin.FormErrorMessage
                          className={_utils.cx(_styles, "hide")}
                        >
                          <_Builtin.Block tag="div">
                            {
                              "Oops! Something went wrong while submitting the form."
                            }
                          </_Builtin.Block>
                        </_Builtin.FormErrorMessage>
                      </_Builtin.FormWrapper>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-input-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">{"Company"}</_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-input-field-wrapper")}
                      tag="div"
                    >
                      <_Builtin.FormWrapper
                        className={_utils.cx(_styles, "form-block-3")}
                      >
                        <_Builtin.FormForm
                          className={_utils.cx(_styles, "form-3")}
                          name="email-form"
                          data-name="Email Form"
                          method="get"
                          id="email-form"
                        >
                          <_Builtin.FormTextInput
                            className={_utils.cx(
                              _styles,
                              "company-info-input",
                              "cj"
                            )}
                            autoFocus={false}
                            maxLength={256}
                            name="email-2"
                            data-name="Email 2"
                            placeholder="Ex: Google"
                            type="email"
                            disabled={false}
                            required={false}
                            id="email-2"
                          />
                        </_Builtin.FormForm>
                        <_Builtin.FormSuccessMessage
                          className={_utils.cx(_styles, "hide")}
                        >
                          <_Builtin.Block tag="div">
                            {"Thank you! Your submission has been received!"}
                          </_Builtin.Block>
                        </_Builtin.FormSuccessMessage>
                        <_Builtin.FormErrorMessage
                          className={_utils.cx(_styles, "hide")}
                        >
                          <_Builtin.Block tag="div">
                            {
                              "Oops! Something went wrong while submitting the form."
                            }
                          </_Builtin.Block>
                        </_Builtin.FormErrorMessage>
                      </_Builtin.FormWrapper>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-input-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">
                      {"Workplace Type"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-input-field")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-input-field-left")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-273")}
                          tag="div"
                        >
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icon")}
                            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M21%2019H23V21H1V19H3V4C3%203.44772%203.44772%203%204%203H14C14.5523%203%2015%203.44772%2015%204V19H19V11H17V9H20C20.5523%209%2021%209.44772%2021%2010V19ZM5%205V19H13V5H5ZM7%2011H11V13H7V11ZM7%207H11V9H7V7Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "text-grey-500")}
                          tag="div"
                        >
                          {"Choose from the list"}
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-input-field-right")}
                        tag="div"
                      >
                        <_Builtin.Image
                          className={_utils.cx(_styles, "vectors-wrapper-30")}
                          loading="lazy"
                          width={16}
                          height={16}
                          src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6503f4b8442d2897eccb91af_Vectors-Wrapper.svg"
                        />
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-input-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">{"Job Location"}</_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-input-field-wrapper")}
                      tag="div"
                    >
                      <_Builtin.FormWrapper
                        className={_utils.cx(_styles, "form-block-3")}
                      >
                        <_Builtin.FormForm
                          className={_utils.cx(_styles, "form-3")}
                          name="email-form"
                          data-name="Email Form"
                          method="get"
                          id="email-form"
                        >
                          <_Builtin.FormTextInput
                            className={_utils.cx(
                              _styles,
                              "company-info-input",
                              "cj"
                            )}
                            autoFocus={false}
                            maxLength={256}
                            name="email-2"
                            data-name="Email 2"
                            placeholder="Ex : San Fransisco, United States"
                            type="email"
                            disabled={false}
                            required={false}
                            id="email-2"
                          />
                        </_Builtin.FormForm>
                        <_Builtin.FormSuccessMessage
                          className={_utils.cx(_styles, "hide")}
                        >
                          <_Builtin.Block tag="div">
                            {"Thank you! Your submission has been received!"}
                          </_Builtin.Block>
                        </_Builtin.FormSuccessMessage>
                        <_Builtin.FormErrorMessage
                          className={_utils.cx(_styles, "hide")}
                        >
                          <_Builtin.Block tag="div">
                            {
                              "Oops! Something went wrong while submitting the form."
                            }
                          </_Builtin.Block>
                        </_Builtin.FormErrorMessage>
                      </_Builtin.FormWrapper>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-input-wrapper")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">{"Job Type"}</_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-input-field-wrapper")}
                      tag="div"
                    >
                      <_Builtin.FormWrapper
                        className={_utils.cx(_styles, "form-block-3")}
                      >
                        <_Builtin.FormForm
                          className={_utils.cx(_styles, "form-3")}
                          name="email-form"
                          data-name="Email Form"
                          method="get"
                          id="email-form"
                        >
                          <_Builtin.FormSelect
                            className={_utils.cx(_styles, "select-field-2")}
                            name="field-2"
                            data-name="Field 2"
                            required={false}
                            multiple={false}
                            id="field-2"
                            options={[
                              {
                                v: "",
                                t: "Choose from the list",
                              },
                              {
                                v: "First",
                                t: "Intership",
                              },
                              {
                                v: "Second",
                                t: "Part-time",
                              },
                              {
                                v: "Third",
                                t: "Full-time",
                              },
                            ]}
                          />
                        </_Builtin.FormForm>
                        <_Builtin.FormSuccessMessage
                          className={_utils.cx(_styles, "hide")}
                        >
                          <_Builtin.Block tag="div">
                            {"Thank you! Your submission has been received!"}
                          </_Builtin.Block>
                        </_Builtin.FormSuccessMessage>
                        <_Builtin.FormErrorMessage
                          className={_utils.cx(_styles, "hide")}
                        >
                          <_Builtin.Block tag="div">
                            {
                              "Oops! Something went wrong while submitting the form."
                            }
                          </_Builtin.Block>
                        </_Builtin.FormErrorMessage>
                      </_Builtin.FormWrapper>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "pd-200")}
                    tag="div"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-bottom-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-form-overlay")}
                    tag="div"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-bottom-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-controls-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-back-btn")}
                        data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7e58"
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icon")}
                          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.79724%2013.8128C6.06169%2013.5566%206.06839%2013.1346%205.8122%2012.8701C5.8122%2012.8701%203.56876%2010.5544%202.38633%209.33398H15.3334C15.7016%209.33398%2016%209.03551%2016%208.66732C16%208.29913%2015.7016%208.00065%2015.3334%208.00065H2.27618L5.80478%204.47206C6.06513%204.21171%206.06513%203.7896%205.80478%203.52925C5.54443%203.2689%205.12232%203.2689%204.86197%203.52925L0.728636%207.66258C0.20162%208.1896%200.20162%209.01171%200.728636%209.53872L4.85455%2013.7978C5.11073%2014.0623%205.53279%2014.069%205.79724%2013.8128Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
                        />
                        <_Builtin.Block tag="div">{"Back"}</_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-continue-btn")}
                        data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7e5c"
                        tag="div"
                      >
                        <ButtonPrimaryLarge textLabel="Continue" />
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-progress-bar-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cj-blue-progress-indicator",
                          "cj-step-1"
                        )}
                        tag="div"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-steps-info-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "text-sm",
                          "fw-semibold",
                          "text-grey-600"
                        )}
                        tag="div"
                      >
                        {"Step 1 of 5"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "job-sidebar-main-block",
                  "cj-step-2"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-top-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "text-sm",
                      "fw-semibold",
                      "text-grey-600"
                    )}
                    tag="div"
                  >
                    {"Step 2: Describe The Role"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold")}
                    tag="div"
                  >
                    {"Help candidates understand what the role involves."}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-main-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-input-wrapper", "pb-200")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">
                      {"Job Description"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "cj-richtext-editor-wrapper"
                      )}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-richtext-cotrols")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cj-rt-paragraph")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "medium-default-11")}
                            tag="div"
                          >
                            {"Paragraph"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "chevron-down---16px-icon"
                            )}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "vectors-wrapper-31"
                              )}
                              loading="lazy"
                              width={11.00003719329834}
                              height={5.00001859664917}
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504043394863d835c0a86cc_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cj-rt-controls-block")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cj-rt-control-icon")}
                            tag="div"
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icon")}
                              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%201.5C3%201.22386%203.22386%201%203.5%201H7C9.17614%201%2011%202.82386%2011%205C11%206.31462%2010.3344%207.50068%209.32761%208.23374C10.87%208.79245%2012%2010.2871%2012%2012C12%2014.1761%2010.1761%2016%208%2016H3.5C3.22386%2016%203%2015.7761%203%2015.5V8.5V1.5ZM4%208H7C8.62386%208%2010%206.62386%2010%205C10%203.37614%208.62386%202%207%202H4V8ZM4%209V15H8C9.62386%2015%2011%2013.6239%2011%2012C11%2010.3761%209.62386%209%208%209H7H4Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cj-rt-control-icon")}
                            tag="div"
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icon")}
                              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.5%202.0001H8.38151L5.59579%2015.0001H4.5C4.22386%2015.0001%204%2015.224%204%2015.5001C4%2015.7762%204.22386%2016.0001%204.5%2016.0001H5.99031C5.99712%2016.0002%206.0039%2016.0002%206.01067%2016.0001H7.5C7.77614%2016.0001%208%2015.7762%208%2015.5001C8%2015.224%207.77614%2015.0001%207.5%2015.0001H6.61849L9.40421%202.0001H10.5C10.7761%202.0001%2011%201.77625%2011%201.5001C11%201.22396%2010.7761%201.0001%2010.5%201.0001H9.00965C9.00287%200.999965%208.99611%200.999966%208.98937%201.0001H7.5C7.22386%201.0001%207%201.22396%207%201.5001C7%201.77625%207.22386%202.0001%207.5%202.0001Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cj-rt-control-icon")}
                            tag="div"
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icon")}
                              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.5%2016C2.22386%2016%202%2015.7761%202%2015.5C2%2015.2239%202.22386%2015%202.5%2015H12.5C12.7761%2015%2013%2015.2239%2013%2015.5C13%2015.7761%2012.7761%2016%2012.5%2016H2.5ZM3%201.5C3%201.22386%203.22386%201%203.5%201C3.77614%201%204%201.22386%204%201.5V9.5C4%2011.4239%205.57614%2013%207.5%2013C9.42386%2013%2011%2011.4239%2011%209.5V1.5C11%201.22386%2011.2239%201%2011.5%201C11.7761%201%2012%201.22386%2012%201.5V9.5C12%2011.9761%209.97614%2014%207.5%2014C5.02386%2014%203%2011.9761%203%209.5V1.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cj-rt-control-icon")}
                            tag="div"
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icon")}
                              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M11.6464%205.85369C11.4512%205.65842%2011.4512%205.34184%2011.6464%205.14658C11.8417%204.95132%2012.1583%204.95132%2012.3536%205.14658L14.4536%207.24658C14.8488%207.64184%2014.8488%208.25842%2014.4617%208.64537L12.3617%2010.8454C12.171%2011.0451%2011.8545%2011.0525%2011.6548%2010.8618C11.455%2010.6711%2011.4477%2010.3546%2011.6383%2010.1549L13.743%207.95022L11.6464%205.85369ZM4.36168%2010.1549C4.55235%2010.3546%204.54499%2010.6711%204.34524%2010.8618C4.14549%2011.0525%203.82899%2011.0451%203.63832%2010.8454L1.54645%208.65369C1.15118%208.25842%201.15118%207.64184%201.54645%207.24658L3.64645%205.14658C3.84171%204.95132%204.15829%204.95132%204.35355%205.14658C4.54882%205.34184%204.54882%205.65842%204.35355%205.85369L2.25651%207.95073C2.25794%207.95151%204.36168%2010.1549%204.36168%2010.1549ZM9.53576%202.81444C9.63832%202.55805%209.9293%202.43334%2010.1857%202.53589C10.4421%202.63845%2010.5668%202.92944%2010.4642%203.18583L6.46424%2013.1858C6.36168%2013.4422%206.0707%2013.5669%205.8143%2013.4644C5.55791%2013.3618%205.43321%2013.0708%205.53576%2012.8144L9.53576%202.81444Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cj-rt-controls-block")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cj-rt-control-icon")}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "vectors-wrapper-33"
                              )}
                              loading="lazy"
                              width={14}
                              height={13}
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/650406032fb689392940aa9d_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "cj-rt-control-icon"
                            )}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "vectors-wrapper-34"
                              )}
                              loading="lazy"
                              width={13.769068717956543}
                              height={13.850000381469727}
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65040604bc4e5ef14157a09d_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "cj-rt-control-icon"
                            )}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "",
                                "vectors-wrapper-33"
                              )}
                              loading="lazy"
                              width={14}
                              height={13}
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65040605c8b96fcc667a74b1_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "cj-rt-control-icon"
                            )}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                "vectors-wrapper-32"
                              )}
                              loading="lazy"
                              width={14.25}
                              height={13}
                              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504060655c5313f7f217aa2_Vectors-Wrapper.svg"
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-rt-input-block")}
                        tag="div"
                      >
                        <_Builtin.FormWrapper
                          className={_utils.cx(_styles, "form-block-4")}
                        >
                          <_Builtin.FormForm
                            className={_utils.cx(_styles, "form-4")}
                            name="email-form-2"
                            data-name="Email Form 2"
                            method="get"
                            id="email-form-2"
                          >
                            <_Builtin.FormTextarea
                              className={_utils.cx(_styles, "textarea")}
                              required={false}
                              autoFocus={false}
                              maxLength={5000}
                              name="field-3"
                              data-name="Field 3"
                              id="field-3"
                            />
                            <_Builtin.FormButton
                              className={_utils.cx(_styles, "hide")}
                              type="submit"
                              value="Submit"
                              data-wait="Please wait..."
                            />
                          </_Builtin.FormForm>
                          <_Builtin.FormSuccessMessage
                            className={_utils.cx(_styles, "hide")}
                          >
                            <_Builtin.Block tag="div">
                              {"Thank you! Your submission has been received!"}
                            </_Builtin.Block>
                          </_Builtin.FormSuccessMessage>
                          <_Builtin.FormErrorMessage
                            className={_utils.cx(_styles, "hide")}
                          >
                            <_Builtin.Block tag="div">
                              {
                                "Oops! Something went wrong while submitting the form."
                              }
                            </_Builtin.Block>
                          </_Builtin.FormErrorMessage>
                        </_Builtin.FormWrapper>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cj-rt-generate-block")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "text-kale-800")}
                            tag="div"
                          >
                            {"Generate job description with AI"}
                          </_Builtin.Block>
                          <_Builtin.Link
                            className={_utils.cx(_styles, "cj-rt-generate-btn")}
                            button={false}
                            options={{
                              href: "#",
                              target: "_blank",
                            }}
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "content-4")}
                              tag="div"
                            >
                              <_Builtin.Image
                                className={_utils.cx(
                                  _styles,
                                  "vectors-wrapper-35"
                                )}
                                loading="lazy"
                                width={12}
                                height={13.1484375}
                                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65040860ccf792e624636a03_Vectors-Wrapper.svg"
                              />
                              <_Builtin.Block
                                className={_utils.cx(_styles, "label-5")}
                                tag="div"
                              >
                                {"Generate"}
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Link>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-skills")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-add-skill-wrapper")}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">{"Skills"}</_Builtin.Block>
                        <CreateBtn />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-suggested-skills")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cj-suggested-skills-header"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block tag="div">
                            {"Suggested skills"}
                          </_Builtin.Block>
                          <_Builtin.Image
                            className={_utils.cx(_styles, "image-27")}
                            loading="lazy"
                            width="auto"
                            height="auto"
                            alt="__wf_reserved_inherit"
                            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890155_Vectors-Wrapper.svg"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cj-skills-wrapper")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cj-suggested-skill-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "small-default-4")}
                              tag="div"
                            >
                              {"HTML"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "frame-1091")}
                              tag="div"
                            >
                              <_Builtin.Image
                                className={_utils.cx(
                                  _styles,
                                  "vectors-wrapper-37"
                                )}
                                loading="lazy"
                                width={10}
                                height={10}
                                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504162c0e20c3617cb43447_Vectors-Wrapper.svg"
                              />
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "cj-suggested-skill-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "",
                                "small-default-4"
                              )}
                              tag="div"
                            >
                              {"CSS"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "plus---12px-icon")}
                              tag="div"
                            >
                              <_Builtin.Image
                                className={_utils.cx(
                                  _styles,
                                  "vectors-wrapper-36"
                                )}
                                loading="lazy"
                                width={8.333333969116211}
                                height={8.333333969116211}
                                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504162dfbd2926e27042430_Vectors-Wrapper.svg"
                              />
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "cj-suggested-skill-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "",
                                "small-default-4"
                              )}
                              tag="div"
                            >
                              {"Javascript"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "",
                                "plus---12px-icon"
                              )}
                              tag="div"
                            >
                              <_Builtin.Image
                                className={_utils.cx(
                                  _styles,
                                  "",
                                  "vectors-wrapper-36"
                                )}
                                loading="lazy"
                                width={8.333333969116211}
                                height={8.333333969116211}
                                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504162d2a9ec9804b855baa_Vectors-Wrapper.svg"
                              />
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "cj-suggested-skill-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "",
                                "small-default-4"
                              )}
                              tag="div"
                            >
                              {"Python"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "",
                                "plus---12px-icon"
                              )}
                              tag="div"
                            >
                              <_Builtin.Image
                                className={_utils.cx(
                                  _styles,
                                  "",
                                  "vectors-wrapper-36"
                                )}
                                loading="lazy"
                                width={8.333333969116211}
                                height={8.333333969116211}
                                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504162ee1cbef96bcdffc98_Vectors-Wrapper.svg"
                              />
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "cj-suggested-skill-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "",
                                "small-default-4"
                              )}
                              tag="div"
                            >
                              {"Mysql"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "",
                                "plus---12px-icon"
                              )}
                              tag="div"
                            >
                              <_Builtin.Image
                                className={_utils.cx(
                                  _styles,
                                  "",
                                  "vectors-wrapper-36"
                                )}
                                loading="lazy"
                                width={8.333333969116211}
                                height={8.333333969116211}
                                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504162dfbd2926e27042430_Vectors-Wrapper.svg"
                              />
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "cj-suggested-skill-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "",
                                "small-default-4"
                              )}
                              tag="div"
                            >
                              {"Adobe photoshop"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "",
                                "plus---12px-icon"
                              )}
                              tag="div"
                            >
                              <_Builtin.Image
                                className={_utils.cx(
                                  _styles,
                                  "",
                                  "vectors-wrapper-36"
                                )}
                                loading="lazy"
                                width={8.333333969116211}
                                height={8.333333969116211}
                                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504162d2a9ec9804b855baa_Vectors-Wrapper.svg"
                              />
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "cj-suggested-skill-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "",
                                "small-default-4"
                              )}
                              tag="div"
                            >
                              {"Premier pro"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "",
                                "plus---12px-icon"
                              )}
                              tag="div"
                            >
                              <_Builtin.Image
                                className={_utils.cx(
                                  _styles,
                                  "",
                                  "vectors-wrapper-36"
                                )}
                                loading="lazy"
                                width={8.333333969116211}
                                height={8.333333969116211}
                                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504162ee1cbef96bcdffc98_Vectors-Wrapper.svg"
                              />
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "",
                              "cj-suggested-skill-block"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "",
                                "small-default-4"
                              )}
                              tag="div"
                            >
                              {"Figma"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "",
                                "plus---12px-icon"
                              )}
                              tag="div"
                            >
                              <_Builtin.Image
                                className={_utils.cx(
                                  _styles,
                                  "",
                                  "vectors-wrapper-36"
                                )}
                                loading="lazy"
                                width={8.333333969116211}
                                height={8.333333969116211}
                                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504162dfbd2926e27042430_Vectors-Wrapper.svg"
                              />
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-bottom-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-form-overlay")}
                    tag="div"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-bottom-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-controls-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-back-btn")}
                        data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7ed0"
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icon")}
                          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.79724%2013.8128C6.06169%2013.5566%206.06839%2013.1346%205.8122%2012.8701C5.8122%2012.8701%203.56876%2010.5544%202.38633%209.33398H15.3334C15.7016%209.33398%2016%209.03551%2016%208.66732C16%208.29913%2015.7016%208.00065%2015.3334%208.00065H2.27618L5.80478%204.47206C6.06513%204.21171%206.06513%203.7896%205.80478%203.52925C5.54443%203.2689%205.12232%203.2689%204.86197%203.52925L0.728636%207.66258C0.20162%208.1896%200.20162%209.01171%200.728636%209.53872L4.85455%2013.7978C5.11073%2014.0623%205.53279%2014.069%205.79724%2013.8128Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
                        />
                        <_Builtin.Block tag="div">{"Back"}</_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-continue-btn")}
                        data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7ed4"
                        tag="div"
                      >
                        <ButtonPrimaryLarge textLabel="Continue" />
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-progress-bar-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cj-blue-progress-indicator",
                          "step-2"
                        )}
                        tag="div"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-steps-info-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "text-sm",
                          "fw-semibold",
                          "text-grey-600"
                        )}
                        tag="div"
                      >
                        {"Step 2 of 5"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "job-sidebar-main-block",
                  "cj-step-3"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-top-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "text-sm",
                      "fw-semibold",
                      "text-grey-600"
                    )}
                    tag="div"
                  >
                    {"Step 3: Get the Word Out"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold")}
                    tag="div"
                  >
                    {"Share your job post to attract more candidates."}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-main-wrapper")}
                  tag="div"
                >
                  <ShareVia />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-bottom-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-form-overlay")}
                    tag="div"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-bottom-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-controls-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-back-btn")}
                        data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7ee7"
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icon")}
                          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.79724%2013.8128C6.06169%2013.5566%206.06839%2013.1346%205.8122%2012.8701C5.8122%2012.8701%203.56876%2010.5544%202.38633%209.33398H15.3334C15.7016%209.33398%2016%209.03551%2016%208.66732C16%208.29913%2015.7016%208.00065%2015.3334%208.00065H2.27618L5.80478%204.47206C6.06513%204.21171%206.06513%203.7896%205.80478%203.52925C5.54443%203.2689%205.12232%203.2689%204.86197%203.52925L0.728636%207.66258C0.20162%208.1896%200.20162%209.01171%200.728636%209.53872L4.85455%2013.7978C5.11073%2014.0623%205.53279%2014.069%205.79724%2013.8128Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
                        />
                        <_Builtin.Block tag="div">{"Back"}</_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-continue-btn")}
                        data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7eeb"
                        tag="div"
                      >
                        <ButtonPrimaryLarge textLabel="Continue" />
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-progress-bar-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cj-blue-progress-indicator",
                          "cj-step-3"
                        )}
                        tag="div"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-steps-info-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "text-sm",
                          "fw-semibold",
                          "text-grey-600"
                        )}
                        tag="div"
                      >
                        {"Step 3 of 5"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "job-sidebar-main-block",
                  "cj-step-4"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-top-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "text-sm",
                      "fw-semibold",
                      "text-grey-600"
                    )}
                    tag="div"
                  >
                    {"Step 4: Set Up Screening Questions"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold")}
                    tag="div"
                  >
                    {
                      "In this step, you'll be setting up screening questions for applicants."
                    }
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-main-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cj-screening-questions-block"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "fw-semibold",
                        "text-grey-600"
                      )}
                      tag="div"
                    >
                      {"Screening Questions"}
                    </_Builtin.Block>
                    <_Builtin.Block tag="div">
                      {
                        "These questions act as a preliminary filter to ensure that only the most suitable candidates proceed to the interview stage. Tips: Use a mix of question types for a thorough screening."
                      }
                    </_Builtin.Block>
                    <CreateBtn skillText="Add Custom Question" />
                  </_Builtin.Block>
                  <ToggleDropdown />
                  <ToggleDropdown toggleHeading="Culture fit" />
                  <ToggleDropdown toggleHeading="Personality fit" />
                  <ToggleDropdown toggleHeading="Soft skills (communication, team-work, etc.)" />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "pd-200")}
                    tag="div"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-bottom-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-form-overlay")}
                    tag="div"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-bottom-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-controls-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-back-btn")}
                        data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7f08"
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icon")}
                          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.79724%2013.8128C6.06169%2013.5566%206.06839%2013.1346%205.8122%2012.8701C5.8122%2012.8701%203.56876%2010.5544%202.38633%209.33398H15.3334C15.7016%209.33398%2016%209.03551%2016%208.66732C16%208.29913%2015.7016%208.00065%2015.3334%208.00065H2.27618L5.80478%204.47206C6.06513%204.21171%206.06513%203.7896%205.80478%203.52925C5.54443%203.2689%205.12232%203.2689%204.86197%203.52925L0.728636%207.66258C0.20162%208.1896%200.20162%209.01171%200.728636%209.53872L4.85455%2013.7978C5.11073%2014.0623%205.53279%2014.069%205.79724%2013.8128Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
                        />
                        <_Builtin.Block tag="div">{"Back"}</_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-continue-btn")}
                        data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7f0c"
                        tag="div"
                      >
                        <ButtonPrimaryLarge textLabel="Continue" />
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-progress-bar-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cj-blue-progress-indicator",
                          "cj-step-4"
                        )}
                        tag="div"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-steps-info-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "text-sm",
                          "fw-semibold",
                          "text-grey-600"
                        )}
                        tag="div"
                      >
                        {"Step 4 of 5"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "job-sidebar-main-block",
                  "cj-step-5"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-top-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "text-sm",
                      "fw-semibold",
                      "text-grey-600"
                    )}
                    tag="div"
                  >
                    {"Step 5: Screening Settings"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "fw-semibold")}
                    tag="div"
                  >
                    {"Optimize your candidate screening process."}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-main-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-278")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "fw-semibold",
                        "text-grey-600"
                      )}
                      tag="div"
                    >
                      {"Screening settings"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "toggle-dropdown")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "toggle-dropdown-toggle",
                          "screening"
                        )}
                        data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7f1e"
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-277")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "fw-semibold",
                              "color-black"
                            )}
                            tag="div"
                          >
                            {"Automate screening"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "toggle-btn-block")}
                            tag="div"
                          >
                            <_Builtin.NotSupported _atom="Animation" />
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "toggle-dropdown-description"
                          )}
                          tag="div"
                        >
                          {
                            "Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
                          }
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "toggle-dropdown-content"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "tog-dropdown-content-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "tog-dropdown-list-wrapper",
                              "screening"
                            )}
                            tag="div"
                          >
                            <CjCheckbox />
                            <CjCheckbox checkboxText="Shortlist candidates with Aglint JD & Resume score above :" />
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-278")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "fw-semibold",
                        "text-grey-600"
                      )}
                      tag="div"
                    >
                      {"Qualification settings"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "toggle-dropdown")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "toggle-dropdown-toggle",
                          "screening"
                        )}
                        data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7f2f"
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-277")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "div-block-280")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "fw-semibold",
                                "color-black"
                              )}
                              tag="div"
                            >
                              {"Use Aglint’s Resume & JD Match score"}
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "label-text",
                                "text-yellow-700",
                                "yellow-300"
                              )}
                              tag="div"
                            >
                              {"Recommended"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "toggle-btn-block")}
                            tag="div"
                          >
                            <_Builtin.NotSupported _atom="Animation" />
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "toggle-dropdown-description"
                          )}
                          tag="div"
                        >
                          {
                            "Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
                          }
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "toggle-dropdown-content"
                        )}
                        tag="div"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "toggle-dropdown")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "toggle-dropdown-toggle",
                          "screening"
                        )}
                        data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7f3c"
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-277")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "fw-semibold",
                              "color-black"
                            )}
                            tag="div"
                          >
                            {"Automatically shortlist candidate"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "toggle-btn-block")}
                            tag="div"
                          >
                            <_Builtin.NotSupported _atom="Animation" />
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "toggle-dropdown-content"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "tog-dropdown-content-block"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "tog-dropdown-list-wrapper",
                              "screening"
                            )}
                            tag="div"
                          >
                            <CjCheckbox />
                            <CjCheckbox checkboxText="Shortlist candidates with Aglint JD & Resume score above :" />
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-278")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "fw-semibold",
                        "text-grey-600"
                      )}
                      tag="div"
                    >
                      {"Additional settings"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "toggle-dropdown")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "toggle-dropdown-toggle",
                          "screening"
                        )}
                        data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7f4b"
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "div-block-277")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "div-block-280")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "fw-semibold",
                                "color-black"
                              )}
                              tag="div"
                            >
                              {"Allow candidate to see AI feedback"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "toggle-btn-block")}
                            tag="div"
                          >
                            <_Builtin.NotSupported _atom="Animation" />
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "toggle-dropdown-description"
                          )}
                          tag="div"
                        >
                          {
                            "AI will provide feedback to you after finishing the interview.The same feeback will be visible to the candidate if ther switch is on."
                          }
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "toggle-dropdown-content"
                        )}
                        tag="div"
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "pd-200")}
                    tag="div"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-bottom-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-form-overlay")}
                    tag="div"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cj-bottom-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-controls-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-back-btn")}
                        data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7f5a"
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icon")}
                          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.79724%2013.8128C6.06169%2013.5566%206.06839%2013.1346%205.8122%2012.8701C5.8122%2012.8701%203.56876%2010.5544%202.38633%209.33398H15.3334C15.7016%209.33398%2016%209.03551%2016%208.66732C16%208.29913%2015.7016%208.00065%2015.3334%208.00065H2.27618L5.80478%204.47206C6.06513%204.21171%206.06513%203.7896%205.80478%203.52925C5.54443%203.2689%205.12232%203.2689%204.86197%203.52925L0.728636%207.66258C0.20162%208.1896%200.20162%209.01171%200.728636%209.53872L4.85455%2013.7978C5.11073%2014.0623%205.53279%2014.069%205.79724%2013.8128Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
                        />
                        <_Builtin.Block tag="div">{"Back"}</_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cj-continue-btn")}
                        data-w-id="13ea845c-e88a-fdda-8c07-af1cc4af7f5e"
                        tag="div"
                      >
                        <ButtonPrimaryLarge textLabel="Continue" />
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-progress-bar-wrapper")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cj-blue-progress-indicator",
                          "cj-step-5"
                        )}
                        tag="div"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cj-steps-info-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "text-sm",
                          "fw-semibold",
                          "text-grey-600"
                        )}
                        tag="div"
                      >
                        {"Step 5 of 5"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "job-sidebar-main-block",
                  "success"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cj-main-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "auth-header-block",
                      "create-job"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-267")}
                      tag="div"
                    >
                      <IconCheckCircle />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-266", "succes")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "text-lg", "fw-semibold")}
                        tag="div"
                      >
                        {"Job created successfully 🎉"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "ju-header-description",
                          "text-align-center"
                        )}
                        tag="div"
                      >
                        {
                          "You're All Set! Let us handle the heavy lifting while you focus on what matters most."
                        }
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "ju-header-description",
                          "mt-12"
                        )}
                        tag="div"
                      >
                        {
                          "You'll start receiving candidate matches soon. Use [YourPlatformName]'s dashboard to track your job postings and candidate progress."
                        }
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "rd-job-info-wrapper",
                      "screening"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "rd-company-info-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "rd-company-icon-block")}
                        tag="div"
                      >
                        <_Builtin.Image
                          className={_utils.cx(_styles, "icon")}
                          dyn={{
                            bind: {},
                          }}
                          width={54}
                          height={54}
                          loading="lazy"
                          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890211_Microsoft%20-%20png%20(1).png"
                        />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "job-details")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "fw-semibold")}
                          dyn={{
                            bind: {},
                          }}
                          tag="div"
                        >
                          {"Software Developer"}
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "tittle-company-location"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "company-location")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "text-sm",
                                "fw-semibold",
                                "text-grey-600"
                              )}
                              dyn={{
                                bind: {},
                              }}
                              tag="div"
                            >
                              {"Microsoft, California, United States"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "color-grey-500"
                      )}
                      dyn={{
                        bind: {},
                      }}
                      tag="div"
                    >
                      {"Posted 3 days ago"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <ShareVia />
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "sidebar-close-btn")}
                tag="div"
                {...onClickClose}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icon")}
                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22currentColor%2F%22%3E%0A%20%20%3Cmask%20id%3D%22mask0_9347_2548%22%20style%3D%22mask-type%3Aluminance%22%20maskunits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22currentColor%2F%22%3E%0A%20%20%3C%2Fpath%3E%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_9347_2548)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
