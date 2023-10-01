import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonOutlinedSmall } from "./ButtonOutlinedSmall";
import * as _utils from "./utils";
import _styles from "./UserProfile.module.css";

export function UserProfile({
  as: _Component = _Builtin.Block,
  slotUserImage,
  slotUserForm,
  onClickUserInfoSave = {},
  onClickPreferenceSave = {},
  slotPreferenceForm,
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
        className={_utils.cx(_styles, "profile-inner-wraper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "profile-header-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {"User Info"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-387")}
            tag="div"
            {...onClickUserInfoSave}
          >
            <ButtonOutlinedSmall textLabel="Save Changes" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-324")}
          tag="div"
        >
          {slotUserImage}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotUserForm}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "preference-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {"Preferences"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-387")}
            tag="div"
            {...onClickPreferenceSave}
          >
            <ButtonOutlinedSmall textLabel="Save Changes" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "preference-text")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Location"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {
              "When you created your account we made some assumptions about your location. You can change your preferences here."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-prefernces-form")}
          tag="div"
        >
          {slotPreferenceForm}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
