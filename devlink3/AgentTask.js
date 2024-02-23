import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AgentTask.module.css";

export function AgentTask({
  as: _Component = _Builtin.Block,
  onClickCard = {},
  isActive = false,
  textTaskName = "Untitled",
  slotTaskIcon,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "task_card")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "task_type_icon")}
        tag="div"
      >
        {slotTaskIcon ?? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex", "relative_2")}
            value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2240%22%20height%3D%2240%22%20rx%3D%226%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M14.75%208C15.2188%208.03125%2015.4688%208.28125%2015.5%208.75V11H24.5V8.75C24.5312%208.28125%2024.7812%208.03125%2025.25%208C25.7188%208.03125%2025.9688%208.28125%2026%208.75V11H27.5C28.3438%2011.0312%2029.0469%2011.3281%2029.6094%2011.8906C30.1719%2012.4531%2030.4688%2013.1562%2030.5%2014V15.5V17V29C30.4688%2029.8438%2030.1719%2030.5469%2029.6094%2031.1094C29.0469%2031.6719%2028.3438%2031.9688%2027.5%2032H12.5C11.6562%2031.9688%2010.9531%2031.6719%2010.3906%2031.1094C9.82812%2030.5469%209.53125%2029.8438%209.5%2029V17V15.5V14C9.53125%2013.1562%209.82812%2012.4531%2010.3906%2011.8906C10.9531%2011.3281%2011.6562%2011.0312%2012.5%2011H14V8.75C14.0312%208.28125%2014.2812%208.03125%2014.75%208ZM29%2017H11V29C11%2029.4375%2011.1406%2029.7969%2011.4219%2030.0781C11.7031%2030.3594%2012.0625%2030.5%2012.5%2030.5H27.5C27.9375%2030.5%2028.2969%2030.3594%2028.5781%2030.0781C28.8594%2029.7969%2029%2029.4375%2029%2029V17ZM27.5%2012.5H12.5C12.0625%2012.5%2011.7031%2012.6406%2011.4219%2012.9219C11.1406%2013.2031%2011%2013.5625%2011%2014V15.5H29V14C29%2013.5625%2028.8594%2013.2031%2028.5781%2012.9219C28.2969%2012.6406%2027.9375%2012.5%2027.5%2012.5Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E%0A%3Cstyle%3E%0A.two_line_clamp%7B%0Aoverflow%3A%20hidden%3B%0A%20%20display%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%202%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%0A%20%20line-height%3A%201.5%20!important%3B%0A%20%20max-height%3A%20calc(1%20*%202)%3B%0A%7D%0A%3C%2Fstyle%3E"
          />
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "fw-semibold",
          "relative_2",
          "two_line_clamp"
        )}
        tag="div"
      >
        {textTaskName}
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block className={_utils.cx(_styles, "active_bg")} tag="div" />
      ) : null}
    </_Component>
  );
}
