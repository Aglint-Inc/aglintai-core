"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Checkbox } from "./Checkbox";
import { GlobalIcon } from "./GlobalIcon";
import { GlobalBadge } from "./GlobalBadge";
import { ButtonSoft } from "./ButtonSoft";
import * as _utils from "./utils";
import _styles from "./CandidateDetailsCard.module.css";

export function CandidateDetailsCard({
  as: _Component = _Builtin.Block,
  onClickCheck = {},
  isChecked = false,
  slotAvatar,
  textName = "Dianne Russell",
  textJobRoleAtCompany = "Software Engineer at Aglint",
  textLocation = "Berlin, germany",
  textOverview = "Eike led software as a Senior System Software Engineer at NVIDIA Corporation, specializing in autonomous vehicles.",
  isOverviewVisible = true,
  slotSkill,
  isStarActive = false,
  onClickStar = {},
  onClickCard = {},
  isBorderActive = false,
  isLocationVisible = true,
  textJobAddedCount = "1",
  isJobAddedVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cdb-card-block")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cdb-card-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cdb-card-header-left")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cdb-card-checkmark")}
            tag="div"
            {...onClickCheck}
          >
            {isChecked ? (
              <_Builtin.Block tag="div">
                <Checkbox />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cdb-card-header-main")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cdb-card-profile-info")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cdb-card-company-info-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cdb-card-profile-image-block")}
                  tag="div"
                >
                  {slotAvatar}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {textName}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cdb-card-company-info")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "cdb-card-company-info-wrapper"
                  )}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "icon-block-4")}
                    tag="div"
                  >
                    <GlobalIcon iconName="work" size="3" color="neutral" />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "one-line-clamp")}
                    tag="div"
                  >
                    {textJobRoleAtCompany}
                  </_Builtin.Block>
                </_Builtin.Block>
                {isLocationVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cdb-card-company-info-wrapper"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "icon-block-4")}
                      tag="div"
                    >
                      <GlobalIcon
                        iconName="location_on"
                        size="3"
                        color="neutral"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "text-grey-600-3",
                        "one-line-clamp"
                      )}
                      tag="div"
                    >
                      {textLocation}
                    </_Builtin.Block>
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cdb-card-body")}
                tag="div"
              >
                {isOverviewVisible ? (
                  <_Builtin.Paragraph
                    className={_utils.cx(_styles, "text-kale-600-4")}
                  >
                    {textOverview}
                  </_Builtin.Paragraph>
                ) : null}
                <_Builtin.Block
                  className={_utils.cx(_styles, "cdb-card-tags-wrapper")}
                  tag="div"
                  id="content"
                >
                  {slotSkill ?? (
                    <>
                      <GlobalBadge size="2" />
                      <ButtonSoft size="1" color="neutral" />
                    </>
                  )}
                </_Builtin.Block>
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "hide")}
                  value="%3Cscript%3E%0Adocument.getElementById('viewmore').addEventListener('click'%2C%20function()%20%7B%0A%20%20var%20content%20%3D%20document.getElementById('content')%3B%0A%0A%20%20%2F%2F%20Toggle%20between%20'58px'%20and%20'none'%20for%20max-height%0A%20%20content.style.maxHeight%20%3D%20content.style.maxHeight%20%3D%3D%3D%20'58px'%20%3F%20content.scrollHeight%20%2B%20'px'%20%3A%20'58px'%3B%0A%7D)%3B%0A%3C%2Fscript%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cdb-card-header-right")}
          tag="div"
        >
          {isJobAddedVisible ? (
            <_Builtin.Block tag="div">
              <GlobalBadge
                textBadge={textJobAddedCount}
                iconName="work"
                showIcon={true}
                color="neutral"
              />
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "cdb-star-block")}
            tag="div"
            {...onClickStar}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20width%3D%2211%22%20height%3D%2215%22%20viewbox%3D%220%200%2011%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.249999%202.0625C0.268228%201.69792%200.395832%201.38802%200.632812%201.13281C0.88802%200.895832%201.19792%200.768228%201.5625%200.749998H9.4375C9.80208%200.768228%2010.112%200.895832%2010.3672%201.13281C10.6042%201.38802%2010.7318%201.69792%2010.75%202.0625V14.1484C10.7135%2014.513%2010.513%2014.7135%2010.1484%2014.75C10.0208%2014.75%209.91146%2014.7135%209.82031%2014.6406L5.5%2011.7695L1.17969%2014.6406C1.08854%2014.7135%200.979166%2014.75%200.851562%2014.75C0.486978%2014.7135%200.286457%2014.513%200.249999%2014.1484V2.0625ZM1.5625%201.625C1.28906%201.64323%201.14323%201.78906%201.125%202.0625V13.6289L5.25391%2010.8945C5.41797%2010.7852%205.58203%2010.7852%205.74609%2010.8945L9.875%2013.6289V2.0625C9.85677%201.78906%209.71094%201.64323%209.4375%201.625H1.5625Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            {isStarActive ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed", "absolute")}
                value="%3Csvg%20width%3D%2211%22%20height%3D%2215%22%20viewbox%3D%220%200%2011%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.249999%202.0625C0.268228%201.69792%200.395832%201.38802%200.632812%201.13281C0.88802%200.895832%201.19792%200.768228%201.5625%200.749998H9.4375C9.80208%200.768228%2010.112%200.895832%2010.3672%201.13281C10.6042%201.38802%2010.7318%201.69792%2010.75%202.0625V14.0938C10.7135%2014.4948%2010.4948%2014.7135%2010.0938%2014.75C9.94792%2014.75%209.82031%2014.7135%209.71094%2014.6406L5.5%2011.6875L1.28906%2014.6406C1.17969%2014.7135%201.05208%2014.75%200.906249%2014.75C0.505207%2014.7135%200.286457%2014.4948%200.249999%2014.0938V2.0625Z%22%20fill%3D%22%23F79A3E%22%20style%3D%22fill%3A%23F79A3E%3Bfill%3Acolor(display-p3%200.9686%200.6039%200.2431)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isBorderActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "border-active-blue")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
