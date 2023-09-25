import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NotificationSuccess.module.css";

export function NotificationSuccess({
  as: _Component = _Builtin.Block,
  notificationHeaderSuccess = "Success",
  notificationParaSuccess = "Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "notification-success")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "notification-header-wrapper")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icon-success")}
          value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.64645%204.14645C8.84171%203.95118%209.15829%203.95118%209.35355%204.14645C9.54882%204.34171%209.54882%204.65829%209.35355%204.85355L5.85355%208.35355C5.65829%208.54882%205.34171%208.54882%205.14645%208.35355L3.14645%206.35355C2.95118%206.15829%202.95118%205.84171%203.14645%205.64645C3.34171%205.45118%203.65829%205.45118%203.85355%205.64645L5.5%207.29289L8.64645%204.14645ZM6%2012C2.68629%2012%200%209.31371%200%206C0%202.68629%202.68629%200%206%200C9.31371%200%2012%202.68629%2012%206C12%209.31371%209.31371%2012%206%2012ZM6%2011C8.76142%2011%2011%208.76142%2011%206C11%203.23858%208.76142%201%206%201C3.23858%201%201%203.23858%201%206C1%208.76142%203.23858%2011%206%2011Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "notification-header-success")}
          tag="div"
        >
          {notificationHeaderSuccess}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "notification-para-success")}
        tag="div"
      >
        {notificationParaSuccess}
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "close-icon-success")}
        value="%3Csvg%20width%3D%229%22%20height%3D%229%22%20viewbox%3D%220%200%208%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0.646447%207.35355C0.841709%207.54882%201.15829%207.54882%201.35355%207.35355L4%204.70711L6.64645%207.35355C6.84171%207.54882%207.15829%207.54882%207.35355%207.35355C7.54882%207.15829%207.54882%206.84171%207.35355%206.64645L4.70711%204L7.35355%201.35355C7.54882%201.15829%207.54882%200.841709%207.35355%200.646447C7.15829%200.451184%206.84171%200.451184%206.64645%200.646447L4%203.29289L1.35355%200.646447C1.15829%200.451184%200.841709%200.451184%200.646447%200.646447C0.451184%200.841709%200.451184%201.15829%200.646447%201.35355L3.29289%204L0.646447%206.64645C0.451184%206.84171%200.451184%207.15829%200.646447%207.35355Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
      />
    </_Component>
  );
}
