import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./AddtoJobList.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1460":{"id":"e-1460","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-531","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1461"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"97c2fd30-d532-31bd-4828-17ab7e564ec6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"97c2fd30-d532-31bd-4828-17ab7e564ec6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700040347803}},"actionLists":{"a-531":{"id":"a-531","title":"add to job click 2","actionItemGroups":[{"actionItems":[{"id":"a-531-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cdb-select-dropdown-body.dropdown-body","selectorGuids":["a9ce653d-ab8f-2ca2-c6e2-890f051d241d","a9ce653d-ab8f-2ca2-c6e2-890f051d243a"]},"value":0,"unit":""}},{"id":"a-531-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cdb-select-dropdown-body.dropdown-body","selectorGuids":["a9ce653d-ab8f-2ca2-c6e2-890f051d241d","a9ce653d-ab8f-2ca2-c6e2-890f051d243a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700039844872}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AddtoJobList({
  as: _Component = _Builtin.Block,
  textJobList = "This is some text inside of a div block.",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "cdb-select-dropdown-option")}
      data-w-id="97c2fd30-d532-31bd-4828-17ab7e564ec6"
      tag="div"
    >
      <_Builtin.Block tag="div">{textJobList}</_Builtin.Block>
    </_Component>
  );
}
