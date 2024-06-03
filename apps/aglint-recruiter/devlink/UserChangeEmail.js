"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { ButtonPrimaryRegular } from "./ButtonPrimaryRegular";
import * as _utils from "./utils";
import _styles from "./UserChangeEmail.module.css";

export function UserChangeEmail({
  as: _Component = _Builtin.Block,
  slotEmail,
  onClickEmailChange = {},
  texDesc = "Your current email is raimon@aglinthq.com. To update your email, enter the new email address. We will send a verification link to the new email; please confirm it to complete the email change.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "change-email-wrap")} tag="div">
      <_Builtin.Block tag="div">
        <Text content="Change Email" weight="bold" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-desc-wrap-mail")}
        tag="div"
      >
        <Text content={texDesc} color="neutral" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-inputs-wrapper")}
        tag="div"
      >
        {slotEmail ?? <SlotComp componentName="Slot for Email field." />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "flex-horizontal", "mt-2")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-button-edit-profile")}
          tag="div"
          {...onClickEmailChange}
        >
          <ButtonPrimaryRegular textLabel="Change Email" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
