"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalBadge } from "./GlobalBadge";
import { TextWithIcon } from "./TextWithIcon";
import { ButtonSolid } from "./ButtonSolid";
import { IconButtonSoft } from "./IconButtonSoft";
import * as _utils from "./utils";
import _styles from "./GlobalScheduleCard.module.css";

export function GlobalScheduleCard({
  as: _Component = _Builtin.Block,
  slotGlobalBadge,
  textTime = "09:00AM - 09:30PMPST",
  textDate = "Fri, May 12, 2024",
  slotRequestStatus,
  isRequestStatusVisible = true,
  textPanelName = "Personality and cultural fit",
  iconPanel = "shapes",
  textDuration = "30 Miutes",
  textPlaformName = "Google Meet",
  iconMeetingPlatform = "shapes",
  textRole = "Senior Software Engineer",
  textCandidateName = "Brooklyn James",
  iconAvatar = "shapes",
  slotButtonViewDetail,
  onClickDropdown = {},
  slotRequestDetail,
  slotDropdownContent,
  isDropdownContentVisible = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "global_schedule_card")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "schedule_card_collapsed")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "column_left")} tag="div">
          <_Builtin.Block tag="div">
            {slotGlobalBadge ?? (
              <GlobalBadge
                size="2"
                showIcon={true}
                iconSize="3"
                color="info"
                textBadge="Confirmed"
              />
            )}
          </_Builtin.Block>
          <TextWithIcon textContent={textDate} iconName="calendar_today" />
          <TextWithIcon
            textContent={textTime}
            iconName="schedule"
            color="warning"
          />
          {isRequestStatusVisible ? (
            <_Builtin.Block tag="div">
              {slotRequestStatus ?? (
                <TextWithIcon
                  textContent="Send self scheduling link to candidate"
                  iconName="schedule"
                  color="success"
                />
              )}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "column_middle")}
          id={_utils.cx(
            _styles,
            "w-node-_9702c623-8670-dbd1-8ce1-54c2945a76f4-945a76e0"
          )}
          tag="div"
        >
          <TextWithIcon
            textContent={textPanelName}
            iconName={iconPanel}
            fontWeight="medium"
          />
          <_Builtin.Block className={_utils.cx(_styles, "flex_hr_6")} tag="div">
            <TextWithIcon textContent={textDuration} iconName="hourglass" />
            <TextWithIcon
              textContent={textPlaformName}
              iconName={iconMeetingPlatform}
            />
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "flex_hr_6")} tag="div">
            <TextWithIcon textContent={textRole} iconName="trip" />
            <TextWithIcon
              textContent={textCandidateName}
              iconName={iconAvatar}
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "column_right")}
          id={_utils.cx(
            _styles,
            "w-node-_9702c623-8670-dbd1-8ce1-54c2945a7703-945a76e0"
          )}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "flex-h2")} tag="div">
            <_Builtin.Block tag="div">
              {slotButtonViewDetail ?? (
                <ButtonSolid
                  size="1"
                  color="neutral"
                  textButton="View Detail"
                  isRightIcon={true}
                  iconSize="2"
                  iconName="north_east"
                />
              )}
            </_Builtin.Block>
            <_Builtin.Block tag="div" {...onClickDropdown}>
              <IconButtonSoft
                iconName="keyboard_double_arrow_down"
                color="neutral"
                size="1"
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotRequestDetail ?? (
              <>
                <GlobalBadge textBadge="3/5 feedback submited" color="info" />
                <GlobalBadge
                  textBadge="1 Reschedule Request"
                  color="warning"
                  showIcon={true}
                  iconSize="2"
                  iconName="event_repeat"
                />
                <GlobalBadge
                  textBadge="2 Cancel Request"
                  color="error"
                  showIcon={true}
                  iconSize="2"
                  iconName="event_busy"
                />
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isDropdownContentVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "gsc-drop-content-wrap")}
          tag="div"
        >
          {slotDropdownContent}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
