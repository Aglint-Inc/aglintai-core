"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./InterviewPanelMember.module.css";

export function InterviewPanelMember({
  as: _Component = _Builtin.Block,
  isConfirmed = false,
  textMemberName = "Chinmai",
  slotMemberAvatar,
}) {
  return (
    <_Component className={_utils.cx(_styles, "panelmember")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "panel_image")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-panel_member-avatar")}
          tag="div"
        >
          {slotMemberAvatar}
        </_Builtin.Block>
        {isConfirmed ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "is_selected_check")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_check")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_4072_54967)%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%228%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M8%2016C6.54167%2015.9792%205.20833%2015.625%204%2014.9375C2.79167%2014.2292%201.8125%2013.25%201.0625%2012C0.354167%2010.7292%200%209.39583%200%208C0%206.60417%200.354167%205.27083%201.0625%204C1.8125%202.75%202.79167%201.77083%204%201.0625C5.20833%200.375%206.54167%200.0208333%208%200C9.45833%200.0208333%2010.7917%200.375%2012%201.0625C13.2083%201.77083%2014.1875%202.75%2014.9375%204C15.6458%205.27083%2016%206.60417%2016%208C16%209.39583%2015.6458%2010.7292%2014.9375%2012C14.1875%2013.25%2013.2083%2014.2292%2012%2014.9375C10.7917%2015.625%209.45833%2015.9792%208%2016ZM11.5312%206.53125C11.8229%206.17708%2011.8229%205.82292%2011.5312%205.46875C11.1771%205.17708%2010.8229%205.17708%2010.4688%205.46875L7%208.9375L5.53125%207.46875C5.17708%207.17708%204.82292%207.17708%204.46875%207.46875C4.17708%207.82292%204.17708%208.17708%204.46875%208.53125L6.46875%2010.5312C6.82292%2010.8229%207.17708%2010.8229%207.53125%2010.5312L11.5312%206.53125Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cclippath%20id%3D%22clip0_4072_54967%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%228%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <Text content={textMemberName} weight="" color="neutral" />
    </_Component>
  );
}
