import React from "react";
import * as _Builtin from "./_Builtin";
import { SoonBadge } from "./SoonBadge";
import * as _utils from "./utils";
import _styles from "./SideNavMenu.module.css";

export function SideNavMenu({
  as: _Component = _Builtin.Block,
  isMyJobs = true,
  isMyCandidateDatabase = true,
  onClickJob = {},
  slotJobSubLink,
}) {
  return (
    <_Component className={_utils.cx(_styles, "nav_sublinks")} tag="div">
      <_Builtin.Link
        className={_utils.cx(_styles, "nav_sublink")}
        button={false}
        id="jd"
        options={{
          href: "/candidates",
        }}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3DcurrentColor%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10%203.26385C9.08755%203.738%207.63506%204%206%204C4.36494%204%202.91245%203.738%202%203.26385V4.7C2%205.08849%203.80673%205.7%206%205.7C8.19327%205.7%2010%205.08849%2010%204.7V3.26385ZM11%202V10C11%2011.2346%208.73855%2012%206%2012C3.26145%2012%201%2011.2346%201%2010V2C1%200.746622%203.23987%200%206%200C8.76013%200%2011%200.746622%2011%202ZM10%205.95247C9.08388%206.43015%207.62604%206.7%206%206.7C4.37396%206.7%202.91612%206.43015%202%205.95247V7.3C2%207.74812%203.70819%208.3%206%208.3C8.19327%208.3%2010%207.68849%2010%207.3V5.95247ZM2%208.60025V10C2%2010.3885%203.80673%2011%206%2011C8.19327%2011%2010%2010.3885%2010%2010V8.55247C9.08388%209.03015%207.62604%209.3%206%209.3C4.32786%209.3%202.89722%209.06118%202%208.60025ZM6%203C8.21043%203%2010%202.40348%2010%202C10%201.59652%208.21043%201%206%201C3.78957%201%202%201.59652%202%202C2%202.40348%203.78957%203%206%203Z%22%20fill%3DcurrentColor%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block tag="div">{"Candidate Database"}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "soon-nav-badge")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Soon"}</_Builtin.Block>
        </_Builtin.Block>
        {isMyCandidateDatabase ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3DcurrentColor%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10%203.26385C9.08755%203.738%207.63506%204%206%204C4.36494%204%202.91245%203.738%202%203.26385V4.7C2%205.08849%203.80673%205.7%206%205.7C8.19327%205.7%2010%205.08849%2010%204.7V3.26385ZM11%202V10C11%2011.2346%208.73855%2012%206%2012C3.26145%2012%201%2011.2346%201%2010V2C1%200.746622%203.23987%200%206%200C8.76013%200%2011%200.746622%2011%202ZM10%205.95247C9.08388%206.43015%207.62604%206.7%206%206.7C4.37396%206.7%202.91612%206.43015%202%205.95247V7.3C2%207.74812%203.70819%208.3%206%208.3C8.19327%208.3%2010%207.68849%2010%207.3V5.95247ZM2%208.60025V10C2%2010.3885%203.80673%2011%206%2011C8.19327%2011%2010%2010.3885%2010%2010V8.55247C9.08388%209.03015%207.62604%209.3%206%209.3C4.32786%209.3%202.89722%209.06118%202%208.60025ZM6%203C8.21043%203%2010%202.40348%2010%202C10%201.59652%208.21043%201%206%201C3.78957%201%202%201.59652%202%202C2%202.40348%203.78957%203%206%203Z%22%20fill%3DcurrentColor%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Candidate Database"}</_Builtin.Block>
            <SoonBadge />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Link>
    </_Component>
  );
}
