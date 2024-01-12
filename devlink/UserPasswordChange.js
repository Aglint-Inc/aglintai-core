import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./UserPasswordChange.module.css";

export function UserPasswordChange({
  as: _Component = _Builtin.Block,
  slotPassword,
  slotSavePassword,
}) {
  return (
    <_Component className={_utils.cx(_styles, "profile-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-header-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "color-grey-600")}
          tag="div"
        >
          {"Password Update"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-516")} tag="div">
        {slotPassword}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "flex-hor-left", "emial")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-387")}
          tag="div"
        >
          {slotSavePassword}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
