"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalBadge } from "./GlobalBadge";
import { TextWithIcon } from "./TextWithIcon";
import { Text } from "./Text";
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
  slotButtonViewDetail,
  onClickDropdown = {},
  slotRequestDetail,
  slotDropdownContent,
  slotCheckbox,
  isCheckboxVisible = false,
  isDateVisible = true,
  isTimeVisible = true,
  isSelectedVisible = false,
  isDropdownIconVisible = true,
  styleGrid = {},
  isButtonBlockVisible = true,
  isRoleVisible = true,
  slotStatus,
}) {
  return (
    <_Component className={_utils.cx(_styles, "new-gsc-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "global_schedule_card")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "gsc_sub_card")}
          tag="div"
        >
          {isCheckboxVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "gsc_checkbox")}
              tag="div"
            >
              <_Builtin.Block tag="div">{slotCheckbox}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule_card_collapsed")}
            tag="div"
            {...styleGrid}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "column_left")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "gsc-checkbox-wrap")}
                tag="div"
              >
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
              </_Builtin.Block>
              {isDateVisible ? (
                <_Builtin.Block tag="div">
                  <TextWithIcon
                    textContent={textDate}
                    iconName="calendar_today"
                    fontWeight="regular"
                    iconWeight="medium"
                  />
                </_Builtin.Block>
              ) : null}
              {isTimeVisible ? (
                <_Builtin.Block tag="div">
                  <TextWithIcon
                    textContent={textTime}
                    iconName="schedule"
                    color="warning"
                    fontWeight="regular"
                    iconWeight="medium"
                  />
                </_Builtin.Block>
              ) : null}
              {isRequestStatusVisible ? (
                <_Builtin.Block tag="div">
                  {slotRequestStatus ?? (
                    <TextWithIcon
                      textContent="Send self scheduling link to candidate"
                      iconName="schedule"
                      color="success"
                      fontWeight="regular"
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
              <_Builtin.Block
                className={_utils.cx(_styles, "flex_hr_6")}
                tag="div"
              >
                <TextWithIcon
                  textContent={textDuration}
                  iconName="hourglass"
                  fontWeight="regular"
                  iconWeight="medium"
                />
                <TextWithIcon
                  textContent={textPlaformName}
                  iconName={iconMeetingPlatform}
                  fontWeight="regular"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "flex_hr_6")}
                tag="div"
              >
                {isRoleVisible ? (
                  <_Builtin.Block tag="div">
                    <TextWithIcon
                      textContent={textRole}
                      iconName="trip"
                      fontWeight="regular"
                      iconWeight="medium"
                    />
                  </_Builtin.Block>
                ) : null}
                <_Builtin.Block
                  className={_utils.cx(_styles, "text_with_icon")}
                  tag="div"
                  data-color="neutral-12"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot_icon")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%204C0%201.79086%201.79086%200%204%200H28C30.2091%200%2032%201.79086%2032%204V28C32%2030.2091%2030.2091%2032%2028%2032H4C1.79086%2032%200%2030.2091%200%2028V4Z%22%20fill%3D%22%238D8D86%22%2F%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20transform%3D%22translate(8%208)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M16%208.93311C13.8645%208.93311%2012.1333%2010.6643%2012.1333%2012.7998C12.1333%2014.5628%2013.3133%2016.0503%2014.9267%2016.5155C13.653%2016.6707%2012.5606%2017.1212%2011.7377%2017.9322C10.6903%2018.9645%2010.16%2020.5011%2010.16%2022.5063C10.16%2022.7862%2010.3869%2023.013%2010.6667%2023.013C10.9465%2023.013%2011.1734%2022.7862%2011.1734%2022.5063C11.1734%2020.6717%2011.6564%2019.4351%2012.449%2018.654C13.2431%2017.8714%2014.4285%2017.4664%2016%2017.4664C17.5714%2017.4664%2018.7569%2017.8714%2019.5511%2018.654C20.3436%2019.4351%2020.8267%2020.6717%2020.8267%2022.5063C20.8267%2022.7862%2021.0535%2023.013%2021.3333%2023.013C21.6131%2023.0131%2021.84%2022.7862%2021.84%2022.5064C21.84%2020.5011%2021.3097%2018.9645%2020.2623%2017.9322C19.4394%2017.1212%2018.3469%2016.6707%2017.0733%2016.5155C18.6866%2016.0503%2019.8667%2014.5629%2019.8667%2012.7998C19.8667%2010.6643%2018.1355%208.93311%2016%208.93311ZM13.1467%2012.7998C13.1467%2011.2239%2014.4242%209.94644%2016%209.94644C17.5759%209.94644%2018.8533%2011.2239%2018.8533%2012.7998C18.8533%2014.3756%2017.5759%2015.6531%2016%2015.6531C14.4242%2015.6531%2013.1467%2014.3756%2013.1467%2012.7998Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "one-line-clamp")}
                    tag="div"
                  >
                    <Text
                      content={textCandidateName}
                      weight="regular"
                      color=""
                      size="2"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            {isButtonBlockVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "column_right")}
                id={_utils.cx(
                  _styles,
                  "w-node-_9702c623-8670-dbd1-8ce1-54c2945a7703-945a76e0"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "flex-h2")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">{slotStatus}</_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "gsc-btn-wrap")}
                    tag="div"
                  >
                    {slotButtonViewDetail ?? (
                      <ButtonSolid
                        size="1"
                        textButton="View Detail"
                        isRightIcon={true}
                        iconSize="2"
                        iconName="north_east"
                        color="neutral"
                      />
                    )}
                  </_Builtin.Block>
                  {isDropdownIconVisible ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "gsc-btn-wrap")}
                      tag="div"
                      {...onClickDropdown}
                    >
                      <IconButtonSoft
                        iconName="keyboard_double_arrow_down"
                        color="neutral"
                        size="1"
                      />
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "schedule_notifications")}
                  tag="div"
                >
                  {slotRequestDetail ?? (
                    <>
                      <GlobalBadge
                        textBadge="3/5 feedback submited"
                        color="info"
                      />
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
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotDropdownContent}</_Builtin.Block>
      </_Builtin.Block>
      {isSelectedVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "gsc-selected")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
