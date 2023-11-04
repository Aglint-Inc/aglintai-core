import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonPrimarySmall } from "./ButtonPrimarySmall";
import * as _utils from "./utils";
import _styles from "./UnableFetchResume.module.css";

export function UnableFetchResume({
  as: _Component = _Builtin.Block,
  onClickViewResume = {},
  onClickDownloadResume = {},

  propsLink = {
    href: "#",
  },

  slotDownload,
}) {
  return (
    <_Component className={_utils.cx(_styles, "unable-fetch")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "", "div-block-521")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6.41667%201.16675C2.87%201.16675%200%204.03675%200%207.58342C0%2011.1301%202.87%2014.0001%206.41667%2014.0001C9.96333%2014.0001%2012.8333%2011.1301%2012.8333%207.58342C12.8333%204.03675%209.96333%201.16675%206.41667%201.16675ZM5.83333%204.08333C5.83333%203.75667%206.09%203.5%206.41667%203.5C6.74333%203.5%207%203.75667%207%204.08333V7.58333C7%207.91%206.74333%208.16667%206.41667%208.16667C6.09%208.16667%205.83333%207.91%205.83333%207.58333V4.08333ZM6.41667%2011.6667C5.775%2011.6667%205.25%2011.1417%205.25%2010.5C5.25%209.85833%205.775%209.33333%206.41667%209.33333C7.05833%209.33333%207.58333%209.85833%207.58333%2010.5C7.58333%2011.1417%207.05833%2011.6667%206.41667%2011.6667Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Unable to fetch resume details"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "color-grey-600")}
        tag="div"
      >
        {
          "We regret to inform you that we were unable to retrieve the candidate's resume details. Please review the resume manually and make a decision to move the candidate to the appropriate category: interviewing, qualified, or disqualified."
        }
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "button-wrappers-unable-fetch")}
        tag="div"
      >
        <_Builtin.Block tag="div" {...onClickViewResume}>
          <ButtonPrimarySmall textLabel="View Resume" />
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotDownload}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
