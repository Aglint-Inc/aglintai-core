"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./StagePipeline.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-15":{"id":"e-15","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-15","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-16"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"697fa2ff-99c5-6b91-8e86-0db414c2ac1c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"697fa2ff-99c5-6b91-8e86-0db414c2ac1c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710242650388},"e-16":{"id":"e-16","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-16","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-15"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"697fa2ff-99c5-6b91-8e86-0db414c2ac1c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"697fa2ff-99c5-6b91-8e86-0db414c2ac1c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710242650389},"e-91":{"id":"e-91","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-64","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-92"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"651125c25c47e8494b8e9ebe|73cd515e-698f-1ab7-15bb-e55d3607c8ab","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"651125c25c47e8494b8e9ebe|73cd515e-698f-1ab7-15bb-e55d3607c8ab","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1722610171928},"e-92":{"id":"e-92","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-65","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-91"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"651125c25c47e8494b8e9ebe|73cd515e-698f-1ab7-15bb-e55d3607c8ab","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"651125c25c47e8494b8e9ebe|73cd515e-698f-1ab7-15bb-e55d3607c8ab","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1722610171928}},"actionLists":{"a-15":{"id":"a-15","title":"Pipelinehoverin","actionItemGroups":[{"actionItems":[{"id":"a-15-n-3","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".pipeline","selectorGuids":["741bf4d3-3244-c0ca-8cc0-10a91ba50877"]},"globalSwatchId":"--neutral-3","rValue":241,"bValue":239,"gValue":240,"aValue":1}},{"id":"a-15-n-4","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".change_on_hover","selectorGuids":["5b76a6ba-661d-6823-a6c9-76862b02f9f7"]},"globalSwatchId":"--neutral-3","rValue":241,"bValue":239,"gValue":240,"aValue":1}}]},{"actionItems":[{"id":"a-15-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".pipeline","selectorGuids":["741bf4d3-3244-c0ca-8cc0-10a91ba50877"]},"globalSwatchId":"--neutral-4","rValue":233,"bValue":230,"gValue":232,"aValue":1}},{"id":"a-15-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".change_on_hover","selectorGuids":["5b76a6ba-661d-6823-a6c9-76862b02f9f7"]},"globalSwatchId":"--neutral-4","rValue":233,"bValue":230,"gValue":232,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1710242654131},"a-16":{"id":"a-16","title":"Pipelinehoverin 2","actionItemGroups":[{"actionItems":[{"id":"a-16-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".pipeline","selectorGuids":["741bf4d3-3244-c0ca-8cc0-10a91ba50877"]},"globalSwatchId":"--neutral-3","rValue":241,"bValue":239,"gValue":240,"aValue":1}},{"id":"a-16-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".change_on_hover","selectorGuids":["5b76a6ba-661d-6823-a6c9-76862b02f9f7"]},"globalSwatchId":"--neutral-3","rValue":241,"bValue":239,"gValue":240,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1710242654131},"a-64":{"id":"a-64","title":"Pipelinehoverin 3","actionItemGroups":[{"actionItems":[{"id":"a-64-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".pipeline","selectorGuids":["741bf4d3-3244-c0ca-8cc0-10a91ba50877"]},"globalSwatchId":"--neutral-3","rValue":241,"bValue":239,"gValue":240,"aValue":1}},{"id":"a-64-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".change_on_hover","selectorGuids":["5b76a6ba-661d-6823-a6c9-76862b02f9f7"]},"globalSwatchId":"--neutral-3","rValue":241,"bValue":239,"gValue":240,"aValue":1}}]},{"actionItems":[{"id":"a-64-n-3","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".pipeline","selectorGuids":["741bf4d3-3244-c0ca-8cc0-10a91ba50877"]},"globalSwatchId":"--neutral-4","rValue":233,"bValue":230,"gValue":232,"aValue":1}},{"id":"a-64-n-4","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".change_on_hover","selectorGuids":["5b76a6ba-661d-6823-a6c9-76862b02f9f7"]},"globalSwatchId":"--neutral-4","rValue":233,"bValue":230,"gValue":232,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1710242654131},"a-65":{"id":"a-65","title":"Pipelinehoverin 4","actionItemGroups":[{"actionItems":[{"id":"a-65-n","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".pipeline","selectorGuids":["741bf4d3-3244-c0ca-8cc0-10a91ba50877"]},"globalSwatchId":"--neutral-3","rValue":241,"bValue":239,"gValue":240,"aValue":1}},{"id":"a-65-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".change_on_hover","selectorGuids":["5b76a6ba-661d-6823-a6c9-76862b02f9f7"]},"globalSwatchId":"--neutral-3","rValue":241,"bValue":239,"gValue":240,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1710242654131}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function StagePipeline({
  as: _Component = _Builtin.Block,
  color = "info",
  textStageName = "Stage 2 HR round",
  textInterviewProgress = "This is a global text component",
  slotIcon,
  isLeft = true,
  isRight = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "pipeline")}
      tag="div"
      data-embed-color={color}
    >
      {isLeft ? (
        <_Builtin.Block className={_utils.cx(_styles, "arrow_left")} tag="div">
          <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2234%22%20height%3D%2289%22%20viewbox%3D%220%200%2034%2089%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M34%200V89H0C0%2089%2034%2047%2034%2044.5C34%2042%200%200%200%200H34Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E" />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "text_bloxk", "change_on_hover")}
        tag="div"
        data-bg-color={color}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "relative_2")}
          tag="div"
        >
          {textStageName}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-text-with-icon")}
          tag="div"
          data-text-color={color}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_icon_20")}
            tag="div"
          >
            {slotIcon ?? <GlobalIcon iconName="workspaces" />}
          </_Builtin.Block>
          <Text
            content={textInterviewProgress}
            color="inherit"
            weight="regular"
          />
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
        <_Builtin.Block className={_utils.cx(_styles, "arrow_right")} tag="div">
          <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2234%22%20height%3D%2289%22%20viewbox%3D%220%200%2034%2089%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%200L34%2044L0%2089.5V0Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E" />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
