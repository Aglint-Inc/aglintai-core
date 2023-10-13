import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { AddSocialLink } from "./AddSocialLink";
import * as _utils from "./utils";
import _styles from "./NewJobStep3.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-848":{"id":"e-848","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-849"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694777157161},"e-849":{"id":"e-849","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-848"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0a2d041d-80d2-9d7a-1e15-a2a860a52db7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694777157165},"e-868":{"id":"e-868","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-869"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-869":{"id":"e-869","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-868"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d806ff5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-870":{"id":"e-870","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-871"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-871":{"id":"e-871","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-870"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807006","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-872":{"id":"e-872","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-873"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-873":{"id":"e-873","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-872"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807013","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-874":{"id":"e-874","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-875"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-875":{"id":"e-875","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-874"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890088|80fad331-d6cd-481e-117a-545d3d807026","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694859038332},"e-960":{"id":"e-960","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-361","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-961"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2ac61d84-789c-0790-a1a3-295d95fd7ba0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2ac61d84-789c-0790-a1a3-295d95fd7ba0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694976399087},"e-961":{"id":"e-961","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-362","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-960"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2ac61d84-789c-0790-a1a3-295d95fd7ba0","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2ac61d84-789c-0790-a1a3-295d95fd7ba0","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694976399087},"e-1174":{"id":"e-1174","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-361","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1175"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b741affb-9d81-6ba8-073e-30d4df6fff66","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b741affb-9d81-6ba8-073e-30d4df6fff66","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695149517159},"e-1175":{"id":"e-1175","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-362","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1174"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b741affb-9d81-6ba8-073e-30d4df6fff66","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b741affb-9d81-6ba8-073e-30d4df6fff66","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695149517159},"e-1224":{"id":"e-1224","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1247"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39dede","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39dede","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1225":{"id":"e-1225","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1253"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39dede","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39dede","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695622849869},"e-1258":{"id":"e-1258","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1254"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf4d9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf4d9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147094109},"e-1254":{"id":"e-1254","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1258"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf4d9","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf4d9","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147094109},"e-1248":{"id":"e-1248","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1249"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf43d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf43d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147113132},"e-1249":{"id":"e-1249","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1248"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf43d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf43d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147113132},"e-1262":{"id":"e-1262","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1259"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf575","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf575","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147074691},"e-1259":{"id":"e-1259","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1262"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf575","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"690c5ee4-d401-eca9-addf-13eb4b5bf575","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695147074691},"e-1273":{"id":"e-1273","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-354","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1274"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df1a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df1a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804706922},"e-1274":{"id":"e-1274","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-355","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1273"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df1a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fc10a2b6-404d-f88a-976a-2a9bbe39df1a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695804706925},"e-1288":{"id":"e-1288","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-428","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1293"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fe875246-d6e2-6c92-d88b-e3ffda958483","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fe875246-d6e2-6c92-d88b-e3ffda958483","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695713743802},"e-1293":{"id":"e-1293","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-425","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1288"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fe875246-d6e2-6c92-d88b-e3ffda958483","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fe875246-d6e2-6c92-d88b-e3ffda958483","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695713743806},"e-1294":{"id":"e-1294","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1295"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695823374481},"e-1295":{"id":"e-1295","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1294"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695823374485},"e-1296":{"id":"e-1296","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1297"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"59f30a20-74c8-9caf-b0bc-682f040d0d68","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"59f30a20-74c8-9caf-b0bc-682f040d0d68","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695825197517},"e-1297":{"id":"e-1297","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1296"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"59f30a20-74c8-9caf-b0bc-682f040d0d68","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"59f30a20-74c8-9caf-b0bc-682f040d0d68","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695825197521},"e-1344":{"id":"e-1344","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-465","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1345"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6518fc88155bcd98ba22785c|930a88ec-6ffc-69a2-ca2e-f1d896876ae6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6518fc88155bcd98ba22785c|930a88ec-6ffc-69a2-ca2e-f1d896876ae6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697192703092},"e-1345":{"id":"e-1345","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-466","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1344"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6518fc88155bcd98ba22785c|930a88ec-6ffc-69a2-ca2e-f1d896876ae6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6518fc88155bcd98ba22785c|930a88ec-6ffc-69a2-ca2e-f1d896876ae6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697192703092},"e-1346":{"id":"e-1346","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-467","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1347"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6518fc88155bcd98ba22785c|a0b33eea-adc8-53c9-b181-aeaf4cea03d4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6518fc88155bcd98ba22785c|a0b33eea-adc8-53c9-b181-aeaf4cea03d4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697192802633},"e-1347":{"id":"e-1347","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-468","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1346"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6518fc88155bcd98ba22785c|a0b33eea-adc8-53c9-b181-aeaf4cea03d4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6518fc88155bcd98ba22785c|a0b33eea-adc8-53c9-b181-aeaf4cea03d4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697192802633}},"actionLists":{"a-352":{"id":"a-352","title":"toggle-dropdown-[open]","actionItemGroups":[{"actionItems":[{"id":"a-352-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-352-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-352-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-352-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859},"a-353":{"id":"a-353","title":"toggle-dropdown-[close]","actionItemGroups":[{"actionItems":[{"id":"a-353-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-353-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859},"a-354":{"id":"a-354","title":"toggle-dropdown-[open] 2","actionItemGroups":[{"actionItems":[{"id":"a-354-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-354-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-354-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-354-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859},"a-355":{"id":"a-355","title":"toggle-dropdown-[close] 2","actionItemGroups":[{"actionItems":[{"id":"a-355-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-355-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859},"a-361":{"id":"a-361","title":"toggle-dropdown-[open] 3","actionItemGroups":[{"actionItems":[{"id":"a-361-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-361-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-361-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-361-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859},"a-362":{"id":"a-362","title":"toggle-dropdown-[close] 3","actionItemGroups":[{"actionItems":[{"id":"a-362-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-362-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859},"a-428":{"id":"a-428","title":"see how it works hover","actionItemGroups":[{"actionItems":[{"id":"a-428-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".arrow-right-icon","selectorGuids":["1a2d7ec5-5ada-9dff-89e0-5720f72cb74b"]},"xValue":-2,"xUnit":"px","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"id":"a-428-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":400,"target":{"selector":".arrow-right-icon","selectorGuids":["1a2d7ec5-5ada-9dff-89e0-5720f72cb74b"]},"xValue":2,"xUnit":"px","yUnit":"PX","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1695713747362},"a-425":{"id":"a-425","title":"see how it works hover out","actionItemGroups":[{"actionItems":[{"id":"a-425-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":400,"target":{"selector":".arrow-right-icon","selectorGuids":["1a2d7ec5-5ada-9dff-89e0-5720f72cb74b"]},"xValue":-2,"xUnit":"px","yUnit":"PX","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695713747362},"a-465":{"id":"a-465","title":"toggle-dropdown-[open] 4","actionItemGroups":[{"actionItems":[{"id":"a-465-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-465-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-465-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-465-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859},"a-466":{"id":"a-466","title":"toggle-dropdown-[close] 4","actionItemGroups":[{"actionItems":[{"id":"a-466-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-466-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859},"a-467":{"id":"a-467","title":"toggle-dropdown-[open] 5","actionItemGroups":[{"actionItems":[{"id":"a-467-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-467-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-467-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-467-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859},"a-468":{"id":"a-468","title":"toggle-dropdown-[close] 5","actionItemGroups":[{"actionItems":[{"id":"a-468-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-468-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function NewJobStep3({
  as: _Component = _Builtin.Block,
  onClickAiPoweredScreening = {},
  onClickStandardScreening = {},
  isAiPoweredScreeningChecked = true,
  isStandardScreeningChecked = true,
  slotSkillsQuestion,

  howItWorksLink = {
    href: "#",
    target: "_blank",
  },

  isHowItWorksVisible = true,
  isHeaderVisible = true,
  onClickAddCustomQuestion = {},
  isChoosePreferredOptionVisible = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "job-sidebar-main-block", "cj-step-4")}
      tag="div"
    >
      {isHeaderVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cj-top-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-lg",
              "fw-semibold",
              "text-grey-600"
            )}
            tag="div"
          >
            {"Step 3: Set Up Screening Questions"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Pre-screen candidates based on essential criteria."}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-main-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "select-one-screening", "hide")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-md", "fw-semibold")}
            tag="div"
          >
            {"Choose Your Preferred Screening Option"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ai-powered-select")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "radio-ai-powered")}
              tag="div"
              {...onClickAiPoweredScreening}
            >
              {isAiPoweredScreeningChecked ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "radio-icon")}
                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%231F73B7%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%222%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-335")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "color-black")}
                tag="div"
              >
                {"AI-Powered Personalized Screening"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {
                  "Elevate your interview process with our AI-Powered Screening! This option ensures each candidate is asked personalized questions crafted by AI, tailored to their unique profile and experience, and aligned with the job description. Uncover deeper insights and assess the true potential of each candidate with questions that matter."
                }
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ai-powered-select")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "radio-ai-powered")}
              tag="div"
              {...onClickStandardScreening}
            >
              {isStandardScreeningChecked ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "radio-icon")}
                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%231F73B7%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%222%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-335")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "color-black")}
                tag="div"
              >
                {"Standardized Screening"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {
                  "Prefer consistency? Choose our Standardized Screening! You can set the same set of questions for all candidates. Need help crafting questions? Our AI is here to assist you in generating relevant and insightful questions, ensuring a fair and balanced assessment for every candidate."
                }
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cj-screening-questions-block", "hide")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-grey-600")}
            tag="div"
          >
            {"Screening Questions"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {
              "These questions act as a preliminary filter to ensure that only the most suitable candidates proceed to the interview stage. Tips: Use a mix of question types for a thorough screening."
            }
          </_Builtin.Block>
          <_Builtin.Link
            className={_utils.cx(_styles, "cj-add-skill-btn")}
            button={false}
            options={{
              href: "#",
            }}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "toggle-dropdown-toggle-2")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold", "color-black")}
                tag="div"
              >
                {"Soft skills (communication, team-work, etc.)"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "toggle-btn-block")}
                tag="div"
              >
                <_Builtin.NotSupported _atom="Animation" />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "color-black")}
              tag="div"
            >
              {"Soft skills (communication, team-work, etc.)"}
            </_Builtin.Block>
          </_Builtin.Link>
        </_Builtin.Block>
        {isChoosePreferredOptionVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-405")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Choose Your Preferred Screening Option"}
            </_Builtin.Block>
            <_Builtin.Block tag="div" {...onClickAddCustomQuestion}>
              <AddSocialLink textLabel="Add Custom Question" />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "skills-without-question")}
          tag="div"
        >
          {slotSkillsQuestion}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-386", "hide")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Try the test yourself to get candidate experience."}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {
              "Understand the experience your candidates will go through and finetune the test as well"
            }
          </_Builtin.Block>
          {isHowItWorksVisible ? (
            <_Builtin.Link
              className={_utils.cx(_styles, "div-block-358")}
              data-w-id="fe875246-d6e2-6c92-d88b-e3ffda958483"
              button={false}
              options={howItWorksLink}
            >
              <_Builtin.Block tag="div">
                {"Try the test yourself"}
              </_Builtin.Block>
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "arrow-right-icon")}
                value="%3Csvg%20width%3D%2210%22%20height%3D%227%22%20viewBox%3D%220%200%2010%207%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.85355%203.14645C10.0488%203.34172%2010.0488%203.6583%209.85355%203.85356L6.85355%206.85355C6.65829%207.04882%206.34171%207.04882%206.14645%206.85355C5.95119%206.65829%205.95119%206.34171%206.14645%206.14645L8.29289%204.00001L0.5%204C0.223858%204%200%203.77614%200%203.5C0%203.22386%200.223858%203%200.5%203L8.29289%203.00001L6.14645%200.853562C5.95118%200.6583%205.95118%200.341717%206.14645%200.146455C6.34171%20-0.0488067%206.65829%20-0.0488067%206.85355%200.146455L9.85355%203.14645Z%22%20fill%3D%22%230F3554%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Link>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "pb-80")} tag="div" />
      </_Builtin.Block>
    </_Component>
  );
}
