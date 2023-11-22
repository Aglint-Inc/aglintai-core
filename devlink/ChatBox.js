import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { AssistantChat } from "./AssistantChat";
import { UserChat } from "./UserChat";
import { ChatInput } from "./ChatInput";
import * as _utils from "./utils";
import _styles from "./ChatBox.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1474":{"id":"e-1474","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-538","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1475"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4160f0cc-545d-c5e3-e01d-484c7a8ac9e8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4160f0cc-545d-c5e3-e01d-484c7a8ac9e8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700206216610},"e-1476":{"id":"e-1476","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-539","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1477"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a3c2938d-2bbd-9096-5e92-472a3d1e2ce5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a3c2938d-2bbd-9096-5e92-472a3d1e2ce5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700206230806}},"actionLists":{"a-538":{"id":"a-538","title":"Chat Bubble Open","actionItemGroups":[{"actionItems":[{"id":"a-538-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"flex"}},{"id":"a-538-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":30,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-538-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":0,"unit":""}},{"id":"a-538-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"none"}},{"id":"a-538-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"none"}},{"id":"a-538-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":0,"unit":""}},{"id":"a-538-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":1,"unit":""}}]},{"actionItems":[{"id":"a-538-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":0,"unit":""}},{"id":"a-538-n-15","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".div-block-588","selectorGuids":["a61e8d58-3cd9-bc7c-d748-888ff47ed4db"]},"xValue":0.9,"yValue":0.9,"locked":true}},{"id":"a-538-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"block"}},{"id":"a-538-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":1,"unit":""}},{"id":"a-538-n-12","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-538-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"none"}},{"id":"a-538-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":100,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":1,"unit":""}},{"id":"a-538-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":100,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700132612161},"a-539":{"id":"a-539","title":"Chat Bubble Close","actionItemGroups":[{"actionItems":[{"id":"a-539-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":1,"unit":""}},{"id":"a-539-n-15","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".div-block-588","selectorGuids":["a61e8d58-3cd9-bc7c-d748-888ff47ed4db"]},"xValue":1,"yValue":1,"locked":true}},{"id":"a-539-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":0,"unit":""}},{"id":"a-539-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":30,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-539-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":100,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"none"}},{"id":"a-539-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":100,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":0,"unit":""}},{"id":"a-539-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"none"}},{"id":"a-539-n-12","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700132612161}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ChatBox({
  as: _Component = _Builtin.Block,
  textCompanyName = "",
  slotLogo,
  slotChat,
  slotChatInput,
  onClickScroll = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "chat-box-menu-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "chat-head-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-590")}
          tag="div"
        >
          {slotLogo}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-xl", "fw-bold")}
          tag="div"
        >
          {textCompanyName}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-589")}
        tag="div"
        {...onClickScroll}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-596")}
          tag="div"
        >
          {slotChat ?? (
            <>
              <AssistantChat />
              <UserChat />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-595")} tag="div">
        {slotChatInput ?? <ChatInput />}
      </_Builtin.Block>
    </_Component>
  );
}
