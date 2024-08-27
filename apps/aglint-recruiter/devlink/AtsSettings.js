"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./AtsSettings.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1592":{"id":"e-1592","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-625","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1593"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b725c18e-b0cf-fde3-ab58-f81e5d5cad51","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b725c18e-b0cf-fde3-ab58-f81e5d5cad51","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1723544461732},"e-1593":{"id":"e-1593","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-626","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1592"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b725c18e-b0cf-fde3-ab58-f81e5d5cad51","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b725c18e-b0cf-fde3-ab58-f81e5d5cad51","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1723544461736}},"actionLists":{"a-625":{"id":"a-625","title":"Ats Setting Mouse Hover in","actionItemGroups":[{"actionItems":[{"id":"a-625-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-edit-three-dot","selectorGuids":["22490c9f-1202-2325-8477-4a7f5eb1a9ac"]},"value":"none"}},{"id":"a-625-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".more-edit-three-dot","selectorGuids":["22490c9f-1202-2325-8477-4a7f5eb1a9ac"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-625-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".more-edit-three-dot","selectorGuids":["22490c9f-1202-2325-8477-4a7f5eb1a9ac"]},"value":1,"unit":""}},{"id":"a-625-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-edit-three-dot","selectorGuids":["22490c9f-1202-2325-8477-4a7f5eb1a9ac"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1723544467148},"a-626":{"id":"a-626","title":"Ats Setting Mouse Hover out","actionItemGroups":[{"actionItems":[{"id":"a-626-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".more-edit-three-dot","selectorGuids":["22490c9f-1202-2325-8477-4a7f5eb1a9ac"]},"value":0,"unit":""}},{"id":"a-626-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".more-edit-three-dot","selectorGuids":["22490c9f-1202-2325-8477-4a7f5eb1a9ac"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1723544467148}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AtsSettings({
  as: _Component = _Builtin.Block,
  slotAtsIcon,
  slotConnectIcon,
  slotButton,
  slotSyncItems,
  slotFrequencySync,
  textSyncItems = "Sync Items from Greenhouse",
  textAtsConnected = "Greenhouse is connected",
  slotAiInstructionsTextArea,
  onClickEditApi = {},
  onClickDisconnect = {},
  slotCheckbox,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "ats-settings-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "ats-setting-left-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ats-connect-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ats-connect-left-detail")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ats-settings-icon-wrap")}
              tag="div"
            >
              {slotAtsIcon}
            </_Builtin.Block>
            <Text content={textAtsConnected} weight="medium" />
            <_Builtin.Block tag="div">{slotConnectIcon}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "freq-menu-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "more-menu-ats-setting")}
              data-w-id="b725c18e-b0cf-fde3-ab58-f81e5d5cad51"
              tag="div"
            >
              <GlobalIcon iconName="more_vert" size="5" />
              <_Builtin.Block
                className={_utils.cx(_styles, "more-edit-three-dot")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "more-edit-list-ats-setting")}
                  tag="div"
                  {...onClickEditApi}
                >
                  <Text content="Edit API Key" />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "more-edit-list-ats-disconect")}
                  tag="div"
                  {...onClickDisconnect}
                >
                  <Text content="Disconnect" />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ats-sync-item-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "asi-header")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "asi-header-wrap")}
              tag="div"
            >
              <GlobalIcon iconName="sync" />
              <Text content={textSyncItems} weight="medium" />
            </_Builtin.Block>
            <Text
              color="neutral"
              content="Select the entities you want to sync—jobs, interview plans, candidates, applications, users, office locations, departments."
            />
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotSyncItems}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ats-sync-item-wrap-copy")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ats-sync-item-top")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ats-sync-item-check-wrap")}
              tag="div"
            >
              <_Builtin.Block tag="div">{slotCheckbox}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ats-sync-item-check-label")}
                tag="div"
              >
                <Text weight="medium" content="" />
                <Text
                  content={
                    <>
                      {
                        "Use Aglint AI to automate tasks directly from comments in Greenhouse. "
                      }
                      <br />
                      {
                        "Mention `@aglintai` in a comment, then include the task details. Aglint AI will handle the rest."
                      }
                    </>
                  }
                  color="neutral"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ats-sync-item-bottom-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ats-sync-item-wrappers")}
              tag="div"
            >
              <Text color="accent" content="How to Use:" />
              <_Builtin.List
                className={_utils.cx(_styles, "ats-sync-list-item")}
                tag="ul"
                unstyled={false}
              >
                <_Builtin.ListItem>
                  {"Mention `@aglintai` in your comment."}
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  {
                    "Specify the action, like creating, rescheduling, or canceling a request."
                  }
                </_Builtin.ListItem>
              </_Builtin.List>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ats-sync-item-smaple")}
              tag="div"
            >
              <Text color="neutral" content="Example:" />
              <Text content="@aglintai Please create a request for a new interview and assign it to the scheduling coordinator." />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
