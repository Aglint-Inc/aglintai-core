"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonGhost } from "./ButtonGhost";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./EditEmail.module.css";

export function EditEmail({
  as: _Component = _Builtin.Block,
  textEmailName = "This is some text inside of a div block.",
  slotForm,
  editEmailDescription = "This is some text inside of a div block.",
  slotBottom,
  isSaveChangesButtonVisible = true,
  isRequestTestMailVisible = true,
  textTipsMessage = "For dynamic content, utilize placeholders like [firstName], [lastName], [companyName], and [jobTitle].",
  onClickPreview = {},
  isPreviewVisible = true,
  slotButton,
  onClickCloseTip = {},
  isTipVisible = true,
  slotSaveButton,
  currentModule,
}) {
  return (
    <_Component className={_utils.cx(_styles, "edit-email-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "company-email-edit")}
        tag="div"
      >
        {isTipVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "eemail-tip-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "eemial-tip-left-content")}
              tag="div"
            >
              <Text content="Type ‘ {{ ’ while typing to add dynamic content to email templates" />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "eemail-body-wrap")}
          tag="div"
          data-edit-email-module-name={currentModule}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "company-email-header")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "company-email-left-wrap")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "edit-email-head")}
                tag="div"
              >
                <Text content={textEmailName} weight="medium" />
                <ButtonGhost
                  onClickButton={onClickPreview}
                  size="1"
                  isLeftIcon={false}
                  iconSize="3"
                  iconName=""
                  textButton="Preview"
                />
              </_Builtin.Block>
              <Text content={editEmailDescription} color="neutral" />
            </_Builtin.Block>
            <_Builtin.Block tag="div">{slotSaveButton}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-company-email-form")}
            tag="div"
          >
            {slotForm}
          </_Builtin.Block>
          {isSaveChangesButtonVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "edit-email-btn-wrap")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                {slotButton ?? <SlotComp componentName="ButtonSolid" />}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isRequestTestMailVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-edit-email-bottom")}
              tag="div"
            >
              {slotBottom}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%5Bdata-edit-email-module-name%3D%22scheduler%22%5D%7B%0A%09height%3Acalc(100vh%20-%20180px)%3B%0A%7D%0A%3C%2Fstyle%3E" />
    </_Component>
  );
}
