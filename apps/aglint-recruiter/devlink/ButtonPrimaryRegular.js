"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ButtonPrimaryRegular.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-948":{"id":"e-948","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-386","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-949"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"},"targets":[{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694910129600}},"actionLists":{"a-386":{"id":"a-386","title":"email-temp-editor-[close]","actionItemGroups":[{"actionItems":[{"id":"a-386-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":0,"unit":""}},{"id":"a-386-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"selector":".rd-email-edit-wrapper","selectorGuids":["2295ead5-85e1-b9a6-3337-5728082f803c"]},"xValue":500,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-386-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":600,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694910134507}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ButtonPrimaryRegular({
  as: _Component = _Builtin.Block,
  isStartIcon = false,
  slotStartIcon,
  textLabel = "Button",
  isEndIcon = false,
  slotEndIcon,
  wrapperProps = {},
  tabIndex = "0",
  isDisabled = false,
  onClickButton = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "aui-button-wrap")}
      tag="div"
      tabIndex={tabIndex}
      {...wrapperProps}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "aui-button", "accent-10")}
        tag="div"
        tabIndex={tabIndex}
        {...onClickButton}
      >
        {isStartIcon ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "button-icon", "is-large")}
            tag="div"
          >
            {slotStartIcon}
          </_Builtin.Block>
        ) : null}
        <Text content={textLabel} />
        {isEndIcon ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "button-icon", "is-large")}
            tag="div"
            tabIndex={tabIndex}
          >
            {slotEndIcon}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isDisabled ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "is-button-disabled")}
          tag="div"
        >
          {isStartIcon ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotStartIcon}
            </_Builtin.Block>
          ) : null}
          <Text content={textLabel} />
          {isEndIcon ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotEndIcon}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
