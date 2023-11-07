import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RcFormRadio.module.css";

export function RcFormRadio({
  as: _Component = _Builtin.Block,
  onclickRadio = {},
  isClicked = false,
  name = "Lever",
  isImageAvailabe = false,
  image = "",
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
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src={image}
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block tag="div">{name}</_Builtin.Block>
    </_Component>
  );
}
