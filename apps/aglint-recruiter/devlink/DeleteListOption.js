"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DeleteListOption.module.css";

export function DeleteListOption({
  as: _Component = _Builtin.Block,
  onClickRemove = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-980")} tag="div">
      <_Builtin.Block tag="div">{"San Fransisco, California"}</_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "icons", "cursor-pointer")}
        value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewbox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.11719%2010.1328L6%207.03906L2.90625%2010.1328C2.71875%2010.2734%202.53906%2010.2734%202.36719%2010.1328C2.22656%209.96094%202.22656%209.78906%202.36719%209.61719L5.46094%206.5L2.36719%203.40625C2.22656%203.21875%202.22656%203.03906%202.36719%202.86719C2.53906%202.72656%202.71875%202.72656%202.90625%202.86719L6%205.96094L9.11719%202.86719C9.28906%202.72656%209.46094%202.72656%209.63281%202.86719C9.77344%203.03906%209.77344%203.21875%209.63281%203.40625L6.53906%206.5L9.63281%209.61719C9.77344%209.78906%209.77344%209.96094%209.63281%2010.1328C9.46094%2010.2734%209.28906%2010.2734%209.11719%2010.1328Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
        {...onClickRemove}
      />
    </_Component>
  );
}
