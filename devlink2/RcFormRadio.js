import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RcFormRadio.module.css";

export function RcFormRadio({
  as: _Component = _Builtin.Block,
  onclickRadio = {},
  isClicked = false,
  text = "Lever",
  isImageAvailabe = true,
  isTextVisible = false,
  slotLogo,
}) {
  return (
    <_Component className={_utils.cx(_styles, "sl-radio-btn-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "sl-radio-btn")}
        tag="div"
        {...onclickRadio}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "sl-radio-btn-inner")}
          tag="div"
        />
        {isClicked ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "sl-radio-btn-inner", "filled")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      {isImageAvailabe ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "sl-radio-image-block")}
          tag="div"
        >
          {slotLogo}
        </_Builtin.Block>
      ) : null}
      {isTextVisible ? <_Builtin.Block tag="div">{text}</_Builtin.Block> : null}
    </_Component>
  );
}
