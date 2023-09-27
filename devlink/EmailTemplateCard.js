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
          <_Builtin.Block
            className={_utils.cx(_styles, "icon-text-wrapper")}
            tag="div"
            {...onClickDuplicate}
          >
            <_Builtin.HtmlEmbed value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%207.5C3%207.22386%202.77614%207%202.5%207H1V1H7V2.5C7%202.77614%207.22386%203%207.5%203C7.77614%203%208%202.77614%208%202.5V1C8%200.447715%207.55228%200%207%200H1C0.447715%200%200%200.447715%200%201V7C0%207.55228%200.447715%208%201%208H2.5C2.77614%208%203%207.77614%203%207.5ZM12%205C12%204.44772%2011.5523%204%2011%204H5C4.44772%204%204%204.44772%204%205V11C4%2011.5523%204.44772%2012%205%2012H11C11.5523%2012%2012%2011.5523%2012%2011V5ZM5%2011V5H11V11H5Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_2351_6370%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%207.5C3%207.22386%202.77614%207%202.5%207H1V1H7V2.5C7%202.77614%207.22386%203%207.5%203C7.77614%203%208%202.77614%208%202.5V1C8%200.447715%207.55228%200%207%200H1C0.447715%200%200%200.447715%200%201V7C0%207.55228%200.447715%208%201%208H2.5C2.77614%208%203%207.77614%203%207.5ZM12%205C12%204.44772%2011.5523%204%2011%204H5C4.44772%204%204%204.44772%204%205V11C4%2011.5523%204.44772%2012%205%2012H11C11.5523%2012%2012%2011.5523%2012%2011V5ZM5%2011V5H11V11H5Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_2351_6370)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E" />
            <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
              {"Duplucate"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "icon-text-wrapper")}
            tag="div"
            {...onClickDelete}
          >
            <_Builtin.HtmlEmbed value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4%202V1C4%200.423858%204.42386%200%205%200H7C7.57614%200%208%200.423858%208%201V2H10C10.2761%202%2010.5%202.22386%2010.5%202.5C10.5%202.77614%2010.2761%203%2010%203H7.5H4.5H2C1.72386%203%201.5%202.77614%201.5%202.5C1.5%202.22386%201.72386%202%202%202H4ZM7%202V1H5V2H7ZM5%209.5C5%209.77614%204.77614%2010%204.5%2010C4.22386%2010%204%209.77614%204%209.5V5C4%204.72386%204.22386%204.5%204.5%204.5C4.77614%204.5%205%204.72386%205%205V9.5ZM8%209.5C8%209.77614%207.77614%2010%207.5%2010C7.22386%2010%207%209.77614%207%209.5V5C7%204.72386%207.22386%204.5%207.5%204.5C7.77614%204.5%208%204.72386%208%205V9.5ZM2%204.5C2%204.22386%202.22386%204%202.5%204C2.77614%204%203%204.22386%203%204.5V11H9V4.5C9%204.22386%209.22386%204%209.5%204C9.77614%204%2010%204.22386%2010%204.5V11C10%2011.5761%209.57614%2012%209%2012H3C2.42386%2012%202%2011.5761%202%2011V4.5Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E" />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "text-red-600")}
              tag="div"
            >
              {"Delete Template"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
