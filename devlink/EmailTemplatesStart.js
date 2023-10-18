import React from "react";
import * as _Builtin from "./_Builtin";
import { EmailTemplateCards } from "./EmailTemplateCards";
import * as _utils from "./utils";
import _styles from "./EmailTemplatesStart.module.css";

export function EmailTemplatesStart({
  as: _Component = _Builtin.Block,
  onClickApplicationRecieved = {},
  onClickInterviewInvite = {},
  onClickFollowInterview = {},
  onClickDisqualified = {},
  slotEmailTemplateCards,
}) {
  return (
    <_Component className={_utils.cx(_styles, "email-start-wrap")} tag="div">
      {slotEmailTemplateCards ?? <EmailTemplateCards />}
    </_Component>
  );
}
