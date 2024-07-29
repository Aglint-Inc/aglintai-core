"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonGhost } from "./ButtonGhost";
import { Text } from "./Text";
import { Permissions } from "./Permissions";
import { UserWithRole } from "./UserWithRole";
import { GlobalEmptyState } from "./GlobalEmptyState";
import * as _utils from "./utils";
import _styles from "./RolesAndPermissionsDetail.module.css";

export function RolesAndPermissionsDetail({
  as: _Component = _Builtin.Block,
  slotPermissions,
  textTotalEnabledPermissions = "10 out of 16 total permissions enabled.",
  slotUserWithRole,
  slotBackButton,
  textUserCount = "Users (5)",
  textRoleName = "Role Name",
  textUserDescription = "These are the users with this role.",
  slotBanner,
  slotAddButton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "roles_permissions_detail")}
      id={_utils.cx(
        _styles,
        "w-node-_298a1f26-d31a-bc9f-70a8-82c16a1d8d94-6a1d8d94"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "role_permissions_topbar")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          {slotBackButton ?? (
            <ButtonGhost
              size="2"
              textButton="Back"
              isLeftIcon={true}
              iconName="arrow_back_ios"
              color="neutral"
              iconSize="3"
            />
          )}
        </_Builtin.Block>
        <Text content={textRoleName} weight="medium" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "role_permissions_body")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "role_detail_layout")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "permission_detail")}
            id={_utils.cx(
              _styles,
              "w-node-_298a1f26-d31a-bc9f-70a8-82c16a1d8d9d-6a1d8d94"
            )}
            tag="div"
          >
            <Text
              content="Manage job postings, candidate information, interview scheduling, and task management."
              color="neutral"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "rpd-banner")}
              tag="div"
            >
              {slotBanner}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "count_permissions")}
              tag="div"
            >
              <Text content={textTotalEnabledPermissions} />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_permission_card")}
              tag="div"
            >
              {slotPermissions ?? (
                <>
                  <Permissions />
                  <Permissions />
                  <Permissions />
                  <Permissions />
                  <Permissions />
                  <Permissions />
                  <Permissions />
                  <Permissions />
                  <Permissions />
                  <Permissions />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "current_users")}
            id={_utils.cx(
              _styles,
              "w-node-_298a1f26-d31a-bc9f-70a8-82c16a1d8da5-6a1d8d94"
            )}
            tag="div"
          >
            <Text content={textUserCount} weight="medium" />
            <_Builtin.Block
              className={_utils.cx(_styles, "rpd-wrapper")}
              tag="div"
            >
              <Text content={textUserDescription} color="neutral" />
              <_Builtin.Block tag="div">{slotAddButton}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "userwithrole-wrap")}
              tag="div"
            >
              {slotUserWithRole ?? (
                <>
                  <UserWithRole />
                  <UserWithRole />
                  <UserWithRole />
                  <UserWithRole />
                  <UserWithRole />
                  <GlobalEmptyState iconName="" textDesc="" />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
