"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { UserInfoTeam } from "./UserInfoTeam";
import * as _utils from "./utils";
import _styles from "./TeamListItem.module.css";

export function TeamListItem({
  as: _Component = _Builtin.Block,
  slotUserRole,
  userName = "Roberto Carlos",
  userEmail = "roberto@sample.com",
  slotProfileImage,
  textDepartment = "Sales",
  textDesignation = "DesignEngineer",
  textLocation = "29 Aug 2023",
  textLastActive = "29 Aug 2023",
  slotThreeDot,
  slotBadge,
  slotUserInfo,
  isUserInfoVisible = false,
  onClickMouseHover = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "team-table-list")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "tu-list-item")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "team-name-wrap")}
          tag="div"
          {...onClickMouseHover}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "team-user-image-wrap")}
            tag="div"
          >
            {slotProfileImage ?? (
              <_Builtin.Image
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6544ea9f949aaadda8d5c97d_michael-turner.jpeg"
              />
            )}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "one-line-clamp")}
            tag="div"
          >
            <Text content={userName} weight="medium" />
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotBadge}</_Builtin.Block>
          {isUserInfoVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-tli-user-info")}
              tag="div"
            >
              {slotUserInfo ?? <UserInfoTeam />}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "tu-list-item")}
        id={_utils.cx(
          _styles,
          "w-node-a60860aa-9493-87fc-f445-b3f1087efc93-087efc8b"
        )}
        tag="div"
      >
        {slotUserRole}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "tu-list-item")} tag="div">
        <Text content={textDepartment} />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "tu-list-item")} tag="div">
        <Text content={textLocation} />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "tu-list-item")}
        id={_utils.cx(
          _styles,
          "w-node-a60860aa-9493-87fc-f445-b3f1087efc98-087efc8b"
        )}
        tag="div"
      >
        <Text content={textLastActive} />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "three-dot-wrap")}
        tag="div"
      >
        {slotThreeDot}
      </_Builtin.Block>
    </_Component>
  );
}
