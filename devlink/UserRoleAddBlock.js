import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./UserRoleAddBlock.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1330":{"id":"e-1330","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-461","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1334"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5b99b463-1eb2-741e-96b1-9a81bc941679","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5b99b463-1eb2-741e-96b1-9a81bc941679","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696330041574},"e-1334":{"id":"e-1334","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-462","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1330"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5b99b463-1eb2-741e-96b1-9a81bc941679","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5b99b463-1eb2-741e-96b1-9a81bc941679","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696330041574}},"actionLists":{"a-461":{"id":"a-461","title":"tu-role-[hover-in]","actionItemGroups":[{"actionItems":[{"id":"a-461-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tu-role-block-btn.clickable","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164acb","fd187680-d2fc-2595-4e97-abd37b164ad0"]},"value":"none"}}]},{"actionItems":[{"id":"a-461-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tu-role-block-btn.clickable","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164acb","fd187680-d2fc-2595-4e97-abd37b164ad0"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1696329668176},"a-462":{"id":"a-462","title":"tu-role-[hover-out]","actionItemGroups":[{"actionItems":[{"id":"a-462-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tu-role-block-btn.clickable","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164acb","fd187680-d2fc-2595-4e97-abd37b164ad0"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1696329735299}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function UserRoleAddBlock({
  as: _Component = _Builtin.Block,
  onClick = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "tu-role-block", "add")}
      id={_utils.cx(
        _styles,
        "w-node-_5b99b463-1eb2-741e-96b1-9a81bc941679-bc941679"
      )}
      data-w-id="5b99b463-1eb2-741e-96b1-9a81bc941679"
      tag="div"
      {...onClick}
    >
      <_Builtin.Block tag="div">
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icon-embed")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3DcurrentColor%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.99967%201.33333C7.59057%201.33333%207.25893%201.66497%207.25893%202.07407V7.25911H2.07389C1.66479%207.25911%201.33315%207.59076%201.33315%207.99986C1.33315%208.40896%201.66479%208.7406%202.07389%208.7406H7.25893V13.9259C7.25893%2014.335%207.59057%2014.6667%207.99967%2014.6667C8.40877%2014.6667%208.74041%2014.335%208.74041%2013.9259V8.7406H13.9257C14.3348%208.7406%2014.6665%208.40896%2014.6665%207.99986C14.6665%207.59076%2014.3348%207.25911%2013.9257%207.25911H8.74041V2.07407C8.74041%201.66497%208.40877%201.33333%207.99967%201.33333Z%22%20fill%3DcurrentColor%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {"Create New"}
      </_Builtin.Block>
    </_Component>
  );
}
