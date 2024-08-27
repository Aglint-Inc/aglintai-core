"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { ModuleMembers } from "./ModuleMembers";
import { InterviewMemberSide } from "./InterviewMemberSide";
import * as _utils from "./utils";
import _styles from "./InterviewMemberList.module.css";

export function InterviewMemberList({
  as: _Component = _Builtin.Block,
  textObjective = "This module aims to evaluate candidates' ability to write efficient, maintainable, and bug-free C++ code, covering a range of topics such as syntax, data structures, algorithms, object-oriented programming concepts, memory management, and best practices.",
  textDepartment = "Engineering",
  slotNewTabPill,
  slotModuleContent,
  slotEditButton,
  slotJobsCard,
  slotBanner,
  isBannerVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "iml-wrappers")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "interview-member-list-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "header-interview-list-wrap")}
          tag="div"
        >
          {isBannerVisible ? (
            <_Builtin.Block tag="div">{slotBanner}</_Builtin.Block>
          ) : null}
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
                  <GlobalIcon size="4" iconName="corporate_fare" />
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
                  <GlobalIcon size="4" iconName="description" />
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
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_newtab_pill")}
          tag="div"
        >
          {slotNewTabPill ?? <SlotComp componentName="NewTabPill" />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "iml-new-body-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "im-slot-tab-content")}
            tag="div"
          >
            {slotModuleContent ?? (
              <>
                <ModuleMembers />
                <InterviewMemberSide />
                <InterviewMemberSide />
              </>
            )}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "iml-right-wrappers")}
            tag="div"
          >
            {slotJobsCard}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
