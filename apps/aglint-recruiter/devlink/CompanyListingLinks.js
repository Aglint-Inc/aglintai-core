"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./CompanyListingLinks.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1588":{"id":"e-1588","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-621","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1589"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3646f60f-95d2-9e9e-e408-6983c5ae6e0a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3646f60f-95d2-9e9e-e408-6983c5ae6e0a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1721799253229},"e-1589":{"id":"e-1589","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-622","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1588"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3646f60f-95d2-9e9e-e408-6983c5ae6e0a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3646f60f-95d2-9e9e-e408-6983c5ae6e0a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1721799253231}},"actionLists":{"a-621":{"id":"a-621","title":"Company Listing Link out Hover in","actionItemGroups":[{"actionItems":[{"id":"a-621-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".link-out-wrap","selectorGuids":["97532cb1-88fc-05d5-975e-bf58a6bfa0ef"]},"value":0,"unit":""}},{"id":"a-621-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".link-out-wrap","selectorGuids":["97532cb1-88fc-05d5-975e-bf58a6bfa0ef"]},"value":"none"}}]},{"actionItems":[{"id":"a-621-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".link-out-wrap","selectorGuids":["97532cb1-88fc-05d5-975e-bf58a6bfa0ef"]},"value":1,"unit":""}},{"id":"a-621-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".link-out-wrap","selectorGuids":["97532cb1-88fc-05d5-975e-bf58a6bfa0ef"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1721799258373},"a-622":{"id":"a-622","title":"Company Listing Link out Hover out","actionItemGroups":[{"actionItems":[{"id":"a-622-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".link-out-wrap","selectorGuids":["97532cb1-88fc-05d5-975e-bf58a6bfa0ef"]},"value":0,"unit":""}},{"id":"a-622-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".link-out-wrap","selectorGuids":["97532cb1-88fc-05d5-975e-bf58a6bfa0ef"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1721799258373}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CompanyListingLinks({
  as: _Component = _Builtin.Block,
  textLinkName = "Website",
  slotIcon,
  onClickLink = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "company-list-pill")}
      data-w-id="3646f60f-95d2-9e9e-e408-6983c5ae6e0a"
      tag="div"
      {...onClickLink}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-icons-links")}
        tag="div"
      >
        {slotIcon}
      </_Builtin.Block>
      <_Builtin.Block tag="div">{textLinkName}</_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "cll-hover")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "link-out-wrap")}
          tag="div"
        >
          <GlobalIcon iconName="open_in_new" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
