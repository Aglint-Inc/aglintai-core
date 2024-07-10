"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonGhost } from "./ButtonGhost";
import { TextWithIcon } from "./TextWithIcon";
import * as _utils from "./utils";
import _styles from "./MemberDetail.module.css";

export function MemberDetail({
  as: _Component = _Builtin.Block,
  slotImage,
  isShadow = false,
  isReverseShadow = false,
  textName = "Brooklyn Simmons (you)",
  isDesignationVisible = true,
  textDesignation = "Decline",
  textJobTitle = "Engineering",
  textMail = "codyfisher1992@company.com",
  textLocation = "San Fransisco California",
  textTimeZone = "India Standard Time(GMT+5:30)",
  textTodayInterview = "2 / 3 Interviews",
  textWeekInterview = "2 / 3 Interviews",
  onClickViewInterviewDetail = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1709")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1729")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "member-list-content")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ml-profile-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "avatar_40")}
              tag="div"
            >
              {slotImage ?? (
                <_Builtin.Image
                  className={_utils.cx(_styles, "image_cover")}
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d6e2cb5b27ca42119ddbb3_you.jpg"
                />
              )}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ml-badge-wrapper")}
              tag="div"
            >
              {isShadow ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_9955_56669)%22%3E%0A%3Crect%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%227%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2213.4286%22%20height%3D%2213.4286%22%20rx%3D%226.71429%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%20stroke-dasharray%3D%221.29%201.29%22%2F%3E%0A%3Cpath%20d%3D%22M7.01953%2010.666C5.47656%2010.666%204.48047%209.85547%204.37793%208.70801L4.37305%208.6543H5.25195L5.25684%208.70801C5.32031%209.41113%206.05273%209.85547%207.06836%209.85547C8.02539%209.85547%208.72363%209.3623%208.72363%208.64453V8.63965C8.72363%208.05371%208.31836%207.65332%207.35156%207.43848L6.57031%207.26758C5.15918%206.95508%204.54883%206.30566%204.54883%205.28516V5.28027C4.55371%204.11328%205.57422%203.28809%207.0293%203.28809C8.43555%203.28809%209.41699%204.11816%209.49023%205.16797L9.49512%205.23633H8.61621L8.60645%205.17285C8.50879%204.55273%207.92285%204.09375%207.00488%204.09863C6.12598%204.10352%205.44727%204.51855%205.44727%205.25586V5.26074C5.44727%205.82227%205.83301%206.20312%206.79004%206.41309L7.57129%206.58887C9.04102%206.91602%209.62207%207.50684%209.62207%208.52246V8.52734C9.62207%209.8457%208.5918%2010.666%207.01953%2010.666Z%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cclippath%20id%3D%22clip0_9955_56669%22%3E%0A%3Crect%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%227%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                />
              ) : null}
              {isReverseShadow ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_9955_56687)%22%3E%0A%3Crect%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%227%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2213.4286%22%20height%3D%2213.4286%22%20rx%3D%226.71429%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%2F%3E%0A%3Cpath%20d%3D%22M4.63184%2010.5V3.4541H7.32227C8.67969%203.4541%209.56836%204.28418%209.56836%205.54883V5.55859C9.56836%206.53516%209.03613%207.29688%208.15234%207.5752L9.7832%2010.5H8.75293L7.24414%207.71191H5.51074V10.5H4.63184ZM5.51074%206.93066H7.24414C8.14746%206.93066%208.66016%206.44727%208.66016%205.58789V5.57812C8.66016%204.73828%208.11328%204.23535%207.20508%204.23535H5.51074V6.93066Z%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cclippath%20id%3D%22clip0_9955_56687%22%3E%0A%3Crect%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%227%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                />
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "name_designation")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ml-name-wrap")}
              tag="div"
            >
              <Text content={textName} weight="medium" />
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              <Text
                content={textDesignation}
                weight="regular"
                color="neutral"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1665")}
          tag="div"
        >
          <ButtonGhost
            onClickButton={onClickViewInterviewDetail}
            size="1"
            textButton="View Detail"
            isRightIcon={true}
            iconName="arrow_outward"
            iconSize="2"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "memberdetail_list")}
        tag="div"
      >
        <TextWithIcon
          textContent={textJobTitle}
          iconName="domain"
          fontWeight="regular"
        />
        <TextWithIcon
          textContent={textMail}
          iconName="mail"
          fontWeight="regular"
        />
        <TextWithIcon
          textContent={textLocation}
          iconName="location_pin"
          fontWeight="regular"
        />
        <TextWithIcon
          textContent={textTimeZone}
          iconName="language"
          fontWeight="regular"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1662")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "interview_count")}
          tag="div"
        >
          <TextWithIcon
            textContent="Today"
            iconName="today"
            fontSize="1"
            iconSize="2"
            fontWeight="regular"
          />
          <_Builtin.Block tag="div">{textTodayInterview}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "interview_count")}
          tag="div"
        >
          <TextWithIcon
            textContent="This Week"
            iconName="date_range"
            fontSize="1"
            iconSize="2"
            fontWeight="regular"
          />
          <_Builtin.Block tag="div">{textWeekInterview}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
