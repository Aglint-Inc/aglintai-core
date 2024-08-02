"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./RecentRescheduleList.module.css";

export function RecentRescheduleList({
  as: _Component = _Builtin.Block,
  slotImage,
  textName = "Kristin Watson",
  textTime = "10 Min ago",
  textDesc = "Medical Emergency ",
  slotIcon,
  onClickView = {},
  onClickCandidate = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "recentrechedule_list")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "reson_rwap")}
        tag="div"
        {...onClickCandidate}
      >
        <_Builtin.Block className={_utils.cx(_styles, "avatar_40")} tag="div">
          {slotImage ?? (
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d6e2cb5b27ca42119ddbb3_you.jpg"
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "flex-v4")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "decline_user_details")}
            tag="div"
          >
            <Text content={textName} />
            <Text content={textTime} weight="" color="neutral" size="1" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "decline_reason")}
            tag="div"
          >
            <Text content={textDesc} weight="" color="neutral" />
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_for_icon")}
              tag="div"
            >
              {slotIcon}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-link-accent")}
        tag="div"
        {...onClickView}
      >
        {"View"}
      </_Builtin.Block>
    </_Component>
  );
}
