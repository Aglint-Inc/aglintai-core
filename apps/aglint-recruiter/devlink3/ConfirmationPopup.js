"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { IconButtonGhost } from "./IconButtonGhost";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./ConfirmationPopup.module.css";

export function ConfirmationPopup({
  as: _Component = _Builtin.Block,
  textPopupDescription = "By Clicking send reminder an email will be sent to the candidate with the interview details.",
  textPopupTitle = "Send Reminder",
  textPopupButton = "Send Reminder ",
  slotWidget,
  isWidget = true,
  onClickCancel = {},
  onClickAction = {},
  isIcon = true,
  isYellowButtonVisible = false,
  isBlueButtonVisible = true,
  isGreyButtonVisible = true,
  isDescriptionVisible = true,
  widthStyleProps = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "assessment_duplicate_popup")}
      tag="div"
      {...widthStyleProps}
    >
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "popup_header")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "popup_title")}
            tag="div"
          >
            {isIcon ? (
              <_Builtin.Block tag="div">
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex-2")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8%202C8.21875%202%208.39844%202.07031%208.53906%202.21094C8.67969%202.35156%208.75%202.53125%208.75%202.75V3.17188C9.625%203.32813%2010.3359%203.72656%2010.8828%204.36719C11.4453%205.00781%2011.7344%205.78125%2011.75%206.6875V7.46094C11.7656%208.55469%2012.1094%209.53125%2012.7812%2010.3906L13.1328%2010.8359C13.2578%2011.0234%2013.2812%2011.2188%2013.2031%2011.4219C13.0938%2011.625%2012.9219%2011.7344%2012.6875%2011.75H3.3125C3.07812%2011.7344%202.90625%2011.625%202.79688%2011.4219C2.70312%2011.2188%202.72656%2011.0234%202.86719%2010.8359L3.21875%2010.3906C3.89062%209.53125%204.23438%208.55469%204.25%207.46094V6.6875C4.26562%205.78125%204.55469%205.00781%205.11719%204.36719C5.66406%203.72656%206.375%203.32813%207.25%203.17188V2.75C7.25%202.53125%207.32031%202.35156%207.46094%202.21094C7.60156%202.07031%207.78125%202%208%202ZM8%204.25H7.8125C7.125%204.26562%206.54688%204.5%206.07812%204.95312C5.625%205.42188%205.39062%206%205.375%206.6875V7.46094C5.35938%208.61719%205.04688%209.67188%204.4375%2010.625H11.5625C10.9375%209.67188%2010.625%208.61719%2010.625%207.46094V6.6875C10.6094%206%2010.375%205.42188%209.92188%204.95312C9.45312%204.5%208.875%204.26562%208.1875%204.25H8ZM9.5%2012.5C9.5%2012.9062%209.35156%2013.2578%209.05469%2013.5547C8.75781%2013.8516%208.40625%2014%208%2014C7.59375%2014%207.24219%2013.8516%206.94531%2013.5547C6.64844%2013.2578%206.5%2012.9062%206.5%2012.5H8H9.5Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
            <Text content={textPopupTitle} weight="medium" />
          </_Builtin.Block>
          <IconButtonGhost
            onClickButton={onClickCancel}
            iconName="close"
            iconColor="neutral"
            iconWeight="thin"
            color="neutral"
          />
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <Text content={textPopupDescription} weight="" color="neutral" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "popup_body")} tag="div">
        {isWidget ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_widget")}
            tag="div"
          >
            {slotWidget}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "button-pop-wrap", "stretch-vertical")}
        tag="div"
      >
        {isGreyButtonVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "wide_button", "width-100")}
            tag="div"
          >
            <ButtonSoft
              onClickButton={onClickCancel}
              textButton="Cancel"
              color="neutral"
              size="2"
              isLeftIcon={false}
              isRightIcon={false}
            />
          </_Builtin.Block>
        ) : null}
        {isBlueButtonVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "wide_button", "width-100", "pos-2")}
            id={_utils.cx(
              _styles,
              "w-node-b6b410b8-e77b-d481-432a-efbe4e0bdc2d-4e0bdc1d"
            )}
            tag="div"
          >
            <ButtonSolid
              textButton={textPopupButton}
              onClickButton={onClickAction}
              size="2"
            />
          </_Builtin.Block>
        ) : null}
        {isYellowButtonVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "wide_button", "width-100")}
            tag="div"
          >
            <ButtonSolid
              onClickButton={onClickAction}
              textButton={textPopupButton}
              size="2"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
