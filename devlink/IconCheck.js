import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./IconCheck.module.css";

export function IconCheck({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "icon-embed-regular")} tag="div">
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "icon-embed")}
        value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12.2929%204.29289C12.6834%203.90237%2013.3166%203.90237%2013.7071%204.29289C14.0976%204.68342%2014.0976%205.31658%2013.7071%205.70711L6.70711%2012.7071C6.31658%2013.0976%205.68342%2013.0976%205.29289%2012.7071L2.29289%209.70711C1.90237%209.31658%201.90237%208.68342%202.29289%208.29289C2.68342%207.90237%203.31658%207.90237%203.70711%208.29289L6%2010.5858L12.2929%204.29289Z%22%20fill%3D%22currentcolor%22%2F%3E%0A%3C%2Fsvg%3E"
      />
    </_Component>
  );
}
