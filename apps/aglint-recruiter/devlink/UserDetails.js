"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { IconButtonGhost } from "./IconButtonGhost";
import { SlotComp } from "./SlotComp";
import { ButtonGhost } from "./ButtonGhost";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./UserDetails.module.css";

export function UserDetails({
  as: _Component = _Builtin.Block,
  slotUserImage,
  onClickProfilePhotoChange = {},
  slotUserForm,
  slotUserInfoBtn,
  slotWarning,
  isWarningVisible = false,
  onClickClose = {},
  onClickUpdate = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "edit-profile-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "edit-profile-header")}
        tag="div"
      >
        <Text weight="medium" content="Edit Profile" />
        <IconButtonGhost
          onClickButton={onClickClose}
          iconName="close"
          iconWeight="thin"
          iconColor="neutral"
          color="neutral"
        />
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "profile-image-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-edit-image")}
            tag="div"
          >
            {slotUserImage ?? <SlotComp componentName="slotImage" />}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "profile-change-text")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "profile-link-wrap")}
              tag="div"
              {...onClickProfilePhotoChange}
            >
              <Text content="Change profile photo" />
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              <Text
                content="Upload a square profile image (PNG or JPEG). "
                size="1"
                color="neutral"
              />
              <Text content="Maximum size: 5 MB." color="neutral" size="1" />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isWarningVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "ud-slot-warning")}
            tag="div"
          >
            {slotWarning}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "profile-inputs-wrapper")}
          tag="div"
        >
          {slotUserForm ?? <SlotComp componentName="slotUserForm" />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-button-edit-profile")}
          tag="div"
        >
          {slotUserInfoBtn ?? <SlotComp componentName="slotForButton" />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "flex-horizontal", "center", "gap-2")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "width-50")}
          tag="div"
          {...onClickClose}
        >
          <ButtonGhost
            isRightIcon={false}
            isLeftIcon={false}
            textButton="Cancel"
            size="2"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "width-50")}
          tag="div"
          {...onClickUpdate}
        >
          <ButtonSolid
            isLeftIcon={false}
            isRightIcon={false}
            textButton="Update"
            size="2"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
