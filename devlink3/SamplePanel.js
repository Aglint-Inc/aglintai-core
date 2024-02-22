import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SamplePanel.module.css";

export function SamplePanel({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "widget_flex")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "iv_panel_card")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "panel_card_text")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            {"Software Engineering Panel"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "color-grey-600")}
            tag="div"
          >
            {"3 Members"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Image
          className={_utils.cx(_styles, "avatar_group_30")}
          loading="eager"
          width="auto"
          height="auto"
          alt=""
          src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d5b9be011212b8859e1c13_3member.png"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "iv_panel_card")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "panel_card_text")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Test Engineer"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "color-grey-600")}
            tag="div"
          >
            {"11 Members"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Image
          className={_utils.cx(_styles, "avatar_group_30")}
          loading="eager"
          width="auto"
          height="auto"
          alt=""
          src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d5b97945c04b6a6bf31da6_r.png"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "iv_panel_card")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "panel_card_text")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            <_Builtin.Span>
              {"Natural Language Processing Expert Panel"}
            </_Builtin.Span>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "color-grey-600")}
            tag="div"
          >
            {"4 Members"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Image
          className={_utils.cx(_styles, "avatar_group_30")}
          loading="eager"
          width="auto"
          height="auto"
          alt=""
          src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d5b9987c71f33757c13b16_4member.png"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "iv_panel_card")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "panel_card_text")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            {"Technical Leadership Panel"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "color-grey-600")}
            tag="div"
          >
            {"5 Members"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Image
          className={_utils.cx(_styles, "avatar_group_30")}
          loading="eager"
          width="auto"
          height="auto"
          alt=""
          src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d5ad0a5a40e89e5ed867c8_avatar-grup-with-confirm.png"
        />
      </_Builtin.Block>
    </_Component>
  );
}
