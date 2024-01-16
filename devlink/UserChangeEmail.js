import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonPrimaryRegular } from "./ButtonPrimaryRegular";
import * as _utils from "./utils";
import _styles from "./UserChangeEmail.module.css";

export function UserChangeEmail({
  as: _Component = _Builtin.Block,
  slotEmail,
  onClickEmailChange = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "profile-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-header-wrappers")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Change Email"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-inputs-wrapper")}
        tag="div"
      >
        {slotEmail}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "flex-hor-left", "emial")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-387")}
          tag="div"
          {...onClickEmailChange}
        >
          <ButtonPrimaryRegular textLabel="Change Email" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
