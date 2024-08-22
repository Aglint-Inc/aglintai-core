"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./PiplelineTab.module.css";

export function PiplelineTab({
  as: _Component = _Builtin.Block,
  color = "neutral",
  iconName = "workspaces",
  slotIcon,
  textStageName = "Stage 2 HR round",
  textProgress = "This is a global text component",
  isActive = false,
  onClickTab = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "pipeline-copy-tabs")}
      tag="div"
      data-embed-color="info"
      {...onClickTab}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "text_bloxk", "change_on_hover")}
        tag="div"
        data-bg-color={color}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "relative_2")}
          tag="div"
        >
          {textStageName}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-text-with-icon")}
          tag="div"
          data-text-color={color}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_icon_20")}
            tag="div"
          >
            {slotIcon ?? <GlobalIcon iconName={iconName} />}
          </_Builtin.Block>
          <Text content={textProgress} color="inherit" weight="regular" />
        </_Builtin.Block>
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "arrow_right", "absoulgte")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            data-embed-color={color}
            value="%3Csvg%20width%3D%2234%22%20height%3D%2266%22%20viewBox%3D%220%200%2034%2066%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%200L34%2032.4469L0%2066V0Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex", "is_on_left")}
            value="%3Csvg%20width%3D%2234%22%20height%3D%2266%22%20viewBox%3D%220%200%2034%2066%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M34%200V66H0C0%2066%2034%2034.8539%2034%2033C34%2031.1461%200%200%200%200H34Z%22%20fill%3D%22%23F9F9F8%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
