"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Close.module.css";

export function Close({ as: _Component = _Builtin.Block, onClickClose = {} }) {
  return (
    <_Component
      className={_utils.cx(_styles, "close-btn-cd")}
      tag="div"
      {...onClickClose}
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "icons")}
        value="%3Csvg%20width%3D%229%22%20height%3D%2210%22%20viewBox%3D%220%200%209%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.13672%208.98828L4.5%205.37891L0.890624%208.98828C0.671874%209.15234%200.462239%209.15234%200.261718%208.98828C0.0976554%208.78776%200.0976554%208.58724%200.261718%208.38672L3.87109%204.75L0.261718%201.14062C0.0976554%200.921874%200.0976554%200.712238%200.261718%200.511717C0.462239%200.347655%200.671874%200.347655%200.890624%200.511717L4.5%204.12109L8.13672%200.511717C8.33724%200.347655%208.53776%200.347655%208.73828%200.511717C8.90234%200.712238%208.90234%200.921874%208.73828%201.14062L5.12891%204.75L8.73828%208.38672C8.90234%208.58724%208.90234%208.78776%208.73828%208.98828C8.53776%209.15234%208.33724%209.15234%208.13672%208.98828Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
      />
    </_Component>
  );
}
