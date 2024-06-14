"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RecentDeclineList.module.css";

export function RecentDeclineList({
  as: _Component = _Builtin.Block,
  slotImage,
  textDesc = "Medical Emergency ",
  slotIcon,
  textTime = "10 Min ago",
  textName = "Kristin Watson",
}) {
  return (
    <_Component className={_utils.cx(_styles, "decline_list")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "avatar_40")} tag="div">
        {slotImage ?? (
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d8b0e9a0e9f0451bc3536c_user2.png"
          />
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "decline_details")}
        tag="div"
      >
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
    </_Component>
  );
}
