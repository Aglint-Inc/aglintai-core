import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NotificationInfo.module.css";

export function NotificationInfo({
  as: _Component = _Builtin.Block,
  notificationHeaderInfo = "Info",
  notificationParaInfo = "Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water",
}) {
  return (
    <_Component className={_utils.cx(_styles, "notification-info")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "notification-header-wrapper")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icon-info")}
          value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.5%205C8.05228%205%208.5%204.55228%208.5%204C8.5%203.44772%208.05228%203%207.5%203C6.94772%203%206.5%203.44772%206.5%204C6.5%204.55228%206.94772%205%207.5%205ZM7.5%2012C7.77614%2012%208%2011.7761%208%2011.5V7C8%206.72386%207.77614%206.5%207.5%206.5C7.22386%206.5%207%206.72386%207%207V11.5C7%2011.7761%207.22386%2012%207.5%2012ZM7.5%2015C3.35786%2015%200%2011.6421%200%207.5C0%203.35786%203.35786%200%207.5%200C11.6421%200%2015%203.35786%2015%207.5C15%2011.6421%2011.6421%2015%207.5%2015ZM7.5%2014C11.0899%2014%2014%2011.0899%2014%207.5C14%203.91015%2011.0899%201%207.5%201C3.91015%201%201%203.91015%201%207.5C1%2011.0899%203.91015%2014%207.5%2014Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "notification-header-info")}
          tag="div"
        >
          {notificationHeaderInfo}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "notification-para-info")}
        tag="div"
      >
        {notificationParaInfo}
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "close-icon-info")}
        value="%3Csvg%20width%3D%229%22%20height%3D%229%22%20viewbox%3D%220%200%208%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0.646447%207.35355C0.841709%207.54882%201.15829%207.54882%201.35355%207.35355L4%204.70711L6.64645%207.35355C6.84171%207.54882%207.15829%207.54882%207.35355%207.35355C7.54882%207.15829%207.54882%206.84171%207.35355%206.64645L4.70711%204L7.35355%201.35355C7.54882%201.15829%207.54882%200.841709%207.35355%200.646447C7.15829%200.451184%206.84171%200.451184%206.64645%200.646447L4%203.29289L1.35355%200.646447C1.15829%200.451184%200.841709%200.451184%200.646447%200.646447C0.451184%200.841709%200.451184%201.15829%200.646447%201.35355L3.29289%204L0.646447%206.64645C0.451184%206.84171%200.451184%207.15829%200.646447%207.35355Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
      />
    </_Component>
  );
}
