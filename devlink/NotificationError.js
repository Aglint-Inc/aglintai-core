import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NotificationError.module.css";

export function NotificationError({
  as: _Component = _Builtin.Block,
  notificationWarningHeader = "Error",
  notificationWarningPara = "Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water",
}) {
  return (
    <_Component className={_utils.cx(_styles, "notification-error")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "notification-header-wrapper")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icon-error")}
          value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.5%204C7.22386%204%207%204.22386%207%204.5V9C7%209.27614%207.22386%209.5%207.5%209.5C7.77614%209.5%208%209.27614%208%209V4.5C8%204.22386%207.77614%204%207.5%204ZM7.5%2013C8.05228%2013%208.5%2012.5523%208.5%2012C8.5%2011.4477%208.05228%2011%207.5%2011C6.94772%2011%206.5%2011.4477%206.5%2012C6.5%2012.5523%206.94772%2013%207.5%2013ZM7.5%2016C3.35786%2016%200%2012.6421%200%208.5C0%204.35786%203.35786%201%207.5%201C11.6421%201%2015%204.35786%2015%208.5C15%2012.6421%2011.6421%2016%207.5%2016ZM7.5%2015C11.0899%2015%2014%2012.0899%2014%208.5C14%204.91015%2011.0899%202%207.5%202C3.91015%202%201%204.91015%201%208.5C1%2012.0899%203.91015%2015%207.5%2015Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3Cmask%20id%3D%22mask0_2_1062%22%20style%3D%22mask-type%3Aluminance%22%20maskunits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%221%22%20width%3D%2215%22%20height%3D%2215%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.5%204C7.22386%204%207%204.22386%207%204.5V9C7%209.27614%207.22386%209.5%207.5%209.5C7.77614%209.5%208%209.27614%208%209V4.5C8%204.22386%207.77614%204%207.5%204ZM7.5%2013C8.05228%2013%208.5%2012.5523%208.5%2012C8.5%2011.4477%208.05228%2011%207.5%2011C6.94772%2011%206.5%2011.4477%206.5%2012C6.5%2012.5523%206.94772%2013%207.5%2013ZM7.5%2016C3.35786%2016%200%2012.6421%200%208.5C0%204.35786%203.35786%201%207.5%201C11.6421%201%2015%204.35786%2015%208.5C15%2012.6421%2011.6421%2016%207.5%2016ZM7.5%2015C11.0899%2015%2014%2012.0899%2014%208.5C14%204.91015%2011.0899%202%207.5%202C3.91015%202%201%204.91015%201%208.5C1%2012.0899%203.91015%2015%207.5%2015Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask0_2_1062)%22%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "notification-warning-header")}
          tag="div"
        >
          {notificationWarningHeader}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "notification-warning-para")}
        tag="div"
      >
        {notificationWarningPara}
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "close-icon-error")}
        value="%3Csvg%20width%3D%229%22%20height%3D%229%22%20viewbox%3D%220%200%208%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0.646447%207.35355C0.841709%207.54882%201.15829%207.54882%201.35355%207.35355L4%204.70711L6.64645%207.35355C6.84171%207.54882%207.15829%207.54882%207.35355%207.35355C7.54882%207.15829%207.54882%206.84171%207.35355%206.64645L4.70711%204L7.35355%201.35355C7.54882%201.15829%207.54882%200.841709%207.35355%200.646447C7.15829%200.451184%206.84171%200.451184%206.64645%200.646447L4%203.29289L1.35355%200.646447C1.15829%200.451184%200.841709%200.451184%200.646447%200.646447C0.451184%200.841709%200.451184%201.15829%200.646447%201.35355L3.29289%204L0.646447%206.64645C0.451184%206.84171%200.451184%207.15829%200.646447%207.35355Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
      />
    </_Component>
  );
}
