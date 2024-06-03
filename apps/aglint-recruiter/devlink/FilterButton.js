"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FilterButton.module.css";

export function FilterButton({
  as: _Component = _Builtin.Block,
  onClickFilter = {},
  isNotificationVisible = true,
  textFilterCount = "1",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-617")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-618", "cursor-pointer")}
        tag="div"
        {...onClickFilter}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.50087%205.78034L0.748206%202.02768C0.533618%201.80879%200.47247%201.48632%200.590555%201.20751C0.70864%200.9287%200.982793%200.748241%201.28337%200.750013L10.7311%200.75005C11.0312%200.754265%2011.2999%200.936931%2011.4141%201.21441C11.5284%201.4919%2011.4662%201.81077%2011.2535%202.02768L7.50087%205.78034V9.93001C7.50087%2010.1841%207.37721%2010.4232%207.16852%2010.5573L5.66888%2011.5545C5.17153%2011.8861%204.50087%2011.5262%204.50087%2010.9275V5.78034ZM1.28085%201.49973L5.25055%205.46941V10.9272C5.25055%2010.9274%206.75777%209.92929%206.75777%209.92929C6.75112%209.93357%206.75055%205.46941%206.75055%205.46941L6.86039%205.35957L10.7203%201.4997L1.28085%201.49973Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block tag="div">{"Filter"}</_Builtin.Block>
      </_Builtin.Block>
      {isNotificationVisible ? (
        <_Builtin.Block className={_utils.cx(_styles, "number-text")} tag="div">
          <_Builtin.Block tag="div">{textFilterCount}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
