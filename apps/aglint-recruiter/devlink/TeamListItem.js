"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./TeamListItem.module.css";

export function TeamListItem({
  as: _Component = _Builtin.Block,
  slotUserRole,
  userStatusProps = {},
  userStatusText = "Active",
  userName = "Roberto Carlos",
  userEmail = "roberto@sample.com",
  slotProfileImage,
  textDepartment = "Sales",
  textDesignation = "DesignEngineer",
  textLocation = "29 Aug 2023",
  textLastActive = "29 Aug 2023",
  slotThreeDot,
}) {
  return (
    <_Component className={_utils.cx(_styles, "team-table-list")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "tu-list-item")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "team-name-wrap")}
          tag="div"
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
          <_Builtin.Block
            className={_utils.cx(_styles, "user-status-wrap")}
            tag="div"
            {...userStatusProps}
          >
            <Text content={userStatusText} size="1" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "user-detail-wrap")}
          tag="div"
        >
          <Text content={textDesignation} color="neutral" />
          <Text content={userEmail} color="neutral" />
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