import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./MobileLinkDashBoard.module.css";

export function MobileLinkDashBoard({
  as: _Component = _Builtin.Block,
  isDashboard = true,
  onClickDashBoard = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "nav_mainlink_mobile_with-text")}
      tag="div"
      {...onClickDashBoard}
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_flex")}
        value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M21%2019.9997C21%2020.552%2020.5523%2020.9997%2020%2020.9997H4C3.44772%2020.9997%203%2020.552%203%2019.9997V9.48882C3%209.18023%203.14247%208.88893%203.38606%208.69947L11.3861%202.47725C11.7472%202.19639%2012.2528%202.19639%2012.6139%202.47725L20.6139%208.69947C20.8575%208.88893%2021%209.18023%2021%209.48882V19.9997ZM19%2018.9997V9.97791L12%204.53346L5%209.97791V18.9997H19Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
      />
      <_Builtin.Block tag="div">{"Dashboard"}</_Builtin.Block>
      {isDashboard ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "mobilelink_active")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M21%2019.9997C21%2020.552%2020.5523%2020.9997%2020%2020.9997H4C3.44772%2020.9997%203%2020.552%203%2019.9997V9.48882C3%209.18023%203.14247%208.88893%203.38606%208.69947L11.3861%202.47725C11.7472%202.19639%2012.2528%202.19639%2012.6139%202.47725L20.6139%208.69947C20.8575%208.88893%2021%209.18023%2021%209.48882V19.9997ZM19%2018.9997V9.97791L12%204.53346L5%209.97791V18.9997H19Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Dashboard"}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
