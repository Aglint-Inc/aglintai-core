"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./WorkflowConnector.module.css";

export function WorkflowConnector({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "workflow_connector")} tag="div">
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_flex")}
        value="%3Csvg%20width%3D%2216%22%20height%3D%2245%22%20viewBox%3D%220%200%2016%2045%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.29289%2044.7071C7.68342%2045.0976%208.31658%2045.0976%208.70711%2044.7071L15.0711%2038.3431C15.4616%2037.9526%2015.4616%2037.3195%2015.0711%2036.9289C14.6805%2036.5384%2014.0474%2036.5384%2013.6569%2036.9289L8%2042.5858L2.34315%2036.9289C1.95262%2036.5384%201.31946%2036.5384%200.928932%2036.9289C0.538408%2037.3195%200.538408%2037.9526%200.928932%2038.3431L7.29289%2044.7071ZM7%200L7%2044H9L9%200L7%200Z%22%20fill%3D%22var(--neutral-6)%22%2F%3E%0A%3C%2Fsvg%3E"
      />
    </_Component>
  );
}
