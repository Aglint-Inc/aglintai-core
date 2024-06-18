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
  isCheckboxVisible = false,
  isChecked = false,
  isEditButton = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "workflow-card-outerwrap")}
      data-w-id="f286b9bf-e923-854f-6be0-d2c7cf58cde5"
      tag="div"
    >
      {isCheckboxVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "workflow_checkbox")}
          tag="div"
        >
          {slotCheckbox}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "workflow_card_wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "workflow_card")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "wc_top", "relative-1")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "width_100")}
              tag="div"
              {...onClickEdit}
            >
              <Text content={textWorkflowName} weight="medium" />
            </_Builtin.Block>
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
                <Text content={textWorkflowTrigger} weight="" color="neutral" />
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
