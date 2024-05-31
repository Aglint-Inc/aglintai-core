"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InlineEditField.module.css";

export function InlineEditField({
  as: _Component = _Builtin.Block,
  slotInput,
  onClickDone = {},
  onClickCancel = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "inputfield")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-741")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "slot_input")} tag="div">
          {slotInput}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-742")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons", "cursor-pointer")}
            value="%3Csvg%20width%3D%2225%22%20height%3D%2226%22%20viewbox%3D%220%200%2025%2026%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M21.0547%206.94531C21.3151%207.23177%2021.3151%207.51823%2021.0547%207.80469L10.4297%2018.4297C10.1432%2018.6901%209.85677%2018.6901%209.57031%2018.4297L3.94531%2012.8047C3.6849%2012.5182%203.6849%2012.2318%203.94531%2011.9453C4.23177%2011.6849%204.51823%2011.6849%204.80469%2011.9453L10%2017.1016L20.1953%206.94531C20.4818%206.6849%2020.7682%206.6849%2021.0547%206.94531Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickDone}
          />
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons", "cursor-pointer")}
            value="%3Csvg%20width%3D%2225%22%20height%3D%2226%22%20viewbox%3D%220%200%2025%2026%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M17.6953%2019.0547L12.5%2013.8984L7.34375%2019.0547C7.03125%2019.2891%206.73177%2019.2891%206.44531%2019.0547C6.21094%2018.7682%206.21094%2018.4818%206.44531%2018.1953L11.6016%2013L6.44531%207.84375C6.21094%207.53125%206.21094%207.23177%206.44531%206.94531C6.73177%206.71094%207.03125%206.71094%207.34375%206.94531L12.5%2012.1016L17.6953%206.94531C17.9818%206.71094%2018.2682%206.71094%2018.5547%206.94531C18.7891%207.23177%2018.7891%207.53125%2018.5547%207.84375L13.3984%2013L18.5547%2018.1953C18.7891%2018.4818%2018.7891%2018.7682%2018.5547%2019.0547C18.2682%2019.2891%2017.9818%2019.2891%2017.6953%2019.0547Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickCancel}
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
