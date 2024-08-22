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
            <_Builtin.Block tag="div">{slotAtsIcon}</_Builtin.Block>
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
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "ats-setting-right-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ats-sync-item-wrap-copy")}
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
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13.3263%207.33053C11.5116%206.87579%2010.6021%206.65263%209.97474%206.02526C9.34737%205.39368%209.12421%204.48842%208.66947%202.67368L8%200L7.33053%202.67368C6.87579%204.48842%206.65263%205.39789%206.02526%206.02526C5.39368%206.65263%204.48842%206.87579%202.67368%207.33053L0%208L2.67368%208.66947C4.48842%209.12421%205.39789%209.34737%206.02526%209.97474C6.65263%2010.6063%206.87579%2011.5116%207.33053%2013.3263L8%2016L8.66947%2013.3263C9.12421%2011.5116%209.34737%2010.6021%209.97474%209.97474C10.6063%209.34737%2011.5116%209.12421%2013.3263%208.66947L16%208L13.3263%207.33053Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <Text content="Aglint AI Instructions" weight="medium" />
            </_Builtin.Block>
            <Text color="neutral" content="" />
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "aglint_ai")} tag="div">
            <_Builtin.Block tag="div">
              {slotAiInstructionsTextArea}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "ai_info")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "ai_info_title")}
              tag="div"
            >
              <GlobalIcon iconName="" size="4" />
              <Text content="" weight="medium" color="accent" />
            </_Builtin.Block>
            <Text
              color="neutral-12"
              content={
                <>
                  {
                    "You can now harness the power of Aglint AI to automate tasks based on comments. Simply include specific instructions in application comments, and Aglint AI will perform the necessary actions."
                  }
                  <br />
                </>
              }
            />
            <_Builtin.RichText
              className={_utils.cx(_styles, "ruchh")}
              tag="div"
            >
              <_Builtin.Paragraph>
                {
                  "For example, when you mention `@aglintai` in a comment, Aglint AI can create a scheduling request and assign it to the appropriate coordinator or user."
                }
              </_Builtin.Paragraph>
              <_Builtin.Paragraph>{"‍"}</_Builtin.Paragraph>
              <_Builtin.Paragraph>{"How to Use: "}</_Builtin.Paragraph>
              <_Builtin.List tag="ol" unstyled={false}>
                <_Builtin.ListItem>
                  {"Mention Aglint AI: Use `@aglintai` in your comment."}
                </_Builtin.ListItem>
                <_Builtin.ListItem>
                  {
                    "Include Instructions: Specify the action you want Aglint AI to perform."
                  }
                </_Builtin.ListItem>
              </_Builtin.List>
              <_Builtin.Paragraph>
                {
                  "Example: @aglintai Please create a request for a new interview and assign it to the scheduling coordinator."
                }
              </_Builtin.Paragraph>
            </_Builtin.RichText>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
