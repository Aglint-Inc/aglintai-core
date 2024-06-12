"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./LeaderBoardCard.module.css";

export function LeaderBoardCard({
  as: _Component = _Builtin.Block,
  slotImage,
  textName = "Darlene Robertson",
  textRole = "HR Specialist",
  noHours = "170.4",
  textHour = "Hours",
  noInterview = "23",
  textInterview = "Interviews",
  textCountNo = "1.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "leaderboard_row")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "leaderboard_row_left")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textCountNo}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "interviewer_info_wrap")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "avatar_40")} tag="div">
            {slotImage ?? (
              <_Builtin.Image
                className={_utils.cx(_styles, "image_cover")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d8b0e9a0e9f0451bc3536c_user2.png"
              />
            )}
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "flex_v4")} tag="div">
            <Text content={textName} weight="" />
            <Text content={textRole} size="1" color="neutral" weight="" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "leaderboard_row_right")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "hours")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-lg")}
            tag="div"
          >
            {noHours}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "text-grey_600")}
            tag="div"
          >
            {textHour}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "hours")} tag="div">
          <_Builtin.Block tag="div">{noInterview}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "text-grey_600")}
            tag="div"
          >
            {textInterview}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
