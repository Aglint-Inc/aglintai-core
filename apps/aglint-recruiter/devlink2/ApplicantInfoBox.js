"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ApplicantInfoBox.module.css";

export function ApplicantInfoBox({
  as: _Component = _Builtin.Block,
  textName = "Dileep B C",
  slotImage,
  onClickLinkedIn = {},
  isLinkedInVisible = true,
  textDepartment = "Engineering",
  textLocation = "San Fransisco, California",
  textTimeZone = "Asia, Kolkata, Chennai (GMT+5:30)",
  textEmail = "dileep@aglinthq.com",
  textRole = "dileep@aglinthq.com",
  textPhone = "Asia, Kolkata, Chennai (GMT+5:30)",
  slotEditButton,
  isRoleVisible = true,
  isDepartmentVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "app-details-box-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "id-name-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "interviewer_info")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "app-detail-avtar-wrap")}
            tag="div"
          >
            {slotImage ?? (
              <_Builtin.Image
                className={_utils.cx(_styles, "image_cover")}
                width="auto"
                height="auto"
                loading="lazy"
                alt=""
                src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/66bece06d995802dc685ccec_you.jpg"
              />
            )}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "id-details-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "interviewer_detail")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "id-name-wrappers")}
                tag="div"
              >
                <Text content={textName} size="3" weight="medium" />
                {isLinkedInVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "id-linkedin-wrap")}
                    tag="div"
                    {...onClickLinkedIn}
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2216%22%20height%3D%2220%22%20viewBox%3D%220%200%2016%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.8571%201.99609H1.13929C0.510714%201.99609%200%202.51395%200%203.14967V16.8425C0%2017.4782%200.510714%2017.9961%201.13929%2017.9961H14.8571C15.4857%2017.9961%2016%2017.4782%2016%2016.8425V3.14967C16%202.51395%2015.4857%201.99609%2014.8571%201.99609ZM4.83571%2015.7104H2.46429V8.07467H4.83929V15.7104H4.83571ZM3.65%207.03181C2.88929%207.03181%202.275%206.41395%202.275%205.65681C2.275%204.89967%202.88929%204.28181%203.65%204.28181C4.40714%204.28181%205.025%204.89967%205.025%205.65681C5.025%206.41752%204.41071%207.03181%203.65%207.03181ZM13.725%2015.7104H11.3536V11.9961C11.3536%2011.1104%2011.3357%209.97109%2010.1214%209.97109C8.88571%209.97109%208.69643%2010.9354%208.69643%2011.9318V15.7104H6.325V8.07467H8.6V9.11752H8.63214C8.95%208.51752%209.725%207.88538%2010.8786%207.88538C13.2786%207.88538%2013.725%209.46752%2013.725%2011.5247V15.7104Z%22%20fill%3D%22%2363635E%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "flex_hr_auto")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "id-details-wrap")}
                tag="div"
              >
                {isDepartmentVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "id-detail--item")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "icon_general-4")}
                      tag="div"
                      icon-font="true"
                      icon-size="4"
                      icon-weight="medium"
                      icon-color="inherit"
                    >
                      <_Builtin.Block tag="div">
                        {"corporate_fare "}
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      tag="div"
                      text-align="left"
                      fontSize="2"
                      fontWeight=""
                      font-color="neutral-12"
                      high-contrast="false"
                    >
                      {textDepartment}
                    </_Builtin.Block>
                  </_Builtin.Block>
                ) : null}
                <_Builtin.Block
                  className={_utils.cx(_styles, "id-detail--item")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "icon_general-4")}
                    tag="div"
                    icon-font="true"
                    icon-size="4"
                    icon-weight="medium"
                    icon-color="inherit"
                  >
                    <_Builtin.Block tag="div">{"location_on"}</_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    tag="div"
                    text-align="left"
                    fontSize="2"
                    fontWeight=""
                    font-color="neutral-12"
                    high-contrast="false"
                  >
                    {textLocation}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "id-detail--item")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "icon_general-4")}
                    tag="div"
                    icon-font="true"
                    icon-size="4"
                    icon-weight="medium"
                    icon-color="inherit"
                  >
                    <_Builtin.Block tag="div">{"public"}</_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    tag="div"
                    text-align="left"
                    fontSize="2"
                    fontWeight=""
                    font-color="neutral-12"
                    high-contrast="false"
                  >
                    {textTimeZone}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "id-details-wrap",
                  "bottom-details"
                )}
                tag="div"
              >
                {isRoleVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "id-detail--item")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "icon_general-4")}
                      tag="div"
                      icon-font="true"
                      icon-size="4"
                      icon-weight="medium"
                      icon-color="inherit"
                    >
                      <_Builtin.Block tag="div">{"person"}</_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      tag="div"
                      text-align="left"
                      fontSize="2"
                      fontWeight=""
                      font-color="neutral-12"
                      high-contrast="false"
                    >
                      {textRole}
                    </_Builtin.Block>
                  </_Builtin.Block>
                ) : null}
                <_Builtin.Block
                  className={_utils.cx(_styles, "id-detail--item")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "icon_general-4")}
                    tag="div"
                    icon-font="true"
                    icon-size="4"
                    icon-weight="medium"
                    icon-color="inherit"
                  >
                    <_Builtin.Block tag="div">{"mail"}</_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    tag="div"
                    text-align="left"
                    fontSize="2"
                    fontWeight=""
                    font-color="neutral-12"
                    high-contrast="false"
                  >
                    {textEmail}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "id-detail--item")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "icon_general-4")}
                    tag="div"
                    icon-font="true"
                    icon-size="4"
                    icon-weight="medium"
                    icon-color="inherit"
                  >
                    <_Builtin.Block tag="div">{"smartphone"}</_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    tag="div"
                    text-align="left"
                    fontSize="2"
                    fontWeight=""
                    font-color="neutral-12"
                    high-contrast="false"
                  >
                    {textPhone}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "id-details-right")}
            tag="div"
          >
            {slotEditButton}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
