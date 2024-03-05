import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AvatarWithName.module.css";

export function AvatarWithName({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "avatarwithname")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_useravatr", "small")}
        tag="div"
      />
      <_Builtin.Block tag="div">{"Mike"}</_Builtin.Block>
    </_Component>
  );
}
