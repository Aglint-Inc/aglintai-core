import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./PanelCard.module.css";

export function PanelCard({
  as: _Component = _Builtin.Block,
  textPanelName = "Panel Name",
  textMemberCount = "--",
  slotAvatarGroup,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "panel_card")}
      id={_utils.cx(
        _styles,
        "w-node-a1ac702c-8df1-4a11-2202-ee0b9e47daad-9e47daad"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "panel_text_wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "text_camel_case")}
          tag="div"
        >
          {textPanelName}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "panel_member_count")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "text-gray-600")}
            tag="div"
          >
            {textMemberCount}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "text-gray-600")}
            tag="div"
          >
            {"Members"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "panel_image_slot")}
        tag="div"
      >
        {slotAvatarGroup}
      </_Builtin.Block>
    </_Component>
  );
}
