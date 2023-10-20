import React from "react";
import * as _Builtin from "./_Builtin";
import { EmailTemplateCards } from "./EmailTemplateCards";
import { ButtonPrimarySmall } from "./ButtonPrimarySmall";
import * as _utils from "./utils";
import _styles from "./EmailTemplatesStart.module.css";

export function EmailTemplatesStart({
  as: _Component = _Builtin.Block,
  onClickApplicationRecieved = {},
  onClickInterviewInvite = {},
  onClickFollowInterview = {},
  onClickDisqualified = {},
  slotEmailTemplateCards,
  isProceedDisable = true,
  onClickProceed = {},
  isAddJob = true,
  onClickDone = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-508")} tag="div">
      {isAddJob ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-507")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Email Templates"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "color-grey-600")}
            tag="div"
          >
            {
              "Emails will be triggered in mentioned events. Click on the card to customize emails"
            }
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "email-start-wrap")}
        id={_utils.cx(
          _styles,
          "w-node-_7a13e008-ea54-7273-6b2d-06ecde60cc59-adb6be91"
        )}
        tag="div"
      >
        {slotEmailTemplateCards ?? <EmailTemplateCards />}
      </_Builtin.Block>
      {isAddJob ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-522")}
          tag="div"
        >
          <_Builtin.Block tag="div" {...onClickDone}>
            <ButtonPrimarySmall textLabel="Done" />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
