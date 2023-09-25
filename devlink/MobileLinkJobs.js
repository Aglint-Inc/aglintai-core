import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./MobileLinkJobs.module.css";

export function MobileLinkJobs({
  as: _Component = _Builtin.Block,
  onClickJobs = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "nav_mainlink_mobile_with-text")}
      tag="div"
      {...onClickJobs}
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_flex")}
        value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7%205V2C7%201.44772%207.44772%201%208%201H16C16.5523%201%2017%201.44772%2017%202V5H21C21.5523%205%2022%205.44772%2022%206V20C22%2020.5523%2021.5523%2021%2021%2021H3C2.44772%2021%202%2020.5523%202%2020V6C2%205.44772%202.44772%205%203%205H7ZM4%2016V19H20V16H4ZM4%2014H20V7H4V14ZM9%203V5H15V3H9Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
      />
      <_Builtin.Block tag="div">{"Jobs"}</_Builtin.Block>
    </_Component>
  );
}
