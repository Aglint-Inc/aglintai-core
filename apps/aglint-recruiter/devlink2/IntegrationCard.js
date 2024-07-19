"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalBadge } from "./GlobalBadge";
import { GlobalIcon } from "./GlobalIcon";
import { ButtonSoft } from "./ButtonSoft";
import * as _utils from "./utils";
import _styles from "./IntegrationCard.module.css";

export function IntegrationCard({
  as: _Component = _Builtin.Block,
  slotLogo,
  textName = "Greenhouse",
  isConnectedVisible = true,
  onClickCopyLink = {},
  slotButton,
  textLink = "greenhouse.com",
  isComingSoon = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "intigrations-card")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "card-heading-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "intigration-icon")}
          tag="div"
          editable={false}
        >
          {slotLogo}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "card-heading")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "header-row")}
            tag="div"
          >
            <Text content={textName} align="" weight="medium" />
            {isConnectedVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "connected-status")}
                tag="div"
              >
                <GlobalBadge
                  color="success"
                  iconName=""
                  textBadge="Connected"
                  size="1"
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "intagration-link", "cursor-pointer")}
            tag="div"
            {...onClickCopyLink}
          >
            <Text
              content={textLink}
              align=""
              weight=""
              color="neutral"
              highContrast=""
            />
            <GlobalIcon
              iconName="link"
              size="3"
              weight="thin"
              color="neutral-9"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "intagration_actions")}
        tag="div"
      >
        {slotButton ??
          (isComingSoon ? (
            <_Builtin.Block
              id={_utils.cx(
                _styles,
                "w-node-_873e575d-affc-c17c-9a00-983c37c523b3-c20717d8"
              )}
              tag="div"
            >
              <ButtonSoft
                textButton="Coming Soon"
                color="neutral"
                size="2"
                isDisabled={true}
                isLeftIcon={false}
                isRightIcon={false}
              />
            </_Builtin.Block>
          ) : null)}
      </_Builtin.Block>
    </_Component>
  );
}
