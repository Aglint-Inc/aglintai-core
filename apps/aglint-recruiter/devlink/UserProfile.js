"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { NavSublink } from "./NavSublink";
import { UserDetails } from "./UserDetails";
import { ProfileList } from "./ProfileList";
import * as _utils from "./utils";
import _styles from "./UserProfile.module.css";

export function UserProfile({
  as: _Component = _Builtin.Block,
  slotPreferenceForm,
  slotPreferencesBtn,
  slotNavSublink,
  slotInfo,
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
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Profile"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-new-layout")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "new-layout-sublink")}
          tag="div"
        >
          {slotNavSublink ?? <NavSublink />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "profile-inner-wrapper")}
          tag="div"
        >
          {slotInfo ?? (
            <>
              <UserDetails />
              <_Builtin.Block
                className={_utils.cx(_styles, "profile-block", "hide")}
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
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "profile-inputs-wrapper")}
                  tag="div"
                >
                  {slotPreferenceForm}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "flex-hor-right")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-387")}
                    tag="div"
                  >
                    {slotPreferencesBtn}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <ProfileList />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
