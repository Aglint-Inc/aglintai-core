import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./EmailTemplates.module.css";

export function EmailTemplates({
  as: _Component = _Builtin.Block,
  slotEmailTemplates,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "job-email-template-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "automated-messages-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {"Automated Messages"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {
            "Check and adjust messages that can be sent automatically to your candidates."
          }
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotEmailTemplates}</_Builtin.Block>
    </_Component>
  );
}
