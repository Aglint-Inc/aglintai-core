import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./NewJobStep6.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-848":{"id":"e-848","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-849"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694777157161},"e-849":{"id":"e-849","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-848"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694777157165},"e-868":{"id":"e-868","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-869"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-869":{"id":"e-869","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-868"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-870":{"id":"e-870","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-871"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-871":{"id":"e-871","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-870"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-872":{"id":"e-872","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-873"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-873":{"id":"e-873","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-872"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-874":{"id":"e-874","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-875"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-875":{"id":"e-875","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-874"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-960":{"id":"e-960","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-361","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-961"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2ac61d84-789c-0790-a1a3-295d95fd7ba0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2ac61d84-789c-0790-a1a3-295d95fd7ba0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694976399087},"e-961":{"id":"e-961","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-362","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-960"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2ac61d84-789c-0790-a1a3-295d95fd7ba0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2ac61d84-789c-0790-a1a3-295d95fd7ba0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694976399087},"e-1050":{"id":"e-1050","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1051"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862b3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862b3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1051":{"id":"e-1051","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1050"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862b3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862b3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1052":{"id":"e-1052","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1053"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862c4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862c4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1053":{"id":"e-1053","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1052"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862c4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862c4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1054":{"id":"e-1054","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1055"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862d1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862d1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1055":{"id":"e-1055","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1054"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862d1","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862d1","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1056":{"id":"e-1056","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1057"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862e4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862e4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1057":{"id":"e-1057","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1056"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862e4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec4308900c6|0cf894aa-eb0a-be93-5786-e3a65e9862e4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695122997122},"e-1142":{"id":"e-1142","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1143"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f1e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f1e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1143":{"id":"e-1143","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1142"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f1e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f1e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1144":{"id":"e-1144","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1145"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f2f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f2f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1145":{"id":"e-1145","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1144"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f2f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f2f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1146":{"id":"e-1146","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1147"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f3c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f3c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1147":{"id":"e-1147","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1146"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f3c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f3c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1148":{"id":"e-1148","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1149"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f4b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f4b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1149":{"id":"e-1149","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1148"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f4b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"13ea845c-e88a-fdda-8c07-af1cc4af7f4b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695131994272},"e-1174":{"id":"e-1174","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-361","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1175"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b741affb-9d81-6ba8-073e-30d4df6fff66","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b741affb-9d81-6ba8-073e-30d4df6fff66","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695149517159},"e-1175":{"id":"e-1175","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-362","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1174"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b741affb-9d81-6ba8-073e-30d4df6fff66","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b741affb-9d81-6ba8-073e-30d4df6fff66","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695149517159},"e-1224":{"id":"e-1224","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1247"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39dede","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39dede","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1225":{"id":"e-1225","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1253"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39dede","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39dede","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1258":{"id":"e-1258","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1254"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf4d9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf4d9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147094109},"e-1254":{"id":"e-1254","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1258"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf4d9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf4d9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147094109},"e-1248":{"id":"e-1248","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1249"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf43d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf43d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147113132},"e-1249":{"id":"e-1249","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1248"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf43d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf43d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147113132},"e-1262":{"id":"e-1262","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1259"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf575","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf575","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147074691},"e-1259":{"id":"e-1259","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1262"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf575","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf575","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147074691},"e-1267":{"id":"e-1267","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1268"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a68efcc0-5329-e289-d305-0833b41efeca","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a68efcc0-5329-e289-d305-0833b41efeca","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804611980},"e-1268":{"id":"e-1268","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1267"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a68efcc0-5329-e289-d305-0833b41efeca","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a68efcc0-5329-e289-d305-0833b41efeca","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804611983},"e-1269":{"id":"e-1269","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1270"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df00","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df00","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804646481},"e-1270":{"id":"e-1270","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1269"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df00","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df00","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804646484},"e-1271":{"id":"e-1271","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1272"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df0a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df0a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804677365},"e-1272":{"id":"e-1272","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1271"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df0a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df0a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804677368},"e-1273":{"id":"e-1273","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1274"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df1a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df1a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804706922},"e-1274":{"id":"e-1274","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1273"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df1a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df1a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804706925},"e-1294":{"id":"e-1294","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1295"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695823374481},"e-1295":{"id":"e-1295","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1294"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695823374485},"e-1296":{"id":"e-1296","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1297"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"59f30a20-74c8-9caf-b0bc-682f040d0d68","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"59f30a20-74c8-9caf-b0bc-682f040d0d68","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695825197517},"e-1297":{"id":"e-1297","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1296"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"59f30a20-74c8-9caf-b0bc-682f040d0d68","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"59f30a20-74c8-9caf-b0bc-682f040d0d68","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695825197521}},"actionLists":{"a-352":{"id":"a-352","title":"toggle-dropdown-[open]","actionItemGroups":[{"actionItems":[{"id":"a-352-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-352-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-352-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-352-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859},"a-353":{"id":"a-353","title":"toggle-dropdown-[close]","actionItemGroups":[{"actionItems":[{"id":"a-353-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-353-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859},"a-354":{"id":"a-354","title":"toggle-dropdown-[open] 2","actionItemGroups":[{"actionItems":[{"id":"a-354-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-354-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-354-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-354-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859},"a-355":{"id":"a-355","title":"toggle-dropdown-[close] 2","actionItemGroups":[{"actionItems":[{"id":"a-355-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-355-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859},"a-361":{"id":"a-361","title":"toggle-dropdown-[open] 3","actionItemGroups":[{"actionItems":[{"id":"a-361-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-361-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-361-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-361-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859},"a-362":{"id":"a-362","title":"toggle-dropdown-[close] 3","actionItemGroups":[{"actionItems":[{"id":"a-362-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-362-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function NewJobStep6({
  as: _Component = _Builtin.Block,
  slotAutomateScreeningToggle,
  onClickAutomateScreeningCheck1 = {},
  isAutomatedScreeningChecked1 = true,
  onClickAutomatedScreeningCheck2 = {},
  isAutomatedScreeningChecked2 = true,
  slotAutomatedScreeningCount1,
  slotAutomatedScreeningCount2,
  slotResumeJdToggle,
  slotShortlistCandidateToggle,
  onClickShortlistCandidateCheck1 = {},
  onClickShortlistCandidateCheck2 = {},
  isShortlistCandidateChecked1 = true,
  isShortlistCandidateChecked2 = true,
  slotShortlistCandidateCount1,
  slotShortlistCandidateCount2,
  slotAiFeedbackToggle,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "job-sidebar-main-block", "cj-step-5")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "cj-top-block")} tag="div">
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "text-lg",
            "fw-semibold",
            "text-grey-600"
          )}
          tag="div"
        >
          {"Step 5: Screening Settings"}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
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
            className={_utils.cx(_styles, "fw-semibold", "text-grey-600")}
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
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-277")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold", "color-black")}
                  tag="div"
                >
                  {"Automate screening"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "toggle-btn-block")}
                  data-w-id="a68efcc0-5329-e289-d305-0833b41efeca"
                  tag="div"
                >
                  {slotAutomateScreeningToggle}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "toggle-dropdown-description")}
                tag="div"
              >
                {
                  "Streamline the screening process by implementing criteria based on user scores and the volume of applications"
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "toggle-dropdown-content")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "tog-dropdown-content-block")}
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
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "check-box-automate-wrapopers"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "final-check-box")}
                      tag="div"
                      {...onClickAutomateScreeningCheck1}
                    >
                      {isAutomatedScreeningChecked1 ? (
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%208.58579L10.2929%205.29289C10.6834%204.90237%2011.3166%204.90237%2011.7071%205.29289C12.0976%205.68342%2012.0976%206.31658%2011.7071%206.70711L7.70711%2010.7071C7.31658%2011.0976%206.68342%2011.0976%206.29289%2010.7071L4.29289%208.70711C3.90237%208.31658%203.90237%207.68342%204.29289%207.29289C4.68342%206.90237%205.31658%206.90237%205.70711%207.29289L7%208.58579Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      ) : null}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-grey-600")}
                      tag="div"
                    >
                      {
                        "Start screening process only after number of applications reaches :"
                      }
                    </_Builtin.Block>
                    <_Builtin.Block tag="div">
                      {slotAutomatedScreeningCount1}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "check-box-automate-wrapopers"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "final-check-box")}
                      tag="div"
                      {...onClickAutomatedScreeningCheck2}
                    >
                      {isAutomatedScreeningChecked2 ? (
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%208.58579L10.2929%205.29289C10.6834%204.90237%2011.3166%204.90237%2011.7071%205.29289C12.0976%205.68342%2012.0976%206.31658%2011.7071%206.70711L7.70711%2010.7071C7.31658%2011.0976%206.68342%2011.0976%206.29289%2010.7071L4.29289%208.70711C3.90237%208.31658%203.90237%207.68342%204.29289%207.29289C4.68342%206.90237%205.31658%206.90237%205.70711%207.29289L7%208.58579Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      ) : null}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-grey-600")}
                      tag="div"
                    >
                      {
                        "Invite all candidates to screeninng having resume score above     :"
                      }
                    </_Builtin.Block>
                    <_Builtin.Block tag="div">
                      {slotAutomatedScreeningCount2}
                    </_Builtin.Block>
                  </_Builtin.Block>
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
            className={_utils.cx(_styles, "fw-semibold", "text-grey-600")}
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
                    className={_utils.cx(_styles, "fw-semibold", "color-black")}
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
                  data-w-id="fc10a2b6-404d-f88a-976a-2a9bbe39df00"
                  tag="div"
                >
                  {slotResumeJdToggle}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "toggle-dropdown-description")}
                tag="div"
              >
                {
                  "Use Aglint's integrated Resume and Job Description matching score to assess the candidate's alignment with the job role."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "toggle-dropdown-content")}
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
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-277")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold", "color-black")}
                  tag="div"
                >
                  {"Automatically shortlist candidate"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "toggle-btn-block")}
                  data-w-id="fc10a2b6-404d-f88a-976a-2a9bbe39df0a"
                  tag="div"
                >
                  {slotShortlistCandidateToggle}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "toggle-dropdown-content")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "tog-dropdown-content-block")}
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
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "check-box-automate-wrapopers"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "final-check-box")}
                      tag="div"
                      {...onClickShortlistCandidateCheck1}
                    >
                      {isShortlistCandidateChecked1 ? (
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%208.58579L10.2929%205.29289C10.6834%204.90237%2011.3166%204.90237%2011.7071%205.29289C12.0976%205.68342%2012.0976%206.31658%2011.7071%206.70711L7.70711%2010.7071C7.31658%2011.0976%206.68342%2011.0976%206.29289%2010.7071L4.29289%208.70711C3.90237%208.31658%203.90237%207.68342%204.29289%207.29289C4.68342%206.90237%205.31658%206.90237%205.70711%207.29289L7%208.58579Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      ) : null}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-grey-600")}
                      tag="div"
                    >
                      {
                        "Shortlist all candidates having interview score above :"
                      }
                    </_Builtin.Block>
                    <_Builtin.Block tag="div">
                      {slotShortlistCandidateCount1}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "check-box-automate-wrapopers"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "final-check-box")}
                      tag="div"
                      {...onClickShortlistCandidateCheck2}
                    >
                      {isShortlistCandidateChecked2 ? (
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icons")}
                          value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%208.58579L10.2929%205.29289C10.6834%204.90237%2011.3166%204.90237%2011.7071%205.29289C12.0976%205.68342%2012.0976%206.31658%2011.7071%206.70711L7.70711%2010.7071C7.31658%2011.0976%206.68342%2011.0976%206.29289%2010.7071L4.29289%208.70711C3.90237%208.31658%203.90237%207.68342%204.29289%207.29289C4.68342%206.90237%205.31658%206.90237%205.70711%207.29289L7%208.58579Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      ) : null}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-grey-600")}
                      tag="div"
                    >
                      {
                        "Shortlist candidates with Aglint JD & Resume score above :"
                      }
                    </_Builtin.Block>
                    <_Builtin.Block tag="div">
                      {slotShortlistCandidateCount2}
                    </_Builtin.Block>
                  </_Builtin.Block>
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
            className={_utils.cx(_styles, "fw-semibold", "text-grey-600")}
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
                    className={_utils.cx(_styles, "fw-semibold", "color-black")}
                    tag="div"
                  >
                    {"Allow candidate to see AI feedback"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "toggle-btn-block")}
                  data-w-id="fc10a2b6-404d-f88a-976a-2a9bbe39df1a"
                  tag="div"
                >
                  {slotAiFeedbackToggle}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "toggle-dropdown-description")}
                tag="div"
              >
                {
                  "AI will provide feedback to you after finishing the interview.The same feeback will be visible to the candidate if ther switch is on."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "toggle-dropdown-content")}
              tag="div"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "pd-200")} tag="div" />
      </_Builtin.Block>
    </_Component>
  );
}
