"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SortButton.module.css";

export function SortButton({
  as: _Component = _Builtin.Block,
  onClickSortby = {},
  isNotificationVisible = true,
  textSortCount = "1",
  isSortBadgeVisible = true,
  textSort = "Location Asc",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-617")}
      tag="div"
      {...onClickSortby}
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "div-block-617",
          "cursor-pointer",
          "sort"
        )}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.95006%201.25677L2.85355%204.35328C2.65829%204.54854%202.34171%204.54854%202.14645%204.35328C1.95118%204.15801%201.95118%203.84143%202.14645%203.64617L5.24645%200.54617C5.64171%200.150907%206.25829%200.150907%206.6479%200.540603L9.8479%203.6406C10.0462%203.83274%2010.0513%204.14928%209.85912%204.34762C9.66698%204.54596%209.35044%204.55098%209.1521%204.35884L5.95006%201.25677ZM9.1521%207.6406C9.35044%207.44846%209.66698%207.45349%209.85912%207.65183C10.0513%207.85016%2010.0462%208.1667%209.8479%208.35884L6.65355%2011.4533C6.25829%2011.8485%205.64171%2011.8485%205.24645%2011.4533L2.14645%208.35328C1.95118%208.15801%201.95118%207.84143%202.14645%207.64617C2.34171%207.45091%202.65829%207.45091%202.85355%207.64617L5.95017%2010.7428C5.95067%2010.7421%209.1521%207.6406%209.1521%207.6406Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block tag="div">{"Sort by"}</_Builtin.Block>
      </_Builtin.Block>
      {isSortBadgeVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-625")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "fw-semibold")}
            tag="div"
          >
            {textSort}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
