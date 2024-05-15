import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./EmailTemplateCards.module.css";

export function EmailTemplateCards({
  as: _Component = _Builtin.Block,
  onClickApplicationRecieved = {},
  onClickEdit = {},
  textDescription = "Triggered instantly when candidate applied to this job.",
  textTitle = "Application recieved",
  isActive = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "email-temp-wrap")}
      tag="div"
      {...onClickApplicationRecieved}
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-486")} tag="div">
        <_Builtin.Block tag="div">{textTitle}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "color-blue-600", "hide")}
          tag="div"
          {...onClickEdit}
        >
          {"Edit"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-grey-500", "relative-1")}
        tag="div"
      >
        {textDescription}
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "active-state-email")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
