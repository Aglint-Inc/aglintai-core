"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./ActiveCircleIndicator.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-215":{"id":"e-215","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-131","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-216"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"df4c1e15-8b57-9126-adc9-25fe428053fb"},"targets":[],"config":{"loop":true,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1724928302822}},"actionLists":{"a-131":{"id":"a-131","title":"Circle Indicator","actionItemGroups":[{"actionItems":[{"id":"a-131-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".active-circle-fromt","selectorGuids":["0fa2fe15-edd2-8032-dc59-cb33a694b0d4"]},"value":1,"unit":""}}]},{"actionItems":[{"id":"a-131-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".active-circle-middle","selectorGuids":["35ee52b0-6e24-adb2-930a-97af80c532b6"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-131-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".active-circle-indi","selectorGuids":["17997a89-11f1-1fd2-5326-2b71200ce02a"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-131-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".active-circle-fromt","selectorGuids":["0fa2fe15-edd2-8032-dc59-cb33a694b0d4"]},"value":1,"unit":""}},{"id":"a-131-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"ease","duration":400,"target":{"selector":".active-circle-middle","selectorGuids":["35ee52b0-6e24-adb2-930a-97af80c532b6"]},"value":1,"unit":""}},{"id":"a-131-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":400,"easing":"ease","duration":400,"target":{"selector":".active-circle-indi","selectorGuids":["17997a89-11f1-1fd2-5326-2b71200ce02a"]},"value":1,"unit":""}}]}],"createdOn":1724927786479,"useFirstGroupAsInitialState":true}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ActiveCircleIndicator({ as: _Component = _Builtin.Block }) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "active-circle-wrappers")}
      data-w-id="df4c1e15-8b57-9126-adc9-25fe428053fb"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "active-circle-fromt")}
        tag="div"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "active-circle-middle")}
        tag="div"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "active-circle-indi")}
        tag="div"
      />
    </_Component>
  );
}
