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
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%221em%22%20fill%3D'currentColor'%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20d%3D%22M105.1%20202.6c7.7-21.8%2020.2-42.3%2037.8-59.8c62.5-62.5%20163.8-62.5%20226.3%200L386.3%20160H336c-17.7%200-32%2014.3-32%2032s14.3%2032%2032%2032H463.5c0%200%200%200%200%200h.4c17.7%200%2032-14.3%2032-32V64c0-17.7-14.3-32-32-32s-32%2014.3-32%2032v51.2L414.4%2097.6c-87.5-87.5-229.3-87.5-316.8%200C73.2%20122%2055.6%20150.7%2044.8%20181.4c-5.9%2016.7%202.9%2034.9%2019.5%2040.8s34.9-2.9%2040.8-19.5zM39%20289.3c-5%201.5-9.8%204.2-13.7%208.2c-4%204-6.7%208.8-8.1%2014c-.3%201.2-.6%202.5-.8%203.8c-.3%201.7-.4%203.4-.4%205.1V448c0%2017.7%2014.3%2032%2032%2032s32-14.3%2032-32V396.9l17.6%2017.5%200%200c87.5%2087.4%20229.3%2087.4%20316.7%200c24.4-24.4%2042.1-53.1%2052.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9%202.9-40.8%2019.5c-7.7%2021.8-20.2%2042.3-37.8%2059.8c-62.5%2062.5-163.8%2062.5-226.3%200l-.1-.1L125.6%20352H176c17.7%200%2032-14.3%2032-32s-14.3-32-32-32H48.4c-1.6%200-3.2%20.1-4.8%20.3s-3.1%20.5-4.6%201z%22%2F%3E%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
      <_Builtin.Block tag="div">{text}</_Builtin.Block>
    </_Component>
  );
}
