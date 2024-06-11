"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
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
    <_Component className={_utils.cx(_styles, "user-profile-layout")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "user-profile-header")}
        tag="div"
      >
        <Text content="Profile" weight="" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-new-layout")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "new-layout-sublink")}
          tag="div"
        >
          {slotNavSublink ?? <SlotComp componentName="NavSubLink" />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "profile-inner-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-profile-wrap")}
            tag="div"
          >
            {slotInfo ?? (
              <>
                <SlotComp componentName="UserDetails" />
                <SlotComp
                  componentName={
                    <>
                      {"ProfileList"}
                      <br />
                    </>
                  }
                />
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
