import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RefreshButton.module.css";

export function RefreshButton({
  as: _Component = _Builtin.Block,
  text = "Refresh",
  iconProps = {},
  buttonProps = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "refresh-action-btn", "transparent")}
      tag="div"
      {...buttonProps}
    >
      <_Builtin.Block tag="div" {...iconProps}>
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icon-embed")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3DcurrentColor%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10%203.17769V1.5C10%201.22386%2010.2239%201%2010.5%201C10.7761%201%2011%201.22386%2011%201.5V4C11%204.57614%2010.5761%205%2010%205H7.5C7.22386%205%207%204.77614%207%204.5C7%204.22386%207.22386%204%207.5%204H9.37537C8.33852%202.65831%207.34847%202%205.9%202C3.69893%202%202%203.75286%202%206C2%208.20995%203.76251%2010%205.9%2010C7.01159%2010%208.0891%209.49716%208.8263%208.66782C9.00975%208.46143%209.32579%208.44284%209.53218%208.6263C9.73857%208.80975%209.75716%209.12579%209.5737%209.33218C8.65014%2010.3712%207.30269%2011%205.9%2011C3.20672%2011%201%208.7588%201%206C1%203.20745%203.13953%201%205.9%201C7.64331%201%208.84267%201.74845%2010%203.17769Z%22%20fill%3D%22%231F73B7%22%20style%3D%22fill%3AcurrentColor%20%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
      <_Builtin.Block tag="div">{text}</_Builtin.Block>
    </_Component>
  );
}
