"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./TeamUsersList.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TeamUsersList({
  as: _Component = _Builtin.Block,
  slotTeamList,
  pendInvitesVisibility = true,
  slotPendingInviteBtn,
  slotInviteBtn,
  slotUsersRoleList,
  onClickViewPendingInvites = {},
  textPending = "You currently have two pending invites awaiting your response.",
  slotSearchAndFilter,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "manage-team-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "tu-header-content", "flex-team-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "tu-header-left")}
          tag="div"
        >
          <Text
            content="Manage User"
            size="2"
            weight="medium"
            align=""
            highContrast=""
            color=""
          />
          <Text
            content="Invite your hiring team members and manage their roles and profile details in one place. Assign roles such as interviewer, hiring manager, or recruiter to ensure an organized team structure and compliance with user permissions in the organization."
            size="2"
            weight=""
            align=""
            highContrast=""
            color="neutral"
          />
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotInviteBtn ?? <SlotComp componentName="slot for Button" />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "tu-list")} tag="div">
        {pendInvitesVisibility ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "team-pending-invite")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "flex-horizontal",
                "center",
                "gap-2"
              )}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M16%208C16%203.58172%2012.4183%200%208%200C5.53028%200%203.48184%201.11748%202%203.11499V1.5L1.99194%201.41012C1.94961%201.17688%201.74546%201%201.5%201C1.22386%201%201%201.22386%201%201.5V4.5L1.00806%204.58988C1.05039%204.82312%201.25454%205%201.5%205H4.5L4.58988%204.99194C4.82312%204.94961%205%204.74546%205%204.5L4.99194%204.41012C4.94961%204.17688%204.74546%204%204.5%204H2.59764C3.91575%202.06249%205.74896%201%208%201C11.866%201%2015%204.13401%2015%208C15%2011.866%2011.866%2015%208%2015C4.13401%2015%201%2011.866%201%208C1%207.72386%200.776142%207.5%200.5%207.5C0.223858%207.5%200%207.72386%200%208C0%2012.4183%203.58172%2016%208%2016C12.4183%2016%2016%2012.4183%2016%208ZM7.5%204.5C7.74546%204.5%207.94961%204.67688%207.99194%204.91012L8%205V8.359L10.8123%2010.6096C11.004%2010.7629%2011.0529%2011.0286%2010.9403%2011.2371L10.8904%2011.3123C10.7371%2011.504%2010.4714%2011.5529%2010.2629%2011.4403L10.1877%2011.3904L7.18765%208.99043C7.09277%208.91453%207.0296%208.8074%207.00813%208.68982L7%208.6V5C7%204.72386%207.22386%204.5%207.5%204.5Z%22%20fill%3D%22%23703815%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <Text content={textPending} color="warning" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "link-text")}
              tag="div"
              {...onClickViewPendingInvites}
            >
              <Text content="View pending invites" color="warning-12" />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "team-slot-filter")}
          tag="div"
        >
          {slotSearchAndFilter ?? <SlotComp componentName="slot for Filter" />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "team-table-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "team-table-header")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "table-header")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <GlobalIcon iconName="person" size="4" />
              </_Builtin.Block>
              <Text content="User" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "table-header")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <GlobalIcon iconName="badge" size="4" />
              </_Builtin.Block>
              <Text content="Role" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "table-header")}
              id={_utils.cx(
                _styles,
                "w-node-_5da55308-9bad-28f7-b285-9c4a01bb6d99-01bb6d7a"
              )}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <GlobalIcon iconName="corporate_fare" size="4" />
              </_Builtin.Block>
              <Text content="Department" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "table-header")}
              id={_utils.cx(
                _styles,
                "w-node-d87be396-79ed-efb9-84aa-e68a22a48a7a-01bb6d7a"
              )}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <GlobalIcon iconName="pin_drop" size="4" />
              </_Builtin.Block>
              <Text content="Location" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "table-header")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <GlobalIcon iconName="schedule" size="4" />
              </_Builtin.Block>
              <Text content="Last Active" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "table-header", "center")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <GlobalIcon iconName="settings" size="4" />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-team-list")}
            tag="div"
          >
            {slotTeamList ?? (
              <>
                <SlotComp componentName="TeamListItem" />
                <SlotComp componentName="TeamListItem" />
                <SlotComp componentName="TeamListItem" />
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
