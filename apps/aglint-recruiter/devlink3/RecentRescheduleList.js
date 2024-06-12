"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
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
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "recentrechedule_list")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "reson_rwap")} tag="div">
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
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {textName}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {textTime}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "decline_reason")}
            tag="div"
          >
            <_Builtin.Block tag="div">{textDesc}</_Builtin.Block>
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
