import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./InsightTagEmpty.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-93":{"id":"e-93","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-41","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-94"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"96be9bee-b5fd-8c1a-c6b5-52b7d2075bb8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"96be9bee-b5fd-8c1a-c6b5-52b7d2075bb8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701429950336},"e-94":{"id":"e-94","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-42","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-93"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"96be9bee-b5fd-8c1a-c6b5-52b7d2075bb8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"96be9bee-b5fd-8c1a-c6b5-52b7d2075bb8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701429950336}},"actionLists":{"a-41":{"id":"a-41","title":"insight-tag-[hover-in] 2","actionItemGroups":[{"actionItems":[{"id":"a-41-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".insight-detail","selectorGuids":["2393fd03-f0fb-15bc-d1c0-fc209f77fadf"]},"value":"none"}},{"id":"a-41-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".insight-detail","selectorGuids":["2393fd03-f0fb-15bc-d1c0-fc209f77fadf"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-41-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".insight-detail","selectorGuids":["2393fd03-f0fb-15bc-d1c0-fc209f77fadf"]},"value":"flex"}}]},{"actionItems":[{"id":"a-41-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".insight-detail","selectorGuids":["2393fd03-f0fb-15bc-d1c0-fc209f77fadf"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1701261976638},"a-42":{"id":"a-42","title":"insight-tag-[hover-out] 2","actionItemGroups":[{"actionItems":[{"id":"a-42-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".insight-detail","selectorGuids":["2393fd03-f0fb-15bc-d1c0-fc209f77fadf"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-42-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".insight-detail","selectorGuids":["2393fd03-f0fb-15bc-d1c0-fc209f77fadf"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1701262166061}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InsightTagEmpty({ as: _Component = _Builtin.Block }) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "insight-tag-block")}
      data-w-id="96be9bee-b5fd-8c1a-c6b5-52b7d2075bb8"
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "text-grey-400")} tag="div">
        {"No insights"}
      </_Builtin.Block>
    </_Component>
  );
}
