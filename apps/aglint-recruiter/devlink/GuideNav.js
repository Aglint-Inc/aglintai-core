"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GuideNav.module.css";

export function GuideNav({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "guide_nav")} tag="div">
      <_Builtin.Link
        className={_utils.cx(_styles, "guide_link")}
        button={false}
        block="inline"
        options={{
          href: "#",
        }}
      >
        <_Builtin.Block
          tag="div"
          text-align="left"
          fontSize="4"
          fontWeight="regular"
          font-color="neutral-12"
          high-contrast="false"
        >
          {"Icons"}
        </_Builtin.Block>
      </_Builtin.Link>
      <_Builtin.Link
        className={_utils.cx(_styles, "guide_link")}
        button={false}
        block="inline"
        options={{
          href: "#",
        }}
      >
        <_Builtin.Block
          tag="div"
          text-align="left"
          fontSize="4"
          fontWeight="regular"
          font-color="neutral-12"
          high-contrast="false"
        >
          {"Buttons"}
        </_Builtin.Block>
      </_Builtin.Link>
      <_Builtin.Link
        className={_utils.cx(_styles, "guide_link")}
        button={false}
        block="inline"
        options={{
          href: "#",
        }}
      >
        <_Builtin.Block
          tag="div"
          text-align="left"
          fontSize="4"
          fontWeight="regular"
          font-color="neutral-12"
          high-contrast="false"
        >
          {"Badge"}
        </_Builtin.Block>
      </_Builtin.Link>
      <_Builtin.Link
        className={_utils.cx(_styles, "guide_link")}
        button={false}
        block="inline"
        options={{
          href: "#",
        }}
      >
        <_Builtin.Block
          tag="div"
          text-align="left"
          fontSize="4"
          fontWeight="regular"
          font-color="neutral-12"
          high-contrast="false"
        >
          {"Text"}
        </_Builtin.Block>
      </_Builtin.Link>
    </_Component>
  );
}
