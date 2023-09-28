import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NavJobSubLink.module.css";

export function NavJobSubLink({
  as: _Component = _Builtin.Block,
  isJobAll = true,
  isJobActive = true,
  isJobInactive = true,
  isJobClosed = true,
  allCount = "94",
  activeCount = "94",
  inActiveCount = "94",
  closedCount = "94",
  onClickJobAll = {},
  onClickJobActive = {},
  onClickJobInactive = {},
  onClickJobClosed = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "nav_sublinks-drop")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "nav_sublink-drop")}
        tag="div"
        id="my-resume"
        {...onClickJobAll}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-365")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "inactive-drop")}
            tag="div"
          >
            {"All"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "job-link-tag", "blue-500")}
            tag="div"
          >
            <_Builtin.Block tag="div">{allCount}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isJobAll ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active-drop")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"All"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "job-link-tag", "blue-500")}
              tag="div"
            >
              <_Builtin.Block tag="div">{allCount}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "nav_sublink-drop")}
        tag="div"
        id="jd"
        {...onClickJobActive}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-365")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Active"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "job-link-tag", "green-500")}
            tag="div"
          >
            <_Builtin.Block tag="div">{activeCount}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isJobActive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active-drop")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Active"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "job-link-tag", "green-500")}
              tag="div"
            >
              <_Builtin.Block tag="div">{activeCount}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "nav_sublink-drop")}
        tag="div"
        id="jd"
        {...onClickJobInactive}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-365")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Inactive"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "job-link-tag", "yellow-600")}
            tag="div"
          >
            <_Builtin.Block tag="div">{inActiveCount}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isJobInactive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active-drop")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Inactive"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "job-link-tag", "yellow-600")}
              tag="div"
            >
              <_Builtin.Block tag="div">{inActiveCount}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "nav_sublink-drop")}
        tag="div"
        id="jd"
        {...onClickJobClosed}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-365")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Closed"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "job-link-tag", "red-500")}
            tag="div"
          >
            <_Builtin.Block tag="div">{closedCount}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isJobClosed ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active-drop")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Closed"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "job-link-tag", "red-500")}
              tag="div"
            >
              <_Builtin.Block tag="div">{closedCount}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
