import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonOutlinedRegular } from "./ButtonOutlinedRegular";
import * as _utils from "./utils";
import _styles from "./UserProfile.module.css";

export function UserProfile({
  as: _Component = _Builtin.Block,
  slotUserImage,
  slotUserForm,
  slotPreferenceForm,
  slotEmail,
  onClickEmailChange = {},
  onClickProfilePhotoChange = {},
  slotUserInfoBtn,
  slotPreferencesBtn,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "rd-main-wrapper", "profile-wrappers")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-271")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-jobs-header-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {"Profile"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-inner-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "profile-image-block")}
          id={_utils.cx(
            _styles,
            "w-node-bd76686d-3da8-fe6f-1bbb-2ff07f7f8329-2928a6f4"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-460")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-324")}
              tag="div"
            >
              {slotUserImage}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-458")}
            tag="div"
          >
            <_Builtin.Block tag="div" {...onClickProfilePhotoChange}>
              <ButtonOutlinedRegular textLabel="Change profile photo" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {
                "Logo should be having png/svg format and should be less than 5 MB"
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "profile-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "profile-header-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-lg",
                "fw-semibold",
                "text-grey-500"
              )}
              tag="div"
            >
              {"User Info"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-387")}
              tag="div"
            >
              {slotUserInfoBtn}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "profile-inputs-wrapper")}
            tag="div"
          >
            {slotUserForm}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "profile-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "preference-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-lg",
                "fw-semibold",
                "text-grey-500"
              )}
              tag="div"
            >
              {"Preferences"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-387")}
              tag="div"
            >
              {slotPreferencesBtn}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "profile-inputs-wrapper")}
            tag="div"
          >
            {slotPreferenceForm}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "profile-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "profile-header-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-lg",
                "fw-semibold",
                "text-grey-500"
              )}
              tag="div"
            >
              {"Email"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-387")}
              tag="div"
              {...onClickEmailChange}
            >
              <ButtonOutlinedRegular textLabel="Change email" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "profile-inputs-wrapper")}
            tag="div"
          >
            {slotEmail}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
