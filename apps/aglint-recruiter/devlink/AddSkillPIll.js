"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./AddSkillPIll.module.css";

export function AddSkillPIll({
  as: _Component = _Builtin.Block,
  textSKill = "HTML",
  onClickAdd = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "add-skill-pill")}
      tag="div"
      {...onClickAdd}
    >
      <Text content={textSKill} />
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "icons", "pointer")}
        value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewbox%3D%220%200%2010%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.9987%200.833008C4.74301%200.833008%204.53574%201.04028%204.53574%201.29597V4.53671H1.29499C1.03931%204.53671%200.832031%204.74399%200.832031%204.99967C0.832031%205.25536%201.03931%205.46264%201.29499%205.46264H4.53574V8.70338C4.53574%208.95907%204.74301%209.16634%204.9987%209.16634C5.25439%209.16634%205.46166%208.95907%205.46166%208.70338V5.46264H8.7024C8.95809%205.46264%209.16537%205.25536%209.16537%204.99967C9.16537%204.74399%208.95809%204.53671%208.7024%204.53671H5.46166V1.29597C5.46166%201.04028%205.25439%200.833008%204.9987%200.833008Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
      />
    </_Component>
  );
}
