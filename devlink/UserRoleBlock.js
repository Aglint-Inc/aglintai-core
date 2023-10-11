import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./UserRoleBlock.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1338":{"id":"e-1338","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-461","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1335"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696329869483},"e-1335":{"id":"e-1335","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-462","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1338"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696329869483},"e-1330":{"id":"e-1330","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-461","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1334"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5b99b463-1eb2-741e-96b1-9a81bc941679","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5b99b463-1eb2-741e-96b1-9a81bc941679","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696330041574},"e-1334":{"id":"e-1334","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-462","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1330"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5b99b463-1eb2-741e-96b1-9a81bc941679","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5b99b463-1eb2-741e-96b1-9a81bc941679","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696330041574},"e-1340":{"id":"e-1340","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-463","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1341"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"51170ec6-82cc-9cdc-eb5c-1666d3a16dca","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"51170ec6-82cc-9cdc-eb5c-1666d3a16dca","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696946960734},"e-1341":{"id":"e-1341","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-464","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1340"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"51170ec6-82cc-9cdc-eb5c-1666d3a16dca","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"51170ec6-82cc-9cdc-eb5c-1666d3a16dca","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696946960734}},"actionLists":{"a-461":{"id":"a-461","title":"tu-role-[hover-in]","actionItemGroups":[{"actionItems":[{"id":"a-461-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tu-role-block-btn.clickable","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164acb","fd187680-d2fc-2595-4e97-abd37b164ad0"]},"value":"none"}}]},{"actionItems":[{"id":"a-461-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tu-role-block-btn.clickable","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164acb","fd187680-d2fc-2595-4e97-abd37b164ad0"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1696329668176},"a-462":{"id":"a-462","title":"tu-role-[hover-out]","actionItemGroups":[{"actionItems":[{"id":"a-462-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tu-role-block-btn.clickable","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164acb","fd187680-d2fc-2595-4e97-abd37b164ad0"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1696329735299},"a-463":{"id":"a-463","title":"tu-role-[hover-in] 2","actionItemGroups":[{"actionItems":[{"id":"a-463-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tu-role-block-btn.clickable","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164acb","fd187680-d2fc-2595-4e97-abd37b164ad0"]},"value":"none"}}]},{"actionItems":[{"id":"a-463-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tu-role-block-btn.clickable","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164acb","fd187680-d2fc-2595-4e97-abd37b164ad0"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1696329668176},"a-464":{"id":"a-464","title":"tu-role-[hover-out] 2","actionItemGroups":[{"actionItems":[{"id":"a-464-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tu-role-block-btn.clickable","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164acb","fd187680-d2fc-2595-4e97-abd37b164ad0"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1696329735299}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function UserRoleBlock({
  as: _Component = _Builtin.Block,
  roleName = "Recruiter",
  permissionsNumber = "6/8",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "tu-role-block")}
      id={_utils.cx(
        _styles,
        "w-node-_6f093b60-cbb7-c451-fc49-a51ba7c34eb3-a7c34eb3"
      )}
      data-w-id="6f093b60-cbb7-c451-fc49-a51ba7c34eb3"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "fw-semibold", "text-color-black")}
        tag="div"
      >
        {roleName}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600", "inline-text")}
          tag="div"
        >
          {permissionsNumber}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600", "inline-text")}
          tag="div"
        >
          {" Permissions"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "tu-role-block-btn", "clickable")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icon-embed")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0%209.44681V11.4894C0%2011.7714%200.228621%2012%200.510638%2012H2.55319C2.68862%2012%202.8185%2011.9462%202.91427%2011.8504L10.063%204.70172C10.0631%204.70157%2010.0633%204.70143%2010.0634%204.70128L11.6972%203.06746C12.1009%202.66379%2012.1009%202.03409%2011.6972%201.63041L10.3696%200.302754C9.96591%20-0.100918%209.33621%20-0.100918%208.93254%200.302754L0.149562%209.08573C0.0537992%209.1815%200%209.31138%200%209.44681ZM9.70213%203.61827L10.9715%202.34894L9.65106%201.02853L8.38173%202.29787L9.70213%203.61827ZM7.65957%203.02002L1.02128%209.65832V10.9787H2.34168L8.97998%204.34043L7.65957%203.02002Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
    </_Component>
  );
}
