import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { NewJobSelect } from "./NewJobSelect";
import { ButtonPrimaryLarge } from "./ButtonPrimaryLarge";
import { CreateBtn } from "./CreateBtn";
import { ShareVia } from "./ShareVia";
import { ToggleDropdown } from "./ToggleDropdown";
import { CjCheckbox } from "./CjCheckbox";
import { IconCheckCircle } from "./IconCheckCircle";
import { StepBottomProgress } from "./StepBottomProgress";
import * as _utils from "./utils";
import _styles from "./CreateNewJobDrawer.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-848":{"id":"e-848","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-849"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694777157161},"e-849":{"id":"e-849","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-848"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694777157165},"e-868":{"id":"e-868","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-869"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-869":{"id":"e-869","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-868"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-870":{"id":"e-870","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-871"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-871":{"id":"e-871","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-870"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-872":{"id":"e-872","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-873"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-873":{"id":"e-873","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-872"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-874":{"id":"e-874","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-875"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-875":{"id":"e-875","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-874"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-960":{"id":"e-960","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-361","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-961"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2ac61d84-789c-0790-a1a3-295d95fd7ba0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2ac61d84-789c-0790-a1a3-295d95fd7ba0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694976399087},"e-961":{"id":"e-961","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-362","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-960"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2ac61d84-789c-0790-a1a3-295d95fd7ba0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2ac61d84-789c-0790-a1a3-295d95fd7ba0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694976399087},"e-1050":{"id":"e-1050","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1051"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862b3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862b3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1051":{"id":"e-1051","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1050"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862b3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862b3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1052":{"id":"e-1052","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1053"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862c4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862c4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1053":{"id":"e-1053","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1052"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862c4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862c4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1054":{"id":"e-1054","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1055"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862d1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862d1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1055":{"id":"e-1055","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1054"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862d1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862d1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1056":{"id":"e-1056","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1057"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862e4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862e4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1057":{"id":"e-1057","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1056"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862e4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862e4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1142":{"id":"e-1142","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1143"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f1e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f1e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1143":{"id":"e-1143","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1142"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f1e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f1e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1144":{"id":"e-1144","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1145"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f2f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f2f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1145":{"id":"e-1145","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1144"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f2f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f2f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1146":{"id":"e-1146","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1147"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f3c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f3c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1147":{"id":"e-1147","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1146"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f3c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f3c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1148":{"id":"e-1148","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1149"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f4b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f4b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1149":{"id":"e-1149","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1148"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f4b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f4b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1174":{"id":"e-1174","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-361","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1175"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b741affb-9d81-6ba8-073e-30d4df6fff66","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b741affb-9d81-6ba8-073e-30d4df6fff66","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695149517159},"e-1175":{"id":"e-1175","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-362","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1174"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b741affb-9d81-6ba8-073e-30d4df6fff66","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b741affb-9d81-6ba8-073e-30d4df6fff66","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695149517159},"e-1224":{"id":"e-1224","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1247"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39dede","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39dede","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1225":{"id":"e-1225","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1253"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39dede","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39dede","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1258":{"id":"e-1258","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1254"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf4d9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf4d9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147094109},"e-1254":{"id":"e-1254","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1258"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf4d9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf4d9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147094109},"e-1248":{"id":"e-1248","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1249"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf43d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf43d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147113132},"e-1249":{"id":"e-1249","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1248"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf43d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf43d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147113132},"e-1262":{"id":"e-1262","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1259"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf575","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf575","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147074691},"e-1259":{"id":"e-1259","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1262"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf575","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf575","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147074691},"e-1267":{"id":"e-1267","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1268"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a68efcc0-5329-e289-d305-0833b41efeca","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a68efcc0-5329-e289-d305-0833b41efeca","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804611980},"e-1268":{"id":"e-1268","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1267"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a68efcc0-5329-e289-d305-0833b41efeca","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a68efcc0-5329-e289-d305-0833b41efeca","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804611983},"e-1269":{"id":"e-1269","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1270"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df00","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df00","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804646481},"e-1270":{"id":"e-1270","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1269"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df00","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df00","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804646484},"e-1271":{"id":"e-1271","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1272"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df0a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df0a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804677365},"e-1272":{"id":"e-1272","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1271"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df0a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df0a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804677368},"e-1273":{"id":"e-1273","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1274"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df1a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df1a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804706922},"e-1274":{"id":"e-1274","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1273"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df1a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df1a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804706925},"e-1294":{"id":"e-1294","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1295"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695823374481},"e-1295":{"id":"e-1295","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1294"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695823374485},"e-1296":{"id":"e-1296","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1297"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"59f30a20-74c8-9caf-b0bc-682f040d0d68","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"59f30a20-74c8-9caf-b0bc-682f040d0d68","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695825197517},"e-1297":{"id":"e-1297","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1296"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"59f30a20-74c8-9caf-b0bc-682f040d0d68","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"59f30a20-74c8-9caf-b0bc-682f040d0d68","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695825197521}},"actionLists":{"a-352":{"id":"a-352","title":"toggle-dropdown-[open]","actionItemGroups":[{"actionItems":[{"id":"a-352-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-352-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-352-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-352-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859},"a-353":{"id":"a-353","title":"toggle-dropdown-[close]","actionItemGroups":[{"actionItems":[{"id":"a-353-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-353-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859},"a-354":{"id":"a-354","title":"toggle-dropdown-[open] 2","actionItemGroups":[{"actionItems":[{"id":"a-354-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-354-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-354-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-354-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859},"a-355":{"id":"a-355","title":"toggle-dropdown-[close] 2","actionItemGroups":[{"actionItems":[{"id":"a-355-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-355-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859},"a-361":{"id":"a-361","title":"toggle-dropdown-[open] 3","actionItemGroups":[{"actionItems":[{"id":"a-361-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-361-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-361-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-361-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859},"a-362":{"id":"a-362","title":"toggle-dropdown-[close] 3","actionItemGroups":[{"actionItems":[{"id":"a-362-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-362-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CreateNewJobDrawer({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  slotNewJobStep,
  slotBottomButtonProgress,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "sidebar-block")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-359")} tag="div">
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "text-lg",
            "fw-semibold",
            "color-black"
          )}
          tag="div"
        >
          {"Create New Job"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "close-drawers")}
          tag="div"
          {...onClickClose}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_2386_9326%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_2386_9326)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "job-sidebar-wrapper-scroll")}
        tag="div"
      >
        {slotNewJobStep ?? (
          <>
            <NewJobSelect />
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
            </_Builtin.Block>
          </>
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-bottom-progress")}
        tag="div"
      >
        {slotBottomButtonProgress ?? <StepBottomProgress />}
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%0A%5Bclass*%3D%22CreateNewJobDrawer_job-sidebar-wrapper-scroll__%22%5D%3A%3A-webkit-scrollbar%7B%0A%20display%3A%20none%3B%0A%7D%0A%0A%3C%2Fstyle%3E" />
    </_Component>
  );
}
