import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./UserRoleAdminBlock.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1340":{"id":"e-1340","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-463","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1341"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"51170ec6-82cc-9cdc-eb5c-1666d3a16dca","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"51170ec6-82cc-9cdc-eb5c-1666d3a16dca","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696946960734},"e-1341":{"id":"e-1341","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-464","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1340"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"51170ec6-82cc-9cdc-eb5c-1666d3a16dca","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"51170ec6-82cc-9cdc-eb5c-1666d3a16dca","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696946960734}},"actionLists":{"a-463":{"id":"a-463","title":"tu-role-[hover-in] 2","actionItemGroups":[{"actionItems":[{"id":"a-463-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tu-role-block-btn.clickable","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164acb","fd187680-d2fc-2595-4e97-abd37b164ad0"]},"value":"none"}}]},{"actionItems":[{"id":"a-463-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tu-role-block-btn.clickable","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164acb","fd187680-d2fc-2595-4e97-abd37b164ad0"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1696329668176},"a-464":{"id":"a-464","title":"tu-role-[hover-out] 2","actionItemGroups":[{"actionItems":[{"id":"a-464-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".tu-role-block-btn.clickable","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164acb","fd187680-d2fc-2595-4e97-abd37b164ad0"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1696329735299}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function UserRoleAdminBlock({ as: _Component = _Builtin.Block }) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "tu-role-block", "admin")}
      id={_utils.cx(
        _styles,
        "w-node-_51170ec6-82cc-9cdc-eb5c-1666d3a16dca-d3a16dca"
      )}
      data-w-id="51170ec6-82cc-9cdc-eb5c-1666d3a16dca"
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {"Admin"}
      </_Builtin.Block>
      <_Builtin.Block tag="div">{"All Permissions"}</_Builtin.Block>
    </_Component>
  );
}
