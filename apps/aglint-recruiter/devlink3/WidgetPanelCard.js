"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./WidgetPanelCard.module.css";

export function WidgetPanelCard({
  as: _Component = _Builtin.Block,
  textPanelName = "SW Eng Panel",
  textMemberCount = "5 Members",
  slotAvatarGroup,
  onClickCard = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "iv_panel_card")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "panel_card_text")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textPanelName}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "color-grey-600")}
          tag="div"
        >
          {textMemberCount}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slotavatar_group")}
        tag="div"
      >
        {slotAvatarGroup ?? (
          <_Builtin.Image
            className={_utils.cx(_styles, "avatar_group_30")}
            loading="eager"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d5ad0a5a40e89e5ed867c8_avatar-grup-with-confirm.png"
          />
        )}
      </_Builtin.Block>
    </_Component>
  );
}
