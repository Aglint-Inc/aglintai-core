import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TeamInvitesBlock.module.css";

export function TeamInvitesBlock({
  as: _Component = _Builtin.Block,
  slotImage,
  slotButton,
  name = "Richard Kaka",
  email = "roberto@sample.com",
}) {
  return (
    <_Component className={_utils.cx(_styles, "pi-user-block")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-461")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "pi-user-image")}
          tag="div"
        >
          {slotImage}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "pi-user-info")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {name}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {email}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotButton}</_Builtin.Block>
    </_Component>
  );
}
