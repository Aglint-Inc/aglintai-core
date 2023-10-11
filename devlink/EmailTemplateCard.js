import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./EmailTemplateCard.module.css";

export function EmailTemplateCard({
  as: _Component = _Builtin.Block,
  slotTemplateImage,
  textEmailTemplateCategory = "Interview Email",
  textUsedByCount = "Used by 10 jobs",
  onClickViewEdit = {},
  onClickDuplicate = {},
  onClickDelete = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "email-temp-cards")}
      id={_utils.cx(
        _styles,
        "w-node-_923d15de-9788-e49f-c431-fc52940f52b2-940f52b2"
      )}
      tag="div"
      {...onClickViewEdit}
    >
      <_Builtin.Block className={_utils.cx(_styles, "image-33")} tag="div">
        {slotTemplateImage}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-341")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "email-name-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {textEmailTemplateCategory}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600-3")}
            tag="div"
          >
            {textUsedByCount}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
