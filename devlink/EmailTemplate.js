import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./EmailTemplate.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-848":{"id":"e-848","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-849"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694777157161},"e-849":{"id":"e-849","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-848"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694777157165},"e-868":{"id":"e-868","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-869"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-869":{"id":"e-869","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-868"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-870":{"id":"e-870","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-871"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-871":{"id":"e-871","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-870"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-872":{"id":"e-872","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-873"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-873":{"id":"e-873","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-872"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-874":{"id":"e-874","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-875"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-875":{"id":"e-875","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-874"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-928":{"id":"e-928","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-378","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-929"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807030","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807030","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694908197175},"e-936":{"id":"e-936","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-381","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-937"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|002821df-9a23-91c6-11fa-4b56cedb1947","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|002821df-9a23-91c6-11fa-4b56cedb1947","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694909163681},"e-948":{"id":"e-948","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-386","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-949"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"},"targets":[{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694910129600},"e-960":{"id":"e-960","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-361","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-961"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2ac61d84-789c-0790-a1a3-295d95fd7ba0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2ac61d84-789c-0790-a1a3-295d95fd7ba0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694976399087},"e-961":{"id":"e-961","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-362","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-960"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2ac61d84-789c-0790-a1a3-295d95fd7ba0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2ac61d84-789c-0790-a1a3-295d95fd7ba0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694976399087},"e-1172":{"id":"e-1172","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-386","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1173"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b741affb-9d81-6ba8-073e-30d4df6fff01","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b741affb-9d81-6ba8-073e-30d4df6fff01","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695149517159},"e-1174":{"id":"e-1174","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-361","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1175"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b741affb-9d81-6ba8-073e-30d4df6fff66","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b741affb-9d81-6ba8-073e-30d4df6fff66","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695149517159},"e-1175":{"id":"e-1175","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-362","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1174"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b741affb-9d81-6ba8-073e-30d4df6fff66","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b741affb-9d81-6ba8-073e-30d4df6fff66","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695149517159},"e-1224":{"id":"e-1224","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1247"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39dede","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39dede","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1225":{"id":"e-1225","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1253"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39dede","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39dede","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1258":{"id":"e-1258","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1254"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf4d9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf4d9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147094109},"e-1254":{"id":"e-1254","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1258"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf4d9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf4d9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147094109},"e-1248":{"id":"e-1248","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1249"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf43d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf43d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147113132},"e-1249":{"id":"e-1249","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1248"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf43d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf43d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147113132},"e-1263":{"id":"e-1263","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-432","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1247"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf3b8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf3b8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694909535263},"e-1266":{"id":"e-1266","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-433","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1260"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf510","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf510","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147074691},"e-1257":{"id":"e-1257","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-431","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1246"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf317","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf317","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694909803219},"e-1256":{"id":"e-1256","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-433","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1265"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf474","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf474","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147094109},"e-1264":{"id":"e-1264","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-433","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1255"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf3dc","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf3dc","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147113132},"e-1251":{"id":"e-1251","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-431","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1253"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf322","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf322","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694909682829},"e-1262":{"id":"e-1262","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1259"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf575","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf575","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147074691},"e-1259":{"id":"e-1259","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1262"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf575","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf575","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147074691},"e-1267":{"id":"e-1267","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1268"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a68efcc0-5329-e289-d305-0833b41efeca","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a68efcc0-5329-e289-d305-0833b41efeca","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804611980},"e-1268":{"id":"e-1268","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1267"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a68efcc0-5329-e289-d305-0833b41efeca","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a68efcc0-5329-e289-d305-0833b41efeca","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804611983},"e-1269":{"id":"e-1269","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1270"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df00","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df00","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804646481},"e-1270":{"id":"e-1270","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1269"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df00","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df00","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804646484},"e-1271":{"id":"e-1271","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1272"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df0a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df0a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804677365},"e-1272":{"id":"e-1272","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1271"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df0a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df0a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804677368},"e-1273":{"id":"e-1273","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1274"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df1a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df1a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804706922},"e-1274":{"id":"e-1274","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1273"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df1a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df1a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804706925},"e-1283":{"id":"e-1283","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-381","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1284"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"59642c18-096f-1528-6295-a791c8c9a815","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"59642c18-096f-1528-6295-a791c8c9a815","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695820203394},"e-1294":{"id":"e-1294","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1295"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695823374481},"e-1295":{"id":"e-1295","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1294"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695823374485},"e-1296":{"id":"e-1296","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1297"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"59f30a20-74c8-9caf-b0bc-682f040d0d68","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"59f30a20-74c8-9caf-b0bc-682f040d0d68","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695825197517},"e-1297":{"id":"e-1297","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1296"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"59f30a20-74c8-9caf-b0bc-682f040d0d68","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"59f30a20-74c8-9caf-b0bc-682f040d0d68","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695825197521}},"actionLists":{"a-352":{"id":"a-352","title":"toggle-dropdown-[open]","actionItemGroups":[{"actionItems":[{"id":"a-352-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-352-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-352-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-352-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859},"a-353":{"id":"a-353","title":"toggle-dropdown-[close]","actionItemGroups":[{"actionItems":[{"id":"a-353-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-353-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859},"a-354":{"id":"a-354","title":"toggle-dropdown-[open] 2","actionItemGroups":[{"actionItems":[{"id":"a-354-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-354-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-354-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-354-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859},"a-355":{"id":"a-355","title":"toggle-dropdown-[close] 2","actionItemGroups":[{"actionItems":[{"id":"a-355-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-355-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859},"a-378":{"id":"a-378","title":"screening-sidebar-[close]","actionItemGroups":[{"actionItems":[{"id":"a-378-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".sidebar-wrapper","selectorGuids":["50c8527d-1dec-19c2-cbe5-f014eeac13f8"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-378-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".screening-sidebar","selectorGuids":["9c18f576-777f-0c22-82c0-ab8821e1e97d"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-378-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".screening-sidebar","selectorGuids":["9c18f576-777f-0c22-82c0-ab8821e1e97d"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694898960131},"a-381":{"id":"a-381","title":"detailed-feedback-[open]","actionItemGroups":[{"actionItems":[{"id":"a-381-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".sidebar-wrapper.overview","selectorGuids":["50c8527d-1dec-19c2-cbe5-f014eeac13f8","103615c0-baf5-f2ba-a55e-2e2680195094"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-381-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".sidebar-wrapper.overview","selectorGuids":["50c8527d-1dec-19c2-cbe5-f014eeac13f8","103615c0-baf5-f2ba-a55e-2e2680195094"]},"value":"none"}},{"id":"a-381-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".sidebar-wrapper.detailed","selectorGuids":["50c8527d-1dec-19c2-cbe5-f014eeac13f8","176d92f4-5f7b-45cf-12df-142b9dea7515"]},"value":"flex"}}]},{"actionItems":[{"id":"a-381-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".sidebar-wrapper.detailed","selectorGuids":["50c8527d-1dec-19c2-cbe5-f014eeac13f8","176d92f4-5f7b-45cf-12df-142b9dea7515"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694909170941},"a-386":{"id":"a-386","title":"email-temp-editor-[close]","actionItemGroups":[{"actionItems":[{"id":"a-386-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":0,"unit":""}},{"id":"a-386-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"selector":".rd-email-edit-wrapper","selectorGuids":["2295ead5-85e1-b9a6-3337-5728082f803c"]},"xValue":500,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-386-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":600,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694910134507},"a-361":{"id":"a-361","title":"toggle-dropdown-[open] 3","actionItemGroups":[{"actionItems":[{"id":"a-361-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-361-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-361-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-361-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859},"a-362":{"id":"a-362","title":"toggle-dropdown-[close] 3","actionItemGroups":[{"actionItems":[{"id":"a-362-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-362-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859},"a-432":{"id":"a-432","title":"com-detail-editor-[open] 2","actionItemGroups":[{"actionItems":[{"id":"a-432-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".rd-company-sidebar.detail-edit","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7","55f5d5d9-a090-1d1e-0e51-a7d386127739"]},"value":"none"}},{"id":"a-432-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".rd-email-edit-wrapper-2.full-height","selectorGuids":["55f5d5d9-a090-1d1e-0e51-a7d3861276f3","55f5d5d9-a090-1d1e-0e51-a7d386127740"]},"xValue":500,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-432-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".rd-company-sidebar.detail-edit","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7","55f5d5d9-a090-1d1e-0e51-a7d386127739"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-432-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".rd-company-sidebar.detail-edit","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7","55f5d5d9-a090-1d1e-0e51-a7d386127739"]},"value":"flex"}},{"id":"a-432-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"selector":".rd-email-edit-wrapper-2.full-height","selectorGuids":["55f5d5d9-a090-1d1e-0e51-a7d3861276f3","55f5d5d9-a090-1d1e-0e51-a7d386127740"]},"xValue":0,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-432-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".rd-company-sidebar.detail-edit","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7","55f5d5d9-a090-1d1e-0e51-a7d386127739"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694909543686},"a-433":{"id":"a-433","title":"email-temp-editor-[close] 2","actionItemGroups":[{"actionItems":[{"id":"a-433-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":0,"unit":""}},{"id":"a-433-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"selector":".rd-email-edit-wrapper-2","selectorGuids":["55f5d5d9-a090-1d1e-0e51-a7d3861276f3"]},"xValue":500,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-433-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":600,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694910134507},"a-431":{"id":"a-431","title":"com-detail-editor-[close] 2","actionItemGroups":[{"actionItems":[{"id":"a-431-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar.detail-edit","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7","55f5d5d9-a090-1d1e-0e51-a7d386127739"]},"value":0,"unit":""}},{"id":"a-431-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"useEventTarget":"PARENT","selector":".rd-email-edit-wrapper-2.full-height","selectorGuids":["55f5d5d9-a090-1d1e-0e51-a7d3861276f3","55f5d5d9-a090-1d1e-0e51-a7d386127740"]},"xValue":500,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-431-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":600,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar.detail-edit","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7","55f5d5d9-a090-1d1e-0e51-a7d386127739"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694909687598}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function EmailTemplate({
  as: _Component = _Builtin.Block,
  onClickEdit = {},
  textEmailHeaderCategory = "Interview Email",
  slotEmailPreviewImage,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "cdd-template-block", "jobs-templ")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-292")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "color-grey-500")}
          tag="div"
        >
          {textEmailHeaderCategory}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-company-sidebar")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "rd-email-edit-wrapper")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "hide")}
              value="%3Cstyle%3E%0A.rd-email-edit-wrapper%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A.rd-email-edit-wrapper%20%7B%0A%20%20-ms-overflow-style%3A%20none%3B%0A%20%20scrollbar-width%3A%20none%3B%0A%7D%0A%3C%2Fstyle%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-307")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "text-lg",
                  "fw-semibold",
                  "text-grey-500"
                )}
                tag="div"
              >
                {"Interview Email"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "rd-company-edit-btns")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "aui-button-wrap", "email")}
                  tag="div"
                  tabIndex="0"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "aui-button",
                      "is-small",
                      "is-button-outlined"
                    )}
                    tag="div"
                    tabIndex="0"
                  >
                    <_Builtin.Block tag="div">{"Save Changes"}</_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "aui-button-wrap", "email")}
                  tag="div"
                  tabIndex="0"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "aui-button",
                      "is-small",
                      "is-button-outlined",
                      "danger"
                    )}
                    tag="div"
                    tabIndex="0"
                  >
                    <_Builtin.Block tag="div">{"Close"}</_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-308")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "sidebar-wrapper", "rd-company")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "sidebar-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "rd-email-edit-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "fw-semibold",
                        "color-black"
                      )}
                      tag="div"
                    >
                      {"Body Content"}
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
                              width={11.00003719329834}
                              height={5.00001859664917}
                              loading="lazy"
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
                              width={14}
                              height={13}
                              loading="lazy"
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
                              width={13.769068717956543}
                              height={13.850000381469727}
                              loading="lazy"
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
                              width={14}
                              height={13}
                              loading="lazy"
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
                              width={14.25}
                              height={13}
                              loading="lazy"
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
                              className={_utils.cx(
                                _styles,
                                "rd-email-content-input"
                              )}
                              name="field-4"
                              maxLength={5000}
                              data-name="Field 4"
                              required={false}
                              autoFocus={false}
                              id="field-4"
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
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "rd-email-edit-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "fw-semibold",
                        "color-black"
                      )}
                      tag="div"
                    >
                      {"CTA text"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "input")}
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
                            className={_utils.cx(_styles, "text-field-3")}
                            autoFocus={false}
                            maxLength={256}
                            name="email-2"
                            data-name="Email 2"
                            placeholder="Placeholder"
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
                    className={_utils.cx(_styles, "rd-email-edit-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "fw-semibold",
                        "color-black"
                      )}
                      tag="div"
                    >
                      {"Interview Link"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "color-grey-600"
                      )}
                      tag="div"
                    >
                      {
                        "The interview link will be automatically generated by aglint. no action required"
                      }
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "toggle-dropdown")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "toggle-dropdown-toggle",
                        "company"
                      )}
                      data-w-id="2ac61d84-789c-0790-a1a3-295d95fd7ba0"
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
                        {
                          "Automatically send emails for taking interview to the candidates those who have marked interviewing."
                        }
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "toggle-btn-block")}
                        tag="div"
                      >
                        <_Builtin.NotSupported _atom="Animation" />
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "sidebar-wrapper",
                  "rd-company",
                  "max-width-300"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "sidebar-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "rd-email-edit-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "fw-semibold",
                        "color-black"
                      )}
                      tag="div"
                    >
                      {"Preview"}
                    </_Builtin.Block>
                    <_Builtin.Image
                      width="auto"
                      height="auto"
                      alt="__wf_reserved_inherit"
                      loading="lazy"
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890212_36413fdbae77050b8f006cb7b0099e1c.png"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "rd-email-edit-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-sm",
                        "fw-semibold",
                        "color-black"
                      )}
                      tag="div"
                    >
                      {"Switch template"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "div-block-310")}
                      tag="div"
                    >
                      <_Builtin.Image
                        width="auto"
                        height="auto"
                        alt="__wf_reserved_inherit"
                        loading="lazy"
                        src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890212_36413fdbae77050b8f006cb7b0099e1c.png"
                      />
                      <_Builtin.Image
                        width="auto"
                        height="auto"
                        alt="__wf_reserved_inherit"
                        loading="lazy"
                        src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec43089021a_8d2be2254997c1696ce7b0e9f2ccdbbd.png"
                      />
                      <_Builtin.Image
                        width="auto"
                        height="auto"
                        alt="__wf_reserved_inherit"
                        loading="lazy"
                        src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890213_abc7bfd9cfc0e34b54dcccc1b45fada9.png"
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "rd-email-edit-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "email-note-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "text-sm",
                          "fw-semibold",
                          "text-yellow-800"
                        )}
                        tag="div"
                      >
                        {"CTA text"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "text-sm",
                          "color-grey-600"
                        )}
                        tag="div"
                      >
                        {
                          "The company details, including the name, logo, and social media links..etc mentioned in the template, are sourced from the company settings. To make adjustments to this information, you can edit the company settings accordingly."
                        }
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "aui-button-wrap")}
                        tag="div"
                        tabIndex=""
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "aui-button",
                            "is-small"
                          )}
                          tag="div"
                          tabIndex=""
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "text-blue-500")}
                            tag="div"
                          >
                            {"Got it"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-email-edit-btn", "clickable")}
          tag="div"
          {...onClickEdit}
        >
          <_Builtin.Block className={_utils.cx(_styles, "label-8")} tag="div">
            {"Edit"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-293")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-email-preview-image")}
          tag="div"
        >
          {slotEmailPreviewImage}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
