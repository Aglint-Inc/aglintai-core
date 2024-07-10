"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { GlobalBadge } from "./GlobalBadge";
import { IconButtonGhost } from "./IconButtonGhost";
import * as _utils from "./utils";
import _styles from "./UserWithRole.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1580":{"id":"e-1580","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-615","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1581"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"54b6da50-d8c3-1372-93b0-6aa2dcc3bff8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"54b6da50-d8c3-1372-93b0-6aa2dcc3bff8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1720529418298},"e-1581":{"id":"e-1581","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-616","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1580"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"54b6da50-d8c3-1372-93b0-6aa2dcc3bff8","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"54b6da50-d8c3-1372-93b0-6aa2dcc3bff8","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1720529418303}},"actionLists":{"a-615":{"id":"a-615","title":"show remove","actionItemGroups":[{"actionItems":[{"id":"a-615-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slot_iconbutton","selectorGuids":["8235ec6d-58cd-74c9-f54b-d374b11dd068"]},"value":0,"unit":""}},{"id":"a-615-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot_iconbutton","selectorGuids":["8235ec6d-58cd-74c9-f54b-d374b11dd068"]},"value":"none"}}]},{"actionItems":[{"id":"a-615-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot_iconbutton","selectorGuids":["8235ec6d-58cd-74c9-f54b-d374b11dd068"]},"value":"flex"}}]},{"actionItems":[{"id":"a-615-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot_iconbutton","selectorGuids":["8235ec6d-58cd-74c9-f54b-d374b11dd068"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1720529421144},"a-616":{"id":"a-616","title":"show remove 2","actionItemGroups":[{"actionItems":[{"id":"a-616-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot_iconbutton","selectorGuids":["8235ec6d-58cd-74c9-f54b-d374b11dd068"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-616-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot_iconbutton","selectorGuids":["8235ec6d-58cd-74c9-f54b-d374b11dd068"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1720529421144}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function UserWithRole({
  as: _Component = _Builtin.Block,
  textName = "Ogyen Thoga",
  textRole = "Software developer",
  slotAvatar,
  slotBadge,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "userwithrole")}
      data-w-id="54b6da50-d8c3-1372-93b0-6aa2dcc3bff8"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "user_avatar")}
        id={_utils.cx(
          _styles,
          "w-node-_54b6da50-d8c3-1372-93b0-6aa2dcc3bff9-dcc3bff8"
        )}
        tag="div"
      >
        {slotAvatar ?? (
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6544ea9f1bd974b59b176aea_sarah-johanson.jpeg"
          />
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "user_infoblock")}
        id={_utils.cx(
          _styles,
          "w-node-_54b6da50-d8c3-1372-93b0-6aa2dcc3bffb-dcc3bff8"
        )}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "flex-h2")} tag="div">
          <Text content={textName} />
          <_Builtin.Block tag="div">
            {slotBadge ?? <GlobalBadge textBadge="Active" color="success" />}
          </_Builtin.Block>
        </_Builtin.Block>
        <Text content={textRole} color="neutral" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_iconbutton")}
        id={_utils.cx(
          _styles,
          "w-node-b098ac28-f9fd-7fd5-aa9f-536e270f4bd7-dcc3bff8"
        )}
        tag="div"
      >
        <IconButtonGhost iconName="" color="error" />
      </_Builtin.Block>
    </_Component>
  );
}
