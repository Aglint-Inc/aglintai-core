"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ChooseScreeningCard.module.css";

export function ChooseScreeningCard({
  as: _Component = _Builtin.Block,
  onClickCard = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1007")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "icons")}
        value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.5%204V9.5H16C16.3125%209.52083%2016.4792%209.6875%2016.5%2010C16.4792%2010.3125%2016.3125%2010.4792%2016%2010.5H10.5V16C10.4792%2016.3125%2010.3125%2016.4792%2010%2016.5C9.6875%2016.4792%209.52083%2016.3125%209.5%2016V10.5H4C3.6875%2010.4792%203.52083%2010.3125%203.5%2010C3.52083%209.6875%203.6875%209.52083%204%209.5H9.5V4C9.52083%203.6875%209.6875%203.52083%2010%203.5C10.3125%203.52083%2010.4792%203.6875%2010.5%204Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
      />
      <_Builtin.Block tag="div">{"Choose screening"}</_Builtin.Block>
    </_Component>
  );
}
