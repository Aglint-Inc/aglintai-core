import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./IntegrationThanks.module.css";

export function IntegrationThanks({
  as: _Component = _Builtin.Block,
  slotButtonClose,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1250")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1251")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M20%200.799805C30.5965%200.799805%2039.2001%209.40333%2039.2001%2019.9998C39.2001%2030.5963%2030.5965%2039.1998%2020%2039.1998C9.40357%2039.1998%200.800049%2030.5963%200.800049%2019.9998C0.800049%209.40333%209.40357%200.799805%2020%200.799805Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3Cpath%20d%3D%22M20%200.799805C30.5965%200.799805%2039.2%209.40333%2039.2%2019.9998C39.2%2030.5963%2030.5965%2039.1998%2020%2039.1998C9.40357%2039.1998%200.800049%2030.5963%200.800049%2019.9998C0.800049%209.40333%209.40357%200.799805%2020%200.799805Z%22%20stroke%3D%22%23228F67%22%20stroke-width%3D%221.3%22%2F%3E%0A%3Cpath%20d%3D%22M10%2019.9998L17.4%2025.9998C17.4%2025.9998%2028.7408%2015.0791%2030.6336%2013.2563%22%20stroke%3D%22white%22%20stroke-width%3D%222.6%22%20stroke-linecap%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1252")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"We have recieved your request"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {
              "Thank you for your time. We will review your request and get back to you."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotButtonClose}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
