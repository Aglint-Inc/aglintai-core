import React from "react";
import * as _Builtin from "./_Builtin";
import { SubMenu } from "./SubMenu";
import * as _utils from "./utils";
import _styles from "./SublinkSubMenu.module.css";

export function SublinkSubMenu({
  as: _Component = _Builtin.Block,
  textLink = "User Info",
  slotSubMenu,
  isActive = false,
  isMuted = false,
  onClickLink = {},
  isSubMenuVisible = false,
  isBetaVisible = true,
  isWarningVisible = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "nav-sub-link-menu", "sub-menu")}
      tag="div"
    >
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "bg-active-link")}
          tag="div"
        />
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-709")}
        tag="div"
        {...onClickLink}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "nav-sublink-text")}
          tag="div"
        >
          {textLink}
        </_Builtin.Block>
        {isBetaVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "beta-wrap", "hide")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xsm")}
              tag="div"
            >
              {"Beta"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isWarningVisible ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%2014C6.40625%2013.9844%205.40625%2013.7188%204.5%2013.2031C3.59375%2012.6719%202.85938%2011.9375%202.29688%2011C1.76562%2010.0469%201.5%209.04688%201.5%208C1.5%206.95312%201.76562%205.95312%202.29688%205C2.85938%204.0625%203.59375%203.32813%204.5%202.79688C5.40625%202.28125%206.40625%202.01563%207.5%202C8.59375%202.01563%209.59375%202.28125%2010.5%202.79688C11.4062%203.32813%2012.1406%204.0625%2012.7031%205C13.2344%205.95312%2013.5%206.95312%2013.5%208C13.5%209.04688%2013.2344%2010.0469%2012.7031%2011C12.1406%2011.9375%2011.4062%2012.6719%2010.5%2013.2031C9.59375%2013.7188%208.59375%2013.9844%207.5%2014ZM6.5625%209.875C6.21875%209.90625%206.03125%2010.0938%206%2010.4375C6.03125%2010.7812%206.21875%2010.9688%206.5625%2011H8.4375C8.78125%2010.9688%208.96875%2010.7812%209%2010.4375C8.96875%2010.0938%208.78125%209.90625%208.4375%209.875H8.25V7.8125C8.21875%207.46875%208.03125%207.28125%207.6875%207.25H6.5625C6.21875%207.28125%206.03125%207.46875%206%207.8125C6.03125%208.15625%206.21875%208.34375%206.5625%208.375H7.125V9.875H6.5625ZM7.5%205C7.28125%205%207.10156%205.07031%206.96094%205.21094C6.82031%205.35156%206.75%205.53125%206.75%205.75C6.75%205.96875%206.82031%206.14844%206.96094%206.28906C7.10156%206.42969%207.28125%206.5%207.5%206.5C7.71875%206.5%207.89844%206.42969%208.03906%206.28906C8.17969%206.14844%208.25%205.96875%208.25%205.75C8.25%205.53125%208.17969%205.35156%208.03906%205.21094C7.89844%205.07031%207.71875%205%207.5%205Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        ) : null}
      </_Builtin.Block>
      {isMuted ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-710")}
          tag="div"
        />
      ) : null}
      {isSubMenuVisible ? (
        <_Builtin.Block className={_utils.cx(_styles, "nav-sub-sub")} tag="div">
          {slotSubMenu ?? <SubMenu />}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
