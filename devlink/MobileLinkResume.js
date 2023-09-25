import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./MobileLinkResume.module.css";

export function MobileLinkResume({
  as: _Component = _Builtin.Block,
  onClickResume = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "nav_mainlink_mobile_with-text")}
      tag="div"
      {...onClickResume}
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_flex")}
        value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M20%2022H4C3.44772%2022%203%2021.5523%203%2021V3C3%202.44772%203.44772%202%204%202H20C20.5523%202%2021%202.44772%2021%203V21C21%2021.5523%2020.5523%2022%2020%2022ZM19%2020V4H5V20H19ZM7%206H11V10H7V6ZM7%2012H17V14H7V12ZM7%2016H17V18H7V16ZM13%207H17V9H13V7Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
      />
      <_Builtin.Block tag="div">{"Resume & Cover Letter"}</_Builtin.Block>
    </_Component>
  );
}
