import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./WidgetUserCard.module.css";

export function WidgetUserCard({
  as: _Component = _Builtin.Block,
  slotUserAvatar,
  textName = "Username",
  textEmail = "email id",
  onClickUser = {},
  isSelected = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "usercard")}
      tag="div"
      {...onClickUser}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_useravatr")}
        tag="div"
      >
        {slotUserAvatar}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "panel_card_text")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textName}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "color-grey-600")}
          tag="div"
        >
          {textEmail}
        </_Builtin.Block>
      </_Builtin.Block>
      {isSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "is_active_blue_100")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
