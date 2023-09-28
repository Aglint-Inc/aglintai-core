import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./EmailCreateNew.module.css";

export function EmailCreateNew({
  as: _Component = _Builtin.Block,
  onClickCreateNew = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-379")}
      id={_utils.cx(
        _styles,
        "w-node-cfc48f11-bf30-27b2-0bcc-018fe63bc805-e63bc805"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "create-new-wrappers")}
        id={_utils.cx(
          _styles,
          "w-node-cfc48f11-bf30-27b2-0bcc-018fe63bc806-e63bc805"
        )}
        tag="div"
        {...onClickCreateNew}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-380")}
          tag="div"
        >
          <_Builtin.Image
            width="auto"
            height="auto"
            alt="__wf_reserved_inherit"
            loading="lazy"
            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6513c98c9df878038d288f9f_Frame%201193.svg"
          />
          <_Builtin.Block tag="div">{"Create new"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
