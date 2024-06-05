"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./NavJobSubLink.module.css";

export function NavJobSubLink({
  as: _Component = _Builtin.Block,
  isJobAll = false,
  isJobActive = false,
  isJobInactive = false,
  isJobClosed = false,
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
          className={_utils.cx(_styles, "nav_link_content")}
          tag="div"
        >
          <Text content="All" color="" weight="medium" />
          <_Builtin.Block
            className={_utils.cx(_styles, "job-link-tag")}
            tag="div"
          >
            <Text content={allCount} size="1" color="" />
          </_Builtin.Block>
        </_Builtin.Block>
        {isJobAll ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active-drop")}
            tag="div"
          >
            <Text content="All" color="" weight="medium" />
            <_Builtin.Block
              className={_utils.cx(_styles, "job-link-tag", "active-tage")}
              tag="div"
            >
              <Text content={allCount} size="1" color="" />
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
          className={_utils.cx(_styles, "nav_link_content")}
          tag="div"
        >
          <Text content="Published" color="" weight="medium" />
          <_Builtin.Block
            className={_utils.cx(_styles, "job-link-tag")}
            tag="div"
          >
            <Text content={activeCount} color="" size="1" />
          </_Builtin.Block>
        </_Builtin.Block>
        {isJobActive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active-drop")}
            tag="div"
          >
            <Text content="Published" color="" weight="medium" />
            <_Builtin.Block
              className={_utils.cx(_styles, "job-link-tag", "active-tage")}
              tag="div"
            >
              <Text content={activeCount} color="" size="1" />
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
          className={_utils.cx(_styles, "nav_link_content")}
          tag="div"
        >
          <Text content="Draft" color="" weight="medium" />
          <_Builtin.Block
            className={_utils.cx(_styles, "job-link-tag")}
            tag="div"
          >
            <Text content={inActiveCount} color="" size="1" />
          </_Builtin.Block>
        </_Builtin.Block>
        {isJobInactive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active-drop")}
            tag="div"
          >
            <Text content="Draft" color="" weight="medium" />
            <_Builtin.Block
              className={_utils.cx(_styles, "job-link-tag", "active-tage")}
              tag="div"
            >
              <Text content={inActiveCount} color="" size="1" />
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
          className={_utils.cx(_styles, "nav_link_content")}
          tag="div"
        >
          <Text content="Closed" color="" weight="medium" />
          <_Builtin.Block
            className={_utils.cx(_styles, "job-link-tag")}
            tag="div"
          >
            <Text content={closedCount} color="" size="1" />
          </_Builtin.Block>
        </_Builtin.Block>
        {isJobClosed ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active-drop")}
            tag="div"
          >
            <Text content="Closed" color="" />
            <_Builtin.Block
              className={_utils.cx(_styles, "job-link-tag", "active-tage")}
              tag="div"
            >
              <Text content={closedCount} color="" size="1" />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
