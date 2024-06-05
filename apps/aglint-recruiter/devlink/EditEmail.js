"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./EditEmail.module.css";

export function EditEmail({
  as: _Component = _Builtin.Block,
  textEmailName = "This is some text inside of a div block.",
  onClickSaveChanges = {},
  onClickClose = {},
  slotForm,
  editEmailDescription = "This is some text inside of a div block.",
  slotBottom,
  isSaveChangesButtonVisible = true,
  isRequestTestMailVisible = true,
  textTipsMessage = "For dynamic content, utilize placeholders like [firstName], [lastName], [companyName], and [jobTitle].",
}) {
  return (
    <_Component className={_utils.cx(_styles, "edit-email-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "company-email-edit")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "company-email-header")}
          tag="div"
        >
          <Text content={textEmailName} weight="bold" />
          <Text content={editEmailDescription} color="neutral" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "edit-email-tip-wrap")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons", "mt-3")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.375%2011H5.625C5.35938%2010.2656%204.97656%209.59375%204.47656%208.98438C4.47656%208.98438%204.47656%208.97656%204.47656%208.96094C4.35156%208.80469%204.22656%208.64062%204.10156%208.46875C3.63281%207.79688%203.39062%207.01562%203.375%206.125C3.40625%204.95312%203.8125%203.98438%204.59375%203.21875C5.35938%202.4375%206.32812%202.03125%207.5%202C8.67188%202.03125%209.64062%202.4375%2010.4062%203.21875C11.1875%203.98438%2011.5938%204.95312%2011.625%206.125C11.6094%207.01562%2011.3672%207.79688%2010.8984%208.46875C10.7734%208.64062%2010.6484%208.8125%2010.5234%208.98438C10.5234%208.98438%2010.5234%208.99219%2010.5234%209.00781C10.0234%209.61719%209.64062%2010.2812%209.375%2011ZM7.5%2014C6.96875%2013.9844%206.52344%2013.8047%206.16406%2013.4609C5.82031%2013.1016%205.64062%2012.6562%205.625%2012.125V11.75H9.375V12.125C9.35938%2012.6562%209.17969%2013.1016%208.83594%2013.4609C8.47656%2013.8047%208.03125%2013.9844%207.5%2014ZM5.625%206.125C5.64062%205.59375%205.82031%205.14844%206.16406%204.78906C6.52344%204.44531%206.96875%204.26562%207.5%204.25C7.73438%204.23438%207.85938%204.10938%207.875%203.875C7.85938%203.64062%207.73438%203.51563%207.5%203.5C6.75%203.51563%206.13281%203.77344%205.64844%204.27344C5.14844%204.75781%204.89062%205.375%204.875%206.125C4.89062%206.35938%205.01562%206.48438%205.25%206.5C5.48438%206.48438%205.60938%206.35938%205.625%206.125Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">
            <Text content="Pro Tip: Customize Your Message" />
            <Text content={textTipsMessage} color="neutral" />
          </_Builtin.Block>
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
            <_Builtin.Block tag="div" {...onClickSaveChanges}>
              <ButtonSolid
                isLeftIcon={false}
                isRightIcon={false}
                textButton="Save Changes"
                size="2"
              />
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
    </_Component>
  );
}
