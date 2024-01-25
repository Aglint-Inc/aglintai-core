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
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_2874_30889)%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%228%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.00008%2015.3333C3.94675%2015.3333%200.666748%2012.0533%200.666748%207.99996C0.666748%203.94663%203.94675%200.666626%208.00008%200.666626C12.0534%200.666626%2015.3334%203.94663%2015.3334%207.99996C15.3334%2012.0533%2012.0534%2015.3333%208.00008%2015.3333ZM7.33341%2012C7.33341%2012.3733%207.62675%2012.6666%208.00008%2012.6666C8.37341%2012.6666%208.66675%2012.3733%208.66675%2012V7.99996C8.66675%207.62663%208.37341%207.33329%208.00008%207.33329C7.62675%207.33329%207.33341%207.62663%207.33341%207.99996V12ZM8.00008%203.33329C7.26675%203.33329%206.66675%203.93329%206.66675%204.66663C6.66675%205.39996%207.26675%205.99996%208.00008%205.99996C8.73341%205.99996%209.33342%205.39996%209.33342%204.66663C9.33342%203.93329%208.73341%203.33329%208.00008%203.33329Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fg%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2215%22%20height%3D%2215%22%20rx%3D%227.5%22%20stroke%3D%22%23F79A3E%22%2F%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_2874_30889%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%228%22%20fill%3D%22white%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
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
