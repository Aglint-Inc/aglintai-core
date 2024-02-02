import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./UserDetails.module.css";

export function UserDetails({
  as: _Component = _Builtin.Block,
  slotUserImage,
  onClickProfilePhotoChange = {},
  slotUserForm,
  slotUserInfoBtn,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-678")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-header-wrappers")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Your Details"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-image-block", "top-align")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-460")}
          tag="div"
        >
          {slotUserImage}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-458")}
          tag="div"
        >
          <_Builtin.Block tag="div" {...onClickProfilePhotoChange}>
            <_Builtin.Block
              className={_utils.cx(_styles, "cursor-pointer")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-blue-500")}
                tag="div"
              >
                {"Update Profile Picture"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "color-grey-600")}
            tag="div"
          >
            {"Upload a square profile image (PNG or JPEG). Maximum size: 5 MB."}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "profile-block")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "profile-inputs-wrapper")}
          tag="div"
        >
          {slotUserForm}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "flex-hor-left", "emial")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-387")}
            tag="div"
          >
            {slotUserInfoBtn}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
