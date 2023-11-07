import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ResAbsentError.module.css";

export function ResAbsentError({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "res-not-found-block")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "rnf-header")} tag="div">
        <_Builtin.Block tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon-embed")}
            value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.41667%201.1665C2.87%201.1665%200%204.0365%200%207.58317C0%2011.1298%202.87%2013.9998%206.41667%2013.9998C9.96333%2013.9998%2012.8333%2011.1298%2012.8333%207.58317C12.8333%204.0365%209.96333%201.1665%206.41667%201.1665ZM5.83333%204.08309C5.83333%203.75642%206.09%203.49976%206.41667%203.49976C6.74333%203.49976%207%203.75642%207%204.08309V7.58309C7%207.90976%206.74333%208.16642%206.41667%208.16642C6.09%208.16642%205.83333%207.90976%205.83333%207.58309V4.08309ZM6.41667%2011.6664C5.775%2011.6664%205.25%2011.1414%205.25%2010.4998C5.25%209.85809%205.775%209.33309%206.41667%209.33309C7.05833%209.33309%207.58333%209.85809%207.58333%2010.4998C7.58333%2011.1414%207.05833%2011.6664%206.41667%2011.6664Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "text-kale-600")}
          tag="div"
        >
          {"Resume not found"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "text-grey-600")} tag="div">
        {
          "We regret to inform you that we were unable to retrieve the candidate's resume details."
        }
      </_Builtin.Block>
    </_Component>
  );
}
