"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DelJobBtn.module.css";

export function DelJobBtn({ as: _Component = _Builtin.Block, onClick = {} }) {
  return (
    <_Component
      className={_utils.cx(_styles, "del-job-per-btn")}
      tag="div"
      {...onClick}
    >
      <_Builtin.Block tag="div">
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "svg-icon")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_2424_66581)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%226.8%22%20fill%3D%22white%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222.4%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%221.54297%22%20y%3D%224.375%22%20width%3D%222.66667%22%20height%3D%2213.7114%22%20transform%3D%22rotate(-46.5967%201.54297%204.375)%22%20fill%3D%22currentColor%2F%22%3E%0A%20%20%3C%2Frect%3E%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cclippath%20id%3D%22clip0_2424_66581%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22currentColor%2F%22%3E%0A%20%20%20%20%3C%2Frect%3E%3C%2Fclippath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {"Permanently close this job"}
      </_Builtin.Block>
    </_Component>
  );
}
