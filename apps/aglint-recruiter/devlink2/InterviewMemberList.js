"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { ModuleMembers } from "./ModuleMembers";
import * as _utils from "./utils";
import _styles from "./InterviewMemberList.module.css";

export function InterviewMemberList({
  as: _Component = _Builtin.Block,
  textObjective = "This module aims to evaluate candidates' ability to write efficient, maintainable, and bug-free C++ code, covering a range of topics such as syntax, data structures, algorithms, object-oriented programming concepts, memory management, and best practices.",
  textDepartment = "Engineering",
  slotNewTabPill,
  slotModuleContent,
  slotEditButton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "interview-member-list-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "header-interview-list-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "iml-details-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "im-detail-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "im-detail-item")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "im-detail-item-left")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M16%203H11C10.7083%203%2010.4688%203.09375%2010.2812%203.28125C10.0938%203.46875%2010%203.70833%2010%204V16C10%2016.2917%2010.0938%2016.5312%2010.2812%2016.7188C10.4688%2016.9062%2010.7083%2017%2011%2017H16C16.2917%2017%2016.5312%2016.9062%2016.7188%2016.7188C16.9062%2016.5312%2017%2016.2917%2017%2016V4C17%203.70833%2016.9062%203.46875%2016.7188%203.28125C16.5312%203.09375%2016.2917%203%2016%203ZM11%202H16C16.5625%202.02083%2017.0312%202.21875%2017.4062%202.59375C17.7812%202.96875%2017.9792%203.4375%2018%204V16C17.9792%2016.5625%2017.7812%2017.0312%2017.4062%2017.4062C17.0312%2017.7812%2016.5625%2017.9792%2016%2018H11C10.4375%2017.9792%209.96875%2017.7812%209.59375%2017.4062C9.21875%2017.0312%209.02083%2016.5625%209%2016V4C9.02083%203.4375%209.21875%202.96875%209.59375%202.59375C9.96875%202.21875%2010.4375%202.02083%2011%202ZM8%206V7H4C3.70833%207%203.46875%207.09375%203.28125%207.28125C3.09375%207.46875%203%207.70833%203%208V16C3%2016.2917%203.09375%2016.5312%203.28125%2016.7188C3.46875%2016.9062%203.70833%2017%204%2017H8.15625C8.30208%2017.375%208.5%2017.7083%208.75%2018H4C3.4375%2017.9792%202.96875%2017.7812%202.59375%2017.4062C2.21875%2017.0312%202.02083%2016.5625%202%2016V8C2.02083%207.4375%202.21875%206.96875%202.59375%206.59375C2.96875%206.21875%203.4375%206.02083%204%206H8ZM4.75%2012H6.25C6.70833%2012.0417%206.95833%2012.2917%207%2012.75V14.25C6.95833%2014.7083%206.70833%2014.9583%206.25%2015H4.75C4.29167%2014.9583%204.04167%2014.7083%204%2014.25V12.75C4.04167%2012.2917%204.29167%2012.0417%204.75%2012ZM5%2014H6V13H5V14ZM12%2014.25V12.75C12.0417%2012.2917%2012.2917%2012.0417%2012.75%2012H14.25C14.7083%2012.0417%2014.9583%2012.2917%2015%2012.75V14.25C14.9583%2014.7083%2014.7083%2014.9583%2014.25%2015H12.75C12.2917%2014.9583%2012.0417%2014.7083%2012%2014.25ZM13%2014H14V13H13V14ZM4.75%208H6.25C6.70833%208.04167%206.95833%208.29167%207%208.75V10.25C6.95833%2010.7083%206.70833%2010.9583%206.25%2011H4.75C4.29167%2010.9583%204.04167%2010.7083%204%2010.25V8.75C4.04167%208.29167%204.29167%208.04167%204.75%208ZM5%2010H6V9H5V10ZM12%204.75C12.0417%204.29167%2012.2917%204.04167%2012.75%204H14.25C14.7083%204.04167%2014.9583%204.29167%2015%204.75V6.25C14.9583%206.70833%2014.7083%206.95833%2014.25%207H12.75C12.2917%206.95833%2012.0417%206.70833%2012%206.25V4.75ZM13%205V6H14V5H13ZM12.75%2011C12.2917%2010.9583%2012.0417%2010.7083%2012%2010.25V8.75C12.0417%208.29167%2012.2917%208.04167%2012.75%208H14.25C14.7083%208.04167%2014.9583%208.29167%2015%208.75V10.25C14.9583%2010.7083%2014.7083%2010.9583%2014.25%2011H12.75ZM13%209V10H14V9H13Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <Text
                  content={
                    <>
                      {"Department"}
                      <br />
                    </>
                  }
                  color="neutral"
                  weight=""
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "im-detail-item-right")}
                tag="div"
              >
                <Text content={textDepartment} weight="" />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "im-detail-item")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "im-detail-item-left")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%203C5.70833%203%205.46875%203.09375%205.28125%203.28125C5.09375%203.46875%205%203.70833%205%204V16C5%2016.2917%205.09375%2016.5312%205.28125%2016.7188C5.46875%2016.9062%205.70833%2017%206%2017H14C14.2917%2017%2014.5312%2016.9062%2014.7188%2016.7188C14.9062%2016.5312%2015%2016.2917%2015%2016V4C15%203.70833%2014.9062%203.46875%2014.7188%203.28125C14.5312%203.09375%2014.2917%203%2014%203H6ZM4%204C4.02083%203.4375%204.21875%202.96875%204.59375%202.59375C4.96875%202.21875%205.4375%202.02083%206%202H14C14.5625%202.02083%2015.0312%202.21875%2015.4062%202.59375C15.7812%202.96875%2015.9792%203.4375%2016%204V16C15.9792%2016.5625%2015.7812%2017.0312%2015.4062%2017.4062C15.0312%2017.7812%2014.5625%2017.9792%2014%2018H6C5.4375%2017.9792%204.96875%2017.7812%204.59375%2017.4062C4.21875%2017.0312%204.02083%2016.5625%204%2016V4ZM6.5%206H13.5C13.8125%206.02083%2013.9792%206.1875%2014%206.5C13.9792%206.8125%2013.8125%206.97917%2013.5%207H6.5C6.1875%206.97917%206.02083%206.8125%206%206.5C6.02083%206.1875%206.1875%206.02083%206.5%206ZM6.5%209H13.5C13.8125%209.02083%2013.9792%209.1875%2014%209.5C13.9792%209.8125%2013.8125%209.97917%2013.5%2010H6.5C6.1875%209.97917%206.02083%209.8125%206%209.5C6.02083%209.1875%206.1875%209.02083%206.5%209ZM6.5%2012H10.5C10.8125%2012.0208%2010.9792%2012.1875%2011%2012.5C10.9792%2012.8125%2010.8125%2012.9792%2010.5%2013H6.5C6.1875%2012.9792%206.02083%2012.8125%206%2012.5C6.02083%2012.1875%206.1875%2012.0208%206.5%2012Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <Text content="Objective" color="neutral" weight="" />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "im-detail-item-right")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "type_description")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "clamp-three-lines")}
                    tag="div"
                    text-align="left"
                    fontSize="2"
                    fontWeight=""
                    font-color="neutral-12"
                    high-contrast="false"
                  >
                    {textObjective}
                  </_Builtin.Block>
                  <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A.clamp-three-lines%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20display%3A%20-webkit-box%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20-webkit-box-orient%3A%20vertical%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20-webkit-line-clamp%3A%202%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20overflow%3A%20hidden%3B%0A%20%20%20%20%20%20%20%20%7D%0A%3C%2Fstyle%3E" />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-edit-btn-iml")}
            tag="div"
          >
            {slotEditButton}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_newtab_pill")}
          tag="div"
        >
          {slotNewTabPill ?? <SlotComp componentName="NewTabPill" />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "im-slot-tab-content")}
        tag="div"
      >
        {slotModuleContent ?? <ModuleMembers />}
      </_Builtin.Block>
    </_Component>
  );
}
