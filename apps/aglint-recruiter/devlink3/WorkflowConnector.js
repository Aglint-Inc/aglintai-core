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
        value="%3Csvg%20width%3D%228%22%20height%3D%2240%22%20viewBox%3D%220%200%208%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.64645%2040.3536C3.84171%2040.5488%204.15829%2040.5488%204.35355%2040.3536L7.53553%2037.1716C7.7308%2036.9763%207.7308%2036.6597%207.53553%2036.4645C7.34027%2036.2692%207.02369%2036.2692%206.82843%2036.4645L4%2039.2929L1.17157%2036.4645C0.976311%2036.2692%200.659728%2036.2692%200.464466%2036.4645C0.269204%2036.6597%200.269204%2036.9763%200.464466%2037.1716L3.64645%2040.3536ZM3.5%200L3.5%2040H4.5L4.5%200L3.5%200Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
      />
    </_Component>
  );
}
