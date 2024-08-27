"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./StagePipelineSmall.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-15":{"id":"e-15","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-15","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-16"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"697fa2ff-99c5-6b91-8e86-0db414c2ac1c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"697fa2ff-99c5-6b91-8e86-0db414c2ac1c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710242650388},"e-16":{"id":"e-16","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-16","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-15"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"697fa2ff-99c5-6b91-8e86-0db414c2ac1c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"697fa2ff-99c5-6b91-8e86-0db414c2ac1c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710242650389},"e-91":{"id":"e-91","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-64","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-92"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"651125c25c47e8494b8e9ebe|73cd515e-698f-1ab7-15bb-e55d3607c8ab","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"651125c25c47e8494b8e9ebe|73cd515e-698f-1ab7-15bb-e55d3607c8ab","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1722610171928},"e-92":{"id":"e-92","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-91"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"651125c25c47e8494b8e9ebe|73cd515e-698f-1ab7-15bb-e55d3607c8ab","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"651125c25c47e8494b8e9ebe|73cd515e-698f-1ab7-15bb-e55d3607c8ab","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1722610171928}},"actionLists":{"a-15":{"id":"a-15","title":"Pipelinehoverin","actionItemGroups":[{"actionItems":[{"id":"a-15-n-3","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".pipeline","selectorGuids":["741bf4d3-3244-c0ca-8cc0-10a91ba50877"]},"globalSwatchId":"--neutral-3","rValue":241,"bValue":239,"gValue":240,"aValue":1}},{"id":"a-15-n-4","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".change_on_hover","selectorGuids":["5b76a6ba-661d-6823-a6c9-76862b02f9f7"]},"globalSwatchId":"--neutral-3","rValue":241,"bValue":239,"gValue":240,"aValue":1}}]},{"actionItems":[{"id":"a-15-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".pipeline","selectorGuids":["741bf4d3-3244-c0ca-8cc0-10a91ba50877"]},"globalSwatchId":"--neutral-4","rValue":233,"bValue":230,"gValue":232,"aValue":1}},{"id":"a-15-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".change_on_hover","selectorGuids":["5b76a6ba-661d-6823-a6c9-76862b02f9f7"]},"globalSwatchId":"--neutral-4","rValue":233,"bValue":230,"gValue":232,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1710242654131},"a-16":{"id":"a-16","title":"Pipelinehoverin 2","actionItemGroups":[{"actionItems":[{"id":"a-16-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".pipeline","selectorGuids":["741bf4d3-3244-c0ca-8cc0-10a91ba50877"]},"globalSwatchId":"--neutral-3","rValue":241,"bValue":239,"gValue":240,"aValue":1}},{"id":"a-16-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".change_on_hover","selectorGuids":["5b76a6ba-661d-6823-a6c9-76862b02f9f7"]},"globalSwatchId":"--neutral-3","rValue":241,"bValue":239,"gValue":240,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1710242654131},"a-64":{"id":"a-64","title":"Pipelinehoverin 3","actionItemGroups":[{"actionItems":[{"id":"a-64-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".pipeline","selectorGuids":["741bf4d3-3244-c0ca-8cc0-10a91ba50877"]},"globalSwatchId":"--neutral-3","rValue":241,"bValue":239,"gValue":240,"aValue":1}},{"id":"a-64-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".change_on_hover","selectorGuids":["5b76a6ba-661d-6823-a6c9-76862b02f9f7"]},"globalSwatchId":"--neutral-3","rValue":241,"bValue":239,"gValue":240,"aValue":1}}]},{"actionItems":[{"id":"a-64-n-3","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".pipeline","selectorGuids":["741bf4d3-3244-c0ca-8cc0-10a91ba50877"]},"globalSwatchId":"--neutral-4","rValue":233,"bValue":230,"gValue":232,"aValue":1}},{"id":"a-64-n-4","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".change_on_hover","selectorGuids":["5b76a6ba-661d-6823-a6c9-76862b02f9f7"]},"globalSwatchId":"--neutral-4","rValue":233,"bValue":230,"gValue":232,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1710242654131},"a-65":{"id":"a-65","title":"Pipelinehoverin 4","actionItemGroups":[{"actionItems":[{"id":"a-65-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".pipeline","selectorGuids":["741bf4d3-3244-c0ca-8cc0-10a91ba50877"]},"globalSwatchId":"--neutral-3","rValue":241,"bValue":239,"gValue":240,"aValue":1}},{"id":"a-65-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".change_on_hover","selectorGuids":["5b76a6ba-661d-6823-a6c9-76862b02f9f7"]},"globalSwatchId":"--neutral-3","rValue":241,"bValue":239,"gValue":240,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1710242654131}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function StagePipelineSmall({
  as: _Component = _Builtin.Block,
  showText = true,
  slotIcon,
  color = "success",
  isLeft = true,
  isRight = true,
  textStageName = "This is a global text component",
  iconName = "workspaces",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "pipeline", "is_small-copy")}
      tag="div"
      data-embed-color={color}
    >
      {isLeft ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "arrow_left-copy")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2218%22%20height%3D%2224%22%20viewBox%3D%220%200%2018%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12%2012L0.760914%200L17.5%200L17.5%2024L0%2024L12%2012Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "text_bloxk",
          "change_on_hover",
          "auto_width-copy"
        )}
        tag="div"
        data-bg-color={color}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-text-with-icon")}
          tag="div"
          data-text-color={color}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_icon_20")}
            tag="div"
          >
            {slotIcon ?? <GlobalIcon iconName={iconName} size="2" />}
          </_Builtin.Block>
          {showText ? (
            <_Builtin.Block tag="div">
              <Text
                content={textStageName}
                color="inherit"
                weight="regular"
                size="1"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        {isRight ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "is_start", "change_on_hover")}
            tag="div"
            data-bg-color={color}
          />
        ) : null}
        {isLeft ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "is_end", "change_on_hover")}
            tag="div"
            data-bg-color={color}
          />
        ) : null}
      </_Builtin.Block>
      {isRight ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "arrow_right-copy")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2213%22%20height%3D%2224%22%20viewBox%3D%220%200%2013%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.542969%200L12.543%2012L0.542969%2024V0Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
