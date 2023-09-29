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
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-354")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "icon-text-wrapper")}
            tag="div"
            {...onClickViewEdit}
          >
            <_Builtin.HtmlEmbed value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0%209.44681V11.4894C0%2011.7714%200.228621%2012%200.510638%2012H2.55319C2.68862%2012%202.8185%2011.9462%202.91427%2011.8504L10.063%204.70172C10.0631%204.70157%2010.0633%204.70143%2010.0634%204.70128L11.6972%203.06746C12.1009%202.66379%2012.1009%202.03409%2011.6972%201.63041L10.3696%200.302754C9.96591%20-0.100918%209.33621%20-0.100918%208.93254%200.302754L0.149562%209.08573C0.0537992%209.1815%200%209.31138%200%209.44681ZM9.70213%203.61827L10.9715%202.34894L9.65106%201.02853L8.38173%202.29787L9.70213%203.61827ZM7.65957%203.02002L1.02128%209.65832V10.9787H2.34168L8.97998%204.34043L7.65957%203.02002Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E" />
            <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
              {"View/Edit"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
