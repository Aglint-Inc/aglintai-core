"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./ScheduleProgressPill.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1552":{"id":"e-1552","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-593","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1553"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0afee477-7307-ee06-3c96-943bb6db95ec","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0afee477-7307-ee06-3c96-943bb6db95ec","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712812039281},"e-1553":{"id":"e-1553","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-594","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1552"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"0afee477-7307-ee06-3c96-943bb6db95ec","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"0afee477-7307-ee06-3c96-943bb6db95ec","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712812039283}},"actionLists":{"a-593":{"id":"a-593","title":"progressbar [hover in]","actionItemGroups":[{"actionItems":[{"id":"a-593-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".hover_block","selectorGuids":["e5041e25-b111-0a76-ca16-9a0ee0c38377"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-593-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".hover_block","selectorGuids":["e5041e25-b111-0a76-ca16-9a0ee0c38377"]},"value":"none"}},{"id":"a-593-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".hover_block","selectorGuids":["e5041e25-b111-0a76-ca16-9a0ee0c38377"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-593-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".hover_block","selectorGuids":["e5041e25-b111-0a76-ca16-9a0ee0c38377"]},"value":"grid"}}]},{"actionItems":[{"id":"a-593-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":600,"target":{"useEventTarget":"CHILDREN","selector":".hover_block","selectorGuids":["e5041e25-b111-0a76-ca16-9a0ee0c38377"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-593-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".hover_block","selectorGuids":["e5041e25-b111-0a76-ca16-9a0ee0c38377"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1712812047873},"a-594":{"id":"a-594","title":"progressbar [hover out]","actionItemGroups":[{"actionItems":[{"id":"a-594-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".hover_block","selectorGuids":["e5041e25-b111-0a76-ca16-9a0ee0c38377"]},"value":"none"}}]},{"actionItems":[{"id":"a-594-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".hover_block","selectorGuids":["e5041e25-b111-0a76-ca16-9a0ee0c38377"]},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-594-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".hover_block","selectorGuids":["e5041e25-b111-0a76-ca16-9a0ee0c38377"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1712812047873}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ScheduleProgressPill({
  as: _Component = _Builtin.Block,
  isStarting = false,
  isEnding = false,
  slotProgressIcon,
  styleBgColor = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "schedule_progress_pills")}
      data-w-id="0afee477-7307-ee06-3c96-943bb6db95ec"
      tag="div"
      change-bgcolor="true"
      {...styleBgColor}
    >
      {isStarting ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "is_starting-pill")}
          tag="div"
          {...styleBgColor}
        />
      ) : null}
      {isEnding ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "is_ending-pill")}
          tag="div"
          {...styleBgColor}
        />
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_dynamic_icon")}
        tag="div"
      >
        {slotProgressIcon ?? <GlobalIcon />}
      </_Builtin.Block>
    </_Component>
  );
}
