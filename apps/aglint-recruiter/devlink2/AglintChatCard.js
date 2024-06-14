"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AglintChatCard.module.css";

export function AglintChatCard({
  as: _Component = _Builtin.Block,
  isAglintLogoVisible = true,
  isUserLogoVisible = false,
  textMessage = "Thank you. I will let you know if any candidate applies",
  textTime = "8 Hour ago",
  textName = "Aglint",
  slotUserImage,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-938")} tag="div">
      <_Builtin.Block tag="div">
        {isAglintLogoVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-939")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7%200C7.20833%200%207.36458%200.09375%207.46875%200.28125L9.4375%204.5625L13.7188%206.53125C13.9062%206.63542%2014%206.79167%2014%207C14%207.20833%2013.9062%207.35417%2013.7188%207.4375L9.4375%209.4375L7.46875%2013.7188C7.36458%2013.9062%207.20833%2014%207%2014C6.79167%2014%206.64583%2013.9062%206.5625%2013.7188L4.5625%209.4375L0.28125%207.46875C0.09375%207.36458%200%207.20833%200%207C0%206.79167%200.09375%206.64583%200.28125%206.5625L4.5625%204.5625L6.5625%200.28125C6.64583%200.09375%206.79167%200%207%200ZM7%201.6875L5.40625%205.15625C5.34375%205.26042%205.26042%205.34375%205.15625%205.40625L1.6875%207L5.15625%208.59375C5.26042%208.65625%205.34375%208.73958%205.40625%208.84375L7%2012.3125L8.59375%208.84375C8.65625%208.73958%208.73958%208.65625%208.84375%208.59375L12.3125%207L8.84375%205.40625C8.73958%205.34375%208.65625%205.26042%208.59375%205.15625L7%201.6875Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        ) : null}
        {isUserLogoVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-940")}
            tag="div"
          >
            {slotUserImage}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-942")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-941")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {textName}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-block-36")}
            tag="div"
          >
            {textTime}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">{textMessage}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
