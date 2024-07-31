"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { IconButtonSoft } from "./IconButtonSoft";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./WorkflowCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-73":{"id":"e-73","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-74"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f286b9bf-e923-854f-6be0-d2c7cf58cde5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f286b9bf-e923-854f-6be0-d2c7cf58cde5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1716360840148},"e-74":{"id":"e-74","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-73"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f286b9bf-e923-854f-6be0-d2c7cf58cde5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f286b9bf-e923-854f-6be0-d2c7cf58cde5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1716360840149}},"actionLists":{"a-45":{"id":"a-45","title":"wc_show_iconbuttons","actionItemGroups":[{"actionItems":[{"id":"a-45-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".wc_icon_button_group","selectorGuids":["08cc1377-1cef-3da5-9fb6-8ea7dc0a1a00"]},"value":0,"unit":""}},{"id":"a-45-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".wc_icon_button_group","selectorGuids":["08cc1377-1cef-3da5-9fb6-8ea7dc0a1a00"]},"value":"none"}}]},{"actionItems":[{"id":"a-45-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".wc_icon_button_group","selectorGuids":["08cc1377-1cef-3da5-9fb6-8ea7dc0a1a00"]},"value":"flex"}}]},{"actionItems":[{"id":"a-45-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".wc_icon_button_group","selectorGuids":["08cc1377-1cef-3da5-9fb6-8ea7dc0a1a00"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1716360843829},"a-46":{"id":"a-46","title":"wc_hide_iconbuttons","actionItemGroups":[{"actionItems":[{"id":"a-46-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".wc_icon_button_group","selectorGuids":["08cc1377-1cef-3da5-9fb6-8ea7dc0a1a00"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-46-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".wc_icon_button_group","selectorGuids":["08cc1377-1cef-3da5-9fb6-8ea7dc0a1a00"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1716360843829}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function WorkflowCard({
  as: _Component = _Builtin.Block,
  textWorkflowTrigger = "Follow-Up Email Automation for Unresponsive Candidates",
  textJobs = "Used in 8 jobs",
  textWorkflowName = "Follow-Up Email Automation for Unresponsive Candidates",
  onClickEdit = {},
  onClickDelete = {},
  slotCheckbox,
  isCheckboxVisible = true,
  isChecked = false,
  isEditButton = true,
  showButtons = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "workflow-card-outerwrap")}
      data-w-id="f286b9bf-e923-854f-6be0-d2c7cf58cde5"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "workflow_card_wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "workflow_card")}
          tag="div"
        >
          {isCheckboxVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "workflow_checkbox")}
              tag="div"
            >
              {slotCheckbox ?? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%23F76B15%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%208.58579L10.2929%205.29289C10.6834%204.90237%2011.3166%204.90237%2011.7071%205.29289C12.0976%205.68342%2012.0976%206.31658%2011.7071%206.70711L7.70711%2010.7071C7.31658%2011.0976%206.68342%2011.0976%206.29289%2010.7071L4.29289%208.70711C3.90237%208.31658%203.90237%207.68342%204.29289%207.29289C4.68342%206.90237%205.31658%206.90237%205.70711%207.29289L7%208.58579Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              )}
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "wc_card_content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "wc_top", "relative-1-copy")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "workgflow_text_title")}
                tag="div"
                {...onClickEdit}
              >
                <Text content={textWorkflowName} weight="medium" />
              </_Builtin.Block>
              {showButtons ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "wc_icon_button_group")}
                  tag="div"
                >
                  {isEditButton ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "wc_icon_button")}
                      tag="div"
                      {...onClickEdit}
                    >
                      <IconButtonSoft iconName="edit_square" color="neutral" />
                    </_Builtin.Block>
                  ) : null}
                  <_Builtin.Block
                    className={_utils.cx(_styles, "wc_icon_button")}
                    tag="div"
                    {...onClickDelete}
                  >
                    <IconButtonSoft iconName="delete" color="error" />
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "wc_bottom")}
              tag="div"
              {...onClickEdit}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "wc_bottom_left")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "wc_trigger_block")}
                  tag="div"
                >
                  <GlobalIcon iconName="bolt" weight="thin" />
                  <Text
                    content={textWorkflowTrigger}
                    weight=""
                    color="neutral"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "wc_bottom_right")}
                tag="div"
              >
                <Text
                  content={textJobs}
                  size="1"
                  weight=""
                  color="neutral"
                  align="right"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isChecked ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "active-workflow-card")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
