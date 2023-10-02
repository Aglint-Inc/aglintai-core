import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./EmailTemplates.module.css";

export function EmailTemplates({
  as: _Component = _Builtin.Block,
  slotRejectedEmailForm,
  slotThankyouApplyForm,
  slotSelectedEmailForm,
  slotInProcessEmailForm,
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
      <_Builtin.Block
        className={_utils.cx(_styles, "rejected-email-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "rejected-header-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Rejected Email "}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-rejected-toggle")}
            tag="div"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {
            'If you selected "Quick rejection" this message will be sent the morning after the candidate was rejected, during the hiring process.'
          }
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-form-email-templates")}
          tag="div"
        >
          {slotRejectedEmailForm}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "rejected-email-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "rejected-header-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Thank You for Applying Email"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-rejected-toggle")}
            tag="div"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {"Automated reply sent when candidates apply."}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-form-email-templates")}
          tag="div"
        >
          {slotThankyouApplyForm}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "rejected-email-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "rejected-header-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Selected Email "}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-rejected-toggle")}
            tag="div"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {"Automated reply sent when candidates apply."}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-form-email-templates")}
          tag="div"
        >
          {slotSelectedEmailForm}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "rejected-email-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "rejected-header-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"In Process Email "}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-rejected-toggle")}
            tag="div"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {"Automated reply sent when candidates apply."}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-form-email-templates")}
          tag="div"
        >
          {slotInProcessEmailForm}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
