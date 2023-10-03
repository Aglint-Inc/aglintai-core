import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TicketSublink.module.css";

export function TicketSublink({
  as: _Component = _Builtin.Block,
  isAllActive = true,
  isOpenActive = true,
  isInProgressActive = true,
  isResolvedActive = true,
  isOnHoldActive = true,
  onClickAll = {},
  onClickOpen = {},
  onClickInProgress = {},
  onClickResolve = {},
  onClickOnHold = {},
  allCount = "94",
  openCount = "94",
  inProgressCount = "94",
  resolvedCount = "94",
  onHoldCount = "94",
}) {
  return (
    <_Component className={_utils.cx(_styles, "nav_sublinks-drop")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "nav_sublink-drop")}
        tag="div"
        id="my-resume"
        {...onClickAll}
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
            className={_utils.cx(_styles, "job-link-tag", "grey-700")}
            tag="div"
          >
            <_Builtin.Block tag="div">{allCount}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isAllActive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active-drop")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"All"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "job-link-tag", "grey-700")}
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
        {...onClickOpen}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-365")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Open"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "job-link-tag", "blue-500")}
            tag="div"
          >
            <_Builtin.Block tag="div">{openCount}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isOpenActive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active-drop")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Open"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "job-link-tag", "blue-500")}
              tag="div"
            >
              <_Builtin.Block tag="div">{openCount}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "nav_sublink-drop")}
        tag="div"
        id="jd"
        {...onClickInProgress}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-365")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"In progress"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "job-link-tag", "yellow-600")}
            tag="div"
          >
            <_Builtin.Block tag="div">{inProgressCount}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isInProgressActive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active-drop")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"In progress"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "job-link-tag", "yellow-600")}
              tag="div"
            >
              <_Builtin.Block tag="div">{inProgressCount}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "nav_sublink-drop")}
        tag="div"
        id="jd"
        {...onClickResolve}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-365")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Resolved"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "job-link-tag", "green-500")}
            tag="div"
          >
            <_Builtin.Block tag="div">{resolvedCount}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isResolvedActive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active-drop")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Resolved"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "job-link-tag", "green-500")}
              tag="div"
            >
              <_Builtin.Block tag="div">{resolvedCount}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "nav_sublink-drop")}
        tag="div"
        id="jd"
        {...onClickOnHold}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-365")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"On Hold"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "job-link-tag", "side-color-nav")}
            tag="div"
          >
            <_Builtin.Block tag="div">{onHoldCount}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isOnHoldActive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active-drop")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"On Hold"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "job-link-tag", "side-color-nav")}
              tag="div"
            >
              <_Builtin.Block tag="div">{onHoldCount}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
