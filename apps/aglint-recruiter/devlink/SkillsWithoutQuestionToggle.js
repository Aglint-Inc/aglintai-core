import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./SkillsWithoutQuestionToggle.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1294":{"id":"e-1294","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-353","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1295"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695823374481},"e-1295":{"id":"e-1295","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-352","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1294"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9797771a-2c98-c750-fa23-c5d924bbba19","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695823374485}},"actionLists":{"a-353":{"id":"a-353","title":"toggle-dropdown-[close]","actionItemGroups":[{"actionItems":[{"id":"a-353-n-3","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-353-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694777161859},"a-352":{"id":"a-352","title":"toggle-dropdown-[open]","actionItemGroups":[{"actionItems":[{"id":"a-352-n","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":0}},{"id":"a-352-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-352-n-2","actionTypeId":"PLUGIN_LOTTIE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggle-btn-lottie","selectorGuids":["ffb83741-a361-cbef-4c81-3aacd1fe0460"]},"value":50}},{"id":"a-352-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".toggle-dropdown-content-wrapper","selectorGuids":["b9e35d25-4d8c-9390-3169-71cc41432144"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694777161859}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SkillsWithoutQuestionToggle({
  as: _Component = _Builtin.Block,
  slotToggle,
  textSkills = "Skill based assessment",
  onClickToggle = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "toggle-dropdown-2")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "toggle-dropdown-toggle-3")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "color-black")}
          tag="div"
        >
          {textSkills}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "toggle-btn-block-2")}
          data-w-id="9797771a-2c98-c750-fa23-c5d924bbba19"
          tag="div"
          {...onClickToggle}
        >
          {slotToggle}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
