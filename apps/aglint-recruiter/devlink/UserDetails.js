"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
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
        <Text weight="bold" content="Edit Profile" />
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "cursor-pointer")}
          value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.28125%201.21875L8%206.9375L13.7188%201.21875C14.0729%200.927083%2014.4271%200.927083%2014.7812%201.21875C15.0729%201.57292%2015.0729%201.92708%2014.7812%202.28125L9.0625%208L14.7812%2013.7188C15.0729%2014.0729%2015.0729%2014.4271%2014.7812%2014.7812C14.4271%2015.0729%2014.0729%2015.0729%2013.7188%2014.7812L8%209.0625L2.28125%2014.7812C1.92708%2015.0729%201.57292%2015.0729%201.21875%2014.7812C0.927083%2014.4271%200.927083%2014.0729%201.21875%2013.7188L6.9375%208L1.21875%202.28125C0.927083%201.92708%200.927083%201.57292%201.21875%201.21875C1.57292%200.927083%201.92708%200.927083%202.28125%201.21875Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickClose}
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
