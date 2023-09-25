import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NotificationWarning.module.css";

export function NotificationWarning({
  as: _Component = _Builtin.Block,
  notificationHeaderWarning = "",
  notificationParaWarning = "Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "notification-warning")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "notification-header-wrapper")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icon-warning")}
          value="%3Csvg%20width%3D%2216%22%20height%3D%2214%22%20viewbox%3D%220%200%2013%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.38211%201.03596C7.21575%200.709901%206.87375%200.500488%206.50022%200.500488C6.12815%200.500488%205.78736%200.708266%205.61687%201.0387L1.11832%209.53596C0.758569%2010.1954%201.24268%2010.9999%202.00022%2010.9999H11.0002C11.7578%2010.9999%2012.2419%2010.1954%2011.8792%209.53048L7.38211%201.03596ZM10.9962%209.99991H2.00415L6.50025%201.50737L10.9962%209.99991ZM7.00022%205.99991V3.99991C7.00022%203.33324%206.00022%203.33324%206.00022%203.99991V5.99991C6.00022%206.66658%207.00022%206.66658%207.00022%205.99991ZM6.50022%208.79991C6.94204%208.79991%207.30022%208.44174%207.30022%207.99991C7.30022%207.55808%206.94204%207.19991%206.50022%207.19991C6.05839%207.19991%205.70022%207.55808%205.70022%207.99991C5.70022%208.44174%206.05839%208.79991%206.50022%208.79991Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "notification-header-warning")}
          tag="div"
        >
          {notificationHeaderWarning}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "notification-para-warning")}
        tag="div"
      >
        {notificationParaWarning}
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "close-icon-warning")}
        value="%3Csvg%20width%3D%229%22%20height%3D%229%22%20viewbox%3D%220%200%208%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0.646447%207.35355C0.841709%207.54882%201.15829%207.54882%201.35355%207.35355L4%204.70711L6.64645%207.35355C6.84171%207.54882%207.15829%207.54882%207.35355%207.35355C7.54882%207.15829%207.54882%206.84171%207.35355%206.64645L4.70711%204L7.35355%201.35355C7.54882%201.15829%207.54882%200.841709%207.35355%200.646447C7.15829%200.451184%206.84171%200.451184%206.64645%200.646447L4%203.29289L1.35355%200.646447C1.15829%200.451184%200.841709%200.451184%200.646447%200.646447C0.451184%200.841709%200.451184%201.15829%200.646447%201.35355L3.29289%204L0.646447%206.64645C0.451184%206.84171%200.451184%207.15829%200.646447%207.35355Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
      />
    </_Component>
  );
}
