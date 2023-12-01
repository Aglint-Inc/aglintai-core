import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { ButtonPrimarySmall } from "./ButtonPrimarySmall";
import * as _utils from "./utils";
import _styles from "./JobPublishPop.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1438":{"id":"e-1438","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-516","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1439"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4591da6d-4402-71da-cb1b-230c2d211061","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4591da6d-4402-71da-cb1b-230c2d211061","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699256441673},"e-1439":{"id":"e-1439","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-517","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1438"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4591da6d-4402-71da-cb1b-230c2d211061","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4591da6d-4402-71da-cb1b-230c2d211061","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699256441679}},"actionLists":{"a-516":{"id":"a-516","title":"Copy Link tool tip hover in","actionItemGroups":[{"actionItems":[{"id":"a-516-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".copy-tool-tip-wrap","selectorGuids":["25f2d506-1a01-646a-c37e-46dfb12125a0"]},"value":0,"unit":""}},{"id":"a-516-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".copy-tool-tip-wrap","selectorGuids":["25f2d506-1a01-646a-c37e-46dfb12125a0"]},"value":"none"}}]},{"actionItems":[{"id":"a-516-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".copy-tool-tip-wrap","selectorGuids":["25f2d506-1a01-646a-c37e-46dfb12125a0"]},"value":1,"unit":""}},{"id":"a-516-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".copy-tool-tip-wrap","selectorGuids":["25f2d506-1a01-646a-c37e-46dfb12125a0"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699256445321},"a-517":{"id":"a-517","title":"Copy Link tool tip hover Out","actionItemGroups":[{"actionItems":[{"id":"a-517-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".copy-tool-tip-wrap","selectorGuids":["25f2d506-1a01-646a-c37e-46dfb12125a0"]},"value":0,"unit":""}},{"id":"a-517-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".copy-tool-tip-wrap","selectorGuids":["25f2d506-1a01-646a-c37e-46dfb12125a0"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699256445321}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function JobPublishPop({
  as: _Component = _Builtin.Block,
  textLink = "www.google.com/dshbkvhsdbkfhvbksdds..",
  onClickCopy = {},
  onClickRevertChanges = {},
  onClickPublish = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "publishing-pop-wrapper")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-482")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-483")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "one-line-clamp")}
            tag="div"
          >
            {textLink}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "copy-publish-wrappers")}
          data-w-id="4591da6d-4402-71da-cb1b-230c2d211061"
          tag="div"
          {...onClickCopy}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.5%2010C3.77614%2010%204%2010.2239%204%2010.5C4%2010.7761%203.77614%2011%203.5%2011H1C0.447715%2011%200%2010.5523%200%2010V1C0%200.447715%200.447715%200%201%200H10C10.5523%200%2011%200.447715%2011%201V3.5C11%203.77614%2010.7761%204%2010.5%204C10.2239%204%2010%203.77614%2010%203.5V1H1V10H3.5ZM6%206V15H15V6H6ZM6%205H15C15.5523%205%2016%205.44772%2016%206V15C16%2015.5523%2015.5523%2016%2015%2016H6C5.44772%2016%205%2015.5523%205%2015V6C5%205.44772%205.44772%205%206%205Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "copy-tool-tip-wrap")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Copy Link"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-485")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-484")}
          tag="div"
          {...onClickRevertChanges}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-500", "text-underline")}
            tag="div"
          >
            {"Discard Changes"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div" {...onClickPublish}>
          <ButtonPrimarySmall textLabel="Publish " />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
