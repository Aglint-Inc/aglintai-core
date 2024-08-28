"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { TeamSync } from "./TeamSync";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./TeamUsersList.module.css";

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
  slotBanner,
  slotFilterRight,
}) {
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
          <_Builtin.Block tag="div">{slotBanner}</_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "team-slot-filter")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotSearchAndFilter}</_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotFilterRight ?? <TeamSync />}
          </_Builtin.Block>
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
