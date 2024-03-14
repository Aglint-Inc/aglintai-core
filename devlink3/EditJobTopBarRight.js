import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./EditJobTopBarRight.module.css";

export function EditJobTopBarRight({
  as: _Component = _Builtin.Block,
  onClickDraft = {},
  onClickPublish = {},
  isDraft = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-756")} tag="div">
      {isDraft ? (
        <_Builtin.Block className={_utils.cx(_styles, "wide_button")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "button_primary", "is_outline")}
            tag="div"
            {...onClickDraft}
          >
            <_Builtin.Block tag="div">{"Save to draft"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "wide_button")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "button_primary")}
          tag="div"
          {...onClickPublish}
        >
          <_Builtin.Block tag="div">{"Publish"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "button_primary")}
          tag="div"
          {...onClickPublish}
        >
          <_Builtin.Block tag="div">{"Publish"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
