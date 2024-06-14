"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ShadowSessionCard } from "./ShadowSessionCard";
import { MutedShadowSession } from "./MutedShadowSession";
import * as _utils from "./utils";
import _styles from "./ShadowSession.module.css";

export function ShadowSession({
  as: _Component = _Builtin.Block,
  slotProfileImage,
  textName = "Training progress of",
  onClickClose = {},
  slotShadowSessionCard,
  isHeadingCloseVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1198")} tag="div">
      {isHeadingCloseVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1199")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1200")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Training progress of"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1214")}
              tag="div"
            >
              {slotProfileImage}
            </_Builtin.Block>
            <_Builtin.Block tag="div">{textName}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons", "cursor-pointer")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2216%22%20viewbox%3D%220%200%2012%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.7812%204.28125L7.0625%208L10.7812%2011.7188C11.0729%2012.0729%2011.0729%2012.4271%2010.7812%2012.7812C10.4271%2013.0729%2010.0729%2013.0729%209.71875%2012.7812L6%209.0625L2.28125%2012.7812C1.92708%2013.0729%201.57292%2013.0729%201.21875%2012.7812C0.927083%2012.4271%200.927083%2012.0729%201.21875%2011.7188L4.9375%208L1.21875%204.28125C0.927083%203.92708%200.927083%203.57292%201.21875%203.21875C1.57292%202.92708%201.92708%202.92708%202.28125%203.21875L6%206.9375L9.71875%203.21875C10.0729%202.92708%2010.4271%202.92708%2010.7812%203.21875C11.0729%203.57292%2011.0729%203.92708%2010.7812%204.28125Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickClose}
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "mt-40", "flex-vertical")}
        tag="div"
      >
        {slotShadowSessionCard ?? (
          <>
            <ShadowSessionCard />
            <MutedShadowSession />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
