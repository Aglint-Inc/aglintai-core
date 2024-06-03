"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonOutlinedSmall } from "./ButtonOutlinedSmall";
import * as _utils from "./utils";
import _styles from "./AssessmentInvite.module.css";

export function AssessmentInvite({
  as: _Component = _Builtin.Block,
  textDescription = "This is some text inside of a div block.",
  slotResendButton,
  onClickCopyInterviewLink = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-794")} tag="div">
      <_Builtin.Block tag="div">{textDescription}</_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-385")} tag="div">
        <_Builtin.Block tag="div">
          {slotResendButton ?? (
            <ButtonOutlinedSmall textLabel="Resend Invite" />
          )}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-add-skill-btn-new")}
            tag="div"
            {...onClickCopyInterviewLink}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.625%207.5C2.83211%207.5%203%207.66789%203%207.875C3%208.08211%202.83211%208.25%202.625%208.25H0.75C0.335786%208.25%200%207.91421%200%207.5V0.75C0%200.335786%200.335786%200%200.75%200H7.5C7.91421%200%208.25%200.335786%208.25%200.75V2.625C8.25%202.83211%208.08211%203%207.875%203C7.66789%203%207.5%202.83211%207.5%202.625V0.75H0.75V7.5H2.625ZM4.5%204.5V11.25H11.25V4.5H4.5ZM4.5%203.75H11.25C11.6642%203.75%2012%204.08579%2012%204.5V11.25C12%2011.6642%2011.6642%2012%2011.25%2012H4.5C4.08579%2012%203.75%2011.6642%203.75%2011.25V4.5C3.75%204.08579%204.08579%203.75%204.5%203.75Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "text-blue-600")}
              tag="div"
            >
              {"Invite link"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
